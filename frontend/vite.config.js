import { defineConfig } from 'vite' // 👈 This import was missing or deleted
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: { outDir: 'build' }, // 👈 Commented out: Let Vercel use the default 'dist' folder
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})