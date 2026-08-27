import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "b8c703f4-bfc6-4e69-9d50-304386872d35-00-1ylc6o1ek6dye.spock.replit.dev",
      ".replit.dev",
      "all"
    ],
    host: true,
    port: 5173
  }
})
