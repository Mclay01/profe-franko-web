// app/tienda/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      {/* Glow de fondo */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.15),transparent_55%)]" />

      <main className="relative z-10 w-full max-w-xl text-center">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-[#111111]/80 px-4 py-1 mb-6">
          <Image
            src="/img/olymphus-icon.png"
            alt="Olymphus"
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded-sm object-contain"
          />
          <span className="text-xs font-medium text-cyan-300 tracking-wide uppercase">
            Tienda Olymphus · Próximamente
          </span>
        </div>

        {/* Logo + nombre */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="flex items-center justify-center rounded-full bg-black/60 border border-cyan-400/40 p-3">
            <Image
              src="/img/olymphus-icon.png"
              alt="Logo Olymphus"
              width={64}
              height={64}
              className="h-16 w-16 rounded-md object-contain"
            />
          </div>
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-cyan-300">
            OLYMPHUS
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 font-[var(--font-saira)] tracking-tight">
          TIENDA PRONTO
        </h1>

        <p className="text-sm md:text-base text-white/70 max-w-md mx-auto mb-8">
          Muy pronto podrás encontrar equipamiento, indumentaria y accesorios
          seleccionados por el Profe. Estamos afinando los últimos detalles
          para abrir la tienda Olymphus.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-transparent text-[#FFD60A] border-2 border-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#0A0A0A] font-bold px-8 py-4"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>

          <Button
            disabled
            className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-[#0A0A0A] font-semibold px-6 opacity-70 cursor-not-allowed"
          >
            Tienda no disponible todavía
          </Button>
        </div>

        <p className="mt-6 text-[11px] text-white/40">
          ¿Quieres entrenar o organizar un evento antes de que abra la tienda?{' '}
          <Link
            href="/#quien-eres"
            className="text-[#FFD60A] hover:underline"
          >
            Contáctame aquí
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
