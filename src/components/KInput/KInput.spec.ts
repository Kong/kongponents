import { mount } from 'cypress/vue'
import KInput from '@/components/KInput/KInput.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KInput', () => {
  it('renders text when value is passed', () => {
    const text = 'Hello'
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: text, // e.g. v-model
      },
    })

    cy.get('input').should('have.value', text)
  })

  it('renders label when value is passed', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
      },
    })

    cy.get('.k-input-label').should('contain.text', label)
  })

  it('renders label with labelAttributes applied', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
        labelAttributes: {
          help: 'some help text',
        },
      },
    })

    cy.get('.k-input-label').should('contain.text', label)
    cy.get('.k-input-label .kong-icon-help').should('exist').and('be.visible')

    // expect(wrapper.find('.k-input-label').element.innerHTML).toContain(labelText)
    // expect(wrapper.find('.k-input-label .kong-icon-help').exists()).toBeTruthy()
  })

  it('renders overlayed label when value is passed', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
        overlayLabel: true,
      },
    })

    cy.get('.text-on-input label').should('contain.text', label)
  })

  it('renders small when size is passed in', () => {
    mount(KInput, {
      props: {
        testMode: true,
        size: 'small',
      },
    })

    cy.get('.k-input-wrapper .k-input').should('have.class', 'k-input-small')
  })

  it('renders large when size is passed in', () => {
    mount(KInput, {
      props: {
        testMode: true,
        size: 'large',
      },
    })

    cy.get('.k-input-wrapper .k-input').should('have.class', 'k-input-large')
  })

  it('renders help when value is passed', () => {
    const helpText = 'I am helpful'
    mount(KInput, {
      props: {
        testMode: true,
        help: helpText,
      },
    })

    cy.get('.k-input-wrapper .help').should('contain.text', helpText)
  })

  it('shows character count when characterLimit prop is set and exceeded', () => {
    mount(KInput, {
      props: {
        testMode: true,
        characterLimit: 5,
      },
    })

    cy.get('.k-input-wrapper .over-char-limit').should('not.exist')
    cy.get('.k-input-wrapper input.k-input').type('This input has too many characters')
    cy.get('.k-input-wrapper .over-char-limit').should('be.visible')
  })

  it('reacts to text changes', () => {
    const inputValue = 'hey'
    const newValue = 'hey, dude'
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: inputValue,
      },
    })

    cy.get('.k-input').should('have.value', inputValue)
    cy.get('.k-input').clear()
    cy.get('.k-input').type(newValue).then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.get('.k-input').should('have.value', newValue)
    })
  })
})
