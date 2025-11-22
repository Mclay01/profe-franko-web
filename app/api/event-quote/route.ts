// app/api/event-quote/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    // Ruta al logo (igual que en tu formulario de contacto)
    const logoPath = path.join(
      process.cwd(),
      'public',
      'img',
      'logo-profefranko.png',
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
      html: `
  <div style="background-color:#f3f4f6;margin:0;padding:20px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
      <tr>
        <td style="text-align:center;padding-bottom:12px;">
          <img
            src="cid:profefranko-logo"
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
              border:1px solid #e5e7eb;
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
      attachments: [
        {
          filename: 'logo-profefranko.png',
          path: logoPath,
          cid: 'profefranko-logo',
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
