import { mount } from 'cypress/vue'
import KViewSwitcher from '@/components/KViewSwitcher/KViewSwitcher.vue'

describe('KViewSwitcher', () => {
  it('toggles view when clicked', () => {
    mount(KViewSwitcher, {
      props: {
        view: 'table',
      },
    })

    cy.get('.view-switch-button').should('have.class', 'table')

    cy.get('.view-switch-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'view-changed')
      cy.wrap(Cypress.vueWrapper.emitted('view-changed')[0][0]).should('eq', 'grid')
    })
  })
})
