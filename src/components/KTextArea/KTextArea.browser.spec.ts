import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import KTextArea from '@/components/KTextArea/KTextArea.vue'

// Helper function to get the number of rendered rows in a textarea
function getRenderedRows(el: HTMLElement) {
  const { paddingTop, paddingBottom, borderTopWidth, borderBottomWidth, lineHeight } = window.getComputedStyle(el)
  const extraSpacing = [paddingTop, paddingBottom, borderTopWidth, borderBottomWidth]
    .map((value) => parseFloat(value))
    .reduce((acc, val) => acc + val, 0)
  const lineHeightValue = parseFloat(lineHeight)
  return Math.round((el.offsetHeight - extraSpacing) / lineHeightValue)
}

describe('KTextArea', () => {
  it('renders text when value is passed', async () => {
    const value = 'Howdy!'

    await render(KTextArea, {
      props: {
        modelValue: value,
      },
    })

    await expect.element(page.getByCSS('textarea')).toHaveValue(value)
  })

  it('renders `label` when value is passed', async () => {
    const labelText = 'A Label!'

    await render(KTextArea, {
      props: {
        label: labelText,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
  })

  it('renders label with `labelAttributes` applied', async () => {
    const labelText = 'A Label'

    await render(KTextArea, {
      props: {
        label: labelText,
        labelAttributes: {
          info: 'some info text',
        },
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('renders help when value is passed', async () => {
    const helpText = 'I am helpful'

    await render(KTextArea, {
      props: {
        help: helpText,
      },
    })

    await expect.element(page.getByCSS('.k-textarea .help-text')).toHaveTextContent(helpText)
  })

  it('renders help with `help` slot applied', async () => {
    const helpText = 'This is help text'

    await render(KTextArea, {
      slots: {
        help: () => h('div', {}, helpText),
      },
    })

    await expect.element(page.getByCSS('.k-textarea .help-text')).toHaveTextContent(helpText)
  })

  it('renders a help slot that is added after mount', async () => {
    const helpText = 'This is help text'
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KTextArea,
        null,
        ready.value ? { help: () => helpText } : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-textarea .help-text')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-textarea .help-text')).toHaveTextContent(helpText)
  })

  it('renders a label-tooltip slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KTextArea,
        { label: 'A label' },
        ready.value ? { 'label-tooltip': () => 'Tooltip content' } : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('handles `required` attribute correctly', async () => {
    await render(KTextArea, {
      props: {
        label: 'A label',
        required: true,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveClass('required')
  })

  it('renders textarea when `rows` prop is passed in', async () => {
    await render(KTextArea, {
      props: {
        rows: 2,
      },
    })

    await expect.element(page.getByCSS('textarea')).toBeVisible()
    await expect.element(page.getByCSS('textarea')).toHaveAttribute('rows', '2')
  })

  it('reacts to text changes', async () => {
    const value1 = 'hey'
    const value2 = 'hey, dude'

    const screen = await render(KTextArea, {
      props: {
        modelValue: value1,
      },
    })

    await expect.element(page.getByCSS('textarea')).toHaveValue(value1)

    await page.getByCSS('textarea').fill(value2)

    await expect.poll(() => screen.emitted()).toHaveProperty('input')
    const emitted = screen.emitted('input')
    expect(emitted?.[emitted.length - 1][0]).toBe(value2)

    await expect.element(page.getByCSS('textarea')).toHaveValue(value2)
  })

  it('shows character count when `characterLimit` prop is set and exceeded', async () => {
    const textCharCount = 28
    const charLimit = 5

    await render(KTextArea, {
      props: {
        characterLimit: charLimit,
      },
    })

    await page.getByCSS('textarea').fill(`This input has ${textCharCount} characters`)

    await expect.element(page.getByCSS('.k-textarea.input-error .help-text')).toHaveTextContent(`${textCharCount} / ${charLimit}`)
  })

  it('falls back to default character limit if `characterLimit` is `true`', async () => {
    const string = new Array(2049).join('a') // default character limit is 2048

    await render(KTextArea, {
      props: {
        characterLimit: true,
        modelValue: string,
      },
    })

    // append a character to the existing value, as the component only tracks
    // length from its own input events, not from the initial `modelValue`
    await page.getByCSS('textarea').fill(`${string}b`)

    await expect.element(page.getByCSS('.k-textarea')).toHaveClass('input-error')
    await expect.element(page.getByCSS('.k-textarea .help-text')).toBeVisible()
    await expect.element(page.getByCSS('.k-textarea .help-text')).toHaveTextContent('2049 / 2048')
  })

  it('does not show character limit error when `characterLimit` is `false`', async () => {
    const string = new Array(2049).join('a') // default character limit is 2048

    await render(KTextArea, {
      props: {
        characterLimit: false,
        modelValue: string,
      },
    })

    await page.getByCSS('textarea').fill(`${string}b`)

    await expect.element(page.getByCSS('.k-textarea')).not.toHaveClass('input-error')
    await expect.element(page.getByCSS('.k-textarea .help-text')).not.toBeInTheDocument()
  })

  it('should handle `resizable` prop correctly', async () => {
    await render(KTextArea, {
      props: {
        resizable: true,
      },
    })

    await expect.element(page.getByCSS('textarea')).toHaveClass('resizable')
  })

  it('should handle `autosize` prop correctly', async () => {
    await render(KTextArea, {
      props: {
        autosize: true,
        rows: 2,
      },
    })

    await expect.element(page.getByCSS('.input-textarea-wrapper')).toHaveClass('autosize')

    const textarea = page.getByCSS('textarea')

    const content1 = '1\n2\n3\n4'
    await textarea.fill(content1)
    await expect.poll(() => getRenderedRows(textarea.element() as HTMLElement)).toBe(4)

    const content2 = `${content1}\n5\n6`
    await textarea.fill(content2)
    await expect.poll(() => getRenderedRows(textarea.element() as HTMLElement)).toBe(6)

    // equivalent to backspacing 6 characters off the end of content2
    const content3 = content2.slice(0, -6)
    await textarea.fill(content3)
    await expect.poll(() => getRenderedRows(textarea.element() as HTMLElement)).toBe(3)
  })

  it('should not auto-adjust height when `autosize` is not provided', async () => {
    await render(KTextArea, {
      props: {
        rows: 2,
      },
    })

    await expect.element(page.getByCSS('.input-textarea-wrapper')).not.toHaveClass('autosize')

    const textarea = page.getByCSS('textarea')

    await expect.element(textarea).toHaveAttribute('rows', '2')

    await textarea.fill('1\n2\n3\n4')

    await expect.poll(() => getRenderedRows(textarea.element() as HTMLElement)).toBe(2)
  })
})
