import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite's default port
    proxy: {
      // Proxy all API requests during local development
      '/api': {
        target: 'https://fullstackecommercewebapp-back-end.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Retain /api prefix
      },
    },
  },
})
