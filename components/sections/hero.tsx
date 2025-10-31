"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Zap, 
  Bot, 
  ShoppingBag, 
  Phone,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Clientes Satisfechos', value: '500+', icon: Star },
  { label: 'Bots Activos', value: '1,200+', icon: Bot },
  { label: 'Ventas Generadas', value: '$2M+', icon: TrendingUp },
  { label: 'Llamadas IA', value: '50K+', icon: Phone },
];

const floatingIcons = [
  { icon: Bot, delay: 0, x: 100, y: -50 },
  { icon: ShoppingBag, delay: 0.5, x: -80, y: -30 },
  { icon: Phone, delay: 1, x: 120, y: 40 },
  { icon: Zap, delay: 1.5, x: -100, y: 60 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero dark:bg-gradient-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            x: [0, item.x, 0],
            y: [0, item.y, 0],
          }}
          transition={{ 
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute hidden lg:block"
          style={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 20}%`,
          }}
        >
          <div className="glass dark:glass-dark p-3 rounded-2xl">
            <item.icon className="w-8 h-8 text-primary-500" />
          </div>
        </motion.div>
      ))}

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm glass dark:glass-dark border-primary-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Tecnología de Vanguardia 2025
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Transformamos tu Negocio con{' '}
            <span className="gradient-text">
              <TypeAnimation
                sequence={[
                  'Chatbots IA',
                  2000,
                  'E-commerce',
                  2000,
                  'Llamadas IA',
                  2000,
                  'Automatización',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Integramos WhatsApp, Instagram, e-commerce y llamadas inteligentes con IA. 
            Soluciones full-stack que impulsan tu crecimiento y automatizan tu éxito.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
              <Zap className="w-5 h-5 mr-2" />
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 h-auto backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Ver Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="glass dark:glass-dark p-6 rounded-2xl text-center"
              >
                <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}