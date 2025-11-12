import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path, { join } from 'path'
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

// !Important: always externalize `shiki/onig.wasm`
const externalSandboxDependencies: string[] = ['shiki/onig.wasm']

// we need to have a separate build for UMD to avoid issues with dynamic imports and preserveModules
const isUMDBuild = process.env.BUILD_UMD === 'true'
const buildFormats: Array<'es' | 'cjs' | 'umd'> = isUMDBuild ? ['umd'] : ['es', 'cjs']

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
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
    preprocessorOptions: {
      scss: {
        api: 'modern',
        // Inject the @kong/design-tokens SCSS variables, kongponents variables and mixins to make them available for all components.
        // This is not needed in host applications.
        additionalData: `
          @use "@/styles/globals" as *;
        `,
      },
    },
  },
  base: process.env.USE_SANDBOX && !process.env.USE_NETLIFY ? '/kongponents/' : '/',
  build: {
    emptyOutDir: isUMDBuild ? false : true,
    lib: process.env.USE_SANDBOX
      ? undefined
      : {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'Kongponents',
        fileName: (format) => {
          if (format === 'cjs') {
            return 'kongponents.cjs'
          } else {
            return `kongponents.${format}.js`
          }
        },
        formats: buildFormats,
      },
    minify: true,
    sourcemap: !!process.env.BUILD_VISUALIZER,
    rollupOptions: {
      external: process.env.USE_SANDBOX ? externalSandboxDependencies : ['vue', 'vue-router'],
      output: {
        globals: process.env.USE_SANDBOX
          ? undefined
          : {
            vue: 'Vue',
            'vue-router': 'VueRouter',
          },
        exports: 'named',
        preserveModules: process.env.USE_SANDBOX ? false : !isUMDBuild,
        preserveModulesRoot: isUMDBuild ? undefined : 'src',
        inlineDynamicImports: isUMDBuild ? true : false,
      },
      // this option is needed because of preserveModules usage for preview build to work
      preserveEntrySignatures: 'strict',
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
  server: {
    fs: {
      // Allow serving files from one level up from the package root - IMPORTANT - to support the sandbox
      allow: [join(__dirname, '..')],
    },
  },
  // Change the root when utilizing the sandbox via USE_SANDBOX=true to use the `/sandbox/*` files
  // During the build process, the `/sandbox/*` files are not used and we should default to the package root.
  root: process.env.USE_SANDBOX ? './sandbox' : process.cwd(),
})
