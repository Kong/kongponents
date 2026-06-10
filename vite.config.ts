import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path, { join } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

/**
 * Wraps the library's emitted CSS in a single `@layer kongponents` cascade layer.
 *
 * Because unlayered styles always win over layered styles, this lets downstream
 * consumers override any Kongponents style with normal (unlayered) CSS without
 * specificity battles or `!important`. The wrap runs once on the fully assembled
 * CSS asset, preserves the leading `@charset` (which must remain the first rule),
 * and is idempotent so the separate UMD build pass cannot double-wrap.
 */
const wrapCssInCascadeLayer = (): Plugin => ({
  name: 'kongponents:wrap-css-cascade-layer',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    for (const file of Object.values(bundle)) {
      if (file.type !== 'asset' || !file.fileName.endsWith('.css') || typeof file.source !== 'string') {
        continue
      }

      let css = file.source
      // Already wrapped (e.g. a reprocessed asset) — skip to stay idempotent.
      if (/@layer\s+kongponents\b/.test(css)) {
        continue
      }

      // `@charset` must remain the very first thing in the file, before `@layer`.
      const charsetMatch = css.match(/^@charset[^;]+;/)
      const charset = charsetMatch ? charsetMatch[0] : ''
      if (charset) {
        css = css.slice(charset.length)
      }

      file.source = `${charset}@layer kongponents{${css}}`
    }
  },
})

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
    ...(process.env.DISABLE_VUE_DEVTOOLS === 'true' ? [] : [VueDevTools()]), // Cypress 14+ introduces an issue with VueDevTools when running tests so we need to disable it in the test environment only
    // Wrap the library's CSS in `@layer kongponents` (skip for the sandbox build).
    ...(process.env.USE_SANDBOX ? [] : [wrapCssInCascadeLayer()]),
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
        // disable for sandbox to avoid broken node_modules paths in output and enable for non-UMD builds
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
