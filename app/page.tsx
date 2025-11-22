'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { ContactDrawer } from '@/components/contact-drawer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Award,
  Users as UsersIcon,
  Trophy,
  Flag,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { AboutCollage } from '@/components/AboutCollage';

const PHONE_E164 = '56987772483'; // +56 9 8777 2483 en formato E.164
const WHATSAPP_URL = `https://wa.me/${PHONE_E164}?text=Hola%20Profe%20Franko,%20vengo%20desde%20tu%20web.%20Quiero%20m%C3%A1s%20info%20🙌`;
const EMAIL = 'Fraankoestebaan@gmail.com';
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL,
)}&su=${encodeURIComponent('Contacto desde profefranko.com')}`;
const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Contacto desde profefranko.com',
)}`;

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [gmailHref, setGmailHref] = useState(GMAIL_COMPOSE_URL);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    // En móvil usamos mailto: para abrir la app de correo
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent || '';
      const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
      if (isMobile) {
        setGmailHref(MAILTO_URL);
      }
    }
  }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* HERO */}
      <section className="relative min-h-screen flex.items-center.justify-center.overflow-hidden -mt-16">
        <Image
          src="/img/hero-ring.jpg"
          alt="Ring de boxeo iluminado"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-28 pb-16 text-center -translate-y-6 md:-translate-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src="/img/logo-profefranko.png"
                  alt="Profe Franko — Boxing Coach"
                  width={240}
                  height={240}
                  priority
                  sizes="(min-width: 768px) 240px, 170px"
                  className="h-auto w-[170px] md:w-[240px] drop-shadow-2xl object-contain"
                />
                <span className="sr-only">Profe Franko</span>
              </div>
            </motion.div>

            <motion.div
              className="mb-6 mx-auto max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md px-5 py-4 md:px-8 md:py-6 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                <p className="text-white text-lg md:text-xl leading-relaxed font-light">
                  Proyectar el boxeo a un nivel superior en Chile y masificarlo,
                  creando oportunidades para nuevos talentos y organizando
                  eventos que posicionen a nuestro país en el mapa del boxeo
                  internacional.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="md"
                  className="bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] hover:from-[#FFA500] hover:to-[#FFD60A] font-bold px-8 py-5 shadow-2xl shadow-[#FFD60A]/30 transition-all"
                >
                  <Link href="/tienda" className="flex items-center gap-2">
                    Ver catálogo completo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="md"
                  variant="outline"
                  className="border-2 border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#0A0A0A] font-bold px-8 py-5 backdrop-blur-sm bg-[#FFD60A]/5 transition-all"
                  onClick={() => {
                    setSelectedRole('Otros');
                    setContactOpen(true);
                  }}
                >
                  Contáctame
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* PRÓXIMO EVENTO */}
      <section
        id="proximo-evento"
        className="py-20 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,214,10,0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-gradient-to-br.from-[#1A1A1A] to-[#0A0A0A] border-2 border-[#FFD60A]/30 rounded-3xl p-8 md:p-12 text-center"
          >
            <p className="text-[#FFD60A] font-semibold tracking-wide mb-2">
              Próximo evento
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-[var(--font-saira)]">
              PROXIMAMENTE
            </h2>
            <p className="text-white/80 mb-6"></p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] hover:from-[#FFA500] hover:to-[#FFD60A] font-bold px-8 py-5"
              >
                <Link href="/entradas">Compra tus entradas</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#0A0A0A] font-bold px-8 py-5"
                onClick={() => {
                  setSelectedRole('Otros');
                  setContactOpen(true);
                }}
              >
                Quiero más info
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col items-center mb-10">
              {/* Marco circular más chico */}
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* Anillo exterior dorado con degradado */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFD60A] to-[#C9991F]" />

                {/* Separación oscura entre anillos */}
                <div className="absolute inset-[5px] rounded-full bg-[#0A0A0A]" />

                {/* Segundo anillo dorado interior */}
                <div className="absolute inset-[8px] rounded-full border-[3px] border-[#FFD60A]" />

                {/* Foto recortada en círculo */}
                <div className="absolute inset-[13px] rounded-full overflow-hidden">
                  <Image
                    src="/img/about/franko.jpg"
                    alt="Franko Riquelme"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Nombre más chico */}
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white text-center font-[var(--font-saira)] leading-tight tracking-wide">
                <span className="block">FRANKO</span>
                <span className="block">RIQUELME</span>
              </h2>
            </div>

            {/* Desktop */}
            <div className="hidden xl:grid xl:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AboutCollage
                  images={[
                    { src: '/img/about/profe-1.jpg', alt: 'Profe Franko en ring' },
                    { src: '/img/about/profe-2.jpg', alt: 'Entrenamiento' },
                    { src: '/img/about/profe-3.jpg', alt: 'Arbitraje' },
                    { src: '/img/about/profe-4.jpg', alt: 'Trabajo de pads' },
                    { src: '/img/about/profe-5.jpg', alt: 'Evento' },
                    { src: '/img/about/profe-6.jpg', alt: 'Preparación física' },
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold text-[#FFD60A] font-[var(--font-saira)]">
                  Profe Franko: Apasionado del Boxeo
                </h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Con más de 15 años de experiencia en el mundo del boxeo,
                  Franko Riquelme se ha consolidado como uno de los principales
                  promotores de Chile. Su trayectoria abarca múltiples roles:
                  peleador, árbitro certificado, entrenador y organizador de
                  eventos de alto nivel.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Su misión es clara: elevar el boxeo chileno a estándares
                  internacionales y masificar este noble deporte en todo el
                  país.
                </p>

                {/* Badges */}
                <div className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <div className="group inline-flex items-center gap-3 rounded-full border border-[#FFD60A]/30 bg-[#111111]/60 px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,214,10,0.08)] hover:border-[#FFD60A] hover:bg-[#1A1A1A] transition-all">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-[#FFD60A]/10 ring-1 ring-[#FFD60A]/30 group-hover:ring-[#FFD60A]/60 transition-all">
                        <Trophy className="h-5 w-5 text-[#FFD60A]" />
                      </span>
                      <span className="text-white font-semibold">Peleador</span>
                    </div>
                    <div className="group inline-flex items-center gap-3 rounded-full border border-[#FFD60A]/30 bg-[#111111]/60 px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,214,10,0.08)] hover:border-[#FFD60A] hover:bg-[#1A1A1A] transition-all">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-[#FFD60A]/10 ring-1 ring-[#FFD60A]/30 group-hover:ring-[#FFD60A]/60 transition-all">
                        <Award className="h-5 w-5 text-[#FFD60A]" />
                      </span>
                      <span className="text-white font-semibold">Árbitro</span>
                    </div>
                    <div className="group inline-flex items-center gap-3 rounded-full border border-[#FFD60A]/30 bg-[#111111]/60 px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,214,10,0.08)] hover:border-[#FFD60A] hover:bg-[#1A1A1A] transition-all">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-[#FFD60A]/10 ring-1 ring-[#FFD60A]/30 group-hover:ring-[#FFD60A]/60 transition-all">
                        <UsersIcon className="h-5 w-5 text-[#FFD60A]" />
                      </span>
                      <span className="text-white font-semibold">
                        Entrenador
                      </span>
                    </div>
                    <div className="group inline-flex items-center gap-3 rounded-full border border-[#FFD60A]/30 bg-[#111111]/60 px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,214,10,0.08)] hover:border-[#FFD60A] hover:bg-[#1A1A1A] transition-all">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-[#FFD60A]/10 ring-1 ring-[#FFD60A]/30 group-hover:ring-[#FFD60A]/60 transition-all">
                        <Trophy className="h-5 w-5 text-[#FFD60A]" />
                      </span>
                      <span className="text-white font-semibold">
                        Organizador
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => {
                      setSelectedRole('Otros');
                      setContactOpen(true);
                    }}
                    size="lg"
                    className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg"
                  >
                    Hablemos de tu Proyecto
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Mobile/Tablet */}
            <div className="xl:hidden space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold text-[#FFD60A] font-[var(--font-saira)]"
              >
                Profe Franko: Apasionado del Boxeo
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <AboutCollage
                  images={[
                    { src: '/img/about/profe-1.jpg', alt: 'Profe Franko en ring' },
                    { src: '/img/about/profe-2.jpg', alt: 'Entrenamiento' },
                    { src: '/img/about/profe-3.jpg', alt: 'Arbitraje' },
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-base text-white/90 leading-relaxed">
                  Con más de 15 años de experiencia en el mundo del boxeo,
                  Franko Riquelme se ha consolidado como uno de los principales
                  promotores de Chile. Su trayectoria abarca múltiples roles:
                  peleador, árbitro certificado, entrenador y organizador de
                  eventos de alto nivel.
                </p>
                <p className="text-base text-white/90 leading-relaxed">
                  Su misión es clara: elevar el boxeo chileno a estándares
                  internacionales y masificar este noble deporte en todo el
                  país.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFD60A]/30 to-transparent p-[2px]"
              >
                <div className="relative w-full overflow-hidden rounded-[14px] bg-black aspect-[9/16]">
                  <video
                    src="/videos/reels-franko.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={() => {
                    setSelectedRole('Otros');
                    setContactOpen(true);
                  }}
                  size="lg"
                  className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg"
                >
                  Hablemos de tu Proyecto
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿QUIÉN ERES? */}
      <section id="quien-eres" className="pt-20 pb-8 bg-[#0A0A0A]">
        <div className="mx-auto w-full max-w-[1320px] px-4 overflow-visible">
          <div className="mx-auto w-fit transform origin-top">
            {/* grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[640px_300px] gap-x-8 gap-y-8 items-start">
              {/* Header */}
              <div className="lg:col-span-2 lg:row-start-1">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white font-[var(--font-saira)]">
                  ¿Quién Eres?
                </h2>

                <div className="mt-3 flex flex-col lg:flex-row lg:items-center gap-3">
                  <p className="text-white/80 text-xl lg:flex-1 max-w-[1000px]">
                    Selecciona tu perfil y conversemos sobre cómo puedo
                    ayudarte
                  </p>

                  {/* Botón + chips — SOLO DESKTOP */}
                  <div className="hidden lg:block">
                    <div className="contact-wrap.relative w-fit lg:ml-10 lg:shrink-0">
                      <button
                        onClick={() => setContactMenuOpen(v => !v)}
                        className="pill-btn"
                        aria-expanded={contactMenuOpen}
                        aria-controls="contact-menu"
                      >
                        <span className="pill-text">CONTACTAME POR:</span>
                      </button>

                      <div
                        id="contact-menu"
                        className={`contact-menu mt-2 sm:mt-0 sm:ml-2 inline-flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                          contactMenuOpen
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                        }`}
                      >
                        <a
                          href={gmailHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111]/90 text-white border border-white/10 hover:bg-[#171717] transition text-xs h-10 leading-none"
                        >
                          <GmailIcon className="h-4 w-4 block" />
                          <span>Gmail</span>
                        </a>

                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111]/90 text-white border border-white/10 hover:bg-[#171717] transition text-xs h-10 leading-none"
                        >
                          <WhatsAppIcon className="h-4 w-4 block" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjetas */}
              <div className="w-full lg:col-start-1 lg:row-start-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setSelectedRole('Peleador');
                      setContactOpen(true);
                    }}
                    className="rounded-2xl p-[6px] h-[126px] sm:h-[136px] md:h-[148px] bg-gradient-to-br from-[#FFD60A] to-[#FFA500] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#FFDA3A] to-[#FFB700] flex flex-col items-center justify-center gap-1.5">
                      <UsersIcon className="h-9 w-9 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Peleador
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRole('Árbitro');
                      setContactOpen(true);
                    }}
                    className="rounded-2xl p-[6px] h-[126px] sm:h-[136px] md:h-[148px] bg-gradient-to-br from-[#FF3B3B] to-[#FF6B6B] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#FF5353] to-[#FF7474] flex flex-col items-center justify-center gap-1.5">
                      <Flag className="h-9 w-9 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Árbitro
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRole('Federación');
                      setContactOpen(true);
                    }}
                    className="hidden lg:block row-span-2 rounded-2xl p-[6px] h-[300px] bg-gradient-to-br from-[#1B1B1B] to-[#151515] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#202020] to-[#121212] flex flex-col items-center justify-center gap-3">
                      <Building2 className="h-10 w-10 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Federación
                      </span>
                    </div>
                  </button>


                  <button
                    onClick={() => {
                      setSelectedRole('Entrenador');
                      setContactOpen(true);
                    }}
                    className="rounded-2xl p-[6px] h-[126px] sm:h-[136px] md:h-[148px] bg-gradient-to-b from-[#FFA500] to-[#FF3B3B] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#FFB22E] to-[#FF6B3B] flex flex-col items-center justify-center gap-1.5">
                      <GraduationCap className="h-9 w-9 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Entrenador
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRole('Club');
                      setContactOpen(true);
                    }}
                    className="rounded-2xl p-[6px] h-[126px] sm:h-[136px] md:h-[148px] bg-gradient-to-b from-[#1B1B1B] to-[#151515] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#202020] to-[#121212] flex flex-col items-center justify-center gap-1.5">
                      <UsersIcon className="h-9 w-9 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Club
                      </span>
                    </div>
                  </button>

                  {/* Federación en móvil (ancha) */}
                  <button
                    onClick={() => {
                      setSelectedRole('Federación');
                      setContactOpen(true);
                    }}
                    className="lg:hidden col-span-2 rounded-2xl p-[6px] h-[150px] bg-gradient-to-b from-[#1B1B1B] to-[#151515] shadow-xl hover:scale-[1.01] transition"
                  >
                    <div className="h-full w-full rounded-[18px] bg-gradient-to-b from-[#202020] to-[#121212] flex flex-col items-center justify-center gap-1.5">
                      <Building2 className="h-9 w-9 text-white" />
                      <span className="text-white font-semibold text-[18px] md:text-[19px]">
                        Federación
                      </span>
                    </div>
                  </button>

                  {/* Botón móvil entre Federación y RS (ancho) */}
                  <div className="lg:hidden col-span-2 w-full flex flex-col items-center">
                    <button
                      onClick={() => setContactMenuOpen(v => !v)}
                      className="pill-btn pill-btn--mobile"
                      aria-expanded={contactMenuOpen}
                    >
                      <span className="pill-text">CONTACTAME POR:</span>
                    </button>

                    <div
                      id="contact-menu-mobile"
                      className={`contact-menu contact-menu--mobile ${
                        contactMenuOpen ? 'is-open' : ''
                      }`}
                    >
                      <a
                        href={gmailHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#111]/90 text-white border border-white/10 hover:bg-[#171717] transition text-sm h-10 leading-none"
                      >
                        <GmailIcon className="h-5 w-5 block" />
                        <span>Gmail</span>
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#111]/90 text-white border border-white/10 hover:bg-[#171717] transition text-sm h-10 leading-none"
                      >
                        <WhatsAppIcon className="h-5 w-5 block" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                  {/* --- fin botón móvil --- */}
                </div>
              </div>

              {/* RS (centrada verticalmente en desktop) */}
              <div className="relative w-full lg:min-w-[240px] lg:w-[280px] lg:col-start-2 lg:row-start-2 lg:self-center">
                <div className="relative w-full max-w-[360px] sm:max-w-[320px] h-[250px] sm:h-[170px] lg:h-[220px] mx-auto">
                  <div className="socials-card h-full">
                    <div className="card">
                      <div className="background" />

                      <div className="logo">
                        <span className="logo-text">Socials</span>
                      </div>

                      {/* 1) Instagram */}
                      <a
                        href="https://www.instagram.com/frankoesteban_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        className="box box1"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="icon">
                          <svg
                            viewBox="0 0 30 30"
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg"
                          >
                            <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                          </svg>
                        </span>
                      </a>

                      {/* 2) X (Twitter) — al medio */}
                      <a
                        href="#"
                        className="box box2"
                        aria-label="X (Twitter)"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="icon">
                          <svg
                            viewBox="0 0 24 24"
                            className="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M18.244 2H21.5l-7.692 8.79L22.5 22h-7.406l-5.094-6.868L4.5 22H1l8.155-9.385L1.5 2h7.406l4.945 6.667L18.244 2ZM16.73 20h1.82L7.463 4H5.65L16.73 20Z"
                              fill="#fff"
                            />
                          </svg>
                        </span>
                      </a>

                      {/* 3) Facebook — última */}
                      <a
                        href="#"
                        className="box box3"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="icon">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg"
                          >
                            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6v-2.3c0-2.1 1.25-3.3 3.17-3.3.92 0 1.88.16 1.88.16v2.07h-1.06c-1.05 0-1.38.65-1.38 1.31V12h2.35l-.38 2.9h-1.97v7A10 10 0 0 0 22 12z" />
                          </svg>
                        </span>
                      </a>

                      <div className="box box4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estilos globales (botón + chips + RS) */}
          <style jsx global>{`
            /* === Botón estilo selector (pill) === */
            .pill-btn {
              background: linear-gradient(
                90deg,
                rgba(255, 214, 10, 0.2) 0%,
                rgba(255, 214, 10, 0.1) 50%,
                rgba(255, 214, 10, 0) 100%
              );
              padding: 0.5rem 1.5rem;
              border-radius: 9999px;
              border: 1px solid rgba(255, 214, 10, 0.3);
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .pill-text {
              color: #ffd60a;
              font-weight: 600;
              letter-spacing: 0.02em;
            }

            .contact-wrap {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            }
            @media (min-width: 640px) {
              .contact-wrap .contact-menu,
              #contact-menu {
                position: static !important;
                transform: none !important;
                margin: 0 0 0 0.5rem !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                white-space: nowrap;
              }
              .contact-wrap .contact-menu a,
              #contact-menu a {
                display: inline-flex;
                align-items: center;
                height: 40px;
                padding: 6px 10px;
                border-radius: 9999px;
                font-size: 12px;
                line-height: 1;
              }
            }

            /* Mobile: botón centrado + menú colapsable */
            .pill-btn--mobile {
              width: min(92vw, 480px);
              padding: 0.9rem 1.75rem;
            }
            .contact-menu--mobile {
              width: min(92vw, 480px);
              margin: 0 auto;
              display: flex;
              justify-content: center;
              gap: 0.75rem;
              overflow: hidden;
              max-height: 0;
              opacity: 0;
              pointer-events: none;
              transition:
                max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.25s ease,
                margin-top 0.2s ease;
            }
            .contact-menu--mobile.is-open {
              margin-top: 12px;
              max-height: 220px;
              opacity: 1;
              pointer-events: auto;
            }
            .contact-menu--mobile a {
              height: 52px;
              font-size: 15px;
              padding: 10px 16px;
              border-radius: 9999px;
              line-height: 1;
              display: flex;
              align-items: center;
            }

            /* ===== Tarjeta RS ===== */
            .socials-card.card {
              position: relative;
              width: 100%;
              height: 100%;
              border-radius: 1.6em;
              overflow: hidden;
              box-shadow: rgba(0, 0, 0, 0.45) 0 30px 70px;
              transition: transform 0.8s ease-in-out;
              user-select: none;
              border: 2px solid rgba(255, 255, 255, 0.2);
              backface-visibility: hidden;
              transform: translateZ(0);
            }
            .socials-card .background {
              position: absolute;
              inset: 0;
              background: linear-gradient(
                135deg,
                #1a0f0f 0%,
                #ff3b3b 45%,
                #ffd60a 100%
              );
            }
            .socials-card .logo {
              position: absolute;
              right: 50%;
              bottom: 50%;
              transform: translate(50%, 50%);
              transition: all 0.6s;
            }
            .socials-card .icon {
              display: inline-block;
              width: 2em;
              height: 2em;
            }
            .socials-card .svg {
              fill: rgba(255, 255, 255, 0.85);
              width: 100%;
              transition: all 0.5s;
            }
            .socials-card .box {
              position: absolute;
              padding: 1em;
              text-align: right;
              background: rgba(255, 255, 255, 0.35);
              border-top: 0.2em solid #fff;
              border-right: 0.1em solid #fff;
              border-radius: 10% 13% 42% 0% / 10% 12% 75% 0%;
              box-shadow: rgba(100, 100, 111, 0.36) -0.8em 0.8em 3em 0;
              transform-origin: bottom left;
              transition: all 1s;
            }
            .socials-card .box1 {
              width: 70%;
              height: 70%;
              bottom: -70%;
              left: -70%;
            }
            .socials-card .box2 {
              width: 50%;
              height: 50%;
              bottom: -50%;
              left: -50%;
              transition-delay: 0.15s;
            }
            .socials-card .box3 {
              width: 30%;
              height: 30%;
              bottom: -30%;
              left: -30%;
              transition-delay: 0.3s;
            }
            .socials-card .box:hover .svg {
              fill: #fff;
              filter: drop-shadow(0 0 0.5em #fff);
            }
            .socials-card.card:hover {
              transform: translateZ(0) scale(1.03);
            }
            .socials-card.card:hover .box {
              bottom: -0.1em;
              left: -0.1em;
            }
            .socials-card.card:hover .logo {
              transform: translate(0, 0);
              bottom: 2em;
              right: 2em;
            }
            @media (max-width: 640px) {
              .socials-card.card:hover {
                transform: translateZ(0) scale(1.02);
              }
            }

            /* Texto del “logo” de la tarjeta RS */
            .socials-card .logo-text {
              font-family: var(--font-saira, ui-sans-serif);
              font-weight: 800;
              font-size: clamp(20px, 5.5vw, 28px);
              letter-spacing: 0.08em;
              color: #fff;
              text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
              user-select: none;
              pointer-events: none;
              display: inline-block;
              white-space: nowrap;
            }
          `}</style>
        </div>
      </section>

      {/* CTA EVENTOS */}
      <section
        id="eventos"
        className="py-24 bg-gradient-to-b from-[#000000] to-[#ffd60a52] relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-[#000000] to-[#04001f] border-2 border-[#FFD60A]/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[var(--font-saira)]">
              ¿Organizas un Evento?
            </h3>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Cuento con más de 15 años de experiencia en el boxeo. Desde la
              logística hasta el arbitraje, aseguro eventos de primer nivel.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full" />
                <span className="text-sm">Organización completa</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full" />
                <span className="text-sm">Arbitraje profesional</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full" />
                <span className="text-sm">Coordinación de equipos</span>
              </div>
            </div>
            <Button
              asChild
              className="bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg px-8 py-6"
            >
              <Link href="/eventos/cotizar">Cotizar Evento</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Drawer de contacto */}
      <ContactDrawer
        open={contactOpen}
        onOpenChange={setContactOpen}
        defaultRole={selectedRole}
      />
    </div>
  );
}

/* ====== ICONOS DE MARCA (SVGs puros) ====== */
function GmailIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/icons/gmail.svg"
      alt=""
      width={20}
      height={20}
      className={`inline-block h-4 w-4 shrink-0 align-middle select-none.pointer-events-none ${className}`}
      loading="lazy"
    />
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/icons/whatsapp.svg"
      alt=""
      width={20}
      height={20}
      className={`inline-block h-4 w-4 shrink-0 align-middle select-none pointer-events-none ${className}`}
      loading="lazy"
    />
  );
}
