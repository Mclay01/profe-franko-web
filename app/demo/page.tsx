'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import { HeroRing } from '@/components/hero-ring';
import { RoleSelector } from '@/components/role-selector';
import { ContactDrawer } from '@/components/contact-drawer';
import { PartnerCard } from '@/components/partner-card';
import { Button } from '@/components/ui/button';
import { supabase, Partner } from '@/lib/supabase';
import { ArrowRight, Award, Users, Trophy } from 'lucide-react';
import Image from 'next/image';
import { AboutCollage } from '@/components/AboutCollage';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: partnersData } = await supabase
      .from('partners')
      .select('*')
      .order('featured', { ascending: false })
      .limit(4);

    if (partnersData) setPartners(partnersData);
  };

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* HERO (sin líneas y texto visible) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        <Image
          src="/img/hero-ring.jpg"
          alt="Ring de boxeo iluminado"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
        {/* <HeroRing /> */}

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

            <motion.p
              className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] text-lg md:text-xl mb-6 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Proyectar el boxeo a un nivel superior en Chile y masificarlo, creando oportunidades para nuevos talentos
              y organizando eventos de clase mundial que posicionen a nuestro país en el mapa del boxeo internacional.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#FFD60A] to-transparent" />
              <p className="text-base md:text-lg text-[#FFD60A] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                Organizador • Árbitro • Entrenador
              </p>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#FFD60A] to-transparent" />
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
                  onClick={() => setContactOpen(true)}
                >
                  Contáctame
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* NUEVA SECCIÓN: Próximo Evento */}
      <section id="proximo-evento" className="py-20 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,214,10,0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-[#FFD60A]/30 rounded-3xl p-8 md:p-12 text-center"
          >
            <p className="text-[#FFD60A] font-semibold tracking-wide mb-2">Próximo evento</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-[var(--font-saira)]">
              Noche de Boxeo – Santiago
            </h2>
            <p className="text-white/80 mb-6">
              Sábado 15 de Febrero, 20:00 hrs · Gimnasio Municipal · Av. Siempre Viva 123
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] hover:from-[#FFA500] hover:to-[#FFD60A] font-bold px-8 py-5"
              >
                <Link href="/entradas">Compra tus entradas</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#0A0A0A] font-bold px-8 py-5"
                onClick={() => setContactOpen(true)}
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
            {/* Título principal "Sobre Mí" - visible en todas las pantallas */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-[var(--font-saira)]">
              Sobre Mí
            </h2>

            {/* Layout Desktop */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
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
                  Con más de 15 años de experiencia en el mundo del boxeo, Franco Martínez se ha consolidado como uno
                  de los organizadores de eventos más respetados de Chile. Su trayectoria abarca múltiples roles:
                  peleador, árbitro certificado, entrenador y organizador de eventos de alto nivel.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Su misión es clara: elevar el boxeo chileno a estándares internacionales y masificar este noble
                  deporte en todo el país.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#FFD60A]/20 rounded-lg p-4 text-center">
                    <Trophy className="h-8 w-8 text-[#FFD60A] mx-auto mb-2" />
                    <p className="text-white font-semibold">Peleador</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#FFD60A]/20 rounded-lg p-4 text-center">
                    <Award className="h-8 w-8 text-[#FFD60A] mx-auto mb-2" />
                    <p className="text-white font-semibold">Árbitro</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#FFD60A]/20 rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 text-[#FFD60A] mx-auto mb-2" />
                    <p className="text-white font-semibold">Entrenador</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#FFD60A]/20 rounded-lg p-4 text-center">
                    <Trophy className="h-8 w-8 text-[#FFD60A] mx-auto mb-2" />
                    <p className="text-white font-semibold">Organizador</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => setContactOpen(true)}
                    size="lg"
                    className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg"
                  >
                    Hablemos de tu Proyecto
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Layout Mobile - ORDEN: Subtítulo → Imágenes → Texto → Video → Botón */}
            <div className="lg:hidden space-y-6">
              {/* 1. Subtítulo amarillo */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold text-[#FFD60A] font-[var(--font-saira)]"
              >
                Profe Franko: Apasionado del Boxeo
              </motion.h3>

              {/* 2. Imágenes horizontales */}
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

              {/* 3. Texto descriptivo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-base text-white/90 leading-relaxed">
                  Con más de 15 años de experiencia en el mundo del boxeo, Franco Martínez se ha consolidado como uno
                  de los organizadores de eventos más respetados de Chile. Su trayectoria abarca múltiples roles:
                  peleador, árbitro certificado, entrenador y organizador de eventos de alto nivel.
                </p>
                <p className="text-base text-white/90 leading-relaxed">
                  Su misión es clara: elevar el boxeo chileno a estándares internacionales y masificar este noble
                  deporte en todo el país.
                </p>
              </motion.div>

              {/* 4. Video grande (reels) antes del botón */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFD60A]/30 to-transparent p-[2px]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#1A1A1A] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFD60A]/10 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[14px] border-l-[#FFD60A] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </motion.div>

              {/* 5. Botón CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={() => setContactOpen(true)}
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

      {/* PARTNERS (se mantiene) */}
      <section id="partners" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,214,10,0.06),transparent_60%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Users className="h-16 w-16 text-[#FFD60A]" />
                <div className="absolute inset-0 bg-[#FFD60A]/20 blur-2xl"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[var(--font-saira)]">
              Clubes & Federaciones
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
              Trabajando con las organizaciones más importantes del boxeo chileno para desarrollar el deporte a nivel nacional
            </p>
            <p className="text-white/50 text-base max-w-2xl mx-auto mb-8">
              Colaboraciones estratégicas que fortalecen el ecosistema del boxeo profesional y amateur en todo el país
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-8">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SOLO la tarjeta "¿Organizas un Evento?" */}
      <section id="eventos" className="py-24 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-[#FFD60A]/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[var(--font-saira)]">
              ¿Organizas un Evento?
            </h3>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Cuento con más de 15 años de experiencia organizando eventos de boxeo profesional.
              Desde la logística hasta el arbitraje, aseguro eventos de primer nivel.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                <span className="text-sm">Organización completa</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                <span className="text-sm">Arbitraje profesional</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                <span className="text-sm">Coordinación de equipos</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setSelectedRole('Organizador de Eventos');
                setContactOpen(true);
              }}
              className="bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg px-8 py-6"
            >
              Cotizar Evento
            </Button>
          </motion.div>
        </div>
      </section>

      <RoleSelector onSelectRole={handleSelectRole} />

      <ContactDrawer
        open={contactOpen}
        onOpenChange={setContactOpen}
        defaultRole={selectedRole}
      />
    </div>
  );
}
