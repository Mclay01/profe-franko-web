export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const LOGO_URL =
  process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/img/logo-profefranko.png`
    : 'https://profefranko.com/img/logo-profefranko.png';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const PDF_COLORS = {
  headerBg: rgb(5 / 255, 5 / 255, 5 / 255),
  yellow: rgb(255 / 255, 214 / 255, 10 / 255),
  textMain: rgb(17 / 255, 24 / 255, 39 / 255),
  textMuted: rgb(107 / 255, 114 / 255, 128 / 255),
  line: rgb(229 / 255, 231 / 255, 235 / 255),
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      client_name,
      client_email,
      client_phone,
      event_date,
      event_time,
      venue_name,
      venue_address,
      event_type,
      number_of_fights,
      expected_attendance,
      ring_needed,
      equipment_needed = [],
      additional_services = [],
      budget_range,
      special_requirements,
    } = body;

    const equipmentListText =
      Array.isArray(equipment_needed) && equipment_needed.length
        ? equipment_needed.join(', ')
        : 'N/A';

    const additionalListText =
      Array.isArray(additional_services) && additional_services.length
        ? additional_services.join(', ')
        : 'N/A';

    const logoPath = path.join(
      process.cwd(),
      'public',
      'img',
      'logo-profefranko.png',
    );

    // PDF (sigue usando el logo del archivo local)
    const pdfBuffer = await buildEventQuotePdf(
      {
        client_name,
        client_email,
        client_phone,
        event_date,
        event_time,
        event_type,
        number_of_fights,
        expected_attendance,
        budget_range,
        venue_name,
        venue_address,
        ring_needed,
        equipmentListText,
        additionalListText,
        special_requirements,
      },
      logoPath,
    );

    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      subject: `Nueva cotización de evento - ${client_name}`,
      text: `
Nueva solicitud de cotización de evento

[DATOS DEL CLIENTE]
Nombre: ${client_name}
Email: ${client_email}
Teléfono: ${client_phone}

[DETALLES DEL EVENTO]
Fecha: ${event_date || '-'}
Hora: ${event_time || '-'}
Tipo de evento: ${event_type || '-'}
Número de peleas: ${number_of_fights}
Cantidad de publico (aprox.): ${expected_attendance}
Presupuesto: ${budget_range || '-'}

[LUGAR]
Nombre del lugar: ${venue_name || '-'}
Dirección: ${venue_address || '-'}

[SERVICIOS]
Ring profesional: ${ring_needed ? 'Sí' : 'No'}
Equipo necesario: ${equipmentListText}
Servicios adicionales: ${additionalListText}

[REQUERIMIENTOS ESPECIALES]
${special_requirements || '-'}
      `.trim(),
      // 👇 HTML SIN LOGO, SOLO TEXTO + URL
      html: `
  <div style="background-color:#f3f4f6;margin:0;padding:20px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
      <tr>
        <td style="text-align:center;padding:16px 12px 12px 12px;">
          <img
            src="${LOGO_URL}"
            alt="Profe Franko"
            width="80"
            height="80"
            style="display:block;margin:0 auto 8px auto;border-radius:50%;"
          />
          <div style="font-size:20px;font-weight:800;color:#111827;text-transform:uppercase;letter-spacing:0.08em;">
            Cotización de Evento
          </div>
          <div style="margin-top:4px;font-size:12px;color:#6b7280;">
            Solicitud enviada desde
            <a href="https://profefranko.com" style="color:#facc15;text-decoration:none;font-weight:600;">
              profefranko.com
            </a>
          </div>
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
              Datos del cliente
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Nombre:</td>
                <td style="padding:3px 0;color:#111827;font-weight:600;">${client_name}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Email:</td>
                <td style="padding:3px 0;color:#111827;">
                  <a href="mailto:${client_email}" style="color:#2563eb;text-decoration:none;">${client_email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Teléfono:</td>
                <td style="padding:3px 0;color:#111827;">${client_phone}</td>
              </tr>
            </table>

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Detalles del evento
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Fecha:</td>
                <td style="padding:3px 0;color:#111827;">${event_date || '-'}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Hora:</td>
                <td style="padding:3px 0;color:#111827;">${event_time || '-'}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Tipo de evento:</td>
                <td style="padding:3px 0;color:#111827;font-weight:600;">${event_type || '-'}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Número de peleas:</td>
                <td style="padding:3px 0;color:#111827;">${number_of_fights}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Cantidad de asistentes (aprox.):</td>
                <td style="padding:3px 0;color:#111827;">${expected_attendance}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Presupuesto:</td>
                <td style="padding:3px 0;color:#111827;">${budget_range || '-'}</td>
              </tr>
            </table>

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Lugar del evento
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Nombre del lugar:</td>
                <td style="padding:3px 0;color:#111827;">${venue_name || '-'}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Dirección:</td>
                <td style="padding:3px 0;color:#111827;">${venue_address || '-'}</td>
              </tr>
            </table>

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Servicios y equipo
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:13px;margin-bottom:10px;">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:150px;">Ring profesional:</td>
                <td style="padding:3px 0;color:#111827;">${ring_needed ? 'Sí' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Equipo necesario:</td>
                <td style="padding:3px 0;color:#111827;">${equipmentListText}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280;">Servicios adicionales:</td>
                <td style="padding:3px 0;color:#111827;">${additionalListText}</td>
              </tr>
            </table>

            <h3 style="margin:8px 0 6px 0;font-size:13px;color:#4b5563;text-transform:uppercase;letter-spacing:0.08em;">
              Requerimientos especiales
            </h3>
            <div style="
              font-size:13px;
              line-height:1.5;
              color:#111827;
              background-color:#f9fafb;
              border-radius:8px;
              padding:10px 12px;
              border:1px solid:#e5e7eb;
              white-space:pre-wrap;
            ">
              ${(special_requirements || '').replace(/\n/g, '<br />') || '—'}
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
`,
      // 👇 SOLO adjuntamos el PDF (sin logo como cid)
      attachments: [
        {
          filename: 'cotizacion-evento-profefranko.pdf',
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error enviando cotización de evento:', error);
    return NextResponse.json(
      { ok: false, error: 'Error al enviar la cotización' },
      { status: 500 },
    );
  }
}

// ===== PDF (EVENTO) =====

async function buildEventQuotePdf(
  data: {
    client_name: string;
    client_email: string;
    client_phone: string;
    event_date?: string;
    event_time?: string;
    event_type?: string;
    number_of_fights: number;
    expected_attendance: number;
    budget_range?: string;
    venue_name?: string;
    venue_address?: string;
    ring_needed: boolean;
    equipmentListText: string;
    additionalListText: string;
    special_requirements?: string;
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

  let y = drawHeader(page, {
    width,
    height,
    fontRegular,
    fontBold,
    logoImage,
    title: 'Cotización de evento',
  });

  const marginX = 50;

  // Datos cliente
  y = sectionTitle(page, fontBold, 'Datos del cliente', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Nombre', data.client_name, y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Email', data.client_email, y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Teléfono', data.client_phone, y, width, marginX);

  // Detalles del evento
  y = sectionTitle(page, fontBold, 'Detalles del evento', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Fecha', data.event_date || '-', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Hora', data.event_time || '-', y, width, marginX);
  y = infoRow(page, fontRegular, fontBold, 'Tipo de evento', data.event_type || '-', y, width, marginX);
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Número de peleas',
    String(data.number_of_fights),
    y,
    width,
    marginX,
  );
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Cantidad de asistentes (aprox.)',
    String(data.expected_attendance),
    y,
    width,
    marginX,
  );
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Presupuesto',
    data.budget_range || '-',
    y,
    width,
    marginX,
  );

  // Lugar
  y = sectionTitle(page, fontBold, 'Lugar del evento', y, width, marginX);
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Nombre del lugar',
    data.venue_name || '-',
    y,
    width,
    marginX,
  );
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Dirección',
    data.venue_address || '-',
    y,
    width,
    marginX,
  );

  // Servicios
  y = sectionTitle(page, fontBold, 'Servicios y equipo', y, width, marginX);
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Ring profesional',
    data.ring_needed ? 'Sí' : 'No',
    y,
    width,
    marginX,
  );
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Equipo necesario',
    data.equipmentListText,
    y,
    width,
    marginX,
  );
  y = infoRow(
    page,
    fontRegular,
    fontBold,
    'Servicios adicionales',
    data.additionalListText,
    y,
    width,
    marginX,
  );

  // Requerimientos especiales
  y = sectionTitle(page, fontBold, 'Requerimientos especiales', y, width, marginX);
  page.drawText(data.special_requirements || '—', {
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

// Helpers compartidos

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

  page.drawRectangle({
    x: 0,
    y: height - headerHeight,
    width,
    height: headerHeight,
    color: PDF_COLORS.headerBg,
  });

  page.drawRectangle({
    x: 0,
    y: height - headerHeight - 4,
    width,
    height: 4,
    color: PDF_COLORS.yellow,
  });

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
