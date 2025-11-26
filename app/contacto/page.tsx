'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Calendar,
  Instagram,
  Youtube,
  Sparkles,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ========= SCHEMAS =========

const contactSchema = z.object({
  role: z.string().optional(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const quoteSchema = z.object({
  client_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  client_email: z.string().email('Email inválido'),
  client_phone: z.string().min(6, 'Teléfono muy corto'),
  event_date: z.string().optional(),
  event_type: z.string().optional(),
  number_of_fights: z
    .string()
    .optional()
    .transform(v => (v ? v : '')),
  expected_attendance: z
    .string()
    .optional()
    .transform(v => (v ? v : '')),
  ring_needed: z.boolean().optional(),
  budget_range: z.string().optional(),
  special_requirements: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// ========= EMAIL CONSTANTS =========

const EMAIL = 'profefrankoesteban@gmail.com';
const EMAIL_SUBJECT = 'Contacto desde profefranko.com';

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL,
)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

// ========= PAGE COMPONENT =========

export default function ContactoPage() {
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [quoteError, setQuoteError] = useState('');

  const [emailHref, setEmailHref] = useState<string>(MAILTO_URL);

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      role: 'otros',
      country: 'Chile',
    },
  });

  const quoteForm = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      ring_needed: true,
    },
  });

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '56987772483';
  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  // ========= DETECTAR MOBILE VS DESKTOP PARA EMAIL =========

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

    // En móvil: app de correo (mailto)
    // En PC: Gmail web
    setEmailHref(isMobile ? MAILTO_URL : GMAIL_COMPOSE_URL);
  }, []);

  // ========= HANDLERS =========

  const onSubmitContact = async (data: ContactFormData) => {
    setContactStatus('idle');
    setContactError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: data.role || 'otros',
          name: data.name,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          city: data.city,
          country: data.country,
          message: data.message,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || 'No se pudo enviar el mensaje.');
      }

      setContactStatus('success');
      contactForm.reset({
        role: 'otros',
        country: 'Chile',
      });
      setTimeout(() => setContactStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setContactStatus('error');
      setContactError(
        err instanceof Error ? err.message : 'Error inesperado al enviar el mensaje.',
      );
    }
  };

  const onSubmitQuote = async (data: QuoteFormData) => {
    setQuoteStatus('idle');
    setQuoteError('');

    try {
      const res = await fetch('/api/event-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          number_of_fights: data.number_of_fights || '0',
          expected_attendance: data.expected_attendance || '0',
          equipment_needed: [],
          additional_services: [],
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || 'No se pudo enviar la cotización.');
      }

      setQuoteStatus('success');
      quoteForm.reset({
        ring_needed: true,
      });
      setTimeout(() => setQuoteStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setQuoteStatus('error');
      setQuoteError(
        err instanceof Error ? err.message : 'Error inesperado al enviar la cotización.',
      );
    }
  };

  // ========= UI =========

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Glow de fondo */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,10,0.14),transparent_55%)]" />

      <main className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">
        {/* Back link */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-[#FFD60A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD60A]/30 bg-[#111]/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#FFD60A]">
            <Sparkles className="w-3 h-3" />
            Contacto directo
          </span>
        </div>

        {/* HEADER */}
        <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-[var(--font-saira)] tracking-tight mb-3">
              Hablemos de tu proyecto de boxeo
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-xl">
              Ya sea que quieras entrenar, organizar un evento profesional o sumar el boxeo
              a tu club, aquí tienes todos los canales oficiales para hablar directo con el
              Profe.
            </p>

            {/* Datos cortos */}
            <div className="mt-6 grid gap-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FFD60A]" />
                <a
                  href={emailHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFD60A] transition-colors"
                >
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFD60A] transition-colors"
                >
                  WhatsApp: +{whatsappPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Bloque redes distinto a la home */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111111] via-[#050505] to-[#1e1300] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#FFD60A]/80 mb-2">
              Redes oficiales
            </p>
            <p className="text-sm text-white/70 mb-4">
              Sígueme para ver entrenamientos, eventos, peleas y contenido exclusivo de boxeo.
            </p>

            <div className="grid grid-cols-3 gap-3 text-xs">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/frankoesteban_/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/25 bg-gradient-to-b from-[#151515] to-[#050505] px-3 py-3 flex flex-col items-center gap-2 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white/60 group-hover:text-[#FFD60A]" />
                <span className="font-medium text-[11px] text-white/80">Instagram</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/25 bg-gradient-to-b from-[#151515] to-[#050505] px-3 py-3 flex flex-col items-center gap-2 transition-colors"
              >
                <span
                  className="w-5 h-5 
                            bg-white/60 group-hover:bg-[#FFD60A]
                            [mask-image:url('/img/x-logo.svg')]
                            [-webkit-mask-image:url('/img/x-logo.svg')]
                            [mask-size:contain]
                            [mask-repeat:no-repeat]
                            [mask-position:center]
                            transition-colors"
                  aria-hidden="true"
                />
                <span className="font-medium text-[11px] text-white/80">X</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/25 bg-gradient-to-b from-[#151515] to-[#050505] px-3 py-3 flex flex-col items-center gap-2 transition-colors"
              >
                <Youtube className="w-5 h-5 text-white/60 group-hover:text-[#FFD60A]" />
                <span className="font-medium text-[11px] text-white/80">YouTube</span>
              </a>
            </div>
          </div>
        </section>

        {/* FORMULARIOS */}
        <section className="grid gap-8 lg:grid-cols-2 items-start">
          {/* FORM CONTACTO GENERAL */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b]/95 px-5 py-5 md:px-6 md:py-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/40">
                <Mail className="w-4 h-4 text-[#FFD60A]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Formulario de contacto</h2>
                <p className="text-[11px] text-white/60">
                  Ideal para dudas generales, entrenamientos o colaboraciones.
                </p>
              </div>
            </div>

            <form
              className="space-y-3 mt-2"
              onSubmit={contactForm.handleSubmit(onSubmitContact)}
            >
              {/* Nombre */}
              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">
                  Nombre completo
                </label>
                <input
                  type="text"
                  {...contactForm.register('name')}
                  className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                  placeholder="Juan Pérez"
                />
                {contactForm.formState.errors.name && (
                  <p className="text-[11px] text-red-400">
                    {contactForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">Email</label>
                <input
                  type="email"
                  {...contactForm.register('email')}
                  className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                  placeholder="tu@correo.com"
                />
                {contactForm.formState.errors.email && (
                  <p className="text-[11px] text-red-400">
                    {contactForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Teléfono + Organización */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    {...contactForm.register('phone')}
                    className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Organización (opcional)
                  </label>
                  <input
                    type="text"
                    {...contactForm.register('organization')}
                    className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Club, federación, etc."
                  />
                </div>
              </div>

              {/* Ciudad / País */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">Ciudad</label>
                  <input
                    type="text"
                    {...contactForm.register('city')}
                    className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Santiago"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">País</label>
                  <input
                    type="text"
                    {...contactForm.register('country')}
                    className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Chile"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  {...contactForm.register('message')}
                  className="w-full rounded-lg bg-[#111]/80 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent resize-none"
                  placeholder="Cuéntame en qué te puedo ayudar..."
                />
                {contactForm.formState.errors.message && (
                  <p className="text-[11px] text-red-400">
                    {contactForm.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Estados */}
              {contactStatus === 'success' && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-[11px] text-emerald-200 flex items-start gap-2">
                  <span className="mt-0.5">✅</span>
                  <span>Mensaje enviado correctamente. Te responderé pronto.</span>
                </div>
              )}

              {contactStatus === 'error' && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-[11px] text-red-200 flex items-start gap-2">
                  <span className="mt-0.5">⚠️</span>
                  <span>{contactError}</span>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={contactForm.formState.isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] hover:from-[#FFA500] hover:to-[#FFD60A] font-bold text-sm py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactForm.formState.isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
                <p className="mt-2 text-[10px] text-white/40 text-center">
                  Tu mensaje llega directo al correo del Profe. Sin intermediarios.
                </p>
              </div>
            </form>
          </div>

          {/* FORM COTIZACIÓN RÁPIDA */}
          <div className="rounded-2xl border border-[#FFD60A]/30 bg-[#111111]/95 px-5 py-5 md:px-6 md:py-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/60">
                <Calendar className="w-4 h-4 text-[#FFD60A]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Cotización rápida de evento</h2>
                <p className="text-[11px] text-white/60">
                  Si necesitas ring profesional, producción y equipo completo para tu evento.
                </p>
              </div>
            </div>

            <form
              className="space-y-3 mt-2"
              onSubmit={quoteForm.handleSubmit(onSubmitQuote)}
            >
              {/* Nombre / Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Nombre de contacto
                  </label>
                  <input
                    type="text"
                    {...quoteForm.register('client_name')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Nombre y apellido"
                  />
                  {quoteForm.formState.errors.client_name && (
                    <p className="text-[11px] text-red-300">
                      {quoteForm.formState.errors.client_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    {...quoteForm.register('client_email')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="tu@correo.com"
                  />
                  {quoteForm.formState.errors.client_email && (
                    <p className="text-[11px] text-red-300">
                      {quoteForm.formState.errors.client_email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono / Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    {...quoteForm.register('client_phone')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="+56 9 1234 5678"
                  />
                  {quoteForm.formState.errors.client_phone && (
                    <p className="text-[11px] text-red-300">
                      {quoteForm.formState.errors.client_phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Fecha estimada
                  </label>
                  <input
                    type="date"
                    {...quoteForm.register('event_date')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tipo evento / Peleas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Tipo de evento
                  </label>
                  <input
                    type="text"
                    {...quoteForm.register('event_type')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Gala, exhibición, torneo..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Nº aprox. de peleas
                  </label>
                  <input
                    type="number"
                    min={0}
                    {...quoteForm.register('number_of_fights')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Público / Presupuesto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Público estimado
                  </label>
                  <input
                    type="number"
                    min={0}
                    {...quoteForm.register('expected_attendance')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/70 font-medium">
                    Presupuesto estimado
                  </label>
                  <input
                    type="text"
                    {...quoteForm.register('budget_range')}
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                    placeholder="Ej: 1.500.000 - 2.000.000"
                  />
                </div>
              </div>

              {/* Requerimientos */}
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium">
                  Requerimientos / detalles
                </label>
                <textarea
                  rows={3}
                  {...quoteForm.register('special_requirements')}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent resize-none"
                  placeholder="Cuéntame si necesitas ring profesional, sonido, luces, transmisión, etc."
                />
              </div>

              {/* Estados */}
              {quoteStatus === 'success' && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-[11px] text-emerald-200 flex items-start gap-2">
                  <span className="mt-0.5">✅</span>
                  <span>
                    Cotización enviada correctamente. Recibirás la información en tu correo.
                  </span>
                </div>
              )}

              {quoteStatus === 'error' && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-[11px] text-red-200 flex items-start gap-2">
                  <span className="mt-0.5">⚠️</span>
                  <span>{quoteError}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={quoteForm.formState.isSubmitting}
                  className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFC700] font-semibold text-sm py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {quoteForm.formState.isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando cotización...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar cotización
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-white/45 text-center">
                  Si prefieres, también puedes{' '}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#25D366] hover:underline"
                  >
                    escribir directo por WhatsApp
                  </a>
                  .
                </p>

                <p className="text-[10px] text-white/35 text-center">
                  Para una cotización más detallada, también tienes la página completa en{' '}
                  <Link href="/eventos/cotizar" className="text-[#FFD60A] hover:underline">
                    profefranko.com/eventos/cotizar
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
