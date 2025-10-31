# Inicio Rápido - Boxing Chile

## 🚀 En 5 minutos

### 1. Verificar que todo está listo

El proyecto ya está completamente configurado:
- ✅ Base de datos Supabase creada y conectada
- ✅ Schema de tablas aplicado
- ✅ Variables de entorno configuradas
- ✅ Dependencias en package.json

### 2. Instalar dependencias

```bash
npm install
```

**Tiempo estimado**: 2-3 minutos

### 3. Poblar la base de datos

```bash
npm run seed
```

Esto agregará:
- 8 partners (clubes, federaciones, partners)
- 6 eventos realizados
- 5 certificados
- 12 productos Olymphus

**Tiempo estimado**: 10 segundos

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

**¡Listo! El sitio está funcionando.**

## 🎨 Lo que verás

### Página Principal (/)
- Hero impactante con fondo negro y detalles amarillos
- Sección de visión con estadísticas animadas
- Perfil profesional del organizador
- Timeline de logros y certificados
- Grid de partners (clubes y federaciones)
- Últimos eventos realizados
- Banner destacado de Olymphus
- Selector de roles para contactar

### Tienda (/tienda)
- 12 productos del catálogo Olymphus
- Búsqueda y filtros por categoría
- Diseño limpio estilo e-commerce

### Partners (/partners)
- 8 organizaciones aliadas
- Filtros por tipo (club, federación, partner)
- Búsqueda por nombre o ciudad

### Eventos (/eventos)
- 6 eventos realizados
- Detalles de fecha, lugar y capacidad
- Galerías de fotos

### Contacto (/contacto)
- Formulario completo validado
- Envío a base de datos
- Notificaciones toast

## 📝 Probar el Formulario

1. Ve a la página principal
2. Scroll hasta "¿Quién eres?"
3. Selecciona cualquier rol (Peleador, Árbitro, etc.)
4. Se abrirá un drawer lateral
5. Completa el formulario
6. Click en "Enviar mensaje"
7. Verás una notificación de éxito
8. El contacto se guardó en Supabase tabla `leads`

## 🔍 Verificar Datos en Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Abre tu proyecto
3. Click en "Table Editor"
4. Verás las tablas:
   - `leads`: Formularios de contacto
   - `events`: Eventos
   - `partners`: Partners
   - `certificates`: Certificados
   - `products`: Productos

## 🚢 Deploy en Vercel

### Opción 1: CLI (más rápido)

```bash
npx vercel
```

Sigue las instrucciones en pantalla.

### Opción 2: Dashboard

1. Ve a [vercel.com](https://vercel.com)
2. Click "New Project"
3. Importa tu repositorio
4. Click "Deploy"

**Tiempo estimado**: 3 minutos

Las variables de entorno ya están en `.env` y funcionarán automáticamente.

## 🎯 Páginas Disponibles

| URL | Descripción |
|-----|-------------|
| `/` | Página principal |
| `/tienda` | Catálogo Olymphus |
| `/partners` | Directorio de partners |
| `/eventos` | Archivo de eventos |
| `/contacto` | Formulario de contacto |
| `/legal/privacidad` | Política de privacidad |
| `/legal/terminos` | Términos y condiciones |
| `/legal/devoluciones` | Política de devoluciones |

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor (puerto 3000)
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run typecheck    # Verificar tipos TypeScript

# Base de datos
npm run seed         # Poblar con datos de ejemplo
```

## 📱 Responsive Testing

El sitio es 100% responsive. Prueba en:
- Mobile (375px): iPhone SE
- Tablet (768px): iPad
- Desktop (1280px): Laptop
- Large (1536px): Desktop grande

**Chrome DevTools**: F12 > Toggle Device Toolbar (Ctrl+Shift+M)

## 🎨 Paleta de Colores

- **Amarillo**: `#FFD60A` - Marca principal
- **Negro**: `#0A0A0A` - Fondos
- **Blanco**: `#FFFFFF` - Texto
- **Rojo**: `#D90429` - Acento

## ⚡ Performance

El sitio está optimizado para:
- **LCP**: < 1.8s
- **CLS**: < 0.1
- **First Load JS**: ~200-250KB por página

Verifica en [PageSpeed Insights](https://pagespeed.web.dev/)

## 🐛 Troubleshooting

### El sitio no carga
```bash
# Limpia caché de Next.js
rm -rf .next
npm run build
npm run dev
```

### Error de Supabase
Verifica que las variables en `.env` sean correctas:
```env
NEXT_PUBLIC_SUPABASE_URL=https://meepadcbwxukzmxlihxi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-key>
```

### No hay datos
```bash
# Ejecuta el seed nuevamente
npm run seed
```

### Build falla
```bash
# Verifica tipos
npm run typecheck

# Verifica lint
npm run lint
```

## 📚 Documentación Adicional

- `README.md` - Documentación completa
- `DEPLOYMENT.md` - Guía de deployment
- `DESIGN.md` - Guía de diseño
- `PROJECT_SUMMARY.md` - Resumen del proyecto

## 🎉 ¡Éxito!

Si llegaste hasta aquí, tu sitio de Boxing Chile está funcionando perfectamente.

### Próximos pasos sugeridos:

1. ✅ Personaliza el contenido
2. ✅ Agrega tu logo
3. ✅ Configura dominio personalizado
4. ✅ Conecta Google Analytics
5. ✅ Comparte con tu equipo

## 💬 Soporte

Si tienes problemas:
1. Revisa la documentación completa en `README.md`
2. Verifica los logs en la consola del navegador
3. Revisa los logs en Vercel (si está deployado)
4. Verifica la consola de Supabase

---

**¡Disfruta tu nuevo sitio web profesional de boxeo!** 🥊
