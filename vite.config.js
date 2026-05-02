import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.loca.lt', // Allow all localtunnel domains
      '.ngrok.io', // Allow ngrok domains
      '.tunnel.me', // Allow tunnel.me domains
      'bright-moles-train.loca.lt' // Specific tunnel domain
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
