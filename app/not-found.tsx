// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center text-white">
      <div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-white/70 mb-6">Página no encontrada.</p>
        <Link href="/" className="text-[#FFD60A] underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
