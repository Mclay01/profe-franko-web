import { Shield } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 text-[#FFD60A] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4 font-[var(--font-saira)]">
            Política de Privacidad
          </h1>
          <p className="text-gray-600">Última actualización: Octubre 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 mb-4">
              Recopilamos información que usted nos proporciona directamente cuando:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Completa formularios de contacto</li>
              <li>Se registra para eventos</li>
              <li>Realiza consultas o solicitudes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">2. Uso de la Información</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Responder a sus consultas y solicitudes</li>
              <li>Enviar información sobre eventos y actividades</li>
              <li>Mejorar nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">3. Protección de Datos</h2>
            <p className="text-gray-700">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
              su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">4. Sus Derechos</h2>
            <p className="text-gray-700 mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a su información personal</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">5. Contacto</h2>
            <p className="text-gray-700">
              Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través
              de nuestro formulario de contacto.
            </p>
          </section>
        </div>
      </div>
      
    </div>
  );
}
