import { mount } from 'cypress/vue'
import KTextArea from '@/components/KTextArea/KTextArea.vue'

describe('KTextArea', () => {
  it('renders text when value is passed', () => {
    const value = 'Howdy!'
    mount(KTextArea, {
      props: {
        modelValue: value,
      },
    })

    cy.get('textarea').should('have.value', value)
  })

  it('renders `label` when value is passed', () => {
    const labelText = 'A Label!'
    mount(KTextArea, {
      props: {
        label: labelText,
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
  })

  it('renders label with `labelAttributes` applied', () => {
    const labelText = 'A Label'
    mount(KTextArea, {
      props: {
        label: labelText,
        labelAttributes: {
          info: 'some info text',
        },
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
    cy.get('.k-label .tooltip-trigger-icon').should('be.visible')
  })

  it('handles `required` attribute correctly', () => {
    mount(KTextArea, {
      props: {
        label: 'A label',
        required: true,
      },
    })

    cy.get('.k-label').should('have.class', 'required')
  })

  it('renders textarea when `rows` prop is passed in', () => {
    mount(KTextArea, {
      props: {
        rows: 2,
      },
    })

    cy.get('textarea').should('be.visible').should('have.attr', 'rows', '2')
  })

  it('reacts to text changes', () => {
    const value1 = 'hey'
    const value2 = 'hey, dude'

    mount(KTextArea, {
      props: {
        modelValue: value1,
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

  it('shows character count when `characterLimit` prop is set and exceeded', () => {
    const textCharCount = 28
    const charLimit = 5

    mount(KTextArea, {
      props: {
        characterLimit: charLimit,
      },
    })

    cy.get('textarea').type(`This input has ${textCharCount} characters`)
    cy.get('.k-textarea.input-error .help-text').should('contain.text', `${textCharCount} / ${charLimit}`)
  })

  it('falls back to default character limit if `characterLimit` is `true`', () => {
    const string = new Array(2049).join('a') // default character limit is 2048

    mount(KTextArea, {
      props: {
        characterLimit: true,
        modelValue: string,
      },
    })

    cy.get('textarea').type('b')
    cy.get('.k-textarea').should('have.class', 'input-error')
    cy.get('.k-textarea .help-text').should('be.visible').should('contain.text', '2049 / 2048')
  })

  it('does not show character limit error when `characterLimit` is `false`', () => {
    const string = new Array(2049).join('a') // default character limit is 2048

    mount(KTextArea, {
      props: {
        characterLimit: false,
        modelValue: string,
      },
    })

    cy.get('textarea').type('b')
    cy.get('.k-textarea').should('not.have.class', 'input-error')
    cy.get('.k-textarea .help-text').should('not.exist')
  })

  it('should handle `resizable` prop correctly', () => {
    mount(KTextArea, {
      props: {
        resizable: true,
      },
    })

    cy.get('textarea').should('have.class', 'resizable')
  })
})
