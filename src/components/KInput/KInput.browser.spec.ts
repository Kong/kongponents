import { describe, it, expect } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import KInput from '@/components/KInput/KInput.vue'

describe('KInput', () => {
  it('renders text when value is passed', async () => {
    const text = 'Hello'

    await render(KInput, {
      props: {
        modelValue: text, // e.g. v-model
      },
    })

    await expect.element(page.getByCSS('input')).toHaveValue(text)
  })

  it('renders `null` modelValue as empty string', async () => {
    await render(KInput, {
      props: {
        // @ts-expect-error - to allow passing an invalid modelValue
        modelValue: null, // e.g. v-model
      },
    })

    await expect.element(page.getByCSS('input')).not.toHaveValue('null')
    await expect.element(page.getByCSS('input')).toHaveValue('')
  })

  it('renders `undefined` modelValue as empty string', async () => {
    await render(KInput, {
      props: {
        modelValue: undefined, // e.g. v-model
      },
    })

    await expect.element(page.getByCSS('input')).not.toHaveValue('undefined')
    await expect.element(page.getByCSS('input')).toHaveValue('')
  })

  it('renders label when value is passed', async () => {
    const label = 'A label'

    await render(KInput, {
      props: {
        label,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(label)
  })

  it('renders label with labelAttributes applied', async () => {
    const label = 'A label'

    await render(KInput, {
      props: {
        label,
        labelAttributes: {
          info: 'some info text',
        },
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(label)
    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('renders label and tooltip with `label-tooltip` slot applied', async () => {
    const label = 'A label'

    await render(KInput, {
      props: {
        label,
      },
      slots: {
        'label-tooltip': () => h('div', {}, 'This is a tooltip'),
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(label)
    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('renders a label-tooltip slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KInput,
        { label: 'A label' },
        ready.value ? { 'label-tooltip': () => 'Tooltip content' } : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('handles `required` attribute correctly', async () => {
    await render(KInput, {
      props: {
        label: 'A label',
        required: true,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveClass('required')
  })

  it('renders help when value is passed', async () => {
    const helpText = 'I am helpful'

    await render(KInput, {
      props: {
        help: helpText,
      },
    })

    await expect.element(page.getByCSS('.k-input .help-text')).toHaveTextContent(helpText)
  })

  it('renders error message when `error` and `errorMessage` are passed', async () => {
    const helpText = 'I am helpful'
    const errorMessage = 'This is an error message'

    await render(KInput, {
      props: {
        help: helpText,
        error: true,
        errorMessage,
      },
    })

    await expect.element(page.getByCSS('.k-input .help-text')).toHaveTextContent(errorMessage)
    await expect.element(page.getByCSS('.k-input .help-text')).not.toHaveTextContent(helpText)
  })

  it('renders help with `help` slot applied', async () => {
    const helpText = 'This is help text'

    await render(KInput, {
      slots: {
        help: () => h('div', {}, helpText),
      },
    })

    await expect.element(page.getByCSS('.k-input .help-text')).toHaveTextContent(helpText)
  })

  it('renders a help slot that is added after mount', async () => {
    const helpText = 'This is help text'
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KInput,
        null,
        ready.value ? { help: () => helpText } : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-input .help-text')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-input .help-text')).toHaveTextContent(helpText)
  })

  it('renders the error message with `error` and `error-message` props and `help` slot applied', async () => {
    const helpText = 'This is help text'
    const errorMessage = 'This is an error message'

    await render(KInput, {
      props: {
        error: true,
        errorMessage,
      },
      slots: {
        help: () => h('div', {}, helpText),
      },
    })

    await expect.element(page.getByCSS('.k-input .help-text')).toHaveTextContent(errorMessage)
  })

  it('shows character count when characterLimit prop is set and exceeded', async () => {
    const textCharCount = 28
    const charLimit = 5

    await render(KInput, {
      props: {
        characterLimit: charLimit,
      },
    })

    await page.getByCSS('.k-input input.input').fill(`This input has ${textCharCount} characters`)

    await expect.element(page.getByCSS('.k-input.input-error .help-text')).toHaveTextContent(`${textCharCount} / ${charLimit}`)
  })

  it('reacts to text changes', async () => {
    const inputValue = 'hey'
    const newValue = 'hey, dude'

    const screen = await render(KInput, {
      props: {
        modelValue: inputValue,
      },
    })

    await expect.element(page.getByCSS('.input')).toHaveValue(inputValue)

    await page.getByCSS('.input').clear()
    await page.getByCSS('.input').fill(newValue)

    // Check for emitted event
    await expect.poll(() => screen.emitted()).toHaveProperty('input')
    await expect.element(page.getByCSS('.input')).toHaveValue(newValue)
  })

  it('renders before slot when passed', async () => {
    const beforeSlot = 'before-slot'

    await render(KInput, {
      slots: {
        before: `<span data-testid="${beforeSlot}">Before slot</span>`,
      },
    })

    await expect.element(page.getByCSS('.k-input').getByTestId(beforeSlot)).toBeVisible()
  })

  it('renders after slot when passed', async () => {
    const afterSlot = 'after-slot'

    await render(KInput, {
      slots: {
        after: `<span data-testid="${afterSlot}">After slot</span>`,
      },
    })

    await expect.element(page.getByCSS('.k-input').getByTestId(afterSlot)).toBeVisible()
  })

  it('toggle masking button is not rendered when showPasswordMaskToggle is true but type is not password', async () => {
    await render(KInput, {
      props: {
        type: 'text',
        showPasswordMaskToggle: true,
      },
    })

    await expect.element(page.getByCSS('.k-input .mask-value-toggle-button')).not.toBeInTheDocument()
  })

  it('toggle masking functionality behaves correctly when showPasswordMaskToggle is true and input type is password', async () => {
    const afterSlot = 'after-slot'

    await render(KInput, {
      props: {
        type: 'password',
        showPasswordMaskToggle: true,
      },
      slots: {
        after: `<span data-testid="${afterSlot}">After slot</span>`,
      },
    })

    await expect.element(page.getByCSS('.k-input .mask-value-toggle-button')).toBeVisible()
    await expect.element(page.getByCSS('.k-input input')).toHaveAttribute('type', 'password')

    await userEvent.click(page.getByCSS('.k-input input'))
    await page.getByCSS('.k-input .mask-value-toggle-button').click()

    await expect.element(page.getByCSS('.k-input input')).toHaveAttribute('type', 'text')

    await page.getByCSS('.k-input .mask-value-toggle-button').click()

    await expect.element(page.getByCSS('.k-input input')).toHaveAttribute('type', 'password')
    await expect.element(page.getByCSS('.k-input input')).toHaveFocus()

    // user-provided after slot should be rendered
    await expect.element(page.getByCSS('.k-input').getByTestId(afterSlot)).not.toBeInTheDocument()
  })
})
