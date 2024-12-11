import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist/nuxt'),
    lib: {
      entry: path.resolve(__dirname, 'module/kongponents.nuxt.ts'),
      name: 'KongponentsNuxt',
      fileName: (format) => {
        if (format === 'cjs') {
          return 'kongponents-nuxt.cjs'
        } else {
          return `kongponents-nuxt.${format}.js`
        }
      },
      formats: ['es', 'cjs'],
    },
    minify: true,
    sourcemap: false,
    rollupOptions: {
      external: ['@nuxt/kit'], // Exclude Nuxt Kit from the bundle
    },
  },
})
