import Link from 'next/link';
import { Code, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const services = [
    { name: 'Desarrollo Web', href: '/servicios#webdev' },
    { name: 'E-commerce', href: '/servicios#ecommerce' },
    { name: 'Chatbots IA', href: '/servicios#chatbots' },
    { name: 'Llamadas IA', href: '/servicios#llamadas' },
  ];

  const company = [
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Casos de Éxito', href: '/casos-exito' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carreras', href: '/carreras' },
  ];

  const legal = [
    { name: 'Términos de Servicio', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DigitalFlow</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transformamos ideas en soluciones digitales completas. Desarrollo web, 
              e-commerce, IA y automatización para impulsar tu negocio.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hola@digitalflow.es</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 DigitalFlow. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}