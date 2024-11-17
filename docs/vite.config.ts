import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5158', // Backend server address
        changeOrigin: true, // Required for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix
      },
    },
  },
})
