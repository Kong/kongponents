import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import { resetPointer } from '@test/utils/reset-pointer'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'

describe('KCheckbox', () => {
  it('shows as checked when prop passed', async () => {
    const model = true
    await render(KCheckbox, {
      props: {
        modelValue: model,
      },
    })

    await expect.element(page.getByCSS('input[type=checkbox]')).toBeChecked()
  })

  it('emits checked value on click', async () => {
    const model = false

    const screen = await render(KCheckbox, {
      props: {
        modelValue: model,
      },
    })

    await page.getByCSS('input[type=checkbox]').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('input')
    await expect.poll(() => screen.emitted()).toHaveProperty('change')
    await expect.poll(() => screen.emitted()).toHaveProperty('update:modelValue')

    expect(screen.emitted('input')?.[0][0]).toBe(true)
    expect(screen.emitted('change')?.[0][0]).toBe(true)
    expect(screen.emitted('update:modelValue')?.[0][0]).toBe(true)
  })

  it('renders `label` and `description` props', async () => {
    const label = 'Some label'
    const description = 'Some description'

    await render(KCheckbox, {
      props: {
        modelValue: false,
        label,
        description,
      },
    })

    await expect.element(page.getByCSS('.checkbox-label')).toHaveTextContent(new RegExp('^' + label + '$'))
    await expect.element(page.getByCSS('.checkbox-description')).toHaveTextContent(new RegExp('^' + description + '$'))
  })

  it('renders `label` and `description` when passed through slot', async () => {
    const label = 'Some label'
    const description = 'Some description'
    const defaultSlot = 'default-slot'
    const descriptionSlot = 'description-slot'

    await render(KCheckbox, {
      props: {
        modelValue: false,
        label,
        description,
      },
      slots: {
        default: `<span data-testid="${defaultSlot}">${defaultSlot}</span>`,
        description: `<span data-testid="${descriptionSlot}">${descriptionSlot}</span>`,
      },
    })

    await expect.element(page.getByCSS('.k-checkbox').getByTestId(defaultSlot)).toBeVisible()
    await expect.element(page.getByCSS('.checkbox-label')).toHaveTextContent(new RegExp('^' + defaultSlot + '$'))
    await expect.element(page.getByCSS('.k-checkbox').getByTestId(descriptionSlot)).toBeVisible()
    await expect.element(page.getByCSS('.checkbox-description')).toHaveTextContent(new RegExp('^' + descriptionSlot + '$'))
  })

  it('renders correctly in indeterminate state', async () => {
    await render(KCheckbox, {
      props: {
        modelValue: false,
        label: 'Indeterminate label',
      },
      attrs: {
        indeterminate: true,
      },
    })

    await expect.element(page.getByCSS('.k-checkbox').getByTestId('indeterminate-icon')).toBeVisible()
    await expect.element(page.getByCSS('.k-checkbox').getByTestId('check-icon')).not.toBeInTheDocument()
  })

  it('renders KLabel tooltip when `labelAttributes.info` is passed', async () => {
    const tooltipText = 'This is a tooltip'

    await resetPointer()

    await render(KCheckbox, {
      props: {
        modelValue: false,
        label: 'Label with tooltip',
        labelAttributes: {
          info: tooltipText,
        },
      },
    })

    await page.getByCSS('.k-label .label-tooltip').hover()
    await expect.element(page.getByCSS('.k-tooltip')).toBeVisible()
    await expect.element(page.getByCSS('.k-tooltip')).toHaveTextContent(new RegExp('^' + tooltipText + '$'))

    // Clicking the tooltip content should not toggle the checkbox
    await page.getByCSS('.k-label .popover').click()
    await expect.element(page.getByCSS('input[type=checkbox]')).not.toBeChecked()

    // Clicking the tooltip icon should not toggle the checkbox
    await page.getByCSS('.k-label .label-tooltip').click()
    await expect.element(page.getByCSS('input[type=checkbox]')).not.toBeChecked()
  })

  it('renders a description slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KCheckbox,
        { modelValue: false, label: 'Some label' },
        ready.value ? { description: () => h('span', { 'data-testid': 'checkbox-description' }, 'Description content') } : {},
      ),
    }))

    await expect.element(page.getByCSS('.checkbox-description')).not.toBeInTheDocument()
    ready.value = true
    await expect.element(page.getByCSS('.checkbox-description')).toBeInTheDocument()
    await expect.element(page.getByTestId('checkbox-description')).toBeVisible()
  })
})
