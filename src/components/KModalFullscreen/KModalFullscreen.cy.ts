import { h } from 'vue'
import KModalFullscreen from '@/components/KModalFullscreen/KModalFullscreen.vue'

describe('KModalFullscreen', () => {
  it('renders proper content when using slots', () => {
    const headerIcon = 'This is some header icon text'
    const headerText = 'This is some header text'
    const bodyHeader = 'This is some body header text'
    const bodyHeaderDescription = 'This is some body header description text'
    const bodyText = 'This is some body text'

    cy.mount(KModalFullscreen, {
      props: {
        isVisible: true,
        title: headerText,
      },
      slots: {
        'header-icon': () => h('div', {}, headerIcon),
        'header-content': () => h('div', {}, headerText),
        'body-header': () => h('div', {}, bodyHeader),
        'body-header-description': () => h('div', {}, bodyHeaderDescription),
        default: () => h('div', {}, bodyText),
      },
    })

    cy.get('.k-modal-fullscreen-title .header-icon').should('contain', headerIcon)
    cy.get('.k-modal-fullscreen-header').should('contain', headerText)
    cy.get('.k-modal-fullscreen-body-header .body-header').should('contain', bodyHeader)
    cy.get('.k-modal-fullscreen-body-header .body-header-description').should('contain', bodyHeaderDescription)
    cy.get('.k-modal-fullscreen-body').should('contain', bodyText)
    cy.get('.k-modal-fullscreen-footer').should('not.exist')
  })

  it('renders proper content when using action-buttons slot', () => {
    const actionButtonsText = 'This is some action buttons text'

    cy.mount(KModalFullscreen, {
      props: {
        isVisible: true,
        title: 'Test Me',
      },
      slots: {
        'action-buttons': h('div', {}, actionButtonsText),
      },
    })

    cy.get('.k-modal-fullscreen-action').should('contain', actionButtonsText)
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const actionButtonText = 'Sweet prop actionButton'
    const cancelButtonText = 'Sweet prop cancelButton'
    const bodyHeader = 'Sweet prop bodyHeader'
    const bodyHeaderDescription = 'Sweet prop bodyHeaderDescription'

    cy.mount(KModalFullscreen, {
      props: {
        isVisible: true,
        title,
        actionButtonText,
        cancelButtonText,
        bodyHeader,
        bodyHeaderDescription,
      },
    })

    cy.get('.proceed-button').should('contain', actionButtonText)
    cy.get('.cancel-button').should('contain', cancelButtonText)
    cy.get('.k-modal-fullscreen-header').should('contain', title)
    cy.get('.k-modal-fullscreen-body-header .body-header').should('contain', bodyHeader)
    cy.get('.k-modal-fullscreen-body-header .body-header-description').should('contain', bodyHeaderDescription)
  })

  it('emits close when hitting escape', () => {
    cy.mount(KModalFullscreen, {
      props: {
        title: 'Test Me',
        isVisible: true,
      },
    })

    cy.get('body').type('{esc}').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
    })
  })

  it('renders proper content when using footer-content slot', () => {
    const footerContentText = 'This is some footer text'

    cy.mount(KModalFullscreen, {
      props: {
        isVisible: true,
        title: 'Test Me',
      },
      slots: {
        'footer-content': footerContentText,
      },
    })

    cy.get('.k-modal-fullscreen-footer').should('be.visible').should('contain', footerContentText)
  })
})
