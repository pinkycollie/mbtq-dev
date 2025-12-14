import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages deployment, use CLI flag: npm run build -- --base=/mbtq-dev/app/
// This is the recommended Vite approach for setting base path at build time
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
