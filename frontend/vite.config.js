import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/notes-challenge/',
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ?? 4005
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ?? 10000
  }
})
