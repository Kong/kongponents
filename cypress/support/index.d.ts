import type { mount } from 'cypress/vue'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @description Custom alias command for cy.get() to select DOM element by data-testid attribute.
       * @param {string} dataTestId
       * @example cy.dataTestId('kong-auth-login-submit')
       */
      getTestId(dataTestId: string): Chainable<Element>

      /**
       * @description Custom alias command for cy.find() to select DOM element by data-testid attribute.
       * @param {string} dataTestId
       * @example cy.findTestId('kong-auth-login-submit')
       */
      findTestId(dataTestId: string): Chainable<Element>

      /**
       * @description Enhance `mount` from `cypress/vue` with our custom setup.
       */
      mount: typeof mount

      /**
       * @description Enhance `mount` from `cypress/vue` with our custom setup and a production-build router.
       */
      mountWithProdRouter: typeof mount
    }
  }
}
