import KBadge from '@/components/KBadge/KBadge.vue'
import type { BadgeAppearance, BadgeSize } from '@/types'
import { BadgeAppearances, BadgeSizes } from '@/types'

const rendersCorrectAppearance = (variant: BadgeAppearance) => {
  it(`renders KBadge with the ${variant} appearance`, () => {
    cy.mount(KBadge, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-badge').should('have.class', variant)
  })
}

const rendersCorrectSize = (size: BadgeSize) => {
  it(`sets ${size} class when size passed`, () => {
    cy.mount(KBadge, {
      props: {
        size,
      },
      slots: {
        default: () => size.charAt(0).toUpperCase() + size.substring(1).toLowerCase(),
      },
    })

    cy.get('.k-badge').should('have.class', size)
  })
}

describe('KBadge', () => {
  // Loop through BadgeAppearances
  Object.keys(BadgeAppearances).map(a => rendersCorrectAppearance(a as BadgeAppearance))

  // Loop through BadgeSizes
  Object.values(BadgeSizes).map(s => rendersCorrectSize(s))

  it('defaults to info `appearance`', () => {
    cy.mount(KBadge, {
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.class', 'info')
  })

  it('displays `tooltip` at all times', () => {
    const tooltipText = 'Hello! Long badge with truncated text here'

    cy.mount(KBadge, {
      props: {
        tooltip: tooltipText,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-tooltip').should('contain.text', tooltipText)
  })

  it('when `truncationText` is true, only displays `tooltip` if truncated', () => {
    const tooltipText = 'Hello!'

    cy.mount(KBadge, {
      props: {
        tooltip: tooltipText,
        truncationTooltip: true,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-tooltip').should('not.exist')
  })

  it('it should apply `maxWidth` prop when provided', () => {
    const maxWidth = '10px'
    cy.mount(KBadge, {
      props: {
        maxWidth,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.badge-content').should('have.css', 'max-width').and('eq', maxWidth)
  })

  it('renders the icon slot', () => {
    cy.mount(KBadge, {
      slots: {
        icon: '<span data-testid="icon">Icon</span>',
      },
    })

    cy.get('[data-testid="icon"]').should('exist').should('be.visible')
  })
})
