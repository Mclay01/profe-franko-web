// app/api/contact/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

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

// usamos el mismo logo que en event-quote
const logoPath = path.join(
  process.cwd(),
  'public',
  'img',
  'logo-profefranko.png',
);

// ---------- HANDLER ----------

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let name = '';
    let email = '';
    let phone = '';
    let message = '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      name = body.name || body.nombre || '';
      email = body.email || '';
      phone = body.phone || body.telefono || '';
      message = body.message || body.mensaje || '';
    } else {
      const formData = await req.formData();
      name = (formData.get('name') || formData.get('nombre') || '') as string;
      email = (formData.get('email') || '') as string;
      phone = (formData.get('phone') || formData.get('telefono') || '') as string;
      message = (formData.get('message') || formData.get('mensaje') || '') as string;
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Faltan campos obligatorios.' },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_TO || process.env.SMTP_USER;
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
    const subject = `Nuevo mensaje de contacto de ${name}`;

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f5f5f5; padding: 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px 24px; text-align: center; border-bottom: 1px solid #eee;">
              <img src="cid:profefranko-logo" alt="Logo" style="max-width: 180px; height: auto; display: block; margin: 0 auto 8px auto;" />
              <p style="margin: 0; font-size: 12px; color: #888;">Nuevo mensaje desde el formulario de contacto</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #111;">
                Detalles del contacto
              </h1>

              <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; width: 90px;">Nombre</td>
                  <td style="padding: 6px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Email</td>
                  <td style="padding: 6px 0;">${email}</td>
                </tr>
                ${
                  phone
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Teléfono</td>
                  <td style="padding: 6px 0;">${phone}</td>
                </tr>
                `
                    : ''
                }
              </table>

              <h2 style="margin: 16px 0 8px 0; font-size: 16px; font-weight: 600; color: #111;">
                Mensaje
              </h2>
              <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; font-size: 14px; color: #333;">
                ${escapeHtml(message)}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 24px 24px 24px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee;">
              Este mensaje se ha enviado desde el formulario de tu sitio web.
            </td>
          </tr>
        </table>
      </div>
    `;

    const text = `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}` : ''}

Mensaje:
${message}
    `.trim();

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: email,
      attachments: [
        {
          filename: 'logo-profefranko.png',
          path: logoPath,
          cid: 'profefranko-logo',
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

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
