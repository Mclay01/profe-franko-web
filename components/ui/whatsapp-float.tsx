// components/ui/whatsapp-float.tsx

export default function WhatsappFloat({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
  message = "Hola, vengo desde profefranko.com 👋",
}: {
  phone?: string;
  message?: string;
}) {
  if (!phone) return null;

  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="
        fixed right-4 bottom-4 z-50
        h-14 w-14 rounded-full overflow-hidden
        shadow-xl transition-transform hover:scale-105
        focus:outline-none focus:ring focus:ring-white/40
      "
    >
      {/* Usamos el SVG con su propio fondo, sin bg en el contenedor */}
      <img
        src="/icons/whatsapp-fab.svg"
        alt=""
        width={56}
        height={56}
        className="h-full w-full object-contain select-none pointer-events-none"
        loading="lazy"
        draggable={false}
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
