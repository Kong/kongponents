import { mount } from 'cypress/vue'
import KRadio from '@/components/KRadio/KRadio.vue'

/**
 * ALL TESTS MUST USE testMode
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KRadio', () => {
  it('shows as not selected when modelValue is true', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        testMode: true,
      },
    })

    cy.get('input').should('not.be.checked')
  })

  it('shows as selected when modelValue is true', () => {
    mount(KRadio, {
      props: {
        modelValue: true,
        selectedValue: true,
        testMode: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        testMode: true,
      },
    })

    cy.get('input').check().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')

      cy.wrap(Cypress.vueWrapper.emitted('change')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', true)
    })
  })

  it('renders the default slot content when type prop is card', () => {
    const slotText = 'Hello world'
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
        label: 'Some label',
        testMode: true,
      },
      slots: {
        default: () => slotText,
      },
    })

    cy.get('.k-radio-card').should('contain.text', slotText)
  })

  it('renders input element hidden when type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
        label: 'Some label',
        testMode: true,
      },
    })

    cy.get('input').should('not.be.visible')
  })

  it('emits checked value on click within entire label element when type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
        testMode: true,
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

  it('should not be selectable when disabled and type prop is card', () => {
    mount(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        type: 'card',
        testMode: true,
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
