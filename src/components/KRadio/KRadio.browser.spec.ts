import { describe, it, expect } from 'vitest'
import { h, ref, defineComponent } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KRadio from '@/components/KRadio/KRadio.vue'

describe('KRadio', () => {
  it('shows as not selected when modelValue is true', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
      },
    })

    await expect.element(page.getByCSS('input')).not.toBeChecked()
  })

  it('shows as selected when modelValue is true', async () => {
    await render(KRadio, {
      props: {
        modelValue: true,
        selectedValue: true,
      },
    })

    await expect.element(page.getByCSS('input')).toBeChecked()
  })

  it('emits checked value on click', async () => {
    const screen = await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
      },
    })

    await page.getByCSS('input').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('change')
    await expect.poll(() => screen.emitted()).toHaveProperty('update:modelValue')

    expect(screen.emitted('change')?.[0][0]).toBe(true)
    expect(screen.emitted('update:modelValue')?.[0][0]).toBe(true)
  })

  it('renders the default slot content when card prop is true', async () => {
    const slotText = 'Hello world'

    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        label: 'Some label',
      },
      slots: {
        default: () => slotText,
      },
    })

    await expect.element(page.getByCSS('.radio-card')).toHaveClass('card-vertical')
    await expect.element(page.getByCSS('.radio-card')).toHaveTextContent(slotText)
  })

  it('renders input element and no tooltip by default when card prop is true', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        label: 'Some label',
      },
    })

    await expect.element(page.getByCSS('input')).toBeVisible()
    await expect.element(page.getByCSS('.label-tooltip')).not.toBeInTheDocument()
  })

  it('renders input element hidden when cardRadioVisible prop is false', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        cardRadioVisible: false,
        label: 'Some label',
      },
    })

    await expect.element(page.getByCSS('input')).not.toBeVisible()
  })

  it('renders card in horizontal orientation when cardOrientation prop is horizontal', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
        label: 'Some label',
        cardOrientation: 'horizontal',
      },
    })

    await expect.element(page.getByCSS('.radio-card')).not.toHaveClass('card-vertical')
    await expect.element(page.getByCSS('.radio-card')).toHaveClass('card-horizontal')
  })

  it('emits checked value on click within entire label element when card prop is true', async () => {
    const screen = await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
      },
      slots: {
        default: () => 'Hello',
      },
      attrs: {
        id: 'radio',
      },
    })

    await page.getByCSS('label').click()

    await expect.element(page.getByCSS('input')).toBeChecked()
    await expect.poll(() => screen.emitted()).toHaveProperty('change')
    await expect.poll(() => screen.emitted()).toHaveProperty('update:modelValue')
  })

  it('should not be selectable when disabled and card prop is true', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        card: true,
      },
      attrs: {
        disabled: true,
      },
      slots: {
        default: () => 'Hello',
      },
    })

    await page.getByCSS('label').click({ force: true })

    await expect.element(page.getByCSS('input')).not.toBeChecked()
  })

  it('renders tooltip next to the label when passed through slot and card prop is true', async () => {
    await render(KRadio, {
      props: {
        modelValue: false,
        selectedValue: true,
        label: 'Some label',
        card: true,
      },
      attrs: {
        disabled: true,
      },
      slots: {
        tooltip: () => 'Hello',
      },
    })

    await expect.element(page.getByCSS('.label-tooltip')).toBeVisible()
  })

  it('renders a description slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(KRadio, {
        modelValue: false,
        selectedValue: true,
        label: 'Some label',
      }, ready.value ? {
        description: () => h('span', { 'data-testid': 'radio-description' }, 'Description content'),
      } : {}),
    }))

    await expect.element(page.getByCSS('.radio-description')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.radio-description')).toBeInTheDocument()
    await expect.element(page.getByTestId('radio-description')).toBeVisible()
  })

  it('renders a tooltip slot that is added after mount when card prop is true', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(KRadio, {
        card: true,
        modelValue: false,
        selectedValue: true,
        label: 'Some label',
      }, ready.value ? {
        tooltip: () => h('span', { 'data-testid': 'radio-tooltip' }, 'Tooltip content'),
      } : {}),
    }))

    await expect.element(page.getByCSS('.label-tooltip')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.label-tooltip')).toBeInTheDocument()
  })
})
