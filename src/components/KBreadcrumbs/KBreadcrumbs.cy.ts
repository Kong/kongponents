import { mount } from 'cypress/vue'
import KBreadcrumbs from '@/components/KBreadcrumbs/KBreadcrumbs.vue'
import type { BreadcrumbItem } from '@/types'

describe('KBreadcrumbs', () => {
  it('renders a breadcrumb', () => {
    const items = [{
      key: 'docs',
      to: 'https://docs.konghq.com',
      text: 'Go to Kong Docs',
    }] as BreadcrumbItem[]

    mount(KBreadcrumbs, {
      props: {
        items,
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 1)
  })

  it('correctly renders an non-link breadcrumbs', () => {
    mount(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            text: 'Go to Kong Docs',
          },
          {
            key: 'specific-doc',
            text: 'My Doc',
          },
        ],
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 2)
    cy.get('.k-breadcrumbs').find('.breadcrumbs-item').should('not.have.class', '.link')
    cy.get('.k-breadcrumbs').find('.breadcrumbs-divider').its('length').should('eq', 1)
  })

  it('renders custom divider when using slot', () => {
    const customDivider = 'custom_divider'

    mount(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            text: 'Go to Kong Docs',
          },
          {
            key: 'specific-doc',
            text: 'My Doc',
          },
        ],
      },
      slots: {
        divider: customDivider,
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 2)
    cy.get('.k-breadcrumbs .breadcrumbs-divider').its('length').should('eq', 1)
    cy.get('.k-breadcrumbs .breadcrumbs-divider').should('contain.text', customDivider)
  })

  it('renders custom icon when using slot', () => {
    const customIcon = 'custom_icon'

    mount(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            text: 'Go to Kong Docs',
          },
        ],
      },
      slots: {
        'icon-docs': customIcon,
      },
    })

    cy.get('.k-breadcrumbs').find('li').its('length').should('eq', 1)
    cy.get('.k-breadcrumbs .breadcrumbs-icon-container').should('contain.text', customIcon)
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
