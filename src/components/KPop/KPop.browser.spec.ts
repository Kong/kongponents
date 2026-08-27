import { describe, it, expect } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KPop from '@/components/KPop/KPop.vue'
import { computed, h } from 'vue'
import { POPOVER_PARENT_ZINDEX_KEY } from '@/utilities/injection-keys'
import { resetPointer } from '@test/utils/reset-pointer'

describe('KPop', () => {
  it('renders props when passed', async () => {
    const popButtonText = 'Click Me!'
    const popTitle = 'Cool Beans!'

    await render(KPop, {
      props: {
        buttonText: popButtonText,
        title: popTitle,
      },
    })

    await expect.poll(() => page.getByTestId('popover-button').element().innerHTML).toContain(popButtonText)
    await expect.poll(() => page.getByCSS('.popover-title').element().innerHTML).toContain(popTitle)
  })

  it('renders slots when passed', async () => {
    const popTitle = 'Look Mah!'
    const popContent = 'Pop Content'
    const popFooter = 'Pop Footer'

    await render(KPop, {
      props: {
      },
      slots: {
        title: () => h('span', {}, popTitle),
        content: h('span', {}, popContent),
        footer: h('span', {}, popFooter),
      },
    })

    await expect.poll(() => page.getByCSS('.popover-title').element().innerHTML).toContain(popTitle)
    await expect.poll(() => page.getByCSS('.popover-content').element().innerHTML).toContain(popContent)
    await expect.poll(() => page.getByCSS('.popover-footer').element().innerHTML).toContain(popFooter)
  })

  it('renders with correct px width', async () => {
    const width = 300
    await render(KPop, {
      props: {
        width: width + '',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })
    await page.getByCSS('.slottedEl').click()
    await expect.element(page.getByCSS('.popover .popover-container')).toHaveStyle({ width: `${width}px` })
  })

  it('renders with correct title', async () => {
    const title = 'Cool Beans!'
    await render(KPop, {
      props: {
        title,
      },
    })
    await expect.element(page.getByCSS('.popover-title')).toHaveTextContent(new RegExp(`^${title}$`))
  })

  it('has no title if no prop', async () => {
    await render(KPop, {
      props: {
      },
    })
    // The title block is `v-if`-rendered, so existence is the meaningful assertion here.
    await expect.element(page.getByCSS('.popover-title')).not.toBeInTheDocument()
  })

  it('shows element on click', async () => {
    await render(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    // `.popover` is `v-show`-toggled, so it is always in the document — only visibility means anything.
    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
    await page.getByCSS('.slottedEl').click()
    await expect.element(page.getByCSS('.popover')).toBeVisible()
  })

  it('shows element on hover', async () => {
    await resetPointer()

    await render(KPop, {
      props: {
        title: 'Popover Title',
        trigger: 'hover',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
    await page.getByCSS('.slottedEl').hover()
    await expect.element(page.getByCSS('.popover')).toBeVisible()
  })

  it('delays showing popover on hover when popoverDelay is set', async () => {
    await resetPointer()

    await render(KPop, {
      props: {
        title: 'Popover Title',
        trigger: 'hover',
        popoverDelay: 500,
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    await expect.element(page.getByCSS('.popover')).not.toBeVisible()

    const hoveredAt = performance.now()
    await page.getByCSS('.slottedEl').hover()
    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
    await expect.element(page.getByCSS('.popover')).toBeVisible()

    /**
     * Assert the delay itself rather than bounding it with a timeout: the reveal lands ~515ms
     * after `hover()` returns, so a `{ timeout: 1000 }` upper bound was measuring CI load as much
     * as the delay. A timer can only fire late, so this can't false-fail — but an immediate
     * reveal would land near 0ms and still fail.
     */
    expect(performance.now() - hoveredAt).toBeGreaterThanOrEqual(500)
  })

  it('cancels pending show when mouseleave occurs during popoverDelay', async () => {
    await resetPointer()

    await render(KPop, {
      props: {
        title: 'Popover Title',
        trigger: 'hover',
        popoverDelay: 500,
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    await page.getByCSS('.slottedEl').hover()
    await page.getByCSS('.slottedEl').unhover()
    // Genuinely about elapsed time: the assertion has to outlive the 500ms `popoverDelay`
    // it is proving was cancelled, so there is no end state to wait on instead.
    await new Promise((resolve) => setTimeout(resolve, 800))
    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
  })

  it('renders with correct default zIndex', async () => {
    await render(KPop)

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '1000' })
  })

  it('renders with custom zIndex', async () => {
    await render(KPop, {
      props: {
        zIndex: 2200,
      },
    })

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '2200' })
  })

  it('elevates zIndex above a parent-provided z-index when not explicitly set', async () => {
    await render(KPop, {
      global: {
        provide: {
          [POPOVER_PARENT_ZINDEX_KEY as symbol]: computed(() => 9999),
        },
      },
    })

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '10000' })
  })

  it('prefers an explicit zIndex over a parent-provided z-index', async () => {
    await render(KPop, {
      props: {
        zIndex: 500,
      },
      global: {
        provide: {
          [POPOVER_PARENT_ZINDEX_KEY as symbol]: computed(() => 9999),
        },
      },
    })

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '500' })
  })

  it('does not render close icon when prop is false', async () => {
    await render(KPop, {
      props: {
        hideCloseIcon: true,
      },
    })

    // The close button is `v-if`-rendered, so existence is the meaningful assertion here.
    await expect.element(page.getByCSS('.popover-close-button')).not.toBeInTheDocument()
  })

  it('closes popover when close button is clicked', async () => {
    await render(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    await page.getByCSS('.slottedEl').click()
    await expect.element(page.getByCSS('.popover')).toBeVisible()
    await page.getByCSS('.popover-close-button').click()
    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
  })

  it('closes popover on escape key press', async () => {
    await render(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    await page.getByCSS('.slottedEl').click()
    await expect.element(page.getByCSS('.popover')).toBeVisible()
    // The `keydown.esc` handler sits on the KPop root, so the key press has to originate from
    // inside the popover to bubble up to it — focus the close button rather than clicking it.
    page.getByCSS('.popover-close-button').element().focus()
    await userEvent.keyboard('{Escape}')
    await expect.element(page.getByCSS('.popover')).not.toBeVisible()
  })

  it('applies custom attributes and classes to popover element', async () => {
    const testId = 'custom-popover-attr'
    const customClass = 'custom-popover-class'

    await render(KPop, {
      props: {
        popoverClasses: customClass,
        popoverElementAttributes: { 'data-testid': testId },
      },
    })

    await expect.element(page.getByCSS(`.popover.${customClass}[data-testid="${testId}"]`)).toBeInTheDocument()
  })
})
