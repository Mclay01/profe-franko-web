'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CollageImage = { src: string; alt?: string };

export function AboutCollage({ images }: { images: CollageImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => {
    setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setOpen((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Navegación con teclado
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, prev, next]);

  return (
    <>
      {/* Desktop: Video/Reel a la izquierda + galería */}
      <div className="hidden lg:block relative">
        <div className="flex items-start gap-0 relative">
          {/* REEL (Instagram embed). Lo hice más alto: aspect-[9/18] */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative w-[300px] aspect-[9/16] flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFD60A]/30 to-transparent p-[2px] z-20"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-black">
                <video
                src="/videos/reels-franko.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                />
            </div>
          </motion.div>

          {/* Botón de expandir/colapsar superpuesto */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-1/2 left-[280px] -translate-y-1/2 z-30 bg-[#FFD60A] text-[#0A0A0A] rounded-full p-3 shadow-lg hover:bg-[#FFA500] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.div>
          </motion.button>

          {/* Galería deslizante (detrás del video) */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col gap-4 pl-6 z-10"
              >
                {images.slice(0, 3).map((img, i) => (
                  <motion.button
                    key={img.src + i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpen(i)}
                    className="group relative w-[200px] aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[#FFD60A]/30 to-transparent p-[2px]"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-black/30">
                      <Image
                        src={img.src}
                        alt={img.alt ?? 'Profe Franko'}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute inset-0 ring-1 ring-white/5 group-hover:ring-[#FFD60A]/40 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: 3 imágenes horizontales (el reel se muestra en page.tsx) */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-3 gap-3">
          {images.slice(0, 3).map((img, i) => (
            <motion.button
              key={img.src + i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#FFD60A]/30 to-transparent p-[2px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-black/30">
                <Image
                  src={img.src}
                  alt={img.alt ?? 'Profe Franko'}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-white/5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              aria-label="Cerrar"
              onClick={close}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.button
              aria-label="Anterior"
              onClick={prev}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-7 w-7" />
            </motion.button>

            <motion.button
              aria-label="Siguiente"
              onClick={next}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-7 w-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl aspect-[16/10]"
            >
              <Image
                src={images[open].src}
                alt={images[open].alt ?? 'Profe Franko'}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
