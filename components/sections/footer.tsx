"use client";

import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const footerSections = [
  {
    title: 'Servicios',
    links: [
      { name: 'Chatbot IA', href: '#chatbot' },
      { name: 'E-commerce', href: '#ecommerce' },
      { name: 'Llamadas IA', href: '#calls' },
      { name: 'Analytics', href: '#analytics' },
    ]
  },
  {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nosotros', href: '#about' },
      { name: 'Casos de Éxito', href: '#cases' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contacto', href: '#contact' },
    ]
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Documentación', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Centro de Ayuda', href: '#help' },
      { name: 'Estado del Servicio', href: '#status' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Términos de Uso', href: '#terms' },
      { name: 'Política de Privacidad', href: '#privacy' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
    ]
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
];

export default function Footer() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) 
        ? prev.filter(section => section !== title)
        : [...prev, title]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container-custom">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Mantente <span className="gradient-text">Actualizado</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Recibe las últimas novedades sobre IA, e-commerce y automatización directamente en tu email.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-2xl"
                required
              />
              <Button type="submit" className="btn-primary whitespace-nowrap">
                Suscribirse
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </motion.div>

        <Separator />

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold gradient-text">Digital Agency Pro</h3>
                  <p className="text-sm text-muted-foreground">Soluciones IA & Tech</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Transformamos negocios con tecnología de vanguardia. Especializados en chatbots IA, 
                e-commerce y automatización inteligente para impulsar tu crecimiento.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary-500" />
                  <span>hello@digitalagencypro.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-8">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-2xl hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    asChild
                  >
                    <a href={social.href} aria-label={social.name}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Links Sections - Desktop */}
            <div className="lg:col-span-8 hidden md:block">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a 
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary-500 transition-colors"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Links Sections - Mobile (Collapsible) */}
            <div className="lg:col-span-8 md:hidden">
              <div className="space-y-4">
                {footerSections.map((section) => (
                  <Collapsible
                    key={section.title}
                    open={openSections.includes(section.title)}
                    onOpenChange={() => toggleSection(section.title)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 font-semibold text-left">
                      {section.title}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          openSections.includes(section.title) ? 'rotate-180' : ''
                        }`} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pb-4">
                      <ul className="space-y-3 pl-4">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <a 
                              href={link.href}
                              className="text-sm text-muted-foreground hover:text-primary-500 transition-colors block py-1"
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <div className="mb-4 md:mb-0">
            © 2025 Digital Agency Pro. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <span>Hecho con ❤️ para el futuro digital</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}