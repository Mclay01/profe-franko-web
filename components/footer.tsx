import Link from 'next/link';
import { Trophy, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#FFD60A]/20 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-[#FFD60A]" />
              <span className="text-lg font-bold">Profe Franko</span>
            </div>
            <p className="text-sm text-white/70">
              Organizador profesional de eventos de boxeo. Elevando el deporte en Chile.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/frankoesteban_/" className="text-white/70 hover:text-[#FFD60A] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#FFD60A] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#FFD60A] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#FFD60A] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#FFD60A] mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#vision" className="text-white/70 hover:text-white transition-colors">
                  Visión
                </Link>
              </li>
              <li>
                <Link href="/sobre-mi" className="text-white/70 hover:text-white transition-colors">
                  Perfil
                </Link>
              </li>
              <li>
                <Link href="/eventos/cotizar" className="text-white/70 hover:text-white transition-colors">
                  Tu Evento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#FFD60A] mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tienda" className="text-white/70 hover:text-white transition-colors">
                  Olymphus
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#FFD60A] mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacidad" className="text-white/70 hover:text-white transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/terminos" className="text-white/70 hover:text-white transition-colors">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#FFD60A]/20 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Profe Franko. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;