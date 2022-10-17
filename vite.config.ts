import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Alias src directory for @/components/{KongponentName} imports
      '@': path.resolve(__dirname, './src/'),
      '@mocks': path.resolve(__dirname, './mocks/'),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Kongponents',
      fileName: (format) => `kongponents.${format}.js`,
    },
    minify: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemap: true,
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
  optimizeDeps: {
    include: [
      'cypress',
      'vue',
    ],
  },
})
