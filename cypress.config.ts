import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'
import failFast from 'cypress-fail-fast/plugin'
import fs from 'fs'

// Generate an array of all docs markdown pages for visual regression testing
const getDocsPages = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getDocsPages(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(`${dirPath.replace(/\.\/docs/gi, '')}/${file.replace(/\.md/gi, '')}`)
    }
  }

  return arrayOfFiles
}

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    viewportHeight: 768,
    viewportWidth: 1366,
    specPattern: 'src/**/*.cy.ts',
    supportFile: 'cypress/support/component.ts',
    setupNodeEvents(on, config) {
      // Initialize fail-fast plugin
      failFast(on, config)

      return config
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

  e2e: {
    specPattern: 'docs/tests/e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:3173',
    viewportHeight: 768, // Set this to something huge so the page doesn't have to scroll
    viewportWidth: 1366,
    video: false,
    supportFile: 'cypress/support/e2e.ts',
    env: {
      pluginVisualRegressionCleanupUnusedImages: true,
      FAIL_FAST_ENABLED: true,
    },
    retries: {
      runMode: 0,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // Initialize fail-fast plugin
      failFast(on, config)
      // Initialize snapshot plugin
      initPlugin(on, config)

      // Get list of docs pages
      const docsPages = getDocsPages('./docs/components')
      // Set list of docs pages to env variable for use in `docs/tests/e2e/pages.cy.ts`
      config.env.docsPages = docsPages

      return config
    },
  },
})
