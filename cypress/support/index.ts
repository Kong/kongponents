// Import Kongponent styles
import '@/styles/styles.scss'

// Import custom Cypress commands
import './commands'

afterEach(() => {
  // Match visual snapshot from 'cypress-image-snapshot' after each test
  // https://github.com/jaredpalmer/cypress-image-snapshot
  cy.matchImageSnapshot()
})
