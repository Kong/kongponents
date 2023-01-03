/// <reference types="cypress" />

import '@frsource/cypress-plugin-visual-regression-diff'
import Chainable = Cypress.Chainable

Cypress.Commands.add('getTestId', (dataTestId: string): Chainable => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('findTestId', (dataTestId: string): Chainable => {
  return cy.find(`[data-testid=${dataTestId}]`)
})

// Absolute position the fixed/sticky elements on the page
// https://docs.cypress.io/api/commands/screenshot#Full-page-captures-and-fixed-sticky-elements
Cypress.Commands.add('matchImageSnapshot', (options: Record<string, any> = {}): Chainable => {
  // Force absolute positioning on fixed/sticky elements
  cy.get('.VPNav').invoke('css', 'position', 'absolute')
  cy.get('.VPSidebar').invoke('css', 'position', 'absolute')
  cy.get('.aside-container').invoke('css', 'position', 'absolute')
  cy.get('[class^="language-"] .copy').invoke('css', 'visibility', 'hidden')

  let testTitle = Cypress.currentTest.title
  if (Cypress?.currentTest?.titlePath[1]) {
    testTitle = Cypress.currentTest.titlePath[1]
  }

  cy.matchImage({
    diffConfig: {
      threshold: 0.01, // Do not change; if you do, you must run `yarn test:e2e:update-snapshots`
    },
    title: testTitle, // e.g. `alert.md`
    imagesPath: '{spec_path}/snapshots',
    screenshotConfig: {
      capture: 'fullPage',
      scale: true,
      disableTimersAndAnimations: false,
      // Elements to be hidden
      blackout: [
        // Hide the `Last updated` timestamp on docs pages
        '.VPDocFooter .last-updated',
        // Hide the KDateTimePicker display value since it shows the current timestamp and always changes
        '.timepicker-display',
        // Only utilize this class in the `docs/*` directory -- do NOT utilize within the `src/*` directory files
        '.hide-from-visual-regression-tests',
      ],
    },
    ...options,
  })

  // Reset positioning on one fixed/sticky elements
  // Return the last item so the command remains chainable
  return cy.get('.VPNav').invoke('css', 'position', 'fixed')
})
