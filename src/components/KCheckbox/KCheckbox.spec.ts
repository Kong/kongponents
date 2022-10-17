import { mount } from 'cypress/vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'

describe('KCheckbox', () => {
  it('shows as checked when prop passed', () => {
    mount(KCheckbox, {
      props: {
        modelValue: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    mount(KCheckbox, {
      props: {
        modelValue: false,
      },
    })

    cy.get('input').check().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')

      cy.wrap(Cypress.vueWrapper.emitted('input')[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('change')[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')[0][0]).should('eq', true)
    })
  })
})
