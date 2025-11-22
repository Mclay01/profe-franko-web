/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.profefranko.com' }],
        destination: 'https://profefranko.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Pexels (las que usas en la página)
      { protocol: 'https', hostname: 'images.pexels.com' },
      // (Opcional) si sirves imágenes desde Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

module.exports = nextConfig;
