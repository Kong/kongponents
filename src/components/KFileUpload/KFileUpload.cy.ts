import KFileUpload from '@/components/KFileUpload/KFileUpload.vue'

describe('KFileUpload', () => {
  describe('input appearance', () => {
    it('renders label when value is passed', () => {
      const text = 'I am a label'
      cy.mount(KFileUpload, {
        props: {
          accept: ['.md'],
          label: text,
        },
      })

      cy.get('.k-label').should('contain.text', text)
    })

    it('renders label with labelAttributes applied', () => {
      const labelText = 'A Label Text'
      cy.mount(KFileUpload, {
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
      cy.mount(KFileUpload, {
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
      cy.mount(KFileUpload, {
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

    it('should emit error when uploading file that exceeds file size', () => {
      cy.mount(KFileUpload, {
        props: {
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      cy.get('input[type=file]').selectFile('cypress/fixtures/file-upload/file-upload-document.md').then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })
    })

    it('allows drag and drop', () => {
      cy.mount(KFileUpload, {
        props: {
          accept: ['.md'],
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-added')
      })
    })

    it('should not allow drag and drop when input is disabled', () => {
      cy.mount(KFileUpload, {
        props: {
          accept: ['.md'],
          disabled: true,
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'file-added')
      })
    })

    it('should not accept unsupported file type and display error', () => {
      cy.mount(KFileUpload, {
        props: {
          accept: ['.png'],
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'file-added')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })
    })

    it('should emit error when drag and drop uploading file that exceeds file size', () => {
      cy.mount(KFileUpload, {
        props: {
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })
    })
  })

  describe('dropzone appearance', () => {
    it('renders label when value is passed', () => {
      const text = 'I am a label'
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          label: text,
        },
      })

      cy.get('.k-label').should('contain.text', text)
    })

    it('renders label with labelAttributes applied', () => {
      const labelText = 'A Label Text'
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
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
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
      })

      cy.getTestId('file-upload-dropzone').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-added')
      })
      cy.getTestId('file-upload-button').click().then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-removed')
      })
    })

    it('triggers input click on button click', () => {
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
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

    it('should emit error when uploading file that exceeds file size', () => {
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      cy.getTestId('file-upload-dropzone').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })
    })

    it('allows drag and drop', () => {
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'file-added')
      })
    })

    it('should not allow drag and drop when dropzone is disabled', () => {
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          disabled: true,
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'file-added')
      })
    })

    it('should not accept unsupported file type and display error', () => {
      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.png'],
        },
      })

      cy.get('.k-file-upload').selectFile('cypress/fixtures/file-upload/file-upload-document.md', { action: 'drag-drop' }).then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'file-added')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'error')
      })
    })

    it('displays content passed through dropzone-footer slot', () => {
      const slotContent = 'This is some footer content'
      const slotTestId = 'slotted-dropzone-footer'

      cy.mount(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
        slots: {
          'dropzone-footer': `<div data-testid="${slotTestId}">${slotContent}</div>`,
        },
      })

      cy.getTestId(slotTestId).should('contain.text', slotContent)
    })
  })
})
