import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'

export default defineConfig({
  env: {
    pluginVisualRegressionImagesPath: '{spec_path}/__snapshots__',
    pluginVisualRegressionCleanupUnusedImages: true,
    pluginVisualRegressionUpdateImages: true,
    pluginVisualRegressionDiffConfig: { threshold: 0.01 },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: 'src/**/*.spec.ts',
    supportFile: 'cypress/support/index.ts',
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
