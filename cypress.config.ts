import { defineConfig } from 'cypress'
import viteConfig from './vite.config'

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        ...viteConfig,
      },
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
