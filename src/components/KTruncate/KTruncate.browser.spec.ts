import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KTruncate from '@/components/KTruncate/KTruncate.vue'

describe('KTruncate', () => {
  it('should not truncate content when is not overflowing', async () => {
    await render(KTruncate, {
      props: {
        rows: 3,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element 1</span>',
          '<span style="width: 100%;">Visible element 2</span>',
          '<span data-testid="last-visible-element" style="width: 100%;">Visible element 3</span>',
        ],
      },
    })

    await expect.element(page.getByTestId('last-visible-element')).toBeVisible()
  })

  it('should truncate overflowing content and show it when expanded', async () => {
    await render(KTruncate, {
      props: {
        rows: 2,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element 1</span>',
          '<span style="width: 100%;">Visible element 2</span>',
          '<span data-testid="overflowing-element" style="width: 100%;">Overflowing element</span>',
        ],
      },
    })

    await expect.element(page.getByTestId('overflowing-element')).not.toBeInViewport({ ratio: 0.5 })
    await page.getByTestId('expand-trigger-wrapper').click()
    await expect.element(page.getByTestId('overflowing-element')).toBeInViewport({ ratio: 0.5 })
  })

  it('render content passed in through expand trigger slot', async () => {
    const expandTriggerContent = 'Expand'
    await render(KTruncate, {
      slots: {
        default: [
          '<span style="width: 100%;">Visible element</span>',
          '<span style="width: 100%;">Overflowing element</span>',
        ],
        'expand-trigger': () => expandTriggerContent,
      },
    })

    await expect.element(page.getByTestId('expand-trigger-wrapper')).toHaveTextContent(expandTriggerContent)
    await page.getByTestId('expand-trigger-wrapper').click()
  })

  it('render expanded when expanded prop is true and render content passed in through expand trigger slot', async () => {
    const collapseTriggerContent = 'Collapse'
    await render(KTruncate, {
      props: {
        expanded: true,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element</span>',
          '<span data-testid="visible-overflowing-element" style="width: 100%;">Visible overflowing element</span>',
        ],
        'collapse-trigger': () => collapseTriggerContent,
      },
    })

    await expect.element(page.getByTestId('visible-overflowing-element')).toBeVisible()
    await expect.element(page.getByTestId('collapse-trigger-wrapper')).toHaveTextContent(collapseTriggerContent)
  })
})
