import { mount } from 'cypress/vue'
import KInput from '@/components/KInput/KInput.vue'
import { h } from 'vue'

describe('KInput', () => {
  it('renders text when value is passed', () => {
    const text = 'Hello'

    mount(KInput, {
      props: {
        modelValue: text, // e.g. v-model
      },
    })

    cy.get('input').should('have.value', text)
  })

  it('renders `null` modelValue as empty string', () => {
    // @ts-ignore - to allow passing an invalid modelValue
    mount(KInput, {
      props: {
        modelValue: null, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'null')
    cy.get('input').should('have.value', '')
  })

  it('renders `undefined` modelValue as empty string', () => {
    mount(KInput, {
      props: {
        modelValue: undefined, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'undefined')
    cy.get('input').should('have.value', '')
  })

  it('renders label when value is passed', () => {
    const label = 'A label'

    mount(KInput, {
      props: {
        label,
      },
    })

    cy.get('.k-label').should('contain.text', label)
  })

  it('renders label with labelAttributes applied', () => {
    const label = 'A label'

    mount(KInput, {
      props: {
        label,
        labelAttributes: {
          info: 'some info text',
        },
      },
    })

    cy.get('.k-label').should('contain.text', label)
    cy.get('.k-label .tooltip-trigger-icon').should('exist').and('be.visible')
  })

  it('renders label and tooltip with `label-tooltip` slot applied', () => {
    const label = 'A label'

    mount(KInput, {
      props: {
        label,
      },
      slots: {
        'label-tooltip': () => h('div', {}, 'This is a tooltip'),
      },
    })

    cy.get('.k-label').should('contain.text', label)
    cy.get('.k-label .tooltip-trigger-icon').should('exist').and('be.visible')
  })

  it.skip('renders label with required symbol when `required` attribute is set', () => {
    // TODO: implement when KLabel component is reskinned
  })

  it('renders help when value is passed', () => {
    const helpText = 'I am helpful'

    mount(KInput, {
      props: {
        help: helpText,
      },
    })

    cy.get('.k-input-wrapper .help-text').should('contain.text', helpText)
  })

  it('shows character count when characterLimit prop is set and exceeded', () => {
    const textCharCount = 28
    const charLimit = 5

    mount(KInput, {
      props: {
        characterLimit: charLimit,
      },
    })

    cy.get('.k-input-wrapper .over-char-limit').should('not.exist')
    cy.get('.k-input-wrapper input.k-input').type(`This input has ${textCharCount} characters`)
    cy.get('.k-input-wrapper.has-error .help-text').should('contain.text', `${textCharCount} / ${charLimit}`)
  })

  it('reacts to text changes', () => {
    const inputValue = 'hey'
    const newValue = 'hey, dude'

    mount(KInput, {
      props: {
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

  it('renders before slot when passed', () => {
    const beforeSlot = 'before-slot'

    mount(KInput, {
      slots: {
        before: `<span data-testid="${beforeSlot}">Before slot</span>`,
      },
    })

    cy.get('.k-input-wrapper').find(`[data-testid="${beforeSlot}"]`).should('be.visible')
  })

  it('renders after slot when passed', () => {
    const afterSlot = 'after-slot'

    mount(KInput, {
      slots: {
        after: `<span data-testid="${afterSlot}">After slot</span>`,
      },
    })

    cy.get('.k-input-wrapper').find(`[data-testid="${afterSlot}"]`).should('be.visible')
  })
})
