import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/trial-website/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('react-router-dom')
          ) {
            return 'react-vendor'
          }

          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-katex') || id.includes('/katex/')) return 'math'
          if (id.includes('prismjs')) return 'code'
        },
      },
    },
  },
})
