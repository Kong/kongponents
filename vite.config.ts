import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// Include the rollup-plugin-visualizer if the BUILD_VISUALIZER env var is set to "true"
const buildVisualizerPlugin = process.env.BUILD_VISUALIZER
  ? visualizer({
    filename: path.resolve(__dirname, 'bundle-analyzer/stats-treemap.html'),
    template: 'treemap', // sunburst|treemap|network
    sourcemap: true,
    gzipSize: true,
  })
  : undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
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
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Kongponents',
      fileName: (format) => `kongponents.${format}.js`,
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
      plugins: [
        // visualizer must remain last in the list of plugins
        buildVisualizerPlugin,
      ],
    },
  },
  optimizeDeps: {
    include: [
      'cypress',
      'vue',
      'focus-trap',
      'focus-trap-vue',
    ],
  },
})
