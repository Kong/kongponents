import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'

describe('KSegmentedControl', () => {
  it('renders custom button text & appearance', async () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    await render(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
    })

    const buttons = page.getByCSS('.k-segmented-control button')

    await expect.element(buttons.nth(0)).toHaveTextContent(items[0].label)

    await expect.element(buttons.nth(1)).toHaveTextContent(items[1].label)
    await expect.element(buttons.nth(1)).toHaveClass('selected')
  })

  it('renders slotted button text & appearance', async () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    await render(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
      slots: {
        'option-label': `<template #option-label="{ option }">
            Hello {{ option.label }}
            </template>
          `,
      },
    })

    const buttons = page.getByCSS('.k-segmented-control button')

    await expect.element(buttons.nth(0)).toHaveTextContent('Hello ' + items[0].label)

    await expect.element(buttons.nth(1)).toHaveTextContent('Hello ' + items[1].label)
    await expect.element(buttons.nth(1)).toHaveClass('selected')
  })

  it('disables an item if option is set to disabled', async () => {
    await render(KSegmentedControl, {
      props: {
        options: [
          {
            label: 'One',
            value: 1,
          },
          {
            label: 'Two',
            value: 2,
            disabled: true,
          },
          {
            label: 'Three',
            value: 3,
          },
        ],
        modelValue: 1,
      },
    })

    const buttons = page.getByCSS('.k-segmented-control button')

    await expect.element(buttons.nth(0)).not.toHaveAttribute('disabled')
    await expect.element(buttons.nth(1)).toHaveAttribute('disabled')
    await expect.element(buttons.nth(2)).not.toHaveAttribute('disabled')
  })

  it('renders all items disabled when disabled prop is true', async () => {
    await render(KSegmentedControl, {
      props: {
        options: [
          {
            label: 'One',
            value: 1,
          },
          {
            label: 'Two',
            value: 2,
          },
          {
            label: 'Three',
            value: 3,
          },
        ],
        modelValue: 1,
        disabled: true,
      },
    })

    const buttons = page.getByCSS('.k-segmented-control button')

    await expect.element(buttons.nth(0)).toHaveAttribute('disabled')
    await expect.element(buttons.nth(1)).toHaveAttribute('disabled')
    await expect.element(buttons.nth(2)).toHaveAttribute('disabled')
  })

  it('emits update:modelValue event when an item is clicked', async () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    const screen = await render(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
    })

    await page.getByCSS('.k-segmented-control button').nth(0).click()

    await expect.poll(() => screen.emitted()).toHaveProperty('update:modelValue')
    expect(screen.emitted('update:modelValue')?.[0][0]).toBe(items[0].value)
  })
})
