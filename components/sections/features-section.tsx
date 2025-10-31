import { 
  Code, 
  ShoppingCart, 
  Bot, 
  Phone, 
  Zap, 
  Shield, 
  Globe, 
  BarChart,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: 'Desarrollo Web Full-Stack',
      description: 'Next.js, React, TypeScript y Tailwind CSS para aplicaciones modernas y escalables.',
      highlights: ['SSR/SSG optimizado', 'SEO avanzado', 'Performance 100/100'],
      color: 'blue'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Avanzado',
      description: 'Tiendas online completas con Stripe, gestión de inventario y analytics.',
      highlights: ['Pagos seguros', 'Multi-moneda', 'Analytics en tiempo real'],
      color: 'green'
    },
    {
      icon: Bot,
      title: 'Chatbots IA Entrenables',
      description: 'Bots inteligentes entrenados con tus PDFs y documentos usando OpenAI.',
      highlights: ['Entrenamiento personalizado', 'Múltiples idiomas', 'Integración API'],
      color: 'purple'
    },
    {
      icon: Phone,
      title: 'Automatización de Llamadas',
      description: 'IVR inteligente y llamadas automatizadas con Twilio y OpenAI.',
      highlights: ['Voz natural', 'Reconocimiento de voz', 'Análisis de sentimientos'],
      color: 'orange'
    }
  ];

  const benefits = [
    { text: 'Backend automatizado con Supabase', icon: CheckCircle },
    { text: 'Despliegue automático en Netlify', icon: CheckCircle },
    { text: 'Integración con GitHub CI/CD', icon: CheckCircle },
    { text: 'Importación desde Figma', icon: CheckCircle },
    { text: 'Soporte 24/7 incluido', icon: CheckCircle },
    { text: 'Actualizaciones automáticas', icon: CheckCircle }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white';
      case 'green':
        return 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white';
      case 'purple':
        return 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white';
      case 'orange':
        return 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white';
      default:
        return 'bg-gray-100 text-gray-600 group-hover:bg-gray-600 group-hover:text-white';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Tecnología de Vanguardia</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas en
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}una plataforma
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones completas de desarrollo web, e-commerce, IA y automatización 
            integradas en un ecosistema cohesivo y escalable.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-1">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir DigitalFlow?
              </h3>
              <p className="text-gray-600 mb-6">
                Más que una agencia, somos tu socio tecnológico. Ofrecemos soluciones 
                integrales que crecen contigo, con tecnología de última generación y 
                soporte continuo.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <benefit.icon className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-lg font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Seguro</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Globe className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-lg font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <BarChart className="w-8 h-8 text-purple-600 mb-2" />
                <div className="text-lg font-bold text-gray-900">50%</div>
                <div className="text-sm text-gray-600">Más Rápido</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Zap className="w-8 h-8 text-orange-600 mb-2" />
                <div className="text-lg font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Soporte</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/servicios">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Explorar Todos los Servicios
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}