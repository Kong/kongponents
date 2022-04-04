// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import KViewSwitcher from '@/components/KViewSwitcher/KViewSwitcher.vue'

describe('KViewSwitcher', () => {
  it('toggles view when clicked', async () => {
    mount(KViewSwitcher, {
      props: {
        view: 'table',
      },
    })

    cy.get('.view-switch-button').should('have.class', 'table')
    cy.get('.view-switch-button').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'view-changed')
      // cy.get('.view-switch-button').should('have.class', 'grid')
    })
  })
})
