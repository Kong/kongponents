import { describe, it, expect } from 'vitest'
import { h, ref, defineComponent } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'

describe('KEmptyState', () => {
  ;['default', 'error', 'config', 'file', 'search', 'kong'].forEach((variant) => {
    it(`renders ${variant} icon variant correctly`, async () => {
      await render(KEmptyState, {
        props: {
          iconVariant: variant as any,
        },
      })

      await expect.element(page.getByCSS(`.k-empty-state.${variant}`)).toBeVisible()
    })
  })

  it('renders all elements correctly', async () => {
    await render(KEmptyState)

    await expect.element(page.getByCSS('.k-empty-state')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-icon')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-title')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.empty-state-message')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.empty-state-action')).not.toBeInTheDocument()
  })

  it('renders title and message when provided', async () => {
    const title = 'Title'
    const message = 'Message'

    await render(KEmptyState, {
      props: {
        title,
        message,
      },
    })

    await expect.element(page.getByCSS('.empty-state-title')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-title')).toHaveTextContent(title)
    await expect.element(page.getByCSS('.empty-state-message')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-message')).toHaveTextContent(message)
  })

  it('renders action button when provided button text', async () => {
    const actionButtonText = 'Action'

    await render(KEmptyState, {
      props: {
        actionButtonText,
      },
    })

    await expect.element(page.getByCSS('.empty-state-action')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-action')).toHaveTextContent(actionButtonText)
  })

  it('renders action button icon when slotted', async () => {
    const testId = 'action-button-slotted-icon'

    await render(KEmptyState, {
      props: {
        actionButtonText: 'Action',
      },
      slots: {
        'action-button-icon': h('span', { 'data-testid': testId }, 'Action Icon'),
      },
    })

    await expect.element(page.getByCSS('.empty-state-action').getByTestId(testId)).toBeVisible()
  })

  it('does not render action button when hidden', async () => {
    await render(KEmptyState, {
      props: {
        actionButtonVisible: false,
        actionButtonText: 'Action',
      },
    })

    await expect.element(page.getByCSS('.empty-state-action')).not.toBeInTheDocument()
  })

  it('correctly handles action button disabled state', async () => {
    await render(KEmptyState, {
      props: {
        actionButtonText: 'Action',
        actionButtonDisabled: true,
      },
    })

    await expect.element(page.getByCSS('.empty-state-action')).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-action').getByCSS('button')).toBeDisabled()
  })

  it('displays content passed through default slot correctly', async () => {
    const content = 'Content'
    const testId = 'slotted-message'

    await render(KEmptyState, {
      props: {
        message: 'Message',
      },
      slots: {
        default: h('span', { 'data-testid': testId }, content),
      },
    })

    await expect.element(page.getByCSS('.empty-state-message').getByTestId(testId)).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-message').getByTestId(testId)).toHaveTextContent(content)
  })

  it('displays icon passed through icon slot', async () => {
    const iconSlotContent = 'icon slot content'
    const testId = 'slotted-icon'

    await render(KEmptyState, {
      slots: {
        icon: h('div', { 'data-testid': testId }, iconSlotContent),
      },
    })

    await expect.element(page.getByCSS('.empty-state-icon').getByTestId(testId)).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-icon').getByTestId(testId)).toHaveTextContent(iconSlotContent)
  })

  it('emits event when action button is clicked', async () => {
    const screen = await render(KEmptyState, {
      props: {
        actionButtonText: 'Action',
      },
    })

    await expect.element(page.getByCSS('.empty-state-action')).toBeVisible()
    await page.getByCSS('.empty-state-action').getByCSS('button').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('click-action')
  })

  it('renders content passed through image slot instead of the default icon', async () => {
    const imageSlotContent = 'image slot content'
    const imageTestId = 'slotted-image'

    await render(KEmptyState, {
      slots: {
        image: h('div', { 'data-testid': imageTestId }, imageSlotContent),
      },
    })

    await expect.element(page.getByCSS('.empty-state-icon')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.empty-state-image').getByTestId(imageTestId)).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-image').getByTestId(imageTestId)).toHaveTextContent(imageSlotContent)
  })

  it('switches from the default icon to the image container class when the image slot is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(KEmptyState, null, ready.value ? {
        image: () => h('div', { 'data-testid': 'slotted-image' }, 'image content'),
      } : {}),
    }))

    await expect.element(page.getByCSS('.empty-state-icon')).toBeInTheDocument()
    await expect.element(page.getByCSS('.empty-state-image')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.empty-state-icon')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.empty-state-image')).toBeInTheDocument()
    await expect.element(page.getByTestId('slotted-image')).toBeVisible()
  })

  it('renders cards for each feature when features prop is provided', async () => {
    const features = [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ]

    await render(KEmptyState, {
      props: {
        features,
      },
    })

    await expect.poll(() => page.getByCSS('.empty-state-feature-card').all().length).toBe(features.length)
  })

  it('renders content passed through feature-icon slot correctly', async () => {
    const featureIconContent = 'Feature Icon Content'
    const feature0IconTestId = 'feature-0-icon-slot'
    const feature0Key = 'foobar'

    await render(KEmptyState, {
      props: {
        features: [{ key: feature0Key, title: 'Feature', description: 'Description' }],
      },
      slots: {
        [`feature-icon-${feature0Key}`]: h('div', { 'data-testid': feature0IconTestId }, featureIconContent),
      },
    })

    await expect.element(page.getByCSS('.empty-state-feature-card').getByTestId(feature0IconTestId)).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-feature-card').getByTestId(feature0IconTestId)).toHaveTextContent(featureIconContent)
  })

  it('renders content passed through footer slot correctly', async () => {
    const footerContent = 'Footer Content'
    const testId = 'slotted-footer'

    await render(KEmptyState, {
      slots: {
        footer: h('div', { 'data-testid': testId }, footerContent),
      },
    })

    await expect.element(page.getByCSS('.empty-state-footer-container').getByTestId(testId)).toBeVisible()
    await expect.element(page.getByCSS('.empty-state-footer-container').getByTestId(testId)).toHaveTextContent(footerContent)
  })
})
