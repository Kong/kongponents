import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KInputSwitch from '@/components/KInputSwitch/KInputSwitch.vue'

describe('KInputSwitch', () => {
  it('shows as checked when prop passed', async () => {
    await render(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    await expect.element(page.getByCSS('input')).toBeChecked()
  })

  it('emits checked value on click', async () => {
    const screen = await render(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    await page.getByTestId('switch-control').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('change')
    expect(screen.emitted()).toHaveProperty('input')
    expect(screen.emitted()).toHaveProperty('update:modelValue')
  })

  it('does not emit checked value on click when disabled', async () => {
    const screen = await render(KInputSwitch, {
      props: {
        modelValue: true,
        disabled: true,
      },
    })

    await page.getByTestId('switch-control').click()

    expect(screen.emitted()).not.toHaveProperty('change')
    expect(screen.emitted()).not.toHaveProperty('input')
    expect(screen.emitted()).not.toHaveProperty('update:modelValue')
  })
})
