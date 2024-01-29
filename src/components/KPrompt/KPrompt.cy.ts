import { mount } from 'cypress/vue'
import KPrompt from '@/components/KPrompt/KPrompt.vue'

describe('KPrompt', () => {
  it('renders closed when visible is false', () => {
    mount(KPrompt, {
      props: {
        visible: false,
      },
    })

    cy.get('.k-prompt').should('not.to.exist')
  })

  it('renders open when visible is true', () => {
    mount(KPrompt, {
      props: {
        visible: true,
      },
    })

    cy.get('.k-prompt .modal-container').should('be.visible')
  })

  it('renders action buttons and close icon by default', () => {
    mount(KPrompt, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('modal-close-icon').should('be.visible')
    cy.getTestId('prompt-cancel-button').should('be.visible')
    cy.getTestId('prompt-action-button').should('be.visible')
  })

  it('renders title when passed through prop', () => {
    const title = 'Modal Title'

    mount(KPrompt, {
      props: {
        visible: true,
        title,
      },
    })

    cy.get('.modal-title').should('be.visible').contains(title)
  })

  it('renders title when passed through slot', () => {
    const title = 'Slotted Title'

    mount(KPrompt, {
      props: {
        visible: true,
        title: 'Modal Title',
      },
      slots: {
        title,
      },
    })

    cy.get('.modal-title').should('be.visible').contains(title)
  })

  it('renders message when passed through prop', () => {
    const message = 'Modal Message'

    mount(KPrompt, {
      props: {
        visible: true,
        message,
      },
    })

    cy.get('.prompt-content .prompt-message').should('be.visible').contains(message)
  })

  it('renders content passed through default slot over message prop', () => {
    const content = 'Modal Content'

    mount(KPrompt, {
      props: {
        visible: true,
        message: 'Modal Message',
      },
      slots: {
        default: content,
      },
    })

    cy.get('.prompt-content').should('be.visible').contains(content)
    cy.get('.prompt-content .prompt-message').should('not.exist')
  })

  it('renders action button properly when text, appearance and disabled props are passed', () => {
    const text = 'Action Button'
    const appearance = 'danger'
    const disabled = true

    mount(KPrompt, {
      props: {
        visible: true,
        actionButtonText: text,
        actionButtonAppearance: appearance,
        actionButtonDisabled: disabled,
      },
    })

    cy.getTestId('prompt-action-button').should('be.visible').contains(text).should('have.class', appearance).should('be.disabled')
  })

  it('renders cancel button properly when text, appearance and disabled props are passed', () => {
    const text = 'Cancel Button'
    const appearance = 'danger'
    const disabled = true

    mount(KPrompt, {
      props: {
        visible: true,
        cancelButtonText: text,
        cancelButtonAppearance: appearance,
        cancelButtonDisabled: disabled,
      },
    })

    cy.getTestId('prompt-cancel-button').should('be.visible').contains(text).should('have.class', appearance).should('be.disabled')
  })

  it('renders modal with correct width when passed through modalAttributes prop', () => {
    const widthHeight = '123px'

    mount(KPrompt, {
      props: {
        visible: true,
        modalAttributes: {
          width: widthHeight,
          maxHeight: widthHeight,
        },
      },
    })

    cy.get('.k-prompt .modal-container').should('have.css', 'width', widthHeight)
    cy.get('.k-prompt .modal-content').should('have.css', 'max-height', widthHeight)
  })

  it('emits proceed event when action button is clicked', () => {
    mount(KPrompt, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('prompt-action-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'proceed')
    })
  })

  it('emits canceled event when cancel button is clicked', () => {
    mount(KPrompt, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('prompt-cancel-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
    })
  })

  it('emits canceled event when backdrop is clicked and closeOnBackdropClick is true', () => {
    mount(KPrompt, {
      props: {
        visible: true,
        modalAttributes: {
          closeOnBackdropClick: true,
        },
      },
    })

    cy.get('.k-prompt .modal-backdrop').click('topRight').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
    })
  })

  it('renders confirmation input field and confirmation prompt properly when props are passed', () => {
    const confirmationText = 'Confirmation Text'
    const confirmationPrompt = 'Confirmation {confirmationText} Prompt'

    mount(KPrompt, {
      props: {
        visible: true,
        confirmationPrompt,
        confirmationText,
      },
    })

    cy.get('.prompt-confirmation-text').should('be.visible').contains('Confirmation "Confirmation Text" Prompt')
    cy.getTestId('confirmation-input').should('be.visible')
  })

  it('action button behaves correctly when confirmationText is passed', () => {
    const confirmationText = 'Confirmation Text'

    mount(KPrompt, {
      props: {
        visible: true,
        confirmationText,
        actionButtonDisabled: false,
      },
    })

    cy.getTestId('prompt-action-button').should('be.disabled')

    cy.getTestId('confirmation-input').type(confirmationText).then(() => {
      cy.getTestId('prompt-action-button').should('not.be.disabled')
    })
  })
})
