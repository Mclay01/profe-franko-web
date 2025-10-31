"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles,
  ShoppingCart,
  MessageSquare,
  Phone,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const services = [
  {
    title: "Chatbot IA",
    description: "WhatsApp & Instagram integrado",
    icon: MessageSquare,
    href: "#chatbot"
  },
  {
    title: "E-commerce",
    description: "Tiendas online profesionales",
    icon: ShoppingCart,
    href: "#ecommerce"
  },
  {
    title: "Llamadas IA",
    description: "IVR inteligente con Twilio",
    icon: Phone,
    href: "#calls"
  },
  {
    title: "Analytics",
    description: "Dashboard y métricas",
    icon: BarChart3,
    href: "#analytics"
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-soft border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold gradient-text">
                Digital Agency Pro
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Soluciones IA & Tech
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50">
                  Servicios
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {services.map((service) => (
                      <NavigationMenuLink
                        key={service.title}
                        href={service.href}
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-5 h-5 text-primary-500 group-hover:text-accent-500 transition-colors" />
                          <div>
                            <div className="text-sm font-medium leading-none">
                              {service.title}
                            </div>
                            <p className="text-xs leading-snug text-muted-foreground mt-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink href="#cases" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Casos de Éxito
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink href="#pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Precios
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink href="#blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-2xl"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? 
                  <Moon className="w-4 h-4" /> : 
                  <Sun className="w-4 h-4" />
                }
              </motion.div>
            </Button>

            {/* CTA Button */}
            <Button className="hidden sm:inline-flex btn-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Comenzar
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9 rounded-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? 
                    <X className="w-4 h-4" /> : 
                    <Menu className="w-4 h-4" />
                  }
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="container-custom py-6">
              <nav className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground px-3">
                    Servicios
                  </h3>
                  <div className="grid gap-2">
                    {services.map((service) => (
                      <a
                        key={service.title}
                        href={service.href}
                        className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-muted transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <service.icon className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {service.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid gap-2">
                    <a href="#cases" className="block px-3 py-2 rounded-2xl hover:bg-muted transition-colors font-medium">
                      Casos de Éxito
                    </a>
                    <a href="#pricing" className="block px-3 py-2 rounded-2xl hover:bg-muted transition-colors font-medium">
                      Precios
                    </a>
                    <a href="#blog" className="block px-3 py-2 rounded-2xl hover:bg-muted transition-colors font-medium">
                      Blog
                    </a>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button className="w-full btn-primary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Comenzar Ahora
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}