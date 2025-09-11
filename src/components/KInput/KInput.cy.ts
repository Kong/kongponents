import { h } from 'vue'
import KInput from '@/components/KInput/KInput.vue'

describe('KInput', () => {
  it('renders text when value is passed', () => {
    const text = 'Hello'

    cy.mount(KInput, {
      props: {
        modelValue: text, // e.g. v-model
      },
    })

    cy.get('input').should('have.value', text)
  })

  it('renders `null` modelValue as empty string', () => {
    // @ts-ignore - to allow passing an invalid modelValue
    cy.mount(KInput, {
      props: {
        modelValue: null, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'null')
    cy.get('input').should('have.value', '')
  })

  it('renders `undefined` modelValue as empty string', () => {
    cy.mount(KInput, {
      props: {
        modelValue: undefined, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'undefined')
    cy.get('input').should('have.value', '')
  })

  it('renders label when value is passed', () => {
    const label = 'A label'

    cy.mount(KInput, {
      props: {
        label,
      },
    })

    cy.get('.k-label').should('contain.text', label)
  })

  it('renders label with labelAttributes applied', () => {
    const label = 'A label'

    cy.mount(KInput, {
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

    cy.mount(KInput, {
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

  it('handles `required` attribute correctly', () => {
    cy.mount(KInput, {
      props: {
        label: 'A label',
        required: true,
      },
    })

    cy.get('.k-label').should('have.class', 'required')
  })

  it('renders help when value is passed', () => {
    const helpText = 'I am helpful'

    cy.mount(KInput, {
      props: {
        help: helpText,
      },
    })

    cy.get('.k-input .help-text').should('contain.text', helpText)
  })

  it('renders error message when `error` and `errorMessage` are passed', () => {
    const helpText = 'I am helpful'
    const errorMessage = 'This is an error message'

    cy.mount(KInput, {
      props: {
        help: helpText,
        error: true,
        errorMessage,
      },
    })

    cy.get('.k-input .help-text').should('contain.text', errorMessage).and('not.contain.text', helpText)
  })

  it('renders help with `help` slot applied', () => {
    const helpText = 'This is help text'

    cy.mount(KInput, {
      slots: {
        help: () => h('div', {}, helpText),
      },
    })

    cy.get('.k-input .help-text').should('contain.text', helpText)
  })

  it('renders the error message with `error` and `error-message` props and `help` slot applied', () => {
    const helpText = 'This is help text'
    const errorMessage = 'This is an error message'

    cy.mount(KInput, {
      props: {
        error: true,
        errorMessage,
      },
      slots: {
        help: () => h('div', {}, helpText),
      },
    })

    cy.get('.k-input .help-text').should('contain.text', errorMessage)
  })

  it('shows character count when characterLimit prop is set and exceeded', () => {
    const textCharCount = 28
    const charLimit = 5

    cy.mount(KInput, {
      props: {
        characterLimit: charLimit,
      },
    })

    cy.get('.k-input input.input').type(`This input has ${textCharCount} characters`)
    cy.get('.k-input.input-error .help-text').should('contain.text', `${textCharCount} / ${charLimit}`)
  })

  it('reacts to text changes', () => {
    const inputValue = 'hey'
    const newValue = 'hey, dude'

    cy.mount(KInput, {
      props: {
        modelValue: inputValue,
      },
    })

    cy.get('.input').should('have.value', inputValue)
    cy.get('.input').clear()
    cy.get('.input').type(newValue).then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.get('.input').should('have.value', newValue)
    })
  })

  it('renders before slot when passed', () => {
    const beforeSlot = 'before-slot'

    cy.mount(KInput, {
      slots: {
        before: `<span data-testid="${beforeSlot}">Before slot</span>`,
      },
    })

    cy.get('.k-input').find(`[data-testid="${beforeSlot}"]`).should('be.visible')
  })

  it('renders after slot when passed', () => {
    const afterSlot = 'after-slot'

    cy.mount(KInput, {
      slots: {
        after: `<span data-testid="${afterSlot}">After slot</span>`,
      },
    })

    cy.get('.k-input').find(`[data-testid="${afterSlot}"]`).should('be.visible')
  })

  it('toggle masking button is not rendered when showPasswordMaskToggle is true but type is not password', () => {
    cy.mount(KInput, {
      props: {
        type: 'text',
        showPasswordMaskToggle: true,
      },
    })

    cy.get('.k-input .mask-value-toggle-button').should('not.exist')
  })

  it('toggle masking functionality behaves correctly when showPasswordMaskToggle is true and input type is password', () => {
    const afterSlot = 'after-slot'

    cy.mount(KInput, {
      props: {
        type: 'password',
        showPasswordMaskToggle: true,
      },
      slots: {
        after: `<span data-testid="${afterSlot}">After slot</span>`,
      },
    })

    cy.get('.k-input .mask-value-toggle-button').should('be.visible')
    cy.get('.k-input input').should('have.attr', 'type', 'password')
    cy.get('.k-input input').focus()
    cy.get('.k-input .mask-value-toggle-button').click()
    cy.get('.k-input input').should('have.attr', 'type', 'text')
    cy.get('.k-input .mask-value-toggle-button').click()
    cy.get('.k-input input').should('have.attr', 'type', 'password').should('be.focused')
    // user-provided after slot should be rendered
    cy.get('.k-input').find(`[data-testid="${afterSlot}"]`).should('not.exist')
  })
})
