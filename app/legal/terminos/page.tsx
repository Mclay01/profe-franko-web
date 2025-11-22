import { FileText } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center mb-12">
          <FileText className="h-12 w-12 text-[#FFD60A] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4 font-[var(--font-saira)]">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600">Última actualización: Octubre 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700">
              Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones.
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">2. Uso del Sitio Web</h2>
            <p className="text-gray-700 mb-4">
              Usted se compromete a utilizar este sitio web únicamente para fines legítimos y de manera
              que no infrinja los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio
              por parte de otros usuarios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">3. Propiedad Intelectual</h2>
            <p className="text-gray-700">
              Todo el contenido incluido en este sitio web, incluyendo textos, gráficos, logotipos,
              imágenes y software, es propiedad de Boxing Chile o sus proveedores de contenido y está
              protegido por las leyes de propiedad intelectual.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">4. Limitación de Responsabilidad</h2>
            <p className="text-gray-700">
              No seremos responsables de ningún daño directo, indirecto, incidental, consecuente o punitivo
              que surja del acceso o uso de este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">5. Modificaciones</h2>
            <p className="text-gray-700">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
              entrarán en vigencia inmediatamente después de su publicación en el sitio web.
            </p>
          </section>
        </div>
      </div>
      
    </div>
  );
}
