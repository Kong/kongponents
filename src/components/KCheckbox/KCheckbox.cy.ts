import { mount } from 'cypress/vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'

/**
 * ALL TESTS MUST USE testMode
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KCheckbox', () => {
  it('shows as checked when prop passed', () => {
    const model = true
    mount(KCheckbox, {
      props: {
        modelValue: model,
        testMode: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    const model = false
    mount(KCheckbox, {
      props: {
        modelValue: model,
        testMode: true,
      },
    })

    cy.get('input').check().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')

      cy.wrap(Cypress.vueWrapper.emitted('input')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('change')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', true)
    })
  })
})
