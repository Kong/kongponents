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

  it('renders input element hidden when type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
      },
    })

    cy.get('input').should('not.be.visible')
  })

  it('should be checkable by click within entire label element when type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
      },
    })

    cy.get('label').click().then(() => {
      cy.get('input').should('be.checked')
    })
  })

  it('should not be checkable when disabled and type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
      },
      attrs: {
        disabled: true,
      },
    })

    cy.get('label').click().then(() => {
      cy.get('input').should('not.be.checked')
    })
  })
})
