import { h } from 'vue'
import { mount } from '@cypress/vue'
import KButton, { appearances } from '@/components/KButton/KButton.vue'
import { createRouter, createWebHistory } from 'vue-router'

const rendersCorrectAppearance = (variant) => {
  it(`renders kbutton with the ${variant} appearance`, () => {
    mount(KButton, {
      props: {
        'appearance': variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-button').should('have.class', variant)
  })
}

describe('KButton', () => {
  // Loop through appearances
  Object.values(appearances).map(a => rendersCorrectAppearance(a))

  it('sets small class when size passed', () => {
    mount(KButton, {
      props: {
        size: 'small',
      },
      slots: {
        default: () => 'Small Button',
      },
    })

    cy.get('.k-button').should('have.class', 'small')
  })

  it.only('renders a router link with KButton styles', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{
        path: '/services',
        name: 'services',
        redirect: 'services',
        meta: { breadcrumb: 'Services' },
      }],
    })

    mount(
      {
        router,
        render() { return h('div') },
      },
    )

    // localVue.use(VueRouter)
    mount(KButton, {
      // localVue,
      // router,
      props: {
        'to': { name: 'services', params: { workspace: 'test' } },
        appearance: 'primary',
      },
      slots: {
        default: () => "I'm a router link",
      },
    })

    cy.get('router-link').should('have.class', 'k-button').and('have.class', 'primary')
    console.log(cy.get('router-link'))
    // cy.get('router-link').invoke('attr', 'href').should('eq', '/services')
  })

  it('renders a native link with KButton styles', () => {
    mount(KButton, {
      props: {
        to: 'https://google.com',
        appearance: 'secondary',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    cy.get('a').should('have.class', 'k-button').and('have.class', 'secondary')
    cy.get('a').invoke('attr', 'href').should('eq', 'https://google.com')
  })
})
