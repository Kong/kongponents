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

  it('psuedoCancel button should not exist if there is no selected file', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
      },
    })

    cy.get('.remove-button').should('not.exist')
  })

  it('for appearance image, upload button shold not exist', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        appearance: 'image',
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

  it('renders icon slot', () => {
    mount(KFileUpload, {
      props: {
        testMode: true,
        appearance: 'image',
        icon: 'flag',
      },
    })

    cy.get('.image-upload-icon').should('exist')
  })
})
