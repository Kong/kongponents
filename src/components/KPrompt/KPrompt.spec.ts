import { mount } from 'cypress/vue'
import KPrompt from '@/components/KPrompt/KPrompt.vue'
import { h } from 'vue'

describe('KPrompt', () => {
  it('renders proper content when using slots', () => {
    const headerText = 'This is some header text'
    const bodyText = 'This is some body text'
    const actionButtonsText = 'This is some footer text'

    mount(KPrompt, {
      props: {
        isVisible: true,
        title: headerText,
      },
      slots: {
        'header-content': () => h('div', {}, headerText),
        'body-content': () => h('div', {}, bodyText),
        'action-buttons': h('div', {}, actionButtonsText),
      },
    })

    cy.get('.k-prompt-header').should('contain.text', headerText)
    cy.get('.k-prompt-body').should('contain.text', bodyText)
    cy.get('.k-prompt-action-buttons').should('contain.text', actionButtonsText)
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const message = 'Sweet prop content'

    mount(KPrompt, {
      props: {
        isVisible: true,
        title,
        message,
      },
    })

    cy.get('.k-prompt-header').should('contain.text', title)
    cy.get('.k-prompt-body').should('contain.text', message)
  })

  it('renders custom button text', () => {
    const actionButtonText = 'Sweet ACTION button'
    const cancelButtonText = 'Sweet CANCEL button'

    mount(KPrompt, {
      props: {
        isVisible: true,
        actionButtonText,
        cancelButtonText,
      },
    })

    // button at 0 is close button in top right corner
    cy.get('button').eq(1).should('contain.text', cancelButtonText)
    cy.get('button').eq(2).should('contain.text', actionButtonText)
  })

  it('has a pending state', () => {
    mount(KPrompt, {
      props: {
        isVisible: true,
        actionPending: true,
      },
    })

    cy.get('.k-prompt-proceed .kong-icon-spinner').should('be.visible')
  })

  it('enables correctly with confirmationText', () => {
    const confirmationText = 'I Agree'

    mount(KPrompt, {
      props: {
        isVisible: true,
        confirmationText,
      },
    })

    // disabled
    cy.get('.k-prompt-action-buttons .k-prompt-proceed').invoke('attr', 'disabled').should('eq', 'disabled')

    const input = cy.getTestId('confirmation-input')

    // bad input, still disabled
    input.type(confirmationText + 'x')
    // enable
    input.clear()
    input.type(confirmationText)

    cy.get('.k-prompt-action-buttons .k-prompt-proceed[disabled="disabled"]').should('not.exist')
    cy.get('.k-prompt-action-buttons .k-prompt-proceed').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'proceed')
    })
  })

  it('proceeds when clicking action button', () => {
    mount(KPrompt, {
      props: {
        isVisible: true,
      },
    })

    cy.get('.k-prompt-action-buttons .k-prompt-proceed').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'proceed')
    })
  })

  it('proceeds when clicking cancel buttons', () => {
    mount(KPrompt, {
      props: {
        isVisible: true,
      },
    })

    cy.get('.k-prompt-header .close-button button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
      cy.wrap(Cypress.vueWrapper.emitted('canceled')).should('have.length', 1)
    })

    cy.get('.k-prompt-action-buttons .k-prompt-cancel').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'canceled')
      cy.wrap(Cypress.vueWrapper.emitted('canceled')).should('have.length', 2)
    })
  })
})
