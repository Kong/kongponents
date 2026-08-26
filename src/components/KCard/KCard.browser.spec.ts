import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import KCard from '@/components/KCard/KCard.vue'

describe('KCard', () => {
  it('renders empty card element when no props or slots are passed', async () => {
    await render(KCard)

    await expect.element(page.getByCSS('.k-card')).toBeVisible()
    await expect.element(page.getByCSS('.k-card .card-header')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.k-card .card-content')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.k-card .card-footer')).not.toBeInTheDocument()
  })

  it('renders title prop when passed', async () => {
    const titleProp = 'Title prop'
    const titleTag = 'h5'

    await render(KCard, {
      props: {
        title: titleProp,
        titleTag,
      },
    })

    await expect.element(page.getByCSS('.k-card').getByCSS(`${titleTag}.card-title`)).toHaveTextContent(titleProp)
  })

  it('renders slots when passed', async () => {
    const titleProp = 'Test title'
    const titleText = 'I am the title'

    await render(KCard, {
      props: {
        title: titleProp,
      },
      slots: {
        title: `<span data-testid="card-title">${titleText}</span>`,
        actions: '<span data-testid="card-actions">Card actions</span>',
        default: '<span data-testid="card-content">Card content</span>',
        footer: '<span data-testid="card-footer">Card footer</span>',
      },
    })

    await expect.element(page.getByTestId('card-title')).toHaveTextContent(titleText)
    await expect.element(page.getByTestId('card-actions')).toBeVisible()
    await expect.element(page.getByTestId('card-content')).toBeVisible()
    await expect.element(page.getByTestId('card-footer')).toBeVisible()
  })

  it('renders a header slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KCard,
        null,
        ready.value ? { actions: () => h('span', { 'data-testid': 'card-actions' }, 'Card actions') } : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-card .card-header')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-card .card-header')).toBeInTheDocument()
    await expect.element(page.getByTestId('card-actions')).toBeVisible()
  })
})
