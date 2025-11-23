// lib/mailer.ts
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!host || !port || !user || !pass) {
  console.warn('⚠️ Faltan variables SMTP en el entorno');
}

export const mailer = nodemailer.createTransport({
  host,
  port: Number(port),
  secure: Number(port) === 465, // true si usas 465 (SSL), false si usas 587 (STARTTLS)
  auth: {
    user,
    pass,
  },
});
