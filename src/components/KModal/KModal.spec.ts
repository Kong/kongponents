import { mount } from 'cypress/vue'
import KModal from '@/components/KModal/KModal.vue'
import { h } from 'vue'

describe('KModal', () => {
  it('renders proper content when using slots', () => {
    const headerText = 'This is some header text'
    const bodyText = 'This is some body text'
    const footerText = 'This is some footer text'
    mount(KModal, {
      props: {
        isVisible: true,
        title: headerText,
      },
      slots: {
        'header-content': () => h('div', {}, headerText),
        'body-content': h('div', {}, bodyText),
        'footer-content': h('div', {}, footerText),
      },
    })

    cy.get('.k-modal').find('.k-modal-header').should('contain.html', headerText)
    cy.get('.k-modal').find('.k-modal-body').should('contain.html', bodyText)
    cy.get('.k-modal').find('.k-modal-footer').should('contain.html', footerText)
  })

  it('hides the title when using hideTitle prop', () => {
    const titleText = "You can't see me"
    mount(KModal, {
      props: {
        isVisible: true,
        title: titleText,
        hideTitle: true,
      },
    })

    cy.get('.k-modal').find('.k-modal-header').should('not.exist')
  })

  it('renders proper content when using action-buttons slot', () => {
    const actionButtonsText = 'This is some action buttons text'
    mount(KModal, {
      props: {
        isVisible: true,
        title: 'Test Me',
      },
      slots: {
        'action-buttons': h('div', {}, actionButtonsText),
      },
    })

    cy.get('.k-modal').find('.k-modal-action-buttons').should('contain.html', actionButtonsText)
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const content = 'Sweet prop content'
    mount(KModal, {
      props: {
        isVisible: true,
        title,
        content,
      },
    })

    cy.get('.k-modal').find('.k-modal-header').should('contain.html', title)
    cy.get('.k-modal').find('.k-modal-body').should('contain.html', content)
  })

  it('renders custom button text & appearance', () => {
    const confirmText = 'click to continue'
    const cancelText = 'click to cancel'
    mount(KModal, {
      props: {
        isVisible: true,
        actionButtonAppearance: 'outline',
        actionButtonText: confirmText,
        cancelButtonAppearance: 'danger',
        cancelButtonText: cancelText,
        title: 'Test Me',
      },
    })

    cy.get('.k-modal').find('button').each(($el, index) => {
      if (index === 0) cy.wrap($el).should('have.text', cancelText).and('have.class', 'danger')
      if (index === 1) cy.wrap($el).should('have.text', confirmText).and('have.class', 'outline')
    })
  })

  it('proceeds when clicking action button', () => {
    mount(KModal, {
      props: {
        title: 'Test Me',
        isVisible: true,
      },
    })

    cy.get('.k-modal').find('.k-modal-footer .k-modal-action-buttons button').click().then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'proceed')
    })
  })

  it('emits close when backdrop is clicked', () => {
    mount(KModal, {
      props: {
        title: 'Test Me',
        isVisible: true,
      },
    })

    cy.get('.k-modal-backdrop').click().then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
    })
  })

  it('emits close when hitting escape', () => {
    mount(KModal, {
      props: {
        title: 'Test Me',
        isVisible: true,
      },
    })

    cy.get('body').type('{esc}').then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
    })
  })
})
