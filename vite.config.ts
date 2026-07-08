import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    watch: {
      ignored: ['**/images/**'],
    },
  },
  optimizeDeps: {
    include: ['framer-motion'],
  },
})
