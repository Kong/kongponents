import { defineConfig } from 'cypress'
import failFast from 'cypress-fail-fast/plugin'

export default defineConfig({
  component: {
    env: {
      FAIL_FAST_ENABLED: true,
      FAIL_FAST_STRATEGY: 'spec',
    },
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions {
      failFast(on, config)

      return config
    },
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: 'src/**/*.cy.ts',
    supportFile: 'cypress/support/index.ts',
  },
  includeShadowDom: true,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  retries: {
    runMode: 1,
  },
  trashAssetsBeforeRuns: false,
})
