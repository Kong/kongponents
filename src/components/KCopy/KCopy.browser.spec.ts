import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KCopy from '@/components/KCopy/KCopy.vue'

const text = '1234567890ABCDEFG'
const container = '.k-copy'

describe('KCopy', () => {
  it('renders with default props', async () => {
    await render(KCopy, {
      props: {
        text,
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()

    const copyText = page.getByCSS(container).getByCSS('.copy-container .copy-text')
    await expect.element(copyText).toHaveClass('monospace')
    await expect.element(copyText).toHaveTextContent(text)

    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  it('renders with `badge` set to true', async () => {
    const badge = 'Id:'
    await render(KCopy, {
      props: {
        text,
        badge: true,
        badgeLabel: badge,
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.copy-badge-text')).toHaveTextContent(badge)
  })

  it('renders with `truncated` set to false', async () => {
    await render(KCopy, {
      props: {
        text,
        truncate: false,
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()

    const copyText = page.getByCSS(container).getByCSS('.copy-container .copy-text')
    await expect.element(copyText).not.toHaveClass('truncate-content')
    await expect.element(copyText).toHaveClass('monospace')
    await expect.element(copyText).toHaveTextContent(text)

    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  it('renders with `monospace` set to false', async () => {
    await render(KCopy, {
      props: {
        text,
        monospace: false,
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()

    const copyContainer = page.getByCSS(container).getByCSS('.copy-container')
    await expect.element(copyContainer).not.toHaveClass('monospace')
    await expect.element(copyContainer).toHaveTextContent(text)

    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  it('renders with `format` set to `hidden`', async () => {
    await render(KCopy, {
      props: {
        text,
        format: 'hidden',
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()
    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByTestId('copy-id')).not.toBeInTheDocument()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  it('renders with `format` set to `redacted`', async () => {
    await render(KCopy, {
      props: {
        text,
        format: 'redacted',
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()

    const copyText = page.getByCSS(container).getByCSS('.copy-container .copy-text')
    await expect.element(copyText).toHaveClass('monospace')
    await expect.element(copyText).toHaveTextContent('*****')

    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  it('renders with `format` set to `deleted`', async () => {
    await render(KCopy, {
      props: {
        text,
        format: 'deleted',
      },
    })

    await expect.element(page.getByCSS(container)).toBeVisible()

    const copyText = page.getByCSS(container).getByCSS('.copy-container .copy-text')
    await expect.element(copyText).toHaveClass('monospace')
    await expect.element(copyText).toHaveTextContent('*12345')

    await expect.element(page.getByCSS(container).getByTestId('copy-to-clipboard')).toBeVisible()
    await expect.element(page.getByCSS(container).getByCSS('.text-icon')).toBeVisible()
  })

  describe('tooltips', () => {
    it('renders with `copyTooltip` prop set', async () => {
      const tooltipText = 'Click to copy!'

      await render(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
        },
      })

      await expect.element(page.getByCSS(container)).toBeVisible()

      const tooltip = page.getByCSS(container).getByCSS('.k-tooltip')
      await expect.element(tooltip).toBeInTheDocument()
      await expect.element(tooltip.getByCSS('.popover-content')).toHaveTextContent(tooltipText)
    })

    it('renders with `textTooltip` prop set', async () => {
      const tooltipText = 'Custom tooltip text!'

      await render(KCopy, {
        props: {
          text,
          textTooltip: tooltipText,
        },
      })

      await expect.element(page.getByCSS(container)).toBeVisible()

      const tooltip = page.getByCSS(container).getByTestId('copy-tooltip-wrapper').getByCSS('.k-tooltip')
      await expect.element(tooltip).toBeInTheDocument()
      await expect.element(tooltip.getByCSS('.popover-content')).toHaveTextContent(tooltipText)
    })

    it('renders `successTooltip` with `copyTooltip` prop set', async () => {
      if (!navigator.clipboard) {
        Object.defineProperty(navigator, 'clipboard', {
          value: { writeText: vi.fn() },
          configurable: true,
        })
      }
      vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

      const tooltipText = 'Click to copy'
      const successText = 'Copied!'

      await render(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
          successTooltip: successText,
        },
      })

      await expect.element(page.getByCSS(container)).toBeVisible()

      const tooltip = page.getByCSS(container).getByCSS('.k-tooltip')
      await expect.element(tooltip).toBeInTheDocument()
      await expect.element(tooltip.getByCSS('.popover-content')).toHaveTextContent(tooltipText)

      await page.getByCSS(container).getByTestId('copy-to-clipboard').click()

      await expect.element(tooltip.getByCSS('.popover-content')).toHaveTextContent(successText)
    })
  })
})
