import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Esto captura /api/provincias Y TAMBIÉN /api/municipios
      '/api': {
        target: 'https://apis.datos.gob.ar/georef/api/v2.0', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
