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

const LOGO_PATH = path.join(
  process.cwd(),
  'public',
  'img',
  'logo-profefranko.png',
);

// helper para mostrar bonito el rol
function formatRole(raw?: string) {
  if (!raw) return '';
  const key = raw.toString().trim().toLowerCase();
  const map: Record<string, string> = {
    peleador: 'Peleador',
    'peleador/a': 'Peleador',
    arbitro: 'Árbitro',
    árbitro: 'Árbitro',
    entrenador: 'Entrenador',
    club: 'Club',
    federacion: 'Federación',
    federación: 'Federación',
    otros: 'Otros',
    otro: 'Otros',
  };
  return map[key] ?? raw;
}

// ---------- HANDLER ----------

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let name = '';
    let email = '';
    let phone = '';
    let message = '';

    let orgType = '';       // Federación / Club / Peleador / etc.
    let organization = '';  // Nombre de la organización
    let city = '';
    let country = '';

    if (contentType.includes('application/json')) {
      const body = await req.json();

      name =
        (body.name ||
          body.nombre ||
          '')?.toString().trim();
      email = (body.email || '')?.toString().trim();
      phone =
        (body.phone ||
          body.telefono ||
          '')?.toString().trim();
      message =
        (body.message ||
          body.mensaje ||
          '')?.toString();

      // ⬅️ AQUÍ METEMOS role COMO TIPO DE ENTIDAD
      const rawRoleOrType =
        body.role ||
        body.org_type ||
        body.organization_type ||
        body.organizationType ||
        body.entity_type ||
        body.entityType ||
        body.tipo_organizacion ||
        body.tipoOrganizacion ||
        body.tipo_entidad ||
        body.tipoEntidad ||
        '';

      orgType = formatRole(rawRoleOrType);

      organization =
        (body.organization ||
          body.organizacion ||
          body.organización ||
          body.organization_name ||
          body.organizationName ||
          body.nombre_organizacion ||
          body.nombreOrganizacion ||
          '')?.toString().trim();

      city =
        (body.city ||
          body.ciudad ||
          '')?.toString().trim();

      country =
        (body.country ||
          body.pais ||
          body.país ||
          '')?.toString().trim();
    } else {
      const formData = await req.formData();

      name = (
        formData.get('name') ||
        formData.get('nombre') ||
        ''
      ).toString().trim();

      email = (
        formData.get('email') ||
        ''
      ).toString().trim();

      phone = (
        formData.get('phone') ||
        formData.get('telefono') ||
        ''
      ).toString().trim();

      message = (
        formData.get('message') ||
        formData.get('mensaje') ||
        ''
      ).toString();

      const rawRoleOrType =
        formData.get('role') ||
        formData.get('org_type') ||
        formData.get('organization_type') ||
        formData.get('organizationType') ||
        formData.get('entity_type') ||
        formData.get('entityType') ||
        formData.get('tipo_organizacion') ||
        formData.get('tipoOrganizacion') ||
        formData.get('tipo_entidad') ||
        formData.get('tipoEntidad') ||
        '';

      orgType = formatRole(rawRoleOrType?.toString());

      organization = (
        formData.get('organization') ||
        formData.get('organizacion') ||
        formData.get('organización') ||
        formData.get('organization_name') ||
        formData.get('organizationName') ||
        formData.get('nombre_organizacion') ||
        formData.get('nombreOrganizacion') ||
        ''
      ).toString().trim();

      city = (
        formData.get('city') ||
        formData.get('ciudad') ||
        ''
      ).toString().trim();

      country = (
        formData.get('country') ||
        formData.get('pais') ||
        formData.get('país') ||
        ''
      ).toString().trim();
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
              <img
                src="cid:profefranko-logo"
                alt="Profe Franko"
                style="max-width: 180px; height: auto; display: block; margin: 0 auto 8px auto;"
              />
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
                  <td style="padding: 6px 0; font-weight: 600; width: 120px;">Nombre</td>
                  <td style="padding: 6px 0;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Email</td>
                  <td style="padding: 6px 0;">${escapeHtml(email)}</td>
                </tr>
                ${
                  phone
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Teléfono</td>
                  <td style="padding: 6px 0;">${escapeHtml(phone)}</td>
                </tr>
                `
                    : ''
                }
                ${
                  orgType
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Tipo de entidad</td>
                  <td style="padding: 6px 0;">${escapeHtml(orgType)}</td>
                </tr>
                `
                    : ''
                }
                ${
                  organization
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Organización</td>
                  <td style="padding: 6px 0;">${escapeHtml(organization)}</td>
                </tr>
                `
                    : ''
                }
                ${
                  city
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">Ciudad</td>
                  <td style="padding: 6px 0;">${escapeHtml(city)}</td>
                </tr>
                `
                    : ''
                }
                ${
                  country
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600;">País</td>
                  <td style="padding: 6px 0;">${escapeHtml(country)}</td>
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

    const text =
      [
        'Nuevo mensaje de contacto',
        '',
        `Nombre: ${name}`,
        `Email: ${email}`,
        phone ? `Teléfono: ${phone}` : '',
        orgType ? `Tipo de entidad: ${orgType}` : '',
        organization ? `Organización: ${organization}` : '',
        city ? `Ciudad: ${city}` : '',
        country ? `País: ${country}` : '',
        '',
        'Mensaje:',
        message,
      ]
        .filter(Boolean)
        .join('\n');

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
          path: LOGO_PATH,
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
