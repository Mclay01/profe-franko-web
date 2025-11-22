'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Award, CheckCircle2, Package, Shield, Zap } from 'lucide-react';

export type OlyProduct = {
  id: string;
  title: string;
  price?: string;
  image: string;
  href?: string;
};

const demoProducts: OlyProduct[] = [
  {
    id: '1',
    title: 'Guantes Profesionales Pro',
    price: '$89.990',
    image: 'https://images.pexels.com/photos/4753928/pexels-photo-4753928.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/tienda',
  },
  {
    id: '2',
    title: 'Casco Protección Elite',
    price: '$64.990',
    image: 'https://images.pexels.com/photos/7991319/pexels-photo-7991319.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/tienda',
  },
  {
    id: '3',
    title: 'Saco de Entrenamiento Heavy',
    price: '$129.990',
    image: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/tienda',
  },
  {
    id: '4',
    title: 'Vendas de Mano Premium',
    price: '$12.990',
    image: 'https://images.pexels.com/photos/7991257/pexels-photo-7991257.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/tienda',
  },
  {
    id: '5',
    title: 'Short de Combate',
    price: '$34.990',
    image: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/tienda',
  },
];

interface OlymphusSectionProps {
  catalogUrl?: string;
  products?: OlyProduct[];
  className?: string;
}

export default function OlymphusSection({
  catalogUrl = '/tienda',
  products = demoProducts,
  className = '',
}: OlymphusSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const features = [
    { icon: CheckCircle2, text: 'Calidad profesional certificada' },
    { icon: Package, text: 'Catálogo completo disponible' },
    { icon: Shield, text: 'Garantía extendida' },
    { icon: Zap, text: 'Entrega en todo Chile' },
  ];

  return (
    <section
      ref={sectionRef}
      id="olymphus-section"
      aria-labelledby="oly-title"
      className={`relative isolate overflow-hidden bg-[#0A0A0A] py-20 md:py-28 lg:py-32 ${className}`}
    >
      {/* Radiales */}
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[35rem] w-[35rem] bg-[radial-gradient(circle,rgba(255,214,10,0.28),transparent_60%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-1/4 top-1/3 h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(217,4,41,0.24),transparent_60%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]"
        aria-hidden="true"
      />

      {/* Base diagonal */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-zinc-950/40 to-black/60"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dos columnas */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Izquierda: texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 backdrop-blur-sm">
              <Award className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-wide text-yellow-400">
                Patrocinador Oficial
              </span>
            </div>

            <h2
              id="oly-title"
              className="mb-4 font-[var(--font-saira)] text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
            >
              Olymphus
            </h2>

            <p className="mb-6 text-xl font-medium text-zinc-300 md:text-2xl">
              Equipamiento profesional para boxeo
            </p>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Gracias a su apoyo constante, contamos con el catálogo completo de productos Olymphus.
              Equipamiento de alta calidad diseñado para peleadores, entrenadores y clubes profesionales.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 backdrop-blur-sm"
                >
                  <feature.icon className="h-4 w-4 shrink-0 text-yellow-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-zinc-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href={catalogUrl}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black shadow-[0_8px_24px_-8px_rgba(255,214,10,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(255,214,10,0.7)] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black active:translate-y-0"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                Ver catálogo completo
              </Link>
            </motion.div>
          </motion.div>

          {/* Derecha: tarjeta visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 shadow-2xl md:p-8">
              <div className="absolute left-0 right-0 top-12 space-y-4" aria-hidden="true">
                <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
                <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              </div>

              <div className="relative z-10 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/20 ring-2 ring-yellow-400/40">
                    <Award className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Partner oficial
                    </p>
                    <p className="font-bold text-white">Olymphus</p>
                  </div>
                </div>

                <Link
                  href={catalogUrl}
                  className="rounded-lg bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-yellow-400 backdrop-blur-sm transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  aria-label="Ver catálogo de Olymphus"
                >
                  Ver catálogo
                </Link>
              </div>

              <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,214,10,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(217,4,41,0.12),transparent_50%)]" />

                <div className="flex h-full items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse bg-yellow-400/20 blur-2xl" />
                    <Award className="relative h-24 w-24 text-yellow-400/80 md:h-32 md:w-32" aria-hidden="true" />
                  </div>
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  Pro
                </div>
              </div>

              <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                <div className="rounded-lg bg-zinc-800/60 px-3 py-2 backdrop-blur-sm">
                  <p className="text-xs text-zinc-500">Productos</p>
                  <p className="font-bold text-white">100+</p>
                </div>
                <div className="rounded-lg bg-zinc-800/60 px-3 py-2 backdrop-blur-sm">
                  <p className="text-xs text-zinc-500">Categorías</p>
                  <p className="font-bold text-white">6</p>
                </div>
                <div className="rounded-lg bg-zinc-800/60 px-3 py-2 backdrop-blur-sm">
                  <p className="text-xs text-zinc-500">Garantía</p>
                  <p className="font-bold text-yellow-400">Extendida</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carrusel de productos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 lg:mt-20"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white md:text-3xl">Productos destacados</h3>
            <Link
              href={catalogUrl}
              className="text-sm font-semibold text-yellow-400 transition-colors hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            >
              Ver todos →
            </Link>
          </div>

          <div
            role="region"
            aria-label="Vitrina de productos Olymphus"
            className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 [scroll-snap-type:x_mandatory] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar]:h-2"
          >
            {products.map((product, idx) => (
              <Link
                key={product.id}
                href={product.href || catalogUrl}
                className="group relative min-w-[85vw] max-w-[85vw] shrink-0 scroll-snap-center sm:min-w-[280px] sm:max-w-[280px] md:min-w-[240px] md:max-w-[240px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:shadow-xl focus-within:ring-2 focus-within:ring-yellow-400/50"
                >
                  {/* Image (Next.js) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 85vw, 280px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      Pro
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 min-h-[2.5rem] font-semibold text-white group-hover:text-yellow-400">
                      {product.title}
                    </h4>
                    {product.price && (
                      <p className="text-lg font-bold text-yellow-400">{product.price}</p>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
