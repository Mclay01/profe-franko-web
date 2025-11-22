'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Palette, Bot, X } from 'lucide-react';
import ThreeDMockup from '@/components/ThreeDMockup';

type Color = { name: string; color: string };

interface OrderSummary {
  basePrice: number;
  designPrice: number;
  removeBackgroundPrice: number;
  total: number;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS: Color[] = [
  { name: 'Negro', color: '#000000' },
  { name: 'Blanco', color: '#FFFFFF' },
  { name: 'Gris', color: '#808080' },
  { name: 'Azul', color: '#1E40AF' },
  { name: 'Rojo', color: '#DC2626' },
];

const FREE_DESIGNS = [
  {
    id: 1,
    name: 'Minimalista',
    image:
      'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Abstracto',
    image:
      'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Geométrico',
    image:
      'https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function DesignPage() {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<Color>(COLORS[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [hasDesign, setHasDesign] = useState<boolean | null>(null);
  const [description, setDescription] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFreeDesign, setSelectedFreeDesign] = useState<number | null>(null);
  const [removeBackground, setRemoveBackground] = useState<boolean>(false);
  const [hasSubscription] = useState<boolean>(false); // simula suscripción

  const selectedFreeDesignUrl = useMemo(
    () => FREE_DESIGNS.find((d) => d.id === selectedFreeDesign)?.image ?? null,
    [selectedFreeDesign]
  );

  const designPreview = uploadedImage ?? selectedFreeDesignUrl ?? null;

  const orderSummary: OrderSummary = useMemo(() => {
    const basePrice = 15000;
    let designPrice = 0;
    let removeBackgroundPrice = 0;

    if (hasDesign === true && uploadedImage) {
      designPrice = 2000;
    } else if (hasDesign === false && (selectedFreeDesign || description.trim())) {
      designPrice = 2000;
    }

    if (removeBackground && !hasSubscription) {
      removeBackgroundPrice = 200;
    }

    const total = (basePrice + designPrice + removeBackgroundPrice) * quantity;

    return {
      basePrice: basePrice * quantity,
      designPrice: designPrice * quantity,
      removeBackgroundPrice: removeBackgroundPrice * quantity,
      total,
    };
  }, [hasDesign, uploadedImage, selectedFreeDesign, description, removeBackground, hasSubscription, quantity]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    // Limpia selección de plantilla si sube imagen
    setSelectedFreeDesign(null);
  };

  const handleNext = () => {
    if (hasDesign === null) {
      window.alert('Por favor selecciona una opción de diseño');
      return;
    }
    if (hasDesign === true && !uploadedImage) {
      window.alert('Por favor sube tu diseño');
      return;
    }
    if (hasDesign === false && !selectedFreeDesign && !description.trim()) {
      window.alert('Describe tu diseño o selecciona una plantilla');
      return;
    }
    router.push('/customer-info');
  };

  const handleAIDesign = () => {
    router.push('/ai-design');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-[#FFD60A] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Volver</span>
        </Link>
        <h1 className="text-white font-bold text-lg">Diseña Tu Polera</h1>
        <div className="w-10" />
      </header>

      {/* Mockup */}
      <section className="bg-black px-5 py-6 flex justify-center">
        <ThreeDMockup selectedColor={selectedColor} designImage={designPreview} />
      </section>

      <main className="bg-[#111111]">
        {/* Opciones de diseño */}
        <section className="border-b border-[#333] px-5 py-6 space-y-5">
          <h2 className="text-white font-bold text-lg">Opciones de Diseño</h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHasDesign(true)}
              className={[
                'flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 transition-colors',
                hasDesign === true
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-black'
                  : 'border-[#FF6B35] text-[#FF6B35]',
              ].join(' ')}
              aria-pressed={hasDesign === true}
            >
              <Upload className="h-5 w-5" />
              <span className="font-semibold">Tengo Diseño</span>
            </button>

            <button
              onClick={() => setHasDesign(false)}
              className={[
                'flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 transition-colors',
                hasDesign === false
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-black'
                  : 'border-[#FF6B35] text-[#FF6B35]',
              ].join(' ')}
              aria-pressed={hasDesign === false}
            >
              <Palette className="h-5 w-5" />
              <span className="font-semibold">No Tengo Diseño</span>
            </button>
          </div>

          {/* Tengo diseño */}
          {hasDesign === true && (
            <div className="space-y-4">
              <label
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-3 font-semibold text-black"
              >
                <Upload className="h-5 w-5" />
                <span>Subir Diseño</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {uploadedImage && (
                <div className="relative mx-auto w-[100px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Diseño subido"
                    className="h-[100px] w-[100px] rounded-xl object-cover"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B35]"
                    aria-label="Quitar imagen"
                    title="Quitar imagen"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}

              <div>
                <button
                  onClick={() => setRemoveBackground((v) => !v)}
                  className={[
                    'flex w-full items-center justify-between rounded-lg border px-3 py-2',
                    removeBackground ? 'border-[#FF6B35] bg-[#FF6B35] text-black' : 'border-[#333] bg-[#222] text-white',
                  ].join(' ')}
                  aria-pressed={removeBackground}
                >
                  <span className="font-semibold">Quitar Fondo</span>
                  <span className={removeBackground ? 'text-black' : 'text-[#FF6B35]'}>
                    {hasSubscription ? 'GRATIS' : '$200'}
                  </span>
                </button>
              </div>

              <textarea
                className="min-h-24 w-full rounded-xl border border-[#333] bg-[#222] p-4 text-sm text-white placeholder:text-[#999]"
                placeholder="Descripción adicional (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}

          {/* No tengo diseño */}
          {hasDesign === false && (
            <div className="space-y-4">
              <h3 className="text-[#FF6B35] font-semibold">Diseños Gratuitos</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {FREE_DESIGNS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedFreeDesign(d.id);
                      setUploadedImage(null);
                    }}
                    className={[
                      'w-[110px] shrink-0 rounded-xl border p-2 text-center transition-colors',
                      selectedFreeDesign === d.id ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-[#333] bg-[#222]',
                    ].join(' ')}
                    aria-pressed={selectedFreeDesign === d.id}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.image}
                      alt={d.name}
                      className="mx-auto mb-2 h-[70px] w-[70px] rounded-lg object-cover"
                    />
                    <span className={selectedFreeDesign === d.id ? 'text-black text-sm font-semibold' : 'text-white text-sm'}>
                      {d.name}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleAIDesign}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#333] px-4 py-3 font-semibold text-[#FF6B35]"
              >
                <Bot className="h-5 w-5" />
                Diseñalo con IA
              </button>

              <textarea
                className="min-h-24 w-full rounded-xl border border-[#333] bg-[#222] p-4 text-sm text-white placeholder:text-[#999]"
                placeholder="Describe tu diseño (obligatorio si no seleccionas plantilla)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
        </section>

        {/* Talla */}
        <section className="border-b border-[#333] px-5 py-6">
          <h2 className="mb-4 text-white font-bold text-lg">Talla</h2>
          <div className="grid grid-cols-5 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={[
                  'rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors',
                  selectedSize === size ? 'bg-[#FF6B35] border-[#FF6B35] text-black' : 'bg-[#222] border-[#333] text-white',
                ].join(' ')}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Colores */}
        <section className="border-b border-[#333] px-5 py-6">
          <h2 className="mb-4 text-white font-bold text-lg">Color</h2>
          <div className="flex gap-3">
            {COLORS.map((c) => (
              <button
                key={c.name}
                className={[
                  'h-12 w-12 rounded-full border-4 transition-colors',
                  selectedColor.name === c.name ? 'border-[#FF6B35]' : 'border-transparent',
                ].join(' ')}
                style={{ backgroundColor: c.color }}
                onClick={() => setSelectedColor(c)}
                aria-label={`Color ${c.name}`}
                aria-pressed={selectedColor.name === c.name}
                title={c.name}
              />
            ))}
          </div>
        </section>

        {/* Cantidad */}
        <section className="border-b border-[#333] px-5 py-6">
          <h2 className="mb-4 text-white font-bold text-lg">Cantidad</h2>
          <div className="flex items-center justify-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] text-black text-xl font-bold"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Disminuir cantidad"
            >
              –
            </button>
            <span className="min-w-[48px] text-center text-2xl font-bold text-white">{quantity}</span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] text-black text-xl font-bold"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </section>

        {/* Resumen */}
        <section className="px-5 py-6">
          <h2 className="mb-4 text-white font-bold text-lg">Resumen del Pedido</h2>

          <div className="rounded-xl bg-[#222] p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-[#CCCCCC] text-sm">Polera oversized ({quantity}x)</span>
              <span className="text-white text-sm">${orderSummary.basePrice.toLocaleString()}</span>
            </div>

            {orderSummary.designPrice > 0 && (
              <div className="flex items-center justify-between py-2">
                <span className="text-[#CCCCCC] text-sm">Diseño personalizado</span>
                <span className="text-white text-sm">${orderSummary.designPrice.toLocaleString()}</span>
              </div>
            )}

            {orderSummary.removeBackgroundPrice > 0 && (
              <div className="flex items-center justify-between py-2">
                <span className="text-[#CCCCCC] text-sm">Quitar fondo</span>
                <span className="text-white text-sm">
                  ${orderSummary.removeBackgroundPrice.toLocaleString()}
                </span>
              </div>
            )}

            <div className="mt-2 border-t border-[#333] pt-3 flex items-center justify-between">
              <span className="text-[#FF6B35] font-bold">Total</span>
              <span className="text-[#FF6B35] text-lg font-bold">
                ${orderSummary.total.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Siguiente */}
        <div className="p-5">
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8A50] py-3 text-center text-lg font-bold text-black shadow-[0_8px_24px_rgba(255,107,53,0.35)] hover:shadow-[0_12px_28px_rgba(255,107,53,0.45)] transition-shadow"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}
