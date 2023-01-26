import { mount } from 'cypress/vue'
import KExternalLink from '@/components/KExternalLink/KExternalLink.vue'

describe('KExternalLink', () => {
  it('should render link with href attribute', () => {
    const linkHref = 'https://kongponents.konghq.com/'
    const linkText = 'This is external link'
    mount(KExternalLink, {
      props: {
        href: linkHref,
      },
      slots: {
        default: () => linkText,
      },
    })

    cy.get('.k-external-link').should('have.attr', 'href', linkHref).should('contain.text', linkText)
  })
})
