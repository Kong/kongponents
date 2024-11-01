import KExternalLink from '@/components/KExternalLink/KExternalLink.vue'

describe('KExternalLink', () => {
  it('should not render link element when passed invalid href', () => {
    const linkHref = 'kongponents'
    const linkText = 'This is external link'
    cy.mount(KExternalLink, {
      props: {
        href: linkHref,
      },
      slots: {
        default: () => linkText,
      },
    })

    cy.get('.k-external-link').should('not.exist')
  })

  it('should render link with href attribute', () => {
    const linkHref = 'https://kongponents.konghq.com/'
    const linkText = 'This is external link'
    cy.mount(KExternalLink, {
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
