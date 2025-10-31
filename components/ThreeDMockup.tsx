'use client';
import React from 'react';

interface ThreeDMockupProps {
  selectedColor: { name: string; color: string };
  designImage?: string | null;
  /** Opcional: tamaño del mockup (default 200x240) */
  width?: number;
  height?: number;
}

export default function ThreeDMockup({
  selectedColor,
  designImage,
  width = 200,
  height = 240,
}: ThreeDMockupProps) {
  const styles: Record<string, React.CSSProperties> = {
    container: {
      width,
      height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tshirt: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      backgroundColor: selectedColor?.color ?? '#FFD60A',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      transform: 'perspective(900px) rotateX(8deg) rotateY(-8deg)', // ligero efecto pseudo-3D
      overflow: 'hidden',
    },
    frontPanel: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    designArea: {
      width: 120,
      height: 120,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      backdropFilter: 'blur(2px)',
    },
    designImg: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      display: 'block',
    },
    colorLabel: {
      position: 'absolute',
      left: 12,
      bottom: 10,
      fontSize: 12,
      color: '#fff',
      opacity: 0.9,
    },
  };

  return (
    <div style={styles.container} aria-label="Vista previa del diseño">
      <div style={styles.tshirt} role="img" aria-roledescription="polera 3D">
        <div style={styles.frontPanel}>
          {designImage ? (
            <div style={styles.designArea} aria-label="Área de diseño">
              <img
                src={designImage}
                alt={`Diseño aplicado - color ${selectedColor?.name ?? ''}`}
                style={styles.designImg}
                width={120}
                height={120}
                loading="lazy"
              />
            </div>
          ) : (
            <div
              style={styles.designArea}
              aria-label="Área de diseño vacía"
              title="Sube un diseño para previsualizar"
            />
          )}
        </div>

        <div style={styles.colorLabel}>
          Color: <span style={{ color: '#FFD60A' }}>{selectedColor?.name}</span>
        </div>
      </div>
    </div>
  );
}
