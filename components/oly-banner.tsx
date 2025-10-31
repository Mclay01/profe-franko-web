'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingBag, Award, Shield, Shirt, Watch, Dumbbell, Package } from 'lucide-react';

export function OlyBanner() {
  const categories = [
    {
      name: 'Guantes',
      icon: '🥊',
      description: 'Profesionales y de entrenamiento',
      items: '15+ productos',
    },
    {
      name: 'Protecciones',
      icon: '🛡️',
      description: 'Cascos, bucales y más',
      items: '20+ productos',
    },
    {
      name: 'Indumentaria',
      icon: '👕',
      description: 'Shorts, camisetas y calzado',
      items: '25+ productos',
    },
    {
      name: 'Equipamiento',
      icon: '⏱️',
      description: 'Cronómetros y accesorios',
      items: '10+ productos',
    },
    {
      name: 'Entrenamiento',
      icon: '🏋️',
      description: 'Sacos, peras y targets',
      items: '18+ productos',
    },
    {
      name: 'Suplementos',
      icon: '📦',
      description: 'Nutrición deportiva',
      items: '12+ productos',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFD60A] via-[#FFA500] to-[#FF8C00] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiMwQTBBMEEiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Award className="h-20 w-20 text-[#0A0A0A]" />
              <div className="absolute -inset-2 bg-[#0A0A0A]/10 rounded-full blur-xl"></div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0A0A0A] mb-4 font-[var(--font-saira)]">
            Olymphus
          </h2>
          <p className="text-2xl md:text-3xl text-[#0A0A0A] font-bold mb-4">
            Patrocinador Oficial
          </p>
          <p className="text-lg md:text-xl text-[#0A0A0A]/90 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Gracias a su apoyo constante, contamos con el catálogo completo de productos de Olymphus.
            Equipamiento profesional de alta calidad para peleadores, entrenadores y clubes de toda Chile.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#0A0A0A] rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-[#0A0A0A] hover:border-[#0A0A0A]/80">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-[#FFD60A] mb-2 font-[var(--font-saira)]">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 mb-2">{category.description}</p>
                <p className="text-xs text-[#FFD60A]/80 font-semibold">{category.items}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#0A0A0A] text-[#FFD60A] hover:bg-[#0A0A0A]/90 font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-[#0A0A0A]/50 transition-all"
          >
            <Link href="/tienda" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Explorar catálogo completo
            </Link>
          </Button>
          <p className="text-[#0A0A0A]/70 text-sm mt-4 font-medium">
            Más de 100 productos profesionales disponibles
          </p>
        </motion.div>
      </div>
    </section>
  );
}
