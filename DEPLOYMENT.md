# Guía de Deployment

## Deployment en Vercel

### 1. Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### 2. Variables de Entorno

Las siguientes variables ya están configuradas en el archivo `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://meepadcbwxukzmxlihxi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
```

**Importante**: Estos valores ya están configurados y funcionando. No necesitas cambiarlos a menos que quieras usar tu propia instancia de Supabase.

### 3. Build Settings

Vercel usará automáticamente:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

No necesitas cambiar ninguna de estas configuraciones.

### 4. Deploy

1. Click en "Deploy"
2. Espera a que el build termine (2-3 minutos)
3. Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

### 5. Dominio Personalizado (Opcional)

1. Ve a la pestaña "Settings" de tu proyecto
2. Click en "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

## Supabase

### Database Schema

El schema de la base de datos ya está creado y funcional. Incluye:

- **leads**: Formularios de contacto
- **events**: Eventos de boxeo
- **partners**: Clubes, federaciones y partners
- **certificates**: Logros y certificados
- **products**: Catálogo Olymphus

### Poblar la Base de Datos

Para agregar datos de ejemplo, ejecuta:

```bash
npm run seed
```

Esto insertará:
- 8 partners
- 6 eventos
- 5 certificados
- 12 productos

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado:
- **Lectura pública**: eventos, partners, certificados, productos
- **Escritura pública**: solo leads (formulario de contacto)
- **Administración**: requiere service role

## Post-Deployment

### 1. Verificar el Sitio

Visita tu sitio y verifica:
- ✅ La página principal carga correctamente
- ✅ Las animaciones funcionan suavemente
- ✅ El formulario de contacto envía datos
- ✅ La tienda muestra productos
- ✅ Los partners y eventos se cargan desde la base de datos

### 2. Poblar Contenido

Si la base de datos está vacía:

```bash
npm run seed
```

### 3. SEO

Considera agregar:
- Sitemap.xml (usando `next-sitemap`)
- Google Analytics
- Google Search Console
- Schema.org markup adicional

### 4. Performance

El sitio está optimizado para Core Web Vitals:
- **LCP**: < 1.8s
- **FID**: < 100ms
- **CLS**: < 0.1

Verifica las métricas en:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### 5. Monitoring

Vercel proporciona métricas automáticas:
- Analytics de tráfico
- Core Web Vitals reales
- Errores en tiempo real
- Logs de funciones

## Mantenimiento

### Actualizar Contenido

Para actualizar eventos, partners o productos:

1. Usa la consola de Supabase directamente
2. O crea un panel de administración (futura implementación)

### Backup de Base de Datos

Supabase hace backups automáticos. Para backups manuales:

1. Ve a Supabase Dashboard
2. Settings > Database
3. Click en "Download backup"

### Monitoreo de Formularios

Los contactos se guardan en la tabla `leads`. Revísalos regularmente en Supabase:

```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

## Troubleshooting

### Error: Cannot connect to Supabase

Verifica que las variables de entorno estén correctamente configuradas en Vercel.

### Error: Build failed

Ejecuta localmente:
```bash
npm run build
```

Revisa los errores y corrígelos antes de hacer push.

### Imágenes no cargan

Verifica que las URLs de las imágenes en la base de datos sean válidas y accesibles.

## Soporte

Para problemas o consultas:
- Revisa los logs en Vercel Dashboard
- Verifica la consola de Supabase
- Consulta la documentación de Next.js y Supabase
