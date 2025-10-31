'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Trophy } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/#sobre-mi', label: 'Sobre Mí' },
    { href: '/#partners', label: 'Clubes & Federaciones' },
    { href: '/#eventos', label: 'Eventos' },
    // 👉 WordPress store (fuera de Next)
    { href: '/tienda/', label: 'Tienda Olymphus', wp: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FFD60A]/20 bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" prefetch={false}>
            <Trophy className="h-8 w-8 text-[#FFD60A]" />
            <span className="text-xl font-bold text-white">Boxing Chile</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) =>
              link.wp ? (
                // Para WordPress uso Link igual, pero sin prefetch
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-[#FFD60A]"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-[#FFD60A]"
                >
                  {link.label}
                </Link>
              )
            )}
            <Button
              asChild
              size="sm"
              className="bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-semibold"
            >
              <Link href="/#contacto">Contáctame</Link>
            </Button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-[#FFD60A]/20">
            {links.map((link) =>
              link.wp ? (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="block text-sm font-medium text-white/80 hover:text-[#FFD60A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-white/80 hover:text-[#FFD60A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Button
              asChild
              className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/#contacto">Contáctame</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
