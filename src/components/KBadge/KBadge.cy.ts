import { mount } from 'cypress/vue'
import KBadge from '@/components/KBadge/KBadge.vue'
import type { BadgeAppearance } from '@/types'
import { BadgeAppearances } from '@/types'

const rendersCorrectAppearance = (variant: BadgeAppearance) => {
  it(`renders KBadge with the ${variant} appearance`, () => {
    mount(KBadge, {
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

describe('KBadge', () => {
  // Loop through BadgeAppearances
  Object.keys(BadgeAppearances).map(a => rendersCorrectAppearance(a as BadgeAppearance))

  it('defaults to info `appearance`', () => {
    mount(KBadge, {
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.class', 'info')
  })

  it('displays `tooltip` at all times', () => {
    const tooltipText = 'Hello! Long badge with truncated text here'

    mount(KBadge, {
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

    mount(KBadge, {
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

  it('handles custom colors', () => {
    mount(KBadge, {
      props: {
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

  it('it should apply `maxWidth` prop when provided', () => {
    const maxWidth = '10px'
    mount(KBadge, {
      props: {
        maxWidth,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.badge-content-wrapper').should('have.css', 'max-width').and('eq', maxWidth)
  })
})
