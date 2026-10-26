import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Browser QA artifacts are local-only and can contain locked Chromium files.
    watch: { ignored: ['**/.qa/**'] },
  },
})
