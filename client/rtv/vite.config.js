import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // WRAPPING THE PROXY IN THIS OBJECT WE CALLED SERVER IS HOW YOU MAKE IT WORK //
    proxy: {
      '/auth': {
        target: 'http://localhost:7200'
      },
      '/api': {
        target: 'http://localhost:7200',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
