import { mount } from 'cypress/vue'
import KTextArea from '@/components/KTextArea/KTextArea.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Debug mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */

describe('KTextArea', () => {
  it('renders text when value is passed', () => {
    const value = 'Howdy!'
    mount(KTextArea, {
      props: {
        testMode: true,
        modelValue: value, // v-model
      },
    })

    cy.get('textarea').should('have.value', value)
  })

  it('renders label when value is passed', () => {
    const labelText = 'A Label!'
    mount(KTextArea, {
      props: {
        testMode: true,
        label: labelText,
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label'
    mount(KTextArea, {
      props: {
        testMode: true,
        label: labelText,
        labelAttributes: {
          info: 'some help text',
        },
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
    cy.get('.k-label .tooltip-trigger-icon').should('be.visible')
  })

  it('renders overlayed label when value is passed', () => {
    const labelText = 'A Label'
    mount(KTextArea, {
      props: {
        testMode: true,
        label: labelText,
        overlayLabel: true,
      },
    })

    cy.get('.text-on-input label').should('contain.text', labelText)
  })

  it('renders an asterisk when `overlayLabel` is true and `required` attr is set', () => {
    const label = 'A label'
    mount(KTextArea, {
      props: {
        testMode: true,
        label,
        overlayLabel: true,
      },
      attrs: {
        required: true,
      },
    })

    cy.get('.text-on-input  .is-required').should('exist')
  })

  it('renders textarea when rows and cols are passed in', () => {
    mount(KTextArea, {
      props: {
        testMode: true,
        rows: 2,
        cols: 15,
      },
    })

    cy.get('textarea').should('be.visible')
  })

  it('reacts to text changes', () => {
    const value1 = 'hey'
    const value2 = 'hey, dude'
    mount(KTextArea, {
      props: {
        testMode: true,
        modelValue: value1, // v-model
      },
    })

    cy.get('textarea').should('have.value', value1)
    cy.get('textarea').clear()
    cy.get('textarea').type(value2).then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      const emitArray = Cypress.vueWrapper.emitted('input')
      cy.wrap(String(emitArray?.[emitArray.length - 1])).should('eq', value2)
    })
    cy.get('textarea').should('have.value', value2)
  })

  it('can configure character limit', () => {
    const charLimit = 500
    mount(KTextArea, {
      props: {
        testMode: true,
        characterLimit: charLimit,
      },
    })

    cy.get('.char-limit').should('contain.text', charLimit)
  })

  it('should have style when value exceeds the character limit', () => {
    const charLimit = 20
    mount(KTextArea, {
      props: {
        testMode: true,
        characterLimit: charLimit,
      },
    })

    cy.get('textarea').type('a'.repeat(charLimit + 1))
    cy.get('textarea').should('have.value', 'a'.repeat(charLimit + 1))
    cy.get('div.over-char-limit').should('be.visible')
  })

  it('should allow disabling character limit', () => {
    mount(KTextArea, {
      props: {
        testMode: true,
        disableCharacterLimit: true,
      },
    })

    cy.get('.char-limit').should('not.exist')
  })

  it('should have `is-resizable` class when is-resizable prop is enabled', () => {
    mount(KTextArea, {
      props: {
        isResizable: true,
      },
    })

    cy.get('textarea').should('have.class', 'is-resizable')
  })
})
