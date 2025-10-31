"use client";

import { motion } from 'framer-motion';
import { 
  Bot, 
  ShoppingCart, 
  Phone, 
  BarChart3, 
  MessageSquare, 
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    icon: Bot,
    title: 'Chatbot IA Avanzado',
    description: 'Chatbots inteligentes entrenados con tus documentos y conectados a WhatsApp e Instagram.',
    features: ['Entrenamiento con PDF', 'WhatsApp Business API', 'Instagram Direct', 'Respuestas 24/7'],
    price: 'Desde $297/mes',
    color: 'from-primary-500 to-blue-500',
    badge: 'Más Popular'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Profesional',
    description: 'Tiendas online completas con carrito animado, pagos Stripe y gestión avanzada.',
    features: ['Diseño Responsive', 'Pagos Stripe', 'Inventario Automático', 'Analytics Avanzados'],
    price: 'Desde $497/mes',
    color: 'from-accent-500 to-red-500',
    badge: 'Premium'
  },
  {
    icon: Phone,
    title: 'Llamadas IA Inteligentes',
    description: 'Sistema IVR con IA que maneja llamadas automáticamente usando Twilio y OpenAI.',
    features: ['IVR Inteligente', 'Twilio Integration', 'Logs Detallados', 'Múltiples Idiomas'],
    price: 'Desde $197/mes',
    color: 'from-green-500 to-primary-500',
    badge: 'Nuevo'
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description: 'Panel de control completo con métricas en tiempo real y reportes detallados.',
    features: ['Métricas en Tiempo Real', 'Reportes Automáticos', 'Gráficos Interactivos', 'Exportar Datos'],
    price: 'Incluido',
    color: 'from-purple-500 to-primary-500',
    badge: 'Gratis'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Soluciones <span className="gradient-text">Integrales</span> para tu Negocio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Combinamos inteligencia artificial, e-commerce y automatización para crear 
            experiencias digitales que impulsan el crecimiento de tu empresa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-3xl bg-card border border-border p-8 card-hover ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-6 right-6">
                  <Badge 
                    variant={service.badge === 'Más Popular' ? 'default' : 'secondary'}
                    className={service.badge === 'Más Popular' ? 'bg-primary-500 text-white' : ''}
                  >
                    {service.badge}
                  </Badge>
                </div>
              )}

              {/* Icon with gradient */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary-500">
                      {service.price}
                    </span>
                  </div>
                  <Button className="btn-primary group-hover:shadow-glow">
                    Más Info
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass dark:glass-dark p-8 rounded-3xl max-w-2xl mx-auto">
            <MessageSquare className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">¿Necesitas algo personalizado?</h3>
            <p className="text-muted-foreground mb-6">
              Creamos soluciones a medida que se adaptan perfectamente a las necesidades específicas de tu negocio.
            </p>
            <Button size="lg" className="btn-secondary">
              <Zap className="w-5 h-5 mr-2" />
              Consulta Personalizada
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}