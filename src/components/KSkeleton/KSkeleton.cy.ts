import { mount } from 'cypress/vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'

describe('KSkeleton', () => {
  describe('variants', () => {
    it('renders generic skeleton state by default', () => {
      mount(KSkeleton)

      cy.get('.skeleton-loader').should('exist')
    })

    it('renders form skeleton state with 4 rows by default', () => {
      mount(KSkeleton, {
        props: {
          type: 'form',
        },
      })

      cy.get('.skeleton-form-wrapper').should('exist')
      cy.get('.skeleton-form-row').should('have.length', 4)
    })

    it('renders card skeleton state with 2 cards', () => {
      mount(KSkeleton, {
        props: {
          type: 'card',
          cardCount: 2,
        },
      })

      cy.get('.skeleton-card-wrapper').should('exist')
      cy.get('.skeleton-card').should('have.length', 2)
    })

    it('renders table skeleton state with 6 rows by default', () => {
      mount(KSkeleton, {
        props: {
          type: 'table',
        },
      })

      cy.get('.skeleton-table-wrapper').should('exist')
      cy.get('.skeleton-table-row').should('have.length', 6)
    })

    it('renders spinner skeleton state', () => {
      mount(KSkeleton, {
        props: {
          type: 'spinner',
        },
      })

      cy.get('.skeleton-spinner').should('exist')
    })

    it('renders full screen loader with progress bar', () => {
      mount(KSkeleton, {
        props: {
          type: 'fullscreen-kong',
        },
      })

      cy.getTestId('full-screen-loader').should('be.visible')

      cy.get('[role="progressbar"]').should('be.visible')
    })

    it('renders full screen loader with custom zIndex', () => {
      mount(KSkeleton, {
        props: {
          type: 'fullscreen-kong',
          zIndex: 12000,
        },
      })

      cy.getTestId('full-screen-loader').should('be.visible')

      cy.get('.k-skeleton .fullscreen-loading-container').should('have.css', 'z-index', '12000')
    })

    it('renders full screen generic loader with progress bar', () => {
      mount(KSkeleton, {
        props: {
          type: 'fullscreen-generic',
        },
      })

      cy.getTestId('full-screen-spinner-loader').should('be.visible')

      cy.get('[role="progressbar"]').should('be.visible')
    })

    it('renders full screen generic loader with custom zIndex', () => {
      mount(KSkeleton, {
        props: {
          type: 'fullscreen-generic',
          zIndex: 12000,
        },
      })

      cy.getTestId('full-screen-spinner-loader').should('be.visible')

      cy.get('.k-skeleton .fullscreen-loading-container').should('have.css', 'z-index', '12000')

    })
  })
})
