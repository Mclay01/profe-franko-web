'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Award, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutCollage } from '@/components/AboutCollage'; // ajusta si tu ruta es otra

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Volver al inicio */}
          <div className="mb-8">
            <Link
              href="/"
              className="text-xs text-white/60 hover:text-[#FFD60A] transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>

          {/* SOBRE MÍ */}
          <section id="sobre-mi" className="py-0">
            <div className="container mx-auto px-0">
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

                  {/* Nombre */}
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
                      <Link href="/contacto">
                        <Button
                          size="lg"
                          className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg"
                        >
                          Hablemos de tu Proyecto
                        </Button>
                      </Link>
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
                    <Link href="/contacto">
                      <Button
                        size="lg"
                        className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-bold text-lg"
                      >
                        Hablemos de tu Proyecto
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
