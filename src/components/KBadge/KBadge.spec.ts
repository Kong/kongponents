import { mount } from 'cypress/vue'
import KBadge, { appearances } from '@/components/KBadge/KBadge.vue'

const rendersCorrectAppearance = (variant: string) => {
  it(`renders KBadge with the ${variant} appearance`, () => {
    mount(KBadge, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-badge').should('have.class', `k-badge-${variant}`)
  })
}

describe('KBadge', () => {
  // Loop through appearances
  Object.keys(appearances).map(a => rendersCorrectAppearance(a))

  it('defaults to default badge', () => {
    mount(KBadge, {
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.class', 'k-badge-default')
  })

  it('correctly displays truncation tooltip', () => {
    const tooltipText = 'Hello! Long badge with truncated text here'
    mount(KBadge, {
      props: {
        truncationTooltip: tooltipText,
      },
      slots: {
        default: () => 'Hello! Long badge with truncated text here',
      },
    })

    cy.get('.k-tooltip').should('contain.text', tooltipText)
  })

  it('only displays tooltip if truncated', () => {
    const tooltipText = 'Hello!'
    mount(KBadge, {
      props: {
        truncationTooltip: tooltipText,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-tooltip').should('not.exist')
  })

  it('renders tooltip without truncation if forceTooltip prop present', () => {
    const tooltipText = 'Hello!'
    mount(KBadge, {
      props: {
        truncationTooltip: tooltipText,
        forceTooltip: true,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-tooltip').should('contain.text', tooltipText)
  })

  it('renders dismissible badge', () => {
    mount(KBadge, {
      props: {
        dismissable: true,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.getTestId('k-badge-dismiss-button').should('exist')
    cy.getTestId('k-badge-dismiss-button').click()
    cy.get('.k-badge').should('not.exist')
  })

  it('handles custom colors', () => {
    mount(KBadge, {
      props: {
        appearance: 'custom',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(255, 0, 0)',
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.css', 'color').and('eq', 'rgb(255, 255, 255)')
    cy.get('.k-badge').should('have.css', 'background-color').and('eq', 'rgb(255, 0, 0)')
  })
})
