import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('lucide-react'))  return 'vendor-icons'
          if (id.includes('react-dom') || id.includes('react-router') || (id.includes('node_modules/react/') )) return 'vendor-react'
        },
      },
    },
  },
})
