import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For local development, base is '/'
// For production GitHub Pages deployment, use: npm run build -- --base=/mbtq-dev/app/
export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
