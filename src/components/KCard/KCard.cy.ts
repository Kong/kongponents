import { mount } from 'cypress/vue'
import KCard from '@/components/KCard/KCard.vue'

describe('KCard', () => {
  it('renders empty card element when no props or slots are passed', () => {
    mount(KCard)

    cy.get('.k-card').should('be.visible')
    cy.get('.k-card').find('card-header').should('not.exist')
    cy.get('.k-card').find('card-content').should('not.exist')
    cy.get('.k-card').find('card-footer').should('not.exist')
  })

  it('renders title prop when passed', () => {
    const titleProp = 'Title prop'

    mount(KCard, {
      props: {
        title: titleProp,
      },
    })

    cy.get('.k-card').find('.card-title').should('contain', titleProp)
  })

  it('renders slots when passed', () => {
    const titleProp = 'Test title'
    const titleText = 'I am the title'

    mount(KCard, {
      props: {
        title: titleProp,
      },
      slots: {
        title: `<span data-testid="card-title">${titleText}</span>`,
        actions: '<span data-testid="card-actions">Card actions</span>',
        default: '<span data-testid="card-content">Card content</span>',
        footer: '<span data-testid="card-footer">Card footer</span>',
      },
    })

    cy.get('.k-card').find('.card-title').get('[data-testid="card-title"]').should('contain', titleText)
    cy.get('.k-card').find('.card-actions').get('[data-testid="card-actions"]').should('be.visible')
    cy.get('.k-card').find('.card-content').get('[data-testid="card-content"]').should('be.visible')
    cy.get('.k-card').find('.card-footer').get('[data-testid="card-footer"]').should('be.visible')
  })
})
