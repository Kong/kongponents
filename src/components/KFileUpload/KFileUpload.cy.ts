import { mount } from 'cypress/vue'
import KFileUpload from '@/components/KFileUpload/KFileUpload.vue'

describe('KFileUpload', () => {
  it('renders text when value is passed', () => {
    const text = 'I am a label'
    mount(KFileUpload, {
      props: {
        accept: ['.md'],
        label: text,
      },
    })

    cy.get('.k-label').should('contain.text', text)
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label Text'
    mount(KFileUpload, {
      props: {
        accept: ['.md'],
        label: labelText,
        labelAttributes: {
          info: 'random text',
        },
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
    cy.get('.k-label .tooltip-trigger-icon').should('be.visible')
  })

  it('should emit correct event when a file is selected, removed', () => {
    mount(KFileUpload, {
      props: {
        accept: ['.md'],
      },
    })

    cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-added')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
    })
    cy.getTestId('file-upload-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-removed')
    })
  })

  it('triggers input click on button click', () => {
    mount(KFileUpload, {
      props: {
        accept: ['.md'],
      },
    })

    cy.get('input[type=file]').then(($input) => {
      cy.spy($input[0], 'click').as('inputClickSpy')
    })

    cy.getTestId('file-upload-button').click()

    // Assert that the input click was triggered
    cy.get('@inputClickSpy').should('have.been.calledOnce')
  })

  it('should emit error event when there is an error with file upload', () => {
    mount(KFileUpload, {
      props: {
        accept: ['.md'],
        maxFileSize: 0,
      },
    })

    cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
    })
  })
})
