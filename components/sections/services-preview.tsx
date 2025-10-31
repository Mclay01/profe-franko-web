import { Code, ShoppingCart, Bot, Phone, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ServicesPreview() {
  const services = [
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas con Next.js, React y Tailwind CSS',
      features: ['Responsive Design', 'SEO Optimizado', 'Performance 100/100'],
      price: 'Desde €2,500',
      color: 'blue',
      featured: false
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Tiendas online completas con Stripe y gestión avanzada',
      features: ['Pagos Seguros', 'Multi-moneda', 'Analytics Avanzado'],
      price: 'Desde €4,500',
      color: 'green',
      featured: true
    },
    {
      icon: Bot,
      title: 'Chatbots IA',
      description: 'Bots inteligentes entrenados con OpenAI y tus documentos',
      features: ['Entrenamiento PDF', 'Multi-idioma', 'API Integration'],
      price: 'Desde €1,800',
      color: 'purple',
      featured: false
    },
    {
      icon: Phone,
      title: 'Llamadas IA',
      description: 'IVR automático y llamadas inteligentes con Twilio',
      features: ['Voz Natural', 'Reconocimiento', 'Análisis Sentimientos'],
      price: 'Desde €3,200',
      color: 'orange',
      featured: false
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          icon: 'bg-blue-100 text-blue-600',
          button: 'border-blue-200 hover:bg-blue-50 text-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-green-50 hover:bg-green-100',
          icon: 'bg-green-100 text-green-600',
          button: 'border-green-200 hover:bg-green-50 text-green-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 hover:bg-purple-100',
          icon: 'bg-purple-100 text-purple-600',
          button: 'border-purple-200 hover:bg-purple-50 text-purple-600'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50 hover:bg-orange-100',
          icon: 'bg-orange-100 text-orange-600',
          button: 'border-orange-200 hover:bg-orange-50 text-orange-600'
        };
      default:
        return {
          bg: 'bg-gray-50 hover:bg-gray-100',
          icon: 'bg-gray-100 text-gray-600',
          button: 'border-gray-200 hover:bg-gray-50 text-gray-600'
        };
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nuestros
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Servicios
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones tecnológicas completas para transformar tu negocio. 
            Desde desarrollo web hasta automatización con IA.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <div 
                key={index}
                className={`relative bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${colors.bg}`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Más Popular
                    </div>
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colors.icon}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">{service.price}</div>
                  <Button variant="outline" size="sm" className={colors.button}>
                    Ver Más
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Overview */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Proceso de Trabajo
            </h3>
            <p className="text-gray-600">
              Metodología probada para garantizar el éxito de tu proyecto
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Análisis', desc: 'Entendemos tus necesidades y objetivos' },
              { step: '02', title: 'Diseño', desc: 'Creamos wireframes y prototipos' },
              { step: '03', title: 'Desarrollo', desc: 'Codificamos con las mejores prácticas' },
              { step: '04', title: 'Deploy', desc: 'Lanzamos y monitoreamos tu proyecto' }
            ].map((phase, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0"></div>
                )}
                <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{phase.title}</h4>
                <p className="text-gray-600 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/servicios">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}