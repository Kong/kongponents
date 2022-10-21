import { mount } from 'cypress/vue'
import KInputSwitch from '@/components/KInputSwitch/KInputSwitch.vue'

describe('KInputSwitch', () => {
  it('shows as checked when prop passed', () => {
    mount(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    mount(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    cy.get('input').click({ force: true }).then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
    })
  })

  it('shows enabled icon if prop is set', () => {
    mount(KInputSwitch, {
      props: {
        modelValue: true,
        enabledIcon: true,
      },
    })

    cy.get('.k-input-switch .kong-icon').should('be.visible')
  })
})
