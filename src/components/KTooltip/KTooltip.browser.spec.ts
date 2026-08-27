import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { defineComponent, h, ref } from 'vue'
import { PopPlacementsArray } from '@/types'
import type { PopPlacements } from '@/types'

const positions = PopPlacementsArray

const rendersCorrectPosition = (variant: PopPlacements) => {
  it(`renders tooltip to the ${variant} side`, async () => {
    const text = 'Button text'

    await render(KTooltip, {
      props: {
        placement: variant,
        text: `I'm on the ${variant} side!`,
        trigger: 'click',
      },
      slots: {
        default: () => h('button', {}, text),
      },
    })

    await page.getByCSS('button').click()

    // `.k-tooltip` is `v-show`-toggled inside KPop, so only visibility is meaningful here.
    await expect.element(page.getByCSS('.k-tooltip')).toBeVisible()
    await expect.element(page.getByCSS('.k-tooltip')).toHaveTextContent(new RegExp(`^I'm on the ${variant} side!$`))
  })
}

describe('KTooltip', () => {
  // Loop through varients
  positions.map(p => rendersCorrectPosition(p))

  it('renders the default slot content but not the tooltip if the disabled prop is true', async () => {
    const text = 'Button text'

    await render(KTooltip, {
      props: {
        trigger: 'click',
        text: 'sample text',
        disabled: true,
      },
      slots: {
        default: () => h('button', { 'data-testid': 'my-button' }, text),
      },
    })

    await expect.element(page.getByTestId('my-button')).toBeVisible()
    await page.getByTestId('my-button').click()

    // KTooltip `v-if`s the whole KPop away when disabled, so existence is meaningful here.
    await expect.element(page.getByCSS('.k-tooltip')).not.toBeInTheDocument()
  })

  it('renders the default slot content but not the tooltip if the text prop is empty', async () => {
    const text = 'Button text'

    await render(KTooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: () => h('button', { 'data-testid': 'my-button' }, text),
      },
    })

    await expect.element(page.getByTestId('my-button')).toBeVisible()
    await page.getByTestId('my-button').click()

    await expect.element(page.getByCSS('.k-tooltip')).not.toBeInTheDocument()
  })

  it('renders with correct default zIndex', async () => {
    await render(KTooltip, {
      props: {
        text: 'sample text',
      },
    })

    await expect.element(page.getByCSS('.k-tooltip.popover')).toHaveStyle({ zIndex: '9999' })
  })

  it('renders with custom zIndex', async () => {
    await render(KTooltip, {
      props: {
        text: 'sample text',
        zIndex: 92929,
      },
    })

    await expect.element(page.getByCSS('.k-tooltip.popover')).toHaveStyle({ zIndex: '92929' })
  })

  it('renders a content slot that is added after mount', async () => {
    // `render()` has no `setData`, so the flag the original spec toggled lives in a ref
    // the test holds directly. A render function is required — `vue` resolves to the
    // runtime-only build here, so a `template` string would render nothing.
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KTooltip,
        { trigger: 'click' },
        {
          default: () => h('button', { 'data-testid': 'my-button' }, 'Button text'),
          ...(ready.value
            ? { content: () => h('span', { 'data-testid': 'tooltip-content' }, 'Tooltip content') }
            : {}),
        },
      ),
    }))

    await expect.element(page.getByTestId('my-button')).toBeVisible()
    await page.getByTestId('my-button').click()
    await expect.element(page.getByCSS('.k-tooltip')).not.toBeInTheDocument()

    ready.value = true
    await page.getByTestId('my-button').click()
    await expect.element(page.getByCSS('.k-tooltip')).toBeVisible()
    await expect.element(page.getByTestId('tooltip-content')).toBeVisible()
  })
})
