import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'hzf4j9-5173.csb.app'
    ]
  },
  plugins: [react()],
})
