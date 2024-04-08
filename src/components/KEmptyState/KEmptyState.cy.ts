import { h } from 'vue'
import { mount } from 'cypress/vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'

describe('KEmptyState', () => {
  ['default', 'error', 'config', 'file', 'search', 'kong'].forEach((variant) => {
    it(`renders ${variant} icon variant correctly`, () => {
      it('renders all elements correctly', () => {
        mount(KEmptyState)

        cy.get(`.k-empty-state.${variant}`).should('be.visible')
      })
    })
  })

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
    const testId = 'slotted-message'

    mount(KEmptyState, {
      props: {
        message: 'Message',
      },
      slots: {
        default: h('span', { 'data-testid': testId }, content),
      },
    })

    cy.get('.empty-state-message').findTestId(testId).should('be.visible').should('contain', content)
  })

  it('displays icon passed through icon slot', () => {
    const dragon = '🐉'
    const testId = 'slotted-icon'

    mount(KEmptyState, {
      slots: {
        icon: h('div', { 'data-testid': testId }, dragon),
      },
    })

    cy.get('.empty-state-icon').findTestId(testId).should('be.visible')
    cy.get('.empty-state-icon').findTestId(testId).should('contain.text', dragon)
  })

  it('emits event when action button is clicked', () => {
    mount(KEmptyState, {
      props: {
        actionButtonText: 'Action',
      },
    })

    cy.get('.empty-state-action').should('be.visible').find('button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'click-action')
    })
  })
})
