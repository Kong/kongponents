import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
})

Cypress.Commands.add('getTestId', (dataTestId: string): any => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('findTestId', (dataTestId: string): any => {
  return cy.find(`[data-testid=${dataTestId}]`)
})
