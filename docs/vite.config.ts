import { defineConfig } from 'vite'
import path from 'path'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // Alias src directory for @/components/{KongponentName} imports
      '@': path.resolve(__dirname, '../src/'),
      '@vitepress': path.resolve(__dirname, './.vitepress/'),
      '@mocks': path.resolve(__dirname, '../mocks/'),
    },
  },
  optimizeDeps: {
    include: ['v-calendar'],
    force: true,
  },
})
