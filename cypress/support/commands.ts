Cypress.Commands.add('getTestId', (dataTestId: string): any => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('findTestId', (dataTestId: string): any => {
  return cy.find(`[data-testid=${dataTestId}]`)
})
