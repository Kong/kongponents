import { mount } from 'cypress/vue'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

describe('KTabs', () => {
  it('first tab is set if hash not found', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
      },
    })

    cy.get('.tab-item').eq(0).should('have.class', 'active')
  })

  it('sets correct tab if default tab prop', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
        modelValue: '#books',
      },
    })

    cy.get('.tab-item').eq(2).should('have.class', 'active')
  })

  it('emits change event on click', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
      },
    })

    cy.get('.tab-item').eq(1).click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'changed')
      cy.wrap(Cypress.vueWrapper.emitted('changed')[0][0]).should('eq', '#movies')
    })
  })
})
