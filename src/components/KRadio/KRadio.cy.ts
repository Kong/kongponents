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

      cy.wrap(Cypress.vueWrapper.emitted('change')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', true)
    })
  })

  it('renders the default slot content when card prop is true', () => {
    const slotText = 'Hello world'

    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        label: 'Some label',
      },
      slots: {
        default: () => slotText,
      },
    })

    cy.get('.radio-card').should('contain.text', slotText)
  })

  it('renders input element hidden when card prop is true', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        label: 'Some label',
      },
    })

    cy.get('input').should('not.be.visible')
  })

  it('emits checked value on click within entire label element when card prop is true', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
      },
      slots: {
        default: () => 'Hello',
      },
    })

    cy.get('label')
      .click()
      .then(() => {
        cy.get('input').should('be.checked')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      })
  })

  it('should not be selectable when disabled and card prop is true', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
      },
      attrs: {
        disabled: true,
      },
      slots: {
        default: () => 'Hello',
      },
    })

    cy.get('label').click().then(() => {
      cy.get('input').should('not.be.checked')
    })
  })
})
