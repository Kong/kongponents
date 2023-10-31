import { mount } from 'cypress/vue'
import KCard from '@/components/KCard/KCard.vue'

describe('KCard', () => {
  it('does not render any content when no props or slots are passed', () => {
    mount(KCard)

    cy.get('.k-card').should('be.visible')
    cy.get('.k-card').find('card-header').should('not.exist')
    cy.get('.k-card').find('card-content').should('not.exist')
    cy.get('.k-card').find('card-footer').should('not.exist')
  })

  it('renders title and content slots when passed', () => {
    const titleProp = 'Title prop'
    const contentProp = 'Content prop'

    mount(KCard, {
      props: {
        title: titleProp,
        content: contentProp,
      },
    })

    cy.get('.k-card').find('.card-title').should('contain', titleProp)
    cy.get('.k-card').find('.card-content').should('contain', contentProp)
  })

  it('renders slots when passed', () => {
    const titleProp = 'Test title'
    const contentProp = 'Test content'
    const titleText = 'I am the title'
    const contentText = 'I am the content'

    mount(KCard, {
      props: {
        title: titleProp,
        content: contentProp,
      },
      slots: {
        title: `<span data-testid="card-title">${titleText}</span>`,
        actions: '<span data-testid="card-actions">Card actions</span>',
        default: `<span data-testid="card-content">${contentText}</span>`,
        footer: '<span data-testid="card-footer">Card footer</span>',
      },
    })

    cy.get('.k-card').find('.card-title').get('[data-testid="card-title"]').should('contain', titleText)
    cy.get('.k-card').get('[data-testid="card-actions"]').should('be.visible')
    cy.get('.k-card').find('.card-content').get('[data-testid="card-content"]').should('contain', contentText)
    cy.get('.k-card').get('[data-testid="card-footer"]').should('be.visible')
  })
})
