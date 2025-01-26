import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true  // This is due to a WSL2 limitation with the Windows filesystem: https://v2.vitejs.dev/config/#server-hmr
      // ignored: ['!**/node_modules/your-package-name/**']
    }
  },
  build: {
    sourcemap: true
  }
})
