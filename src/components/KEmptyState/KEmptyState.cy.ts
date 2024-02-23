import { mount } from 'cypress/vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'

describe('KEmptyState', () => {
  it('renders all elements correctly', () => {
    mount(KEmptyState)

    cy.get('.k-empty-state').should('be.visible')
    cy.get('.empty-state-icon').should('be.visible')
    cy.get('.empty-state-title').should('not.exist')
    cy.get('.empty-state-message').should('not.exist')
    cy.get('.empty-state-action').should('not.exist') // because action button text wasn't provided
  })

  it('renders title and message when provided', () => {
    const title = 'Title'
    const message = 'Message'

    mount(KEmptyState, {
      props: {
        title,
        message,
      },
    })

    cy.get('.empty-state-title').should('be.visible').should('contain', title)
    cy.get('.empty-state-message').should('be.visible').should('contain', message)
  })

  it('renders action button when provided button text', () => {
    const actionButtonText = 'Action'

    mount(KEmptyState, {
      props: {
        actionButtonText,
      },
    })

    cy.get('.empty-state-action').should('be.visible').should('contain', actionButtonText)
  })

  it('does not render action button when hidden', () => {
    mount(KEmptyState, {
      props: {
        actionButtonVisible: false,
        actionButtonText: 'Action',
      },
    })

    cy.get('.empty-state-action').should('not.exist')
  })

  it('correctly handles action button disabled state', () => {
    mount(KEmptyState, {
      props: {
        actionButtonText: 'Action',
        actionButtonDisabled: true,
      },
    })

    cy.get('.empty-state-action').should('be.visible').find('button').should('be.disabled')
  })

  it('displays content passed through default slot correctly', () => {
    const content = 'Content'

    mount(KEmptyState, {
      props: {
        message: 'Message',
      },
      slots: {
        default: `<span data-testid="slotted-message">${content}</span>`,
      },
    })

    cy.get('.empty-state-message').findTestId('slotted-message').should('be.visible').should('contain', content)
  })

  it('displays icon passed through icon slot', () => {
    mount(KEmptyState, {
      slots: {
        icon: '<img data-testid="slotted-icon" src="https://via.placeholder.com/36" />',
      },
    })

    cy.get('.empty-state-icon').findTestId('slotted-icon').should('be.visible')
  })

  it('emits event when action button is clicked', () => {
    mount(KEmptyState, {
      props: {
        actionButtonText: 'Action',
      },
    })

    cy.get('.empty-state-action').should('be.visible').find('button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'action-click')
    })
  })
})
