import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import KCollapse from '@/components/KCollapse/KCollapse.vue'

describe('KCollapse', () => {
  it('renders proper content when using props', async () => {
    const title = 'Awesome title'
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      props: {
        title,
        triggerLabel,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-title')).toBeInTheDocument()
    await expect.element(page.getByTestId('collapse-title')).toHaveTextContent(title)
    await expect.element(page.getByTestId('collapse-trigger-label')).toHaveTextContent(triggerLabel)
  })

  it('displays a caret for trigger if no label provided', async () => {
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-trigger-icon')).toBeInTheDocument()
  })

  it('allows using leading trigger alignment', async () => {
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      props: {
        triggerLabel,
        triggerAlignment: 'leading',
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-trigger-label')).toHaveTextContent(triggerLabel)
    await expect.element(page.getByCSS('.collapse-heading')).not.toHaveClass('has-trailing-trigger')
  })

  it('correctly shows and hides content with trigger click', async () => {
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      props: {
        triggerLabel,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-trigger-label')).toHaveTextContent(triggerLabel)
    // hidden by default
    await expect.element(page.getByTestId('collapse-hidden-content')).not.toBeVisible()
    // visible when clicked
    await page.getByTestId('collapse-trigger-label').click()
    await expect.element(page.getByTestId('collapse-hidden-content')).toBeVisible()
  })

  it('allows content to be expanded by default', async () => {
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      props: {
        modelValue: false,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-trigger-content')).toBeInTheDocument()
    // visible by default
    await expect.element(page.getByTestId('collapse-hidden-content')).toBeVisible()
    await expect.element(page.getByTestId('collapse-hidden-content')).toHaveTextContent(collapseContent)
    // hidden when clicked
    await page.getByTestId('collapse-trigger-content').click()
    await expect.element(page.getByTestId('collapse-hidden-content')).not.toBeVisible()
  })

  it('renders proper content when using slots', async () => {
    const triggerContent = 'Awesome label'
    const visibleContent = 'Always visible awesomeness'
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      slots: {
        'trigger-content': h('div', {}, triggerContent),
        'visible-content': h('div', {}, visibleContent),
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('collapse-trigger-content')).toHaveTextContent(triggerContent)
    await expect.element(page.getByTestId('collapse-visible-content')).toBeInTheDocument()
    await expect.element(page.getByTestId('collapse-visible-content')).toHaveTextContent(visibleContent)
    // hidden by default
    await expect.element(page.getByTestId('collapse-hidden-content')).not.toBeVisible()
    // visible when clicked
    await page.getByTestId('collapse-trigger-content').click()
    await expect.element(page.getByTestId('collapse-hidden-content')).toBeVisible()
    await expect.element(page.getByTestId('collapse-hidden-content')).toHaveTextContent(collapseContent)
  })

  it('renders a visible-content slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KCollapse,
        null,
        ready.value ? { 'visible-content': () => h('span', { 'data-testid': 'visible-content' }, 'Always visible content') } : {},
      ),
    }))

    await expect.element(page.getByTestId('collapse-visible-content')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByTestId('collapse-visible-content')).toBeInTheDocument()
    await expect.element(page.getByTestId('visible-content')).toBeVisible()
  })

  it('renders title slot when using slots', async () => {
    const title = 'Awesome title'
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    await render(KCollapse, {
      props: {
        triggerLabel,
      },
      slots: {
        title: h('div', { 'data-testid': 'custom-title' }, title),
        default: h('div', {}, collapseContent),
      },
    })

    await expect.element(page.getByTestId('custom-title')).toHaveTextContent(title)
  })
})
