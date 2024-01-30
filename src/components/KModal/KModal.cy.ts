import { mount } from 'cypress/vue'
import KModal from '@/components/KModal/KModal.vue'

describe('KModal', () => {
  it('renders closed when visible is false', () => {
    mount(KModal, {
      props: {
        visible: false,
      },
    })

    cy.get('.k-modal').should('not.to.exist')
  })

  it('renders open when visible is true', () => {
    mount(KModal, {
      props: {
        visible: true,
      },
    })

    cy.get('.k-modal .modal-container').should('be.visible')
  })

  it('renders action buttons and close icon by default', () => {
    mount(KModal, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('modal-close-icon').should('be.visible')
    cy.getTestId('modal-cancel-button').should('be.visible')
    cy.getTestId('modal-action-button').should('be.visible')
  })

  it('renders title when passed through prop', () => {
    const title = 'Modal Title'

    mount(KModal, {
      props: {
        visible: true,
        title,
      },
    })

    cy.get('.modal-title').should('be.visible').contains(title)
  })

  it('renders title when passed through slot', () => {
    const title = 'Slotted Title'

    mount(KModal, {
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

  it('renders content when passed through slot', () => {
    const content = 'Modal Content'

    mount(KModal, {
      props: {
        visible: true,
      },
      slots: {
        default: content,
      },
    })

    cy.get('.modal-content').should('be.visible').contains(content)
  })

  it('renders action button properly when text, appearance and disabled props are passed', () => {
    const text = 'Action Button'
    const appearance = 'danger'
    const disabled = true

    mount(KModal, {
      props: {
        visible: true,
        actionButtonText: text,
        actionButtonAppearance: appearance,
        actionButtonDisabled: disabled,
      },
    })

    cy.getTestId('modal-action-button').should('be.visible').contains(text).should('have.class', appearance).should('be.disabled')
  })

  it('renders cancel button properly when text, appearance and disabled props are passed', () => {
    const text = 'Cancel Button'
    const appearance = 'danger'
    const disabled = true

    mount(KModal, {
      props: {
        visible: true,
        cancelButtonText: text,
        cancelButtonAppearance: appearance,
        cancelButtonDisabled: disabled,
      },
    })

    cy.getTestId('modal-cancel-button').should('be.visible').contains(text).should('have.class', appearance).should('be.disabled')
  })

  it('does not render cancel button when hideCancelButton is true', () => {
    mount(KModal, {
      props: {
        visible: true,
        hideCancelButton: true,
      },
    })

    cy.getTestId('modal-cancel-button').should('not.to.exist')
  })

  it('renders footer slot when passed', () => {
    const footer = 'Modal Footer'

    mount(KModal, {
      props: {
        visible: true,
      },
      slots: {
        footer,
      },
    })

    cy.get('.modal-footer').should('be.visible').contains(footer)
    cy.getTestId('modal-cancel-button').should('not.to.exist')
    cy.getTestId('modal-action-button').should('not.to.exist')
  })

  it('renders footer-actions slot when passed', () => {
    const footerActions = 'Modal Footer Actions'

    mount(KModal, {
      props: {
        visible: true,
      },
      slots: {
        'footer-actions': footerActions,
      },
    })

    cy.get('.footer-actions').should('be.visible').contains(footerActions)
    cy.getTestId('modal-cancel-button').should('not.to.exist')
    cy.getTestId('modal-action-button').should('not.to.exist')
  })

  it('renders custom content over default content when passed through content slot', () => {
    const modalContent = 'Modal Content'

    mount(KModal, {
      props: {
        visible: true,
      },
      slots: {
        content: modalContent,
      },
    })

    cy.get('.modal-container').should('be.visible').contains(modalContent)
    cy.get('.modal-header').should('not.to.exist')
    cy.get('.modal-content').should('not.to.exist')
    cy.get('.modal-footer').should('not.to.exist')
  })

  it('does not render close icon when hideCloseIcon is true', () => {
    mount(KModal, {
      props: {
        visible: true,
        hideCloseIcon: true,
      },
    })

    cy.getTestId('modal-close-icon').should('not.to.exist')
  })

  it('renders modal with correct maxWidth when prop is passed', () => {
    const maxWidth = '123px'

    mount(KModal, {
      props: {
        visible: true,
        maxWidth,
      },
    })

    cy.get('.k-modal .modal-container').should('have.css', 'max-width', maxWidth)
  })

  it('renders modal with correct max-height when prop is passed', () => {
    const maxHeight = '123px'

    mount(KModal, {
      props: {
        visible: true,
        maxHeight,
      },
    })

    cy.get('.k-modal .modal-content').should('have.css', 'max-height', maxHeight)
  })

  it('emits proceed event when action button is clicked', () => {
    mount(KModal, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('modal-action-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'proceed')
    })
  })

  it('emits cancel event when cancel button is clicked', () => {
    mount(KModal, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('modal-cancel-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'cancel')
    })
  })

  it('does not close modal on backdrop click when closeOnBackdropClick is false', () => {
    mount(KModal, {
      props: {
        visible: true,
        closeOnBackdropClick: false,
      },
    })

    cy.get('.k-modal .modal-backdrop').click('topRight').then(() => {
      cy.get('.k-modal .modal-container').should('be.visible')
    })
  })

  it('emits cancel event when backdrop is clicked and closeOnBackdropClick is true', () => {
    mount(KModal, {
      props: {
        visible: true,
        closeOnBackdropClick: true,
      },
    })

    cy.get('.k-modal .modal-backdrop').click('topRight').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'cancel')
    })
  })
})
