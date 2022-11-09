import { mount } from 'cypress/vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'

describe('KEmptyState', () => {
  it('renders slots when passed', () => {
    const emptyTitle = 'No Entities Yet'
    const emptyMessage = 'To Add an Entity, Press the Button'
    const ctaText = 'Click Me!'

    mount(KEmptyState, {
      props: {
        ctaText,
      },
      slots: {
        title: () => `${emptyTitle}`,
        message: () => `${emptyMessage}`,
      },
    })

    cy.get('.empty-state-title').should('contain.text', emptyTitle)
    cy.get('.empty-state-content').should('contain.text', emptyMessage)
    cy.get('button.primary').should('contain.text', ctaText)
  })

  it('renders icon when error flag passed', () => {
    const errorMessage = 'I got a bad feeling about this'
    mount(KEmptyState, {
      props: {
        isError: true,
        ctaIsHidden: true,
      },
      slots: {
        message: () => `${errorMessage}`,
      },
    })

    cy.get('.warning-icon').should('be.visible')
    cy.get('.k-empty-state-message').should('contain.text', errorMessage)
  })

  it('renders custom icon when icon prop passed', () => {
    const errorMessage = 'Support me'
    mount(KEmptyState, {
      props: {
        icon: 'support',
        ctaIsHidden: true,
      },
      slots: {
        message: () => `${errorMessage}`,
      },
    })

    cy.get('.kong-icon-support').should('be.visible')
    cy.get('.empty-state-content').should('contain.text', errorMessage)
  })

  it('remains empty when no slots are passed', () => {
    mount(KEmptyState, {
      slots: {},
    })

    cy.get('.empty-state-title').should('not.contain.text')
    cy.get('.empty-state-content').should('not.contain.text')
  })

  it('does not render KButton when ctaIsHidden', () => {
    mount(KEmptyState, {
      props: {
        ctaIsHidden: true,
      },
    })

    cy.get('button').should('not.exist')
  })
})
