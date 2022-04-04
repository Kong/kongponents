// Import Kongponent styles
import '@/styles/styles.scss'

// Import custom Cypress commands
import './commands'

afterEach(() => {
  // Match visual snapshot from 'cypress-image-snapshot' after each test
  // https://github.com/jaredpalmer/cypress-image-snapshot
  cy.matchImageSnapshot(undefined, {
    failureThreshold: 0.03, // threshold for entire image
    failureThresholdType: 'percent', // percent of image or number of pixels
    customDiffConfig: { threshold: 0.01 }, // threshold for each pixel
    capture: 'viewport', // capture viewport in screenshot
  })
})
