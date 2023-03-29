import { mount } from 'cypress/vue'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const NAV_TABS = TABS.map((tab) => ({ ...tab, route: { name: tab.hash.substring(1) } }))

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

  it('uses links when providing route property', () => {
    mount(KTabs, {
      props: {
        tabs: NAV_TABS,
      },
    })

    // This *should* assert that the item has an “href” attribute, but since this Cypress doesn’t set-up vue-router, the rendered router-link element will be treated as an undefined custom element with its `to` prop represented as a prop
    cy.get('.tab-item')
      .eq(2)
      .should('have.attr', 'to')
  })
})
