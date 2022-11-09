import { mount } from 'cypress/vue'
import KFileUpload from '@/components/KFileUpload/KFileUpload.vue'

describe('KFileUpload', () => {
  it('renders text when value is passed', () => {
    const text = 'I am a label'
    mount(KFileUpload, {
      props: {
        testMode: true,
        label: text,
      },
    })

    cy.get('.k-input-label').should('contain.text', text)
  })

  it('remove-button should not exist if there is no selected file', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
      },
    })

    cy.get('.remove-button').should('not.exist')
  })

  it('for type image, upload button shold not exist', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        type: 'image',
      },
    })

    cy.get('.k-file-upload-btn').should('not.exist')
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label Text'
    mount(KFileUpload, {
      props: {
        testMode: true,
        label: labelText,
        labelAttributes: {
          help: 'random text',
        },
      },
    })

    cy.get('.k-input-label').should('contain.text', labelText)
    cy.get('.k-input-label .kong-icon-help').should('be.visible')
  })

  it('does not render cancel button, if removable is false', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        removable: false,
      },
    })

    cy.getTestId('remove-button').should('not.exist')
  })

  it('does not render cancel button, if removable is false', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        removable: false,
        type: 'image',
      },
    })

    cy.getTestId('remove-button').should('not.exist')
  })

  it('should emit correct event when a file is selected, removed', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        type: 'file',
      },
    })

    cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-added')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
    })
    cy.getTestId('remove-button').should('exist').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-removed')
    })
  })

  it('should emit error event when there is an error with file upload', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        type: 'file',
        maxFileSize: 0,
      },
    })

    cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
    })
  })
})
