import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/2sv-prototype/',
  preview: {
    allowedHosts: ['.ngrok-free.app']
  }
})
