import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            ¿Listo para transformar
            <br />
            tu negocio?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comienza tu proyecto hoy y ve cómo nuestras soluciones 
            impulsan tu crecimiento digital.
          </p>
        </div>

        {/* CTA Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Consulta Gratuita</h3>
            <p className="text-blue-100 text-sm mb-4">
              30 minutos para evaluar tu proyecto sin compromiso
            </p>
            <Link href="/contacto?tipo=consulta">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Agendar Cita
              </Button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 ring-2 ring-yellow-400/50">
            <MessageCircle className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Cotización Express</h3>
            <p className="text-blue-100 text-sm mb-4">
              Recibe un presupuesto detallado en 24h
            </p>
            <Link href="/contacto?tipo=cotizacion">
              <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                Solicitar Cotización
              </Button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <Phone className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Llamada Directa</h3>
            <p className="text-blue-100 text-sm mb-4">
              Habla con un experto ahora mismo
            </p>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              +34 900 123 456
            </Button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <Link href="/contacto">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Empezar Mi Proyecto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-blue-100 text-sm mt-4">
            Sin compromiso • Respuesta en 24h • Soporte incluido
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-8 mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5★</div>
            <div className="text-xs text-blue-100">Valoración</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-blue-100">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24h</div>
            <div className="text-xs text-blue-100">Soporte</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-xs text-blue-100">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
}