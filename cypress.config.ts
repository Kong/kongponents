import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: 'src/**/*.cy.ts',
    supportFile: 'cypress/support/index.ts',
    env: {
      pluginVisualRegressionDiffConfig: { threshold: 0.01 },
      pluginVisualRegressionUpdateImages: true,
      pluginVisualRegressionCleanupUnusedImages: true,
    },
    setupNodeEvents(on, config) {
      initPlugin(on, config)
    },
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
