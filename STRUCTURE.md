# Estructura del Proyecto Boxing Chile

## 📂 Árbol de Archivos

```
boxing-chile/
│
├── 📄 Documentación
│   ├── README.md              # Documentación principal completa
│   ├── QUICKSTART.md          # Guía de inicio rápido (5 min)
│   ├── DEPLOYMENT.md          # Guía de deployment en Vercel
│   ├── DESIGN.md              # Sistema de diseño y guía visual
│   ├── PROJECT_SUMMARY.md     # Resumen ejecutivo del proyecto
│   └── STRUCTURE.md           # Este archivo
│
├── 📱 Aplicación (app/)
│   ├── page.tsx               # 🏠 Página principal (one-pager)
│   ├── layout.tsx             # Layout global con fuentes y metadatos
│   ├── globals.css            # Estilos globales y variables CSS
│   │
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # 📨 API endpoint para formulario
│   │
│   ├── tienda/
│   │   └── page.tsx           # 🛒 Catálogo Olymphus
│   │
│   ├── partners/
│   │   └── page.tsx           # 🤝 Directorio de partners
│   │
│   ├── eventos/
│   │   └── page.tsx           # 📅 Archivo de eventos
│   │
│   ├── contacto/
│   │   └── page.tsx           # 💬 Formulario de contacto
│   │
│   └── legal/
│       ├── privacidad/
│       │   └── page.tsx       # 🔒 Política de privacidad
│       ├── terminos/
│       │   └── page.tsx       # 📋 Términos y condiciones
│       └── devoluciones/
│           └── page.tsx       # 🔄 Política de devoluciones
│
├── 🎨 Componentes (components/)
│   ├── header.tsx             # Navegación principal sticky
│   ├── footer.tsx             # Pie de página con links
│   ├── hero-ring.tsx          # Decoración SVG estilo ring
│   ├── stat.tsx               # Contador animado
│   ├── contact-drawer.tsx     # Modal lateral de contacto
│   ├── oly-banner.tsx         # Banner de patrocinador
│   ├── role-selector.tsx      # Selector de roles con iconos
│   ├── event-card.tsx         # Tarjeta de evento
│   ├── partner-card.tsx       # Tarjeta de partner
│   ├── product-grid.tsx       # Grid de productos
│   │
│   └── ui/                    # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── sheet.tsx          # (Usado por ContactDrawer)
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── ... (50+ componentes más)
│
├── 🔧 Utilidades (lib/)
│   ├── supabase.ts            # Cliente de Supabase + tipos TypeScript
│   └── utils.ts               # Funciones helper (cn, etc)
│
├── 🌱 Scripts (scripts/)
│   └── seed.ts                # Script para poblar la BD
│
├── ⚙️ Configuración
│   ├── package.json           # Dependencias y scripts
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── tailwind.config.ts     # Configuración Tailwind
│   ├── postcss.config.js      # Configuración PostCSS
│   ├── next.config.js         # Configuración Next.js
│   ├── components.json        # Configuración shadcn/ui
│   ├── .eslintrc.json         # Reglas de linting
│   ├── .gitignore             # Archivos ignorados por Git
│   ├── .env                   # Variables de entorno
│   └── .env.example           # Plantilla de variables
│
└── 📦 Generados (no versionados)
    ├── node_modules/          # Dependencias instaladas
    ├── .next/                 # Build de Next.js
    └── package-lock.json      # Lock de versiones
```

## 🗂️ Organización por Funcionalidad

### 🏠 Página Principal (/)
**Archivo**: `app/page.tsx`

Componentes usados:
- `Header` - Navegación
- `HeroRing` - Decoración
- `Stat` - Métricas animadas
- `RoleSelector` - Selector de roles
- `ContactDrawer` - Modal de contacto
- `OlyBanner` - Banner de Olymphus
- `EventCard` - Cards de eventos
- `PartnerCard` - Cards de partners
- `Footer` - Pie de página

Datos cargados:
- Eventos desde `events` table
- Partners desde `partners` table
- Certificados desde `certificates` table

### 🛒 Tienda (/tienda)
**Archivo**: `app/tienda/page.tsx`

Componentes usados:
- `Header`
- `ProductGrid`
- `Footer`

Características:
- Búsqueda por nombre
- Filtro por categoría
- Indicadores de stock
- Precios en CLP

Datos cargados:
- Productos desde `products` table

### 🤝 Partners (/partners)
**Archivo**: `app/partners/page.tsx`

Componentes usados:
- `Header`
- `PartnerCard`
- `Footer`

Características:
- Búsqueda por nombre/ciudad
- Filtros por tipo (club, federación, partner)
- Grid responsive

Datos cargados:
- Partners desde `partners` table

### 📅 Eventos (/eventos)
**Archivo**: `app/eventos/page.tsx`

Componentes usados:
- `Header`
- `EventCard`
- `Footer`

Características:
- Lista de eventos realizados
- Galerías de fotos
- Detalles de cada evento

Datos cargados:
- Eventos desde `events` table

### 💬 Contacto (/contacto)
**Archivo**: `app/contacto/page.tsx`

Características:
- Formulario completo validado
- React Hook Form + Zod
- Toast notifications
- Persistencia en Supabase

API:
- `app/api/contact/route.ts` - Endpoint POST

## 🗄️ Base de Datos (Supabase)

### Tablas

#### `leads`
Formularios de contacto
```sql
- id (uuid, PK)
- role (text: peleador/arbitro/entrenador/club/federacion)
- name (text)
- email (text)
- phone (text)
- organization (text, nullable)
- city (text)
- country (text)
- message (text)
- utm_source (text, nullable)
- utm_medium (text, nullable)
- utm_campaign (text, nullable)
- created_at (timestamptz)
```

#### `events`
Eventos de boxeo
```sql
- id (uuid, PK)
- slug (text, unique)
- name (text)
- date (date)
- venue (text)
- city (text)
- capacity (integer)
- gallery (jsonb - array de URLs)
- highlights (jsonb - array de strings)
- status (text: realizado/pronto)
- created_at (timestamptz)
```

#### `partners`
Clubes, federaciones y partners
```sql
- id (uuid, PK)
- name (text)
- type (text: club/federacion/partner)
- city (text)
- logo_url (text)
- website (text, nullable)
- featured (boolean)
- created_at (timestamptz)
```

#### `certificates`
Logros y certificados
```sql
- id (uuid, PK)
- title (text)
- issuer (text)
- date (date)
- file_url (text)
- created_at (timestamptz)
```

#### `products`
Catálogo Olymphus
```sql
- sku (text, PK)
- title (text)
- slug (text, unique)
- price (integer - precio en CLP)
- images (jsonb - array de URLs)
- category (text)
- stock (integer)
- published (boolean)
- created_at (timestamptz)
```

## 🎨 Sistema de Diseño

### Colores
- Amarillo: `#FFD60A` - Marca
- Negro: `#0A0A0A` - Fondos
- Blanco: `#FFFFFF` - Texto
- Rojo: `#D90429` - Acento

### Fuentes
- **Display**: Saira Condensed (400, 600, 700)
- **Texto**: Inter (variable)

### Espaciado
Sistema base de 8px:
- 4px, 8px, 16px, 24px, 32px, 48px, 64px

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🔧 Scripts Disponibles

```bash
npm run dev         # Desarrollo (puerto 3000)
npm run build       # Build de producción
npm run start       # Servidor de producción
npm run lint        # Linter
npm run typecheck   # Verificar tipos
npm run seed        # Poblar base de datos
```

## 📊 Métricas del Build

```
Página              Tamaño    First Load JS
/                   10.8 KB   251 KB
/contacto           2.54 KB   190 KB
/eventos            3.2 KB    188 KB
/partners           4.2 KB    182 KB
/tienda             2.5 KB    207 KB
/legal/*            1.47 KB   96.2 KB
```

## 🔐 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL          # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Clave anónima de Supabase
SUPABASE_SERVICE_ROLE_KEY         # Clave de servicio (opcional, para seed)
```

## 🚀 Deploy Pipeline

1. Push a GitHub
2. Vercel detecta cambios
3. Build automático (~3 min)
4. Deploy a producción
5. Preview URLs para PRs

## 📈 Próximas Expansiones

### Fase 2 (Opcional)
- Panel de administración
- CRUD de contenido
- Sistema de autenticación
- Gestión de leads

### Fase 3 (Opcional)
- E-commerce completo
- Carrito de compras
- Checkout
- Integración de pagos

### Fase 4 (Opcional)
- Blog de noticias
- Galería de fotos
- Videos destacados
- Newsletter

## 📝 Notas de Desarrollo

### Componentes Client vs Server
- **Server Components**: Páginas por defecto
- **Client Components**: Marcados con `'use client'`
  - Usan hooks (useState, useEffect)
  - Usan event handlers
  - Usan Framer Motion

### Convenciones de Código
- TypeScript strict mode
- ESLint habilitado
- Naming: camelCase para variables, PascalCase para componentes
- Imports ordenados: React → Next → Third-party → Local

### Best Practices Aplicadas
- Mobile-first responsive
- Optimización de imágenes con next/image
- SEO-friendly con metadatos dinámicos
- Accesibilidad WCAG 2.2 AA
- Performance optimizado (Core Web Vitals)

---

**Proyecto completamente funcional y listo para producción** ✅
