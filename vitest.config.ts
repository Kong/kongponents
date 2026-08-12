import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// Two test projects share this root config:
//
// - `unit`      — jsdom, for pure logic: composables, utilities, theme helpers.
// - `component` — Vitest Browser Mode (Chromium via Playwright), for component tests.
//
// Component tests run in a real browser because Kongponents is an atomic component
// library: layout, computed styles, focus behaviour and popper/floating-ui positioning
// are part of the contract, and they can only be observed truthfully in a browser.
// It also means you can run the suite headed and inspect a component as it's tested.
//
// The split is by directory rather than by filename so both projects can use the
// conventional `*.spec.ts` suffix. Anything under `src/components/` is a component
// test; everything else is a unit test.
export default defineConfig({
  plugins: [vue()],
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
        // Mirrors `vite.config.ts`. Component SFCs use mixins and variables from
        // `@/styles/globals` without importing them, so tests cannot compile any
        // component's <style lang="scss"> block without this injection.
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
          include: ['src/{composables,utilities,theme}/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'component',
          include: ['src/components/**/*.spec.ts'],
          // `vitest-browser-vue` unmounts rendered components between tests. Without
          // it, mounted trees accumulate in the page and locators match stale nodes.
          setupFiles: ['vitest-browser-vue', './test/setup.ts'],
          // Matches the Cypress `retries.runMode: 1` we're replacing.
          retry: process.env.CI ? 1 : 0,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            // Same viewport the Cypress component runner used, so tests that depend
            // on available width behave the same before and after conversion.
            viewport: { width: 1366, height: 768 },
          },
        },
      },
    ],
  },
})
