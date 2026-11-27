import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Mirrors the consumer's build: a plain Vite production build with default minify.
export default defineConfig({
  plugins: [vue()],
})
