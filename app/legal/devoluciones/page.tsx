import { RefreshCw } from 'lucide-react';

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center mb-12">
          <RefreshCw className="h-12 w-12 text-[#FFD60A] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4 font-[var(--font-saira)]">
            Política de Devoluciones
          </h1>
          <p className="text-gray-600">Última actualización: Octubre 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">1. Período de Devolución</h2>
            <p className="text-gray-700">
              Los productos pueden ser devueltos dentro de los 30 días posteriores a la fecha de compra,
              siempre que cumplan con las condiciones establecidas en esta política.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">2. Condiciones para Devoluciones</h2>
            <p className="text-gray-700 mb-4">
              Para ser elegible para una devolución, el producto debe:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Estar sin usar y en las mismas condiciones en que lo recibió</li>
              <li>Estar en su empaque original</li>
              <li>Incluir el recibo o comprobante de compra</li>
              <li>No ser un artículo personalizado o hecho a medida</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">3. Proceso de Devolución</h2>
            <p className="text-gray-700 mb-4">
              Para iniciar una devolución:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Contáctenos a través de nuestro formulario de contacto</li>
              <li>Proporcione su número de pedido y motivo de devolución</li>
              <li>Espere la confirmación y las instrucciones de envío</li>
              <li>Envíe el producto siguiendo las instrucciones proporcionadas</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">4. Reembolsos</h2>
            <p className="text-gray-700">
              Una vez que recibamos y inspeccione su devolución, le notificaremos sobre el estado
              de su reembolso. Si se aprueba, el reembolso se procesará automáticamente dentro de
              5-10 días hábiles a su método de pago original.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">5. Costos de Envío</h2>
            <p className="text-gray-700">
              Los costos de envío de devolución son responsabilidad del comprador, a menos que
              el producto esté defectuoso o se haya enviado incorrectamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">6. Artículos No Retornables</h2>
            <p className="text-gray-700 mb-4">
              Los siguientes artículos no pueden ser devueltos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Protectores bucales personalizados</li>
              <li>Productos en oferta o descuento especial</li>
              <li>Artículos de higiene personal (si el empaque ha sido abierto)</li>
            </ul>
          </section>
        </div>
      </div>
      
    </div>
  );
}
