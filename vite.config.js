import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Web Scraping için proxy 2. bir plan için kalabilir.
    proxy: {
      "/harem": {
        target: "https://www.haremaltin.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/harem/, ""),
      },
    },
  },
})
