'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  const links: Array<{ href: string; label: string; comingSoon?: boolean }> = [
    { href: '/sobre-mi', label: 'Sobre Mí' },
    { href: '/eventos/cotizar', label: 'Tu Evento' },
    { href: '/tienda', label: 'Tienda Pronto', comingSoon: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FFD60A]/20 bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + marca */}
          <Link
            href="/"
            className="flex items-center gap-3"
            prefetch={false}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/img/logo-profefranko.png"
              alt="Logo Profe Franko"
              width={40}
              height={40}
              priority
              sizes="40px"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="text-xl font-bold text-white">Profe Franko</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((l) =>
              l.comingSoon ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-[#FFD60A] transition-colors"
                >
                  <Image
                    src="/img/olymphus-icon.png"
                    alt="Olymphus"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-sm object-contain"
                  />
                  <span>{l.label}</span>
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-[#FFD60A]"
                >
                  {l.label}
                </Link>
              )
            )}

            <Button
              asChild
              size="sm"
              className="bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-semibold"
            >
              <Link href="/contacto">Contáctame</Link>
            </Button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {open && (
          <nav
            className="
              md:hidden py-4 space-y-3
              border-t border-[#FFD60A]/20
              bg-[#0A0A0A]
              -mx-4 px-4
              shadow-[0_10px_40px_rgba(0,0,0,0.6)]
              backdrop-blur-0
              supports-[backdrop-filter]:bg-[#0A0A0A]
            "
          >
            {links.map((l) =>
              l.comingSoon ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-[#FFD60A] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/img/olymphus-icon.png"
                    alt="Olymphus"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-sm object-contain"
                  />
                  <span>{l.label}</span>
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm font-medium text-white/80 hover:text-[#FFD60A] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            )}

            <Button
              asChild
              className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-semibold"
              onClick={() => setOpen(false)}
            >
              <Link href="/contacto">Contáctame</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
