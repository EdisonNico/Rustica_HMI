import type { NextConfig } from 'next'

/**
 * Exportación estática: el sitio no necesita servidor, así que se despliega
 * en Render como "Static Site" (comando de build: `npm install && npm run build`,
 * directorio de publicación: `out`).
 */
const config: NextConfig = {
  output: 'export',
  trailingSlash: true, // /menu/ → menu/index.html (funciona en cualquier hosting estático)
  images: {
    unoptimized: true, // el optimizador de imágenes requiere servidor
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

export default config
