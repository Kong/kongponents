import { mount } from 'cypress/vue'
import KCard from '@/components/KCard/KCard.vue'
import { h } from 'vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KCard', () => {
  it('renders slots when passed', () => {
    const cardStatusHat = 'Card Status Hat'
    const cardTitle = 'Card Title'
    const cardActions = 'Card Actions'
    const cardBody = 'Card Body'
    const cardNotifications = 'Card Notifications'

    mount(KCard, {
      props: {
        testMode: true,
      },
      slots: {
        statusHat: () => h('span', {}, cardStatusHat),
        title: () => h('span', {}, cardTitle),
        actions: () => h('span', {}, cardActions),
        body: () => h('span', {}, cardBody),
        notifications: () => h('span', {}, cardNotifications),
      },
    })

    cy.get('.k-card-status-hat').should('contain.text', cardStatusHat)
    cy.get('.k-card-title').should('contain.text', cardTitle)
    cy.get('.k-card-actions').should('contain.text', cardActions)
    cy.get('.k-card-body').should('contain.text', cardBody)
    cy.get('.k-card-notifications').should('contain.text', cardNotifications)
  })

  it('renders proper content when using props', () => {
    const cardStatus = 'Card Status'
    const cardTitle = 'Card Title'
    const cardBody = 'Card Body'

    mount(KCard, {
      props: {
        testMode: true,
        status: cardStatus,
        title: cardTitle,
        body: cardBody,
      },
    })

    cy.get('.k-card-status-hat').should('have.text', cardStatus)
    cy.get('.k-card-title').should('have.text', cardTitle)
    cy.get('.k-card-body').should('have.text', cardBody)
  })

  it('has border class when passed', () => {
    mount(KCard, {
      props: {
        testMode: true,
        hasBorder: true,
      },
    })

    cy.get('.kong-card').should('have.class', 'border')
  })

  it('has hover class when passed', () => {
    mount(KCard, {
      props: {
        testMode: true,
        hasHover: true,
      },
    })

    cy.get('.kong-card').should('have.class', 'hover')
  })

  it('has shadow class when passed', () => {
    mount(KCard, {
      props: {
        testMode: true,
        hasShadow: true,
      },
    })

    cy.get('.kong-card').should('have.class', 'kcard-shadow')
  })
})
