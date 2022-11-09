import { mount } from 'cypress/vue'
import KBreadcrumbs from '@/components/KBreadcrumbs/KBreadcrumbs.vue'

describe('KBreadcrumbs', () => {
  it('renders an icon breadcrumb', () => {
    mount(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            title: 'Go to Kong Docs',
            icon: 'kong',
          },
        ],
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 1)
    cy.get('.k-breadcrumbs').find('li .k-breadcrumb-icon').its('length').should('eq', 1)
  })

  it('renders breadcrumb links without needing a router', () => {
    mount(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            title: 'Go to Kong Docs',
            text: 'External Link',
          },
        ],
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 1)
  })
})
