import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Líder en Desarrollo Full-Stack</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transformamos
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {' '}ideas
                </span>
                <br />
                en soluciones digitales
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Desarrollo web completo, e-commerce avanzado, chatbots IA y automatización 
                de llamadas. Todo lo que necesitas para llevar tu negocio al siguiente nivel.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24h</div>
                <div className="text-sm text-gray-600">Soporte</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Empezar Proyecto
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="group">
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Ver Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-4">Confían en nosotros:</p>
              <div className="flex items-center space-x-6 grayscale opacity-60">
                <div className="text-lg font-bold">TechCorp</div>
                <div className="text-lg font-bold">StartupX</div>
                <div className="text-lg font-bold">InnovateLab</div>
                <div className="text-lg font-bold">GrowthCo</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Panel de Control</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Usuarios</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">12.4K</div>
                    <div className="text-xs text-blue-600">+23% este mes</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Ventas</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">€45K</div>
                    <div className="text-xs text-purple-600">+18% este mes</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">IA Automática</span>
                  </div>
                  <div className="text-sm opacity-90">
                    Procesando 2.4K consultas automáticamente
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Zap className="w-8 h-8 text-yellow-800" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <TrendingUp className="w-6 h-6 text-green-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}