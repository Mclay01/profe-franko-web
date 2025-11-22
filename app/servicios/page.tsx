import { Code, ShoppingCart, Bot, Phone, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServiciosPage() {
  const services = [
    {
      id: 'webdev',
      icon: Code,
      title: 'Desarrollo Web Full-Stack',
      subtitle: 'Next.js + React + Tailwind CSS',
      description: 'Aplicaciones web modernas, rápidas y escalables que impulsan tu negocio digital.',
      price: 'Desde €2,500',
      duration: '4-8 semanas',
      features: [
        'Diseño responsive y móvil-first',
        'SEO optimizado y accesibilidad',
        'Performance 100/100 en Google PageSpeed',
        'Integración con APIs y servicios',
        'Panel de administración incluido',
        'Hosting y dominio por 1 año',
        'SSL y seguridad avanzada',
        'Soporte técnico 24/7'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      color: 'blue'
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce Avanzado',
      subtitle: 'Stripe + Analytics + Gestión',
      description: 'Tiendas online completas con sistema de pago seguro y gestión avanzada de inventario.',
      price: 'Desde €4,500',
      duration: '6-12 semanas',
      features: [
        'Integración completa con Stripe',
        'Gestión de inventario automática',
        'Sistema de cupones y descuentos',
        'Analytics y reportes avanzados',
        'Múltiples métodos de pago',
        'Soporte multi-moneda',
        'Panel de administración completo',
        'Integración con envíos'
      ],
      technologies: ['Next.js', 'Stripe', 'Supabase', 'Analytics', 'API Shipping'],
      color: 'green',
      featured: true
    },
    {
      id: 'chatbots',
      icon: Bot,
      title: 'Chatbots IA Entrenables',
      subtitle: 'OpenAI + PDF Training',
      description: 'Bots inteligentes entrenados con tus documentos que atienden clientes 24/7.',
      price: 'Desde €1,800',
      duration: '2-4 semanas',
      features: [
        'Entrenamiento con PDFs personalizados',
        'Integración con OpenAI GPT-4',
        'Soporte para múltiples idiomas',
        'Widget embebible en tu web',
        'API REST para integraciones',
        'Analytics de conversaciones',
        'Actualizaciones de entrenamiento',
        'Escalabilidad automática'
      ],
      technologies: ['OpenAI API', 'Python', 'Vector DB', 'REST API', 'Widget JS'],
      color: 'purple'
    },
    {
      id: 'llamadas',
      icon: Phone,
      title: 'Automatización de Llamadas',
      subtitle: 'Twilio + OpenAI + IVR',
      description: 'Sistema IVR inteligente y automatización de llamadas con voz natural.',
      price: 'Desde €3,200',
      duration: '4-6 semanas',
      features: [
        'IVR con reconocimiento de voz',
        'Voz natural con síntesis avanzada',
        'Análisis de sentimientos en tiempo real',
        'Grabación y transcripción automática',
        'Integración con CRM',
        'Reportes y analytics detallados',
        'Escalado automático de llamadas',
        'Compliance y regulaciones'
      ],
      technologies: ['Twilio API', 'OpenAI Whisper', 'TTS', 'Python', 'CRM Integration'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          badge: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'bg-green-100 text-green-600',
          badge: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'bg-purple-100 text-purple-600',
          badge: 'bg-purple-100 text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'bg-orange-100 text-orange-600',
          badge: 'bg-orange-100 text-orange-800',
          button: 'bg-orange-600 hover:bg-orange-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          badge: 'bg-gray-100 text-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>Servicios Premium</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Nuestros
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Servicios
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones tecnológicas completas para transformar tu negocio. 
              Desarrollo web, e-commerce, IA y automatización de última generación.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    {service.featured && (
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Star className="w-4 h-4" />
                        <span>Más Popular</span>
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${colors.icon}`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">{service.subtitle}</p>
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    
                    <div className="flex items-center space-x-6 mb-6">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                        <div className="text-sm text-gray-600">Precio inicial</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{service.duration}</div>
                        <div className="text-sm text-gray-600">Tiempo estimado</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/contacto?servicio=${service.id}`}>
                      <Button size="lg" className={`${colors.button} text-white`}>
                        Solicitar Cotización
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Features */}
                  <div className={`${colors.bg} ${colors.border} border rounded-2xl p-8 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Qué incluye este servicio:
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-gray-600">
              Metodología probada para garantizar el éxito de cada proyecto
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Análisis y Consultoría',
                description: 'Entendemos tu negocio, objetivos y requerimientos específicos para diseñar la solución perfecta.'
              },
              {
                step: '02',
                title: 'Diseño y Prototipado',
                description: 'Creamos wireframes, mockups y prototipos interactivos para validar la experiencia de usuario.'
              },
              {
                step: '03',
                title: 'Desarrollo y Testing',
                description: 'Codificamos con las mejores prácticas, realizamos testing exhaustivo y optimizamos el rendimiento.'
              },
              {
                step: '04',
                title: 'Deploy y Soporte',
                description: 'Lanzamos tu proyecto, configuramos el monitoreo y brindamos soporte continuo 24/7.'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 z-0"></div>
                  )}
                  <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                    {phase.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{phase.title}</h3>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contáctanos para una consulta gratuita y descubre cómo podemos 
            ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Solicitar Consulta Gratuita
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}