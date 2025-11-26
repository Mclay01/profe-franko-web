export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// ---------- CONFIG EMAIL ----------

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Rol para mostrarlo bonito
const ROLE_LABELS: Record<string, string> = {
  peleador: 'Peleador',
  arbitro: 'Árbitro',
  entrenador: 'Entrenador',
  club: 'Club',
  federacion: 'Federación',
  otros: 'Otros',
};

// Colores de marca para el PDF
const PDF_COLORS = {
  headerBg: rgb(5 / 255, 5 / 255, 5 / 255),
  yellow: rgb(255 / 255, 214 / 255, 10 / 255),
  textMain: rgb(17 / 255, 24 / 255, 39 / 255),
  textMuted: rgb(107 / 255, 114 / 255, 128 / 255),
  line: rgb(229 / 255, 231 / 255, 235 / 255),
};

// ---------- HANDLER ----------

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let payload: any = {};

    if (contentType.includes('application/json')) {
      payload = await req.json();
    } else {
      const formData = await req.formData();
      payload = Object.fromEntries(formData.entries());
    }

    const data = {
      role: (payload.role as string) || 'otros',
      name: (payload.name || payload.nombre || '').toString(),
      email: (payload.email || '').toString(),
      phone: (payload.phone || payload.telefono || '').toString(),
      organization: (payload.organization || '').toString(),
      city: (payload.city || '').toString(),
      country: (payload.country || '').toString(),
      message: (payload.message || payload.mensaje || '').toString(),
    };

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { ok: false, error: 'Faltan campos obligatorios.' },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_TO || process.env.SMTP_USER || '';
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER || '';

    const roleLabel = ROLE_LABELS[data.role] ?? 'Otros';
    const subject = `Nuevo mensaje de contacto - ${data.name}`;

    // ---------- HTML DEL CORREO ----------

    const html = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f5f5f5; padding: 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 24px 24px 16px 24px; text-align: center; border-bottom: 1px solid #eee;">
          <img
            src="https://profefranko.com/img/logo-profefranko.png"
            alt="Profe Franko"
            style="max-width: 180px; height: auto; display: block; margin: 0 auto 8px auto;"
          />
          <p style="margin: 0; font-size: 12px; color: #888;">
            Nuevo mensaje desde el formulario de contacto
          </p>
        </td>
      </tr>

      <tr>
        <td>
          <div style="
            background-color:#ffffff;
            border-radius:12px;
            padding:16px 18px;
            border:1px solid #e5e7eb;
            box-shadow:0 4px 16px rgba(15,23,42,0.08);
            color:#111827;
            font-size:13px;
          ">

            <h3 style="margin:0 0 8px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Datos del contacto
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Perfil:</td>
                <td style="padding:3px 0;color:#111827;font-weight:600;">${roleLabel}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Nombre:</td>
                <td style="padding:3px 0;color:#111827;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Email:</td>
                <td style="padding:3px 0;color:#111827;">
                  <a href="mailto:${data.email}" style="color:#2563eb;text-decoration:none;">${data.email}</a>
                </td>
              </tr>
              ${
                data.phone
                  ? `
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Teléfono:</td>
                <td style="padding:3px 0;color:#111827;">${data.phone}</td>
              </tr>
              `
                  : ''
              }
            </table>

            ${
              data.organization
                ? `
            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Organización
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Nombre:</td>
                <td style="padding:3px 0;color:#111827;">${data.organization}</td>
              </tr>
            </table>
            `
                : ''
            }

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Ubicación
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Ciudad:</td>
                <td style="padding:3px 0;color:#111827;">${data.city}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">País:</td>
                <td style="padding:3px 0;color:#111827;">${data.country}</td>
              </tr>
            </table>

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Mensaje
            </h3>
            <div style="
              font-size:13px;
              line-height:1.5;
              color:#111827;
              background-color:#f9fafb;
              border-radius:8px;
              padding:10px 12px;
              border:1px solid #e5e7eb;
              white-space:pre-wrap;
            ">
              ${escapeHtml(data.message)}
            </div>

            <div style="margin-top:10px;font-size:11px;color:#9ca3af;text-align:right;">
              Ver más en
              <a href="https://profefranko.com" style="color:#facc15;text-decoration:none;font-weight:600;">
                profefranko.com
              </a>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
`;

    const text = `
Nuevo mensaje de contacto

Perfil: ${roleLabel}
Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ''}

Organización: ${data.organization || '-'}

Ciudad: ${data.city}
País: ${data.country}

Mensaje:
${data.message}
`.trim();

    // ---------- PDF ----------

    const logoPath = path.join(
      process.cwd(),
      'public',
      'img',
      'logo-profefranko.png',
    );

    const pdfBuffer = await buildContactPdf(data, logoPath);

    // ---------- ENVÍO ----------

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: data.email,
      attachments: [
        {
          filename: 'contacto-profefranko.pdf',
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error enviando email de contacto:', err);
    return NextResponse.json(
      { ok: false, error: 'No se pudo enviar el mensaje.' },
      { status: 500 },
    );
  }
}

// Preflight CORS si lo necesitas
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// ---------- UTILS ----------

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===== PDF (CONTACTO) =====

async function buildContactPdf(
  data: {
    role: string;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    city: string;
    country: string;
    message: string;
  },
  logoPath: string,
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let logoImage;
  try {
    const logoBytes = fs.readFileSync(logoPath);
    logoImage = await pdfDoc.embedPng(logoBytes);
  } catch {
    logoImage = undefined;
  }

  const roleLabel = ROLE_LABELS[data.role] ?? 'Otros';

  let y = drawHeader(page, {
    width,
    height,
    fontRegular,
    fontBold,
    logoImage,
    title: 'Formulario de contacto',
  });

  const marginX = 50;

  // Datos de contacto
  y = sectionTitle(page, fontBold, 'Datos del contacto', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Perfil', roleLabel, y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Nombre', data.name, y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Email', data.email, y, width, marginX);
  if (data.phone) {
    y = infoRow(page, fontRegular, fontBold, 'Teléfono', data.phone, y, width, marginX);
  }

  // Organización
  if (data.organization) {
    y = sectionTitle(page, fontBold, 'Organización', y, width, marginX);
    y = infoRow(
      page,
      fontRegular,
      fontBold,
      'Organización',
      data.organization,
      y,
      width,
      marginX,
    );
  }

  // Ubicación
  y = sectionTitle(page, fontBold, 'Ubicación', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Ciudad', data.city, y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'País', data.country, y, width, marginX);

  // Mensaje
  y = sectionTitle(page, fontBold, 'Mensaje', y, width, marginX);
  page.drawText(data.message || '—', {
    x: marginX,
    y: y - 12,
    size: 10,
    font: fontRegular,
    color: PDF_COLORS.textMain,
    maxWidth: width - marginX * 2,
    lineHeight: 14,
  });

  drawFooter(page, fontRegular, width);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function drawHeader(
  page: any,
  opts: {
    width: number;
    height: number;
    fontRegular: any;
    fontBold: any;
    logoImage?: any;
    title: string;
    subtitle?: string;
  },
): number {
  const { width, height, fontRegular, fontBold, logoImage, title, subtitle } =
    opts;
  const headerHeight = 90;
  const marginX = 50;

  // Fondo header
  page.drawRectangle({
    x: 0,
    y: height - headerHeight,
    width,
    height: headerHeight,
    color: PDF_COLORS.headerBg,
  });

  // Franja amarilla
  page.drawRectangle({
    x: 0,
    y: height - headerHeight - 4,
    width,
    height: 4,
    color: PDF_COLORS.yellow,
  });

  // Logo
  if (logoImage) {
    const logoTargetHeight = 60;
    const scale = logoTargetHeight / logoImage.height;
    const logoWidth = logoImage.width * scale;
    const logoX = marginX - 10;
    const logoY = height - headerHeight + (headerHeight - logoTargetHeight) / 2;

    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoTargetHeight,
    });
  }

  const titleX = marginX + 80;

  page.drawText('Profe Franko', {
    x: titleX,
    y: height - 40,
    size: 20,
    font: fontBold,
    color: PDF_COLORS.yellow,
  });

  page.drawText(title, {
    x: titleX,
    y: height - 58,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-CL');

  page.drawText(`Fecha de solicitud: ${formattedDate}`, {
    x: titleX,
    y: height - 74,
    size: 10,
    font: fontRegular,
    color: PDF_COLORS.textMuted,
  });

  if (subtitle) {
    page.drawText(subtitle, {
      x: titleX,
      y: height - 88,
      size: 10,
      font: fontRegular,
      color: PDF_COLORS.textMuted,
    });
  }

  return height - headerHeight - 40;
}

function sectionTitle(
  page: any,
  fontBold: any,
  title: string,
  y: number,
  pageWidth: number,
  marginX: number,
): number {
  y -= 20;

  page.drawText(title.toUpperCase(), {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: PDF_COLORS.textMain,
  });

  y -= 6;

  page.drawRectangle({
    x: marginX,
    y,
    width: pageWidth - marginX * 2,
    height: 0.7,
    color: PDF_COLORS.line,
  });

  return y - 12;
}

function infoRow(
  page: any,
  fontRegular: any,
  fontBold: any,
  label: string,
  value: string,
  y: number,
  pageWidth: number,
  marginX: number,
): number {
  if (!value) return y;

  const labelText = `${label}: `;
  const size = 10;
  const labelWidth = fontBold.widthOfTextAtSize(labelText, size);

  page.drawText(labelText, {
    x: marginX,
    y,
    size,
    font: fontBold,
    color: PDF_COLORS.textMuted,
  });

  page.drawText(value, {
    x: marginX + labelWidth,
    y,
    size,
    font: fontRegular,
    color: PDF_COLORS.textMain,
    maxWidth: pageWidth - marginX * 2 - labelWidth,
    lineHeight: 13,
  });

  return y - 16;
}

function drawFooter(page: any, fontRegular: any, pageWidth: number) {
  const marginX = 50;
  const baseY = 60;

  page.drawRectangle({
    x: marginX,
    y: baseY + 24,
    width: pageWidth - marginX * 2,
    height: 0.7,
    color: PDF_COLORS.line,
  });

  page.drawText('Profe Franko · Boxing Coach', {
    x: marginX,
    y: baseY + 10,
    size: 9,
    font: fontRegular,
    color: PDF_COLORS.textMuted,
  });

  page.drawText('Sitio web: profefranko.com', {
    x: marginX,
    y: baseY - 4,
    size: 9,
    font: fontRegular,
    color: PDF_COLORS.textMuted,
  });

  page.drawText('Email: profefrankoesteban@gmail.com', {
    x: marginX,
    y: baseY - 18,
    size: 9,
    font: fontRegular,
    color: PDF_COLORS.textMuted,
  });
}
