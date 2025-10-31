# Guía de Diseño - Boxing Chile

## Paleta de Colores

### Colores Principales

| Color | Hex | Uso |
|-------|-----|-----|
| Amarillo | `#FFD60A` | Marca principal, CTAs, acentos |
| Negro | `#0A0A0A` | Fondos oscuros, texto principal |
| Blanco | `#FFFFFF` | Texto sobre fondos oscuros |
| Rojo | `#D90429` | Acento de peligro, énfasis |
| Naranja | `#FFA500` | Gradientes secundarios |

### Colores Secundarios

| Color | Hex | Uso |
|-------|-----|-----|
| Gris Oscuro | `#1A1A1A` | Fondos alternativos |
| Gris Medio | `#333333` | Bordes, divisores |
| Rojo Claro | `#FF6B6B` | Gradientes de error |

### Opacidades

- Texto secundario: `rgba(255,255,255,0.8)`
- Texto terciario: `rgba(255,255,255,0.7)`
- Bordes: `rgba(255,214,10,0.2)`

## Tipografía

### Fuentes

**Display (Títulos)**
- Familia: Saira Condensed
- Pesos: 400, 600, 700
- Uso: H1, H2, títulos principales
- Variable CSS: `var(--font-saira)`

**Texto (Cuerpo)**
- Familia: Inter
- Pesos: Variable
- Uso: Párrafos, botones, navegación
- Variable CSS: `var(--font-inter)`

### Jerarquía

```css
H1: 3.5rem (56px) - font-saira, bold
H2: 2.5rem (40px) - font-saira, bold
H3: 2rem (32px) - font-saira, semibold
H4: 1.5rem (24px) - font-inter, semibold
Body: 1rem (16px) - font-inter, regular
Small: 0.875rem (14px) - font-inter, regular
```

### Line Heights

- Títulos: 120%
- Cuerpo: 150%
- Botones: 100%

## Espaciado

### Sistema 8px

Todos los espaciados usan múltiplos de 8:

| Tamaño | Valor | Uso |
|--------|-------|-----|
| xs | 4px | Micro-espaciados |
| sm | 8px | Espaciado mínimo |
| md | 16px | Espaciado estándar |
| lg | 24px | Espaciado amplio |
| xl | 32px | Separación de secciones |
| 2xl | 48px | Secciones grandes |
| 3xl | 64px | Márgenes principales |

### Containers

- Max-width: `1280px`
- Padding horizontal: `1rem` (mobile), `1.5rem` (tablet+)

## Componentes

### Botones

**Primario**
```css
bg: #FFD60A
text: #0A0A0A
hover: #FFD60A/90
padding: 0.75rem 2rem
border-radius: 0.5rem
font-weight: 600
```

**Secundario (Outline)**
```css
bg: transparent
text: #FFD60A
border: 1px solid #FFD60A
hover: bg #FFD60A, text #0A0A0A
```

**Estados**
- Hover: Scale 102% o cambio de color
- Focus: Ring de 2px en #FFD60A
- Disabled: Opacity 50%

### Cards

```css
bg: #0A0A0A (o #1A1A1A)
border: 1px solid rgba(255,214,10,0.2)
border-radius: 0.5rem
padding: 1.5rem
hover: border-color #FFD60A
transition: all 200ms
```

### Inputs

```css
bg: #0A0A0A
border: 1px solid rgba(255,214,10,0.2)
text: white
padding: 0.75rem 1rem
border-radius: 0.375rem
focus: border #FFD60A, ring 2px #FFD60A/20
```

## Animaciones

### Duración

- Ultra rápida: 100ms
- Rápida: 200ms
- Normal: 300ms
- Lenta: 500ms
- Muy lenta: 800ms

### Easing

- Default: `ease-in-out`
- Entrada: `ease-out`
- Salida: `ease-in`

### Framer Motion Presets

**Fade In**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**Scale In**
```javascript
initial={{ opacity: 0, scale: 0.95 }}
whileInView={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.4 }}
```

**Slide In**
```javascript
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
```

## Breakpoints

```css
sm: 640px   /* Mobile grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeño */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

## Iconos

### Lucide React

Tamaños estándar:
- Pequeño: `h-4 w-4` (16px)
- Medio: `h-5 w-5` (20px)
- Grande: `h-6 w-6` (24px)
- Extra grande: `h-8 w-8` (32px)

Color por defecto: `#FFD60A`

## Gradientes

### Amarillo-Naranja
```css
bg-gradient-to-br from-[#FFD60A] to-[#FFA500]
```

### Rojo-Rojo Claro
```css
bg-gradient-to-br from-[#D90429] to-[#FF6B6B]
```

### Negro-Gris
```css
bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]
```

## Sombras

```css
sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

## Bordes

- Radius pequeño: `0.375rem` (6px)
- Radius medio: `0.5rem` (8px)
- Radius grande: `0.75rem` (12px)
- Width estándar: `1px`
- Width grueso: `2px`

## Estados de Hover

### Cards
```css
hover:border-[#FFD60A]
hover:scale-105
transition-all
```

### Botones
```css
hover:bg-[#FFD60A]/90
hover:scale-102
```

### Links
```css
hover:text-[#FFD60A]
transition-colors
```

## Accesibilidad

### Contraste

Todos los textos cumplen WCAG 2.2 AA:
- Texto normal: 4.5:1 mínimo
- Texto grande: 3:1 mínimo

### Focus Visible

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[#FFD60A]
focus-visible:ring-offset-2
```

### Tap Targets

Tamaño mínimo: 44x44px en mobile

## Imágenes

### Optimización

- Usar `next/image` siempre
- Formato: WebP preferido
- Calidad: 80%
- Lazy loading por defecto

### Aspect Ratios

- Hero: 16:9
- Cards de eventos: 3:2
- Cards de productos: 4:5
- Logos: 1:1 o 3:2

## Mobile First

Diseño mobile-first con mejoras progresivas:

1. Mobile (< 640px): Stack vertical, full-width
2. Tablet (768px+): Grid 2 columnas
3. Desktop (1024px+): Grid 3-4 columnas
4. Large (1280px+): Contenedores con max-width

## Performance

### Core Web Vitals Targets

- **LCP**: < 1.8s
- **FID/INP**: < 100ms / < 200ms
- **CLS**: < 0.1

### Optimizaciones

- Preload fuentes críticas
- Lazy load imágenes
- Code splitting por ruta
- Minimizar JavaScript
- Usar Server Components donde sea posible
