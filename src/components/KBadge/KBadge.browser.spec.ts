import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import KBadge from '@/components/KBadge/KBadge.vue'
import { BadgeAppearances, BadgeSizes } from '@/types'
import type { BadgeAppearance, BadgeSize } from '@/types'
import { render } from 'vitest-browser-vue'

/**
 * Converted from KBadge.cy.ts. Assertions target the same class names the Cypress spec
 * used: those classes are public API consumers style against, so they're the stable
 * selector here rather than an added data-testid.
 */

const rendersCorrectAppearance = (variant: BadgeAppearance) => {
  it(`renders KBadge with the ${variant} appearance`, async () => {
    render(KBadge, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    await expect.element(page.getByCSS('.k-badge')).toHaveClass(variant)
  })
}

const rendersCorrectSize = (size: BadgeSize) => {
  it(`sets ${size} class when size passed`, async () => {
    render(KBadge, {
      props: {
        size,
      },
      slots: {
        default: () => size.charAt(0).toUpperCase() + size.substring(1).toLowerCase(),
      },
    })

    await expect.element(page.getByCSS('.k-badge')).toHaveClass(size)
  })
}

describe('KBadge', () => {
  // Loop through BadgeAppearances
  Object.keys(BadgeAppearances).map(a => rendersCorrectAppearance(a as BadgeAppearance))

  // Loop through BadgeSizes
  Object.values(BadgeSizes).map(s => rendersCorrectSize(s))

  it('defaults to info `appearance`', async () => {
    render(KBadge, {
      slots: {
        default: () => 'Hello!',
      },
    })

    await expect.element(page.getByCSS('.k-badge')).toHaveClass('info')
  })

  it('displays `tooltip` at all times', async () => {
    const tooltipText = 'Hello! Long badge with truncated text here'

    render(KBadge, {
      props: {
        tooltip: tooltipText,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    await expect.element(page.getByCSS('.k-tooltip')).toHaveTextContent(tooltipText)
  })

  it('when `truncationText` is true, only displays `tooltip` if truncated', async () => {
    const tooltipText = 'Hello!'

    render(KBadge, {
      props: {
        tooltip: tooltipText,
        truncationTooltip: true,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    await expect.element(page.getByCSS('.k-tooltip')).not.toBeInTheDocument()
  })

  it('it should apply `maxWidth` prop when provided', async () => {
    const maxWidth = '10px'

    render(KBadge, {
      props: {
        maxWidth,
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    /**
     * `toHaveStyle` is typed against `CSSStyleDeclaration`, so properties are camelCase
     * rather than the kebab-case Cypress used in `should('have.css', 'max-width')`.
     */
    await expect.element(page.getByCSS('.badge-content')).toHaveStyle({ maxWidth })
  })

  it('renders the icon slot', async () => {
    render(KBadge, {
      slots: {
        icon: '<span data-testid="icon">Icon</span>',
      },
    })

    await expect.element(page.getByTestId('icon')).toBeVisible()
  })
})
