import { CheckCircle, X, Star, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PreciosPage() {
  const plans = [
    {
      name: 'Starter',
      price: '2,500',
      period: 'proyecto',
      description: 'Perfecto para pequeños negocios que necesitan presencia web',
      features: [
        'Diseño web responsive',
        'Hasta 5 páginas',
        'SEO básico incluido',
        'Formulario de contacto',
        'SSL y hosting 1 año',
        'Soporte por email',
        'Tiempo de entrega: 2-3 semanas'
      ],
      notIncluded: [
        'E-commerce',
        'Chatbot IA',
        'Llamadas automatizadas',
        'Analytics avanzado'
      ],
      color: 'gray',
      popular: false
    },
    {
      name: 'Professional',
      price: '5,500',
      period: 'proyecto',
      description: 'La solución completa para empresas en crecimiento',
      features: [
        'Todo lo del plan Starter',
        'E-commerce completo',
        'Hasta 50 productos',
        'Integración con Stripe',
        'Panel de administración',
        'Analytics avanzado',
        'SEO profesional',
        'Soporte prioritario 24/7',
        'Tiempo de entrega: 4-6 semanas'
      ],
      notIncluded: [
        'Chatbot IA entrenado',
        'Llamadas automatizadas',
        'Integraciones personalizadas'
      ],
      color: 'blue',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '12,500',
      period: 'proyecto',
      description: 'Solución integral con IA y automatización completa',
      features: [
        'Todo lo del plan Professional',
        'Chatbot IA entrenado',
        'Sistema de llamadas automatizadas',
        'Productos ilimitados',
        'Integraciones personalizadas',
        'API REST completa',
        'Multiidioma',
        'Soporte técnico dedicado',
        'Mantenimiento incluido 6 meses',
        'Tiempo de entrega: 8-12 semanas'
      ],
      notIncluded: [],
      color: 'purple',
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Chatbot IA Adicional',
      price: '1,800',
      description: 'Bot entrenado con tus documentos PDF'
    },
    {
      name: 'Sistema de Llamadas IA',
      price: '3,200',
      description: 'IVR automático con Twilio y OpenAI'
    },
    {
      name: 'Integración Personalizada',
      price: '800',
      description: 'Conexión con APIs externas o CRM'
    },
    {
      name: 'Diseño Custom',
      price: '1,200',
      description: 'Diseño único basado en tu marca'
    },
    {
      name: 'Mantenimiento Mensual',
      price: '200',
      description: 'Actualizaciones y soporte continuo'
    },
    {
      name: 'Consultoría SEO',
      price: '600',
      description: 'Optimización avanzada para buscadores'
    }
  ];

  const getColorClasses = (color: string, popular: boolean) => {
    if (popular) {
      return {
        border: 'border-blue-500 ring-2 ring-blue-200',
        bg: 'bg-blue-50',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        badge: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
      };
    }
    
    switch (color) {
      case 'gray':
        return {
          border: 'border-gray-200',
          bg: 'bg-white',
          button: 'border-gray-300 hover:bg-gray-50 text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
      case 'purple':
        return {
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          badge: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-white',
          button: 'border-gray-300 hover:bg-gray-50 text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Precios Transparentes</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Planes y
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Precios
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan perfecto para tu proyecto. Sin sorpresas, sin costos ocultos. 
              Todos los precios incluyen desarrollo completo y lanzamiento.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => {
              const colors = getColorClasses(plan.color, plan.popular);
              
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border-2 p-8 ${colors.border} ${colors.bg} transition-all duration-200 hover:shadow-xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${colors.badge}`}>
                        <Star className="w-4 h-4 inline mr-1" />
                        Más Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3 opacity-50">
                        <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/contacto?plan=${plan.name.toLowerCase()}`}>
                    <Button
                      className={`w-full ${
                        plan.popular ? colors.button : `border ${colors.button}`
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Empezar con {plan.name}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-xl text-gray-600">
              Personaliza tu proyecto con estos complementos opcionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                  <span className="text-lg font-bold text-blue-600">€{addon.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: '¿Los precios incluyen todo el desarrollo?',
                answer: 'Sí, todos nuestros precios incluyen el desarrollo completo, diseño, testing, lanzamiento y soporte inicial. No hay costos ocultos.'
              },
              {
                question: '¿Qué pasa si necesito cambios después del lanzamiento?',
                answer: 'Incluimos 30 días de soporte gratuito post-lanzamiento. Después puedes contratar nuestro servicio de mantenimiento mensual.'
              },
              {
                question: '¿Cuánto tiempo toma completar un proyecto?',
                answer: 'Los tiempos varían según el plan: Starter (2-3 semanas), Professional (4-6 semanas), Enterprise (8-12 semanas).'
              },
              {
                question: '¿Puedo cambiar de plan durante el desarrollo?',
                answer: 'Sí, puedes hacer upgrade durante el desarrollo. Solo pagarás la diferencia y se ajustará el cronograma.'
              },
              {
                question: '¿Ofrecen garantía?',
                answer: 'Ofrecemos garantía de 30 días para corrección de bugs y ajustes menores. Tu satisfacción es nuestra prioridad.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Necesitas un presupuesto personalizado?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Cada proyecto es único. Contáctanos para una cotización detallada 
            adaptada a tus necesidades específicas.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Solicitar Cotización Personalizada
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}