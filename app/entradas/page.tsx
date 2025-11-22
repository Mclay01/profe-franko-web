import Link from 'next/link';
import { ArrowLeft, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EntradasPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      {/* Glow de fondo */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,10,0.18),transparent_55%)]" />

      <main className="relative z-10 w-full max-w-xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD60A]/30 bg-[#111111]/80 px-4 py-1 mb-6">
          <Ticket className="w-4 h-4 text-[#FFD60A]" />
          <span className="text-xs font-medium text-[#FFD60A] tracking-wide uppercase">
            Compra tus entradas
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-[var(--font-saira)] tracking-tight">
          PRÓXIMAMENTE
        </h1>

        <p className="text-sm md:text-base text-white/70 max-w-md mx-auto mb-8">
          Estamos preparando todo para que puedas comprar tus entradas en línea
          de forma rápida y segura. Vuelve pronto para no quedarte fuera de la próxima noche de boxeo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-transparent text-[#FFD60A] border-2 border-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#0A0A0A] font-bold px-8 py-4"
          >
            <Link href="/">
              ← Volver al inicio
            </Link>
          </Button>

          <Button
            disabled
            className="bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] font-semibold px-6 opacity-60 cursor-not-allowed"
          >
            Venta de entradas no disponible
          </Button>
        </div>

        <p className="mt-6 text-[11px] text-white/40">
          ¿Quieres organizar tu propio evento?{' '}
          <Link
            href="/eventos/cotizar"
            className="text-[#FFD60A] hover:underline"
          >
            Cotiza aquí
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
