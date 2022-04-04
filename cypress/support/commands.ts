import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

Cypress.Commands.add('getTestId', (dataTestId: string): any => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('findTestId', (dataTestId: string): any => {
  return cy.find(`[data-testid=${dataTestId}]`)
})
