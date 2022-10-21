import { mount } from 'cypress/vue'
import KRadio from '@/components/KRadio/KRadio.vue'

describe('KRadio', () => {
  it('shows as not selected when modelValue is true', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
      },
    })

    cy.get('input').should('not.be.checked')
  })

  it('shows as selected when modelValue is true', () => {
    mount(KRadio, {
      props: {
        modelValue: true,
        selectedValue: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
      },
    })

    cy.get('input').check().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
    })
  })
})
