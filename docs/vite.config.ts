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
      // This just ensures the style import isn't impacted by the separate v-calendar alias below
      'v-calendar/dist/style.css': path.resolve(__dirname, '../node_modules/v-calendar/dist/style.css'),
      // We must alias `v-calendar` here for the docs build to specifically utilize the esm build
      'v-calendar': path.resolve(__dirname, '../node_modules/v-calendar/dist/es/index.js'),
      // We must alias `@kong/design-tokens` imports to specifically utilize the esm build
      '@kong/design-tokens/tokens/scss/variables': path.resolve(__dirname, '../node_modules/@kong/design-tokens/dist/tokens/scss/variables.scss'),
      '@kong/design-tokens': path.resolve(__dirname, '../node_modules/@kong/design-tokens/dist/tokens/js/'),
      // We must alias `date-fns-tz` here for the docs build to specifically utilize the esm build
      'date-fns-tz': path.resolve(__dirname, '../node_modules/date-fns-tz/esm'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Inject the @kong/design-tokens SCSS variables, kongponents variables and mixins to make them available for all components.
        // This is not needed in host applications.
        additionalData: `
          @use "@/styles/vars";
          @use "@/styles/mixins";
        `,
      },
    },
  },
})
