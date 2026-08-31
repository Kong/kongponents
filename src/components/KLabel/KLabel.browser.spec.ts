import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import { resetPointer } from '@test/utils/reset-pointer'

describe('KLabel', () => {
  it('renders a plain label by default', async () => {
    const text = 'Full Name'
    await render(KLabel, {
      props: {
      },
      slots: {
        default: () => text,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(text)
  })

  it('renders a red dot when `required` is true', async () => {
    await render(KLabel, {
      props: {
        required: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    const label = page.getByCSS('.k-label.required')
    await expect.element(label).toBeInTheDocument()

    const el = label.element()
    const before = window.getComputedStyle(el, '::before')
    const contentValue = before.getPropertyValue('content')

    // the returned value will be an empty string with double quotes around it
    expect(contentValue).toEqual('""')
  })

  it('renders a tooltip when `info` prop is provided', async () => {
    const info = 'This is a tooltip'
    await render(KLabel, {
      props: {
        info,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    await expect.element(page.getByCSS('.k-label .label-tooltip')).toHaveTextContent(info)
  })

  it('renders a tooltip when `tooltip` slot is used', async () => {
    const text = 'This is a tooltip'
    await render(KLabel, {
      props: {
      },
      slots: {
        default: () => 'Full Name',
        tooltip: () => h('div', {}, text),
      },
    })

    await expect.element(page.getByCSS('.k-label .label-tooltip')).toHaveTextContent(text)
  })

  it('passes the `for` attribute to label when `for` is provided', async () => {
    const id = 'test-id'
    await render(KLabel, {
      props: {
        for: id,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveAttribute('for', id)
  })

  it('does not toggle the associated control when clicking the tooltip trigger', async () => {
    await resetPointer()

    await render(KLabel, {
      slots: {
        default: () => [
          h('input', {
            id: 'label-input',
            type: 'checkbox',
          }),
          h('span', {
            id: 'label-text',
          }, 'Full Name'),
        ],
        tooltip: () => h('a', {
          id: 'link',
          href: '#docs-link',
        }, 'Learn more'),
      },
    })

    await page.getByCSS('.tooltip-trigger-icon').click()
    await expect.element(page.getByCSS('#label-input')).not.toBeChecked()

    await expect.poll(() => window.location.hash).toBe('')

    // The click above also moves the pointer onto the trigger, which opens the hover-triggered
    // tooltip as a side effect. Move away first so the assertions below actually exercise `hover()`
    // rather than observing a tooltip that was already open.
    await resetPointer()
    await expect.element(page.getByCSS('#link')).not.toBeVisible()

    await page.getByCSS('.tooltip-trigger-icon').hover()
    await expect.element(page.getByCSS('#link')).toBeVisible()
    await page.getByCSS('#link').click()

    await expect.poll(() => window.location.hash).toBe('#docs-link')
    await expect.element(page.getByCSS('#label-input')).not.toBeChecked()

    await page.getByCSS('#label-text').click()
    await expect.element(page.getByCSS('input[type="checkbox"]')).toBeChecked()
  })

  it('renders a tooltip slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KLabel,
        {},
        {
          default: () => 'Full Name',
          ...(ready.value
            ? { tooltip: () => 'Tooltip content' }
            : {}),
        },
      ),
    }))

    await expect.element(page.getByCSS('.k-label .label-tooltip')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-label .label-tooltip')).toBeInTheDocument()
  })
})
