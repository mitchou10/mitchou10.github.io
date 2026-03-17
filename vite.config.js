import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base '/' works for user/org GitHub Pages sites (username.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
