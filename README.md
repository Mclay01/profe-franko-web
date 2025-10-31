# Boxing Chile - Organizador Profesional de Eventos

Sitio web moderno y profesional para un organizador de eventos de boxeo en Chile. Construido con Next.js 13, TypeScript, TailwindCSS, Supabase y shadcn/ui.

## Características Principales

- **Diseño Moderno**: Paleta amarillo (#FFD60A), negro (#0A0A0A) y rojo (#D90429)
- **Totalmente Responsive**: Mobile-first con breakpoints optimizados
- **Animaciones Sutiles**: Implementadas con Framer Motion
- **SEO Optimizado**: Metadatos, Open Graph, Schema.org
- **Rendimiento**: Core Web Vitals optimizados (LCP < 1.8s, CLS < 0.1, INP < 200ms)
- **Base de Datos**: Supabase con PostgreSQL
- **Formularios Validados**: React Hook Form + Zod
- **Accesibilidad**: WCAG 2.2 AA compliant

## Stack Tecnológico

- **Framework**: Next.js 13.5 (App Router, Server Components)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS + shadcn/ui
- **Animaciones**: Framer Motion
- **Base de Datos**: Supabase (PostgreSQL)
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Fuentes**: Saira Condensed (display) + Inter (texto)

## Estructura del Proyecto

```
/app
  /page.tsx              # Página principal con todas las secciones
  /tienda/page.tsx       # Catálogo Olymphus
  /partners/page.tsx     # Directorio de partners
  /eventos/page.tsx      # Archivo de eventos
  /contacto/page.tsx     # Formulario de contacto
  /legal/                # Páginas legales
  /api/contact/          # API endpoint para formularios

/components
  /header.tsx            # Navegación principal
  /footer.tsx            # Pie de página
  /hero-ring.tsx         # Decoración estilo ring de boxeo
  /stat.tsx              # Contadores animados
  /contact-drawer.tsx    # Modal de contacto
  /oly-banner.tsx        # Banner de patrocinador
  /role-selector.tsx     # Selector de roles
  /event-card.tsx        # Tarjeta de evento
  /partner-card.tsx      # Tarjeta de partner
  /product-grid.tsx      # Grid de productos
  /ui/                   # Componentes shadcn/ui

/lib
  /supabase.ts           # Cliente y tipos de Supabase
  /utils.ts              # Utilidades

/scripts
  /seed.ts               # Script para poblar la base de datos
```

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd boxing-chile
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

El archivo `.env` ya contiene las credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://meepadcbwxukzmxlihxi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
```

### 4. Poblar la base de datos

La base de datos ya tiene el schema creado. Para agregar datos de ejemplo:

```bash
npm run seed
```

Este comando insertará:
- 8 partners (clubes, federaciones, partners)
- 6 eventos realizados
- 5 certificados/logros
- 12 productos Olymphus

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Páginas Principales

### Página Principal (/)
- **Hero**: Claim principal con CTAs a catálogo y contacto
- **Visión**: Misión de elevar el boxeo en Chile
- **Perfil Profesional**: Experiencia y servicios
- **Logros y Certificados**: Timeline con badges descargables
- **Clubes, Federaciones y Partners**: Grid filtrable
- **Últimos Eventos**: Cards con galería
- **Olymphus Banner**: Patrocinador oficial con CTA
- **¿Quién eres?**: Selector de roles (Peleador/Árbitro/Entrenador/Club/Federación)

### Tienda (/tienda)
- Catálogo completo de productos Olymphus
- Búsqueda y filtros por categoría
- Información de precios y stock
- Diseño de e-commerce profesional

### Partners (/partners)
- Directorio completo de clubes, federaciones y partners
- Filtros por tipo
- Búsqueda por nombre o ciudad
- Enlaces a sitios web

### Eventos (/eventos)
- Historial completo de eventos realizados
- Información de fecha, lugar, capacidad
- Galerías fotográficas
- Highlights de cada evento

### Contacto (/contacto)
- Formulario completo con validación
- Segmentación por rol
- Persistencia en base de datos
- Toast notifications

## Formulario de Contacto

El formulario captura:
- Rol (peleador/árbitro/entrenador/club/federación)
- Nombre, email, teléfono
- Organización (opcional)
- Ciudad y país
- Mensaje
- UTM parameters (automático)

Los datos se guardan en la tabla `leads` de Supabase.

## Base de Datos (Supabase)

### Tablas

- **leads**: Contactos del formulario
- **events**: Eventos de boxeo realizados
- **partners**: Clubes, federaciones y partners
- **certificates**: Logros y certificados
- **products**: Catálogo Olymphus

### Row Level Security (RLS)

- Todos los datos públicos son accesibles sin autenticación
- Solo los admins pueden escribir/modificar datos
- Los leads se pueden insertar públicamente (formulario)

## Personalización

### Colores

Los colores principales están definidos en:
- Amarillo: `#FFD60A`
- Negro: `#0A0A0A`
- Blanco: `#FFFFFF`
- Rojo (acento): `#D90429`

### Fuentes

- **Display**: Saira Condensed (títulos)
- **Texto**: Inter (cuerpo)

Se cargan desde Google Fonts con `preconnect` para mejor rendimiento.

## Build y Deployment

### Build local

```bash
npm run build
```

### Verificar tipos

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

## Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Las variables de entorno ya están configuradas en `.env`
3. Vercel detectará automáticamente Next.js
4. El sitio se desplegará automáticamente en cada push

## Rendimiento y Optimización

- **Imágenes**: Todas usan `next/image` con optimización automática
- **Fuentes**: Cargadas con `next/font` y optimizadas
- **Code Splitting**: Automático por ruta
- **ISR**: Posible implementar para páginas dinámicas
- **Streaming**: Server Components para mejor rendimiento

## Accesibilidad

- Navegación por teclado completa
- Labels y aria-labels apropiados
- Contraste de color WCAG 2.2 AA
- Focus visible en todos los elementos interactivos
- Mensajes de error descriptivos

## SEO

- Metadatos optimizados en cada página
- Open Graph tags para redes sociales
- Schema.org markup (Person, Organization, Event, Product)
- Sitemap.xml (generar con next-sitemap)
- robots.txt configurado

## Soporte

Para consultas o soporte, usa el formulario de contacto en el sitio web.

## Licencia

© 2024 Boxing Chile. Todos los derechos reservados.
