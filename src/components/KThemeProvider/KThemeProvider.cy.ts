import KThemeProvider from '@/components/KThemeProvider/KThemeProvider.vue'
import type { KongponentsTheme } from '@/types/theme'

const theme: KongponentsTheme = {
  '--kui-color-text-primary': 'rgb(111, 40, 255)',
  '--kui-border-radius-30': '999px',
}

describe('KThemeProvider', () => {
  afterEach(() => {
    // Clean up any tokens applied to the document root by global-mode tests.
    Object.keys(theme).forEach((token) => {
      document.documentElement.style.removeProperty(token)
    })
  })

  it('applies theme tokens as inline custom properties on its wrapper (subtree scope)', () => {
    cy.mount(KThemeProvider, {
      props: { theme },
      slots: { default: '<div class="child">child</div>' },
    })

    cy.get('.k-theme-provider')
      .should('have.attr', 'style')
      .and('include', '--kui-color-text-primary')

    // The child inherits the custom property from the provider's wrapper.
    cy.get('.child').then(($el) => {
      const value = getComputedStyle($el[0]).getPropertyValue('--kui-color-text-primary').trim()
      expect(value).to.eq('rgb(111, 40, 255)')
    })

    // The document root is untouched in subtree scope.
    cy.document().then((doc) => {
      expect(doc.documentElement.style.getPropertyValue('--kui-color-text-primary')).to.eq('')
    })
  })

  it('sets the data-kui-theme attribute when name is provided', () => {
    cy.mount(KThemeProvider, {
      props: { theme, name: 'portal' },
    })

    cy.get('.k-theme-provider').should('have.attr', 'data-kui-theme', 'portal')
  })

  it('renders with a custom tag', () => {
    cy.mount(KThemeProvider, {
      props: { theme, tag: 'section' },
    })

    cy.get('section.k-theme-provider').should('exist')
  })

  it('writes tokens to the document root when global is true', () => {
    cy.mount(KThemeProvider, {
      props: { theme, global: true },
      slots: { default: '<div class="child">child</div>' },
    })

    // In global mode the wrapper carries no inline custom properties...
    cy.get('.k-theme-provider').should('not.have.attr', 'style')

    // ...they are written to the document root instead.
    cy.document().then((doc) => {
      const value = doc.documentElement.style.getPropertyValue('--kui-color-text-primary').trim()
      expect(value).to.eq('rgb(111, 40, 255)')
    })
  })
})
