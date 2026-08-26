import { configDefaults, defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * Two test projects share this root config:
 *
 * - `unit`    — jsdom, for pure logic: composables, utilities, theme helpers.
 * - `browser` — Browser Mode (Chromium, Firefox and WebKit via Playwright), for
 *               component tests.
 *
 * The suffix decides which project claims a file: `*.browser.spec.ts` runs in the browser,
 * every other `*.spec.ts` runs in jsdom. Directory doesn't matter, so a component can have
 * both kinds of test side by side.
 */
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    /**
     * `vitest-browser-vue` is only referenced from `setupFiles`, so Vite doesn't discover it
     * during its initial dependency crawl and pre-bundles it on demand instead. On a cold
     * cache (every CI run) that on-demand optimization races the browser instances starting
     * up concurrently, and whichever one loses throws "Vitest failed to find the runner" —
     * or, for a dependency first pulled in partway through the run (e.g. `swrv`, only
     * imported transitively via `useUtilities`), hangs a browser instance outright instead
     * of erroring. Listing deps here folds them into the eager pre-bundle, done before any
     * instance connects.
     */
    include: ['vitest-browser-vue', '@kong/design-tokens/tokens/themeable-tokens', 'swrv', 'virtua/vue', 'lodash-es'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@mocks': path.resolve(__dirname, './mocks/'),
      '@test': path.resolve(__dirname, './test/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        /**
         * Mirrors `vite.config.ts`. Component SFCs use mixins and variables from
         * `@/styles/globals` without importing them, so their `<style lang="scss">` blocks
         * won't compile without this injection.
         */
        additionalData: `
          @use "@/styles/globals" as *;
        `,
      },
    },
  },
  test: {
    clearMocks: true,
    restoreMocks: true,
    reporters: ['tree', ...[process.env.GITHUB_ACTIONS ? 'github-actions' : ''].filter(Boolean)],
    projects: [
      {
        // `extends: true` inherits the plugins, aliases and CSS options above.
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.spec.ts'],
          exclude: [...configDefaults.exclude, 'src/**/*.browser.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.browser.spec.ts'],
          /**
           * `vitest-browser-vue` unmounts rendered components between tests. Without it,
           * mounted trees accumulate in the page and locators match stale nodes.
           */
          setupFiles: ['vitest-browser-vue', './test/setup.ts'],
          // Matches the Cypress `retries.runMode: 1` we're replacing.
          retry: process.env.CI ? 1 : 0,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            /**
             * Every spec runs in each browser, so engine differences in layout, computed
             * styles and font metrics surface here rather than in a consumer's app.
             * `webkit` is Playwright's WebKit build, not Safari itself — close enough for
             * engine-level differences, but not a substitute for real Safari testing.
             */
            instances: [
              { browser: 'chromium' },
              { browser: 'firefox' },
              { browser: 'webkit' },
            ],
            viewport: { width: 1366, height: 768 },
          },
        },
      },
    ],
  },
})
