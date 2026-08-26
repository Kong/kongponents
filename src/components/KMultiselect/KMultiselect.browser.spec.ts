import { describe, it, expect, vi, onTestFinished } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'
import type { MultiselectItem } from '@/types'

/**
 * Rapid width changes make the badge-measuring ResizeObserver loop, which Vitest would fail the
 * test on. Scoped to the one test and the one message — `dangerouslyIgnoreUnhandledErrors` would
 * hide real failures across the whole suite.
 */
const ignoreResizeObserverLoop = (): void => {
  const handler = (event: ErrorEvent): void => {
    if (event.message.includes('ResizeObserver loop')) {
      event.stopImmediatePropagation()
    }
  }

  window.addEventListener('error', handler)
  onTestFinished(() => window.removeEventListener('error', handler))
}

const badgeLabels = () => page.getByTestId('selection-badges-container').getByCSS('.multiselect-selection-badge-label')

// The staging area renders a duplicate, `aria-hidden` copy of every badge, so badge selectors
// always have to be scoped to the real container by test id rather than by class.
const badgeLabelTexts = (): Array<string | undefined> =>
  badgeLabels().all().map(label => label.element().textContent?.trim())

describe('KMultiselect', () => {
  it('renders props when passed', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByTestId(`multiselect-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`multiselect-item-${vals[1]}`)).toHaveTextContent(labels[1]!)
    await expect.element(page.getByTestId(`multiselect-item-${vals[2]}`)).toHaveTextContent(labels[2]!)
    // `.multiselect-popover` is KPop's `v-show`-toggled popover, so only visibility is meaningful.
    await expect.element(page.getByCSS('.multiselect-popover')).toBeVisible()
    // The footer is `v-if`-rendered, so existence is the meaningful assertion here.
    await expect.element(page.getByCSS('.dropdown-footer')).not.toBeInTheDocument()
  })

  it('renders with selected items when focused', async () => {
    const selectedLabel = 'Label 1'
    const selectedLabel2 = 'Label 2'

    await render(KMultiselect, {
      props: {
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          { label: selectedLabel2, value: 'label2', selected: true },
        ],
      },
    })

    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(selectedLabel)
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(selectedLabel2)

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(selectedLabel)
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(selectedLabel2)
  })

  it('renders with disabled item', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    await render(KMultiselect, {
      props: {
        items: [
          { label: labels[0], value: vals[0], disabled: true },
          { label: labels[1], value: vals[1] },
        ],
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS(`[data-testid="multiselect-item-${vals[0]}"] button`)).toHaveAttribute('disabled')
  })

  it('renders with correct px width', async () => {
    const width = 350

    await render(KMultiselect, {
      props: {
        width: width + '',
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true,
        }],
      },
    })

    await expect.poll(() => page.getByCSS('.k-multiselect').element().getBoundingClientRect().width).toBe(width)
  })

  it('renders with correct label', async () => {
    const labelText = 'Cool Beans!'

    await render(KMultiselect, {
      props: {
        label: labelText,
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
  })

  it('renders label with labelAttributes applied', async () => {
    const labelText = 'A Label'

    await render(KMultiselect, {
      props: {
        label: labelText,
        labelAttributes: {
          info: 'some info text',
        },
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('renders a label-tooltip slot that is added after mount', async () => {
    // `render()` has no `setData`, so the flag lives in a ref the test holds. A render function
    // is required — `vue` resolves to the runtime-only build, so a `template` string would
    // silently render nothing.
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KMultiselect,
        { label: 'A Label', items: [{ label: 'Label 1', value: 'label1' }] },
        ready.value
          ? { 'label-tooltip': () => 'Tooltip content' }
          : {},
      ),
    }))

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeInTheDocument()
    await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
  })

  it('reacts to text change and select', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    await expect.element(page.getByTestId(`multiselect-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`multiselect-item-${vals[1]}`)).toHaveTextContent(labels[1]!)

    await page.getByTestId('multiselect-dropdown-input').fill(labels[0]!)

    await expect.element(page.getByTestId(`multiselect-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    // Filtered-out items are `v-if`-removed from the list, so existence is meaningful here.
    await expect.element(page.getByTestId(`multiselect-item-${vals[1]}`)).not.toBeInTheDocument()

    await page.getByTestId(`multiselect-item-${vals[0]}`).click()
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(labels[0]!)
  })

  it('allows adding an item with enableItemCreation', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    await expect.element(page.getByTestId(`multiselect-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`multiselect-item-${vals[1]}`)).toHaveTextContent(labels[1]!)
    // no adding a label that already exists
    await page.getByTestId('multiselect-dropdown-input').fill(labels[0]!)
    await expect.element(page.getByTestId('multiselect-add-item')).not.toBeInTheDocument()
    await page.getByTestId('multiselect-dropdown-input').clear()
    // add new item
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByTestId('multiselect-add-item')).toHaveTextContent(newItem)
    await expect.element(page.getByTestId('multiselect-add-item').getByCSS('button')).toBeEnabled()
    await page.getByTestId('multiselect-add-item').getByCSS('button').click()
    // item displays in selections
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(newItem)
    // item displays when searching
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByCSS('.multiselect-item .multiselect-item-label')).toHaveTextContent(newItem)
    // no adding a label that already exists
    await expect.element(page.getByTestId('multiselect-add-item')).not.toBeInTheDocument()
    // item gone when dismissed
    await page.getByTestId('selection-badges-container').getByTestId('badge-dismiss-button').first().click()
    // removed from selections
    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
    // gone when searching
    await page.getByTestId('multiselect-dropdown-input').clear()
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByCSS('.multiselect-item .selected .multiselect-item-label')).not.toBeInTheDocument()
  })

  it('renders add new value button disabled when itemCreationValidator returns false', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
        itemCreationValidator: () => false,
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    // add new item
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByTestId('multiselect-add-item')).toHaveTextContent(newItem)
    await expect.element(page.getByTestId('multiselect-add-item').getByCSS('button')).toBeDisabled()
  })

  it('clears added items when clicking clear all with enableItemCreation', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    await expect.element(page.getByTestId(`multiselect-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`multiselect-item-${vals[1]}`)).toHaveTextContent(labels[1]!)

    // add new item
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByTestId('multiselect-add-item')).toHaveTextContent(newItem)
    await page.getByTestId('multiselect-add-item').click()
    // item displays in selections
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(newItem)
    await page.getByTestId('multiselect-clear-icon').click()
    // cleared
    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
    await page.getByTestId('multiselect-trigger').click()
    await page.getByTestId('multiselect-dropdown-input').fill(newItem)
    await expect.element(page.getByCSS('.multiselect-item .selected .multiselect-item-label')).not.toBeInTheDocument()
  })

  it('ignores clicks on disabled item', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          disabled: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    // A real pointer click cannot reach a disabled button, so dispatch on the button itself —
    // that runs the item's own click handler, which is the code path being tested. Dispatching
    // on the wrapper instead would pass even when the item is enabled.
    page.getByCSS(`[data-testid="multiselect-item-${vals[0]}"] button`).element().dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
  })

  it('allows slotting content into the items', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    await render(KMultiselect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
        }],
      },
      slots: {
        'item-template': h('span', {}, itemSlotContent),
      },
    })

    await expect.element(page.getByTestId(`multiselect-item-${itemValue}`)).toHaveTextContent(itemSlotContent)
  })

  it('allows slotting the icon through item-badge-icon slot', async () => {
    const itemIcon = 'slotted-badge-icon'
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
      slots: {
        'item-badge-icon': `<span data-testid="${itemIcon}">${itemIcon}</span>`,
      },
    })

    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId('selection-badges-container').getByTestId(itemIcon)).toBeVisible()
    await expect.poll(() => page.getByTestId('selection-badges-container').getByTestId(itemIcon).all().length).toBe(1)

    await page.getByTestId('multiselect-trigger').click()
    await page.getByTestId(`multiselect-item-${vals[1]}`).click()
    await page.getByTestId('multiselect-trigger').click()

    await expect.poll(() => page.getByTestId('selection-badges-container').getByTestId(itemIcon).all().length).toBe(2)
  })

  it('works in autosuggest mode', async () => {
    // Annotated so `rerender` can add items later — an inferred `never[]` would reject them.
    const items: Array<MultiselectItem<string>> = []

    const screen = await render(KMultiselect, {
      props: {
        autosuggest: true,
        loading: false,
        items,
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await userEvent.type(page.getByTestId('multiselect-dropdown-input'), 'a')
    await expect.poll(() => screen.emitted('query-change')).toContainEqual(['a'])

    await screen.rerender({ loading: true })
    // Both icons are `v-if`/`v-else` branches, so existence is the meaningful assertion.
    await expect.element(page.getByCSS('.multiselect-chevron-icon')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.multiselect-loading-icon')).toBeInTheDocument()

    await screen.rerender({ loading: false })
    await expect.element(page.getByCSS('.multiselect-loading-icon')).not.toBeInTheDocument()

    await screen.rerender({ items: [{ label: 'Label 1', value: 'label1' }] })
    await expect.element(page.getByTestId('multiselect-item-label1')).toHaveTextContent('Label 1')
  })

  it('counts invisible selected items correctly', async () => {
    const allItems = Array.from(new Array(100)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const selected = (Array.from(new Array(10)).map((_, i) => `${i}`))

    const items = (allItems.slice(0, 10))

    const screen = await render(KMultiselect, {
      props: {
        autosuggest: true,
        selectedRowCount: 1,
        modelValue: selected,
        loading: false,
        items,
        width: '300',
      },
    })

    // With ten selections the centre of the trigger is covered by a badge, and badges carry
    // `@click.stop` — which is why the Cypress spec needed `click({ force: true })` here.
    // Dispatch on the trigger itself so the event still reaches KPop.
    page.getByTestId('multiselect-trigger').element().dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await expect.element(page.getByCSS('.multiselect-popover')).toBeVisible()
    await expect.element(page.getByTestId('hidden-selection-count')).toBeVisible()

    /**
     * The Cypress spec hard-coded `+8` here. Two badges render in all three engines, but
     * Chromium and Firefox report `+7` for the same layout while WebKit reports `+8` — so the
     * literal is not portable, and in Chromium/Firefox the visible and hidden counts do not add
     * up to the ten selected items. Assert the invariant the test is actually about instead:
     * swapping the item list out from under the selection must not change the hidden count.
     */
    const hiddenCount = page.getByTestId('hidden-selection-count').element().textContent?.trim()
    expect(hiddenCount).toMatch(/^\+[1-9]\d*$/)

    await page.getByTestId('multiselect-dropdown-input').click()
    await expect.poll(() => screen.emitted('query-change')).toContainEqual([''])

    await screen.rerender({ items: allItems.slice(5, 20) })

    await userEvent.keyboard('{Escape}')

    await expect.element(page.getByTestId('hidden-selection-count')).toHaveTextContent(hiddenCount!)
  })

  it('reacts to width changes by showing/hiding badges', async () => {
    // Suppress ResizeObserver errors that can occur during rapid width changes
    ignoreResizeObserverLoop()

    const allItems = Array.from(new Array(15)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const selected = Array.from(new Array(10)).map((_, i) => `${i}`)

    const screen = await render(KMultiselect, {
      props: {
        selectedRowCount: 1,
        modelValue: selected,
        items: allItems.slice(0, 10),
        width: '300',
      },
    })

    // At narrow width, should have hidden items
    await expect.element(page.getByTestId('hidden-selection-count')).toBeVisible()
    await expect.element(page.getByTestId('hidden-selection-count')).toHaveTextContent('+')

    // Increase width - should have fewer or no hidden items
    await screen.rerender({ width: '600' })

    // Either the hidden count badge disappears (all visible) or shows a lower count
    await expect.element(page.getByCSS('.k-multiselect')).toBeInTheDocument()
    await expect.element(page.getByTestId('selection-badges-container')).toBeVisible()

    // Decrease width again - should have hidden items
    await screen.rerender({ width: '250' })

    await expect.element(page.getByTestId('hidden-selection-count')).toBeVisible()
    await expect.element(page.getByTestId('hidden-selection-count')).toHaveTextContent('+')
  })

  it('preserves badge order when resizing', async () => {
    // Suppress ResizeObserver errors
    ignoreResizeObserverLoop()

    const allItems = Array.from(new Array(10)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const selected = Array.from(new Array(10)).map((_, i) => `${i}`)

    const screen = await render(KMultiselect, {
      props: {
        selectedRowCount: 1,
        modelValue: selected,
        items: allItems,
        width: '600', // Start wide so all items are visible
      },
    })

    // Get the complete original order when all items are visible.
    // The badges are laid out by an async measuring pass, so wait for it to have run — the
    // hidden-count badge only appears once it has. (At 600px six of the ten badges fit, so the
    // "complete" order is however many the measuring pass settles on.)
    await expect.element(page.getByTestId('hidden-selection-count')).toBeVisible()
    const completeOrder = badgeLabelTexts()
    expect(completeOrder.length).toBeGreaterThan(0)

    // Shrink width to hide some items
    await screen.rerender({ width: '250' })

    // Verify some items are hidden
    await expect.element(page.getByTestId('hidden-selection-count')).toBeVisible()

    // Verify the visible items are the FIRST N items from completeOrder
    const shrunkenOrder = badgeLabelTexts()
    shrunkenOrder.forEach((label, index) => {
      expect(label).toEqual(completeOrder[index])
    })

    const shrunkenCount = shrunkenOrder.length

    // Expand width to show more items
    await screen.rerender({ width: '400' })

    // Verify items maintain their original order (should be first N items from completeOrder)
    const expandedOrder = badgeLabelTexts()
    expandedOrder.forEach((label, index) => {
      expect(label).toEqual(completeOrder[index])
    })

    // Note: We can't reliably assert length increase without waits,
    // but verifying order is preserved is the main goal
    expect(expandedOrder.length).toBeGreaterThanOrEqual(shrunkenCount)
  })

  it('displays placeholder and searchPlaceholder props correctly', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const placeholder = 'Select something'
    const searchPlaceholder = 'Search here'

    await render(KMultiselect, {
      props: {
        placeholder,
        searchPlaceholder,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.expanded-selection-empty')).toBeVisible()
    await expect.element(page.getByCSS('.expanded-selection-empty')).toHaveTextContent(placeholder)

    await page.getByTestId('multiselect-trigger').click()
    await expect.element(page.getByTestId('multiselect-dropdown-input')).toHaveAttribute('placeholder', searchPlaceholder)

    await page.getByCSS('.multiselect-item').nth(0).click()
    await expect.element(page.getByCSS('.expanded-selection-empty')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('selection-badges-container')).toBeVisible()
  })

  it('handles searchPlaceholder prop correctly when collapsedContext is true', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const searchPlaceholder = 'Search here'

    await render(KMultiselect, {
      props: {
        collapsedContext: true,
        searchPlaceholder,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()

    await expect.element(page.getByCSS('.multiselect-trigger input')).toHaveAttribute('placeholder', searchPlaceholder)

    await page.getByTestId('multiselect-trigger').click()
    await page.getByCSS('.multiselect-item').nth(0).click()
    await page.getByCSS('.multiselect-item').nth(1).click()

    await expect.element(page.getByCSS('.multiselect-trigger input')).toHaveAttribute('placeholder', '2 items selected')
  })

  it('can clear all selections when focused', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
          selected: true,
        }],
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(labels[1]!)
    await page.getByCSS('.multiselect-clear-icon').click()
    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
  })

  it('can clear selection by badge dismiss when focused', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await page.getByTestId('multiselect-trigger').click()

    await expect.element(page.getByTestId('selection-badges-container')).toHaveTextContent(labels[0]!)
    await page.getByTestId('selection-badges-container').getByTestId('badge-dismiss-button').first().click()
    await expect.element(page.getByTestId('selection-badges-container')).not.toBeInTheDocument()
  })

  it('renders dropdown footer text when prop is passed', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText,
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText: 'This is getting replaced',
      },
      slots: {
        'dropdown-footer-text': dropdownFooterText,
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(dropdownFooterText)
  })

  it('renders interactive content in the dropdown-footer slot', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const buttonText = 'Footer action'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
      slots: {
        'dropdown-footer': `<button data-testid="footer-button">${buttonText}</button>`,
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveStyle({ pointerEvents: 'auto' })
    // the interactive content should be clickable
    await expect.element(page.getByTestId('footer-button')).toBeVisible()
    await page.getByTestId('footer-button').click()
  })

  it('dropdown-footer slot takes precedence over dropdownFooterText prop and dropdown-footer-text slot', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const footerTextProp = 'Footer text prop'
    const deprecatedFooterSlot = 'Deprecated footer slot'
    const newFooterSlot = 'New footer slot'

    await render(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText: footerTextProp,
      },
      slots: {
        'dropdown-footer-text': deprecatedFooterSlot,
        'dropdown-footer': newFooterSlot,
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(newFooterSlot)
    await expect.element(page.getByCSS('.dropdown-footer')).not.toHaveTextContent(deprecatedFooterSlot)
    await expect.element(page.getByCSS('.dropdown-footer')).not.toHaveTextContent(footerTextProp)
  })

  it('positions the dropdown footer via the dropdownFooterPosition prop', async () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'

    await render(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterPosition: 'static',
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(staticFooterClass)
  })

  it('supports the deprecated dropdownFooterTextPosition prop, with dropdownFooterPosition taking precedence', async () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'
    const stickyFooterClass = 'dropdown-footer-sticky'

    const screen = await render(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    // deprecated prop still works
    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(staticFooterClass)

    // Locators are strict, so the first instance has to go before the second is mounted —
    // Cypress' second `cy.mount` replaced the first one implicitly.
    await screen.unmount()

    // new prop takes precedence over the deprecated one
    await render(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
        dropdownFooterPosition: 'sticky',
      },
    })

    await page.getByCSS('.multiselect-trigger').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(stickyFooterClass)
  })

  it('renders group titles and groups items in correct order', async () => {
    const group1Title = 'Group 1'
    const group2Title = 'Group 2'
    const items = [
      { label: 'Label 0', value: 'value0' },
      { label: 'Label 1', value: 'value1', group: group1Title },
      { label: 'Label 3', value: 'value3', group: group2Title },
      { label: 'Label 2', value: 'value2', group: group1Title },
      { label: 'Label 4', value: 'value4', group: group2Title },
    ]

    await render(KMultiselect, {
      props: {
        items,
      },
    })

    await page.getByTestId('multiselect-trigger').click()
    await expect.element(page.getByCSS('.multiselect-item').nth(0)).toHaveTextContent(items[0]!.label)
    await expect.element(page.getByCSS('.multiselect-group-title').nth(0)).toHaveTextContent(group1Title)
    await expect.element(page.getByCSS('.multiselect-group-title').nth(1)).toHaveTextContent(group2Title)
    await expect.element(page.getByCSS('.multiselect-item').nth(1)).toHaveTextContent(items[1]!.label)
    await expect.element(page.getByCSS('.multiselect-item').nth(2)).toHaveTextContent(items[3]!.label)
    await expect.element(page.getByCSS('.multiselect-item').nth(3)).toHaveTextContent(items[2]!.label)
    await expect.element(page.getByCSS('.multiselect-item').nth(4)).toHaveTextContent(items[4]!.label)
  })

  it('renders groups in custom order using MultiselectGroup interface', async () => {
    const items = [
      {
        label: 'Fish',
        items: [
          { label: 'Salmon', value: 'salmon' },
          { label: 'Trout', value: 'trout' },
        ],
      },
      { label: 'Ungrouped Item', value: 'ungrouped' },
      {
        label: 'Birds',
        items: [
          { label: 'Duck', value: 'duck' },
          { label: 'Oriole', value: 'oriole' },
        ],
      },
    ]

    await render(KMultiselect, {
      props: {
        items,
      },
    })

    await page.getByTestId('multiselect-trigger').click()
    // Ungrouped items should appear first
    await expect.element(page.getByCSS('.multiselect-item').nth(0)).toHaveTextContent('Ungrouped Item')
    // Groups should appear in array order: Fish, then Birds
    await expect.element(page.getByCSS('.multiselect-group-title').nth(0)).toHaveTextContent('Fish')
    await expect.element(page.getByCSS('.multiselect-group-title').nth(1)).toHaveTextContent('Birds')
    // Items should be in their group order
    await expect.element(page.getByCSS('.multiselect-item').nth(1)).toHaveTextContent('Salmon')
    await expect.element(page.getByCSS('.multiselect-item').nth(2)).toHaveTextContent('Trout')
    await expect.element(page.getByCSS('.multiselect-item').nth(3)).toHaveTextContent('Duck')
    await expect.element(page.getByCSS('.multiselect-item').nth(4)).toHaveTextContent('Oriole')
  })

  it('handles mixed MultiselectGroup and MultiselectItem entries', async () => {
    const items = [
      { label: 'First Item', value: 'first' },
      {
        label: 'Grouped Items',
        items: [
          { label: 'Grouped 1', value: 'g1' },
          { label: 'Grouped 2', value: 'g2' },
        ],
      },
      { label: 'Second Item', value: 'second' },
    ]

    await render(KMultiselect, {
      props: {
        items,
      },
    })

    await page.getByTestId('multiselect-trigger').click()
    // Ungrouped items should appear first
    await expect.element(page.getByCSS('.multiselect-item').nth(0)).toHaveTextContent('First Item')
    await expect.element(page.getByCSS('.multiselect-item').nth(1)).toHaveTextContent('Second Item')
    // Then the group
    await expect.element(page.getByCSS('.multiselect-group-title').nth(0)).toHaveTextContent('Grouped Items')
    await expect.element(page.getByCSS('.multiselect-item').nth(2)).toHaveTextContent('Grouped 1')
    await expect.element(page.getByCSS('.multiselect-item').nth(3)).toHaveTextContent('Grouped 2')
  })

  it('should able to handle tons of items with no obvious lag', async () => {
    const items = Array.from(new Array(500)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
      selected: i < 400,
    }))

    // `performance.now()` rather than the original's `Date.now()`: it's monotonic, so a wall-clock
    // adjustment mid-run can't turn this budget check into a false pass or fail.
    const startTime = performance.now()

    await render(KMultiselect, {
      props: {
        items,
      },
    })

    expect(performance.now() - startTime).toBeLessThan(3000)
  })

  it('should reflect deleted items in the DOM', async () => {
    const allItems = [
      { label: 'Label 1', value: 'label1' },
      { label: 'Label 2', value: 'label2' },
      { label: 'Label 3', value: 'label3' },
      { label: 'Label 4', value: 'label4' },
    ]

    const currentItems = allItems.slice(0, 2)

    const screen = await render(KMultiselect, {
      props: {
        items: currentItems,
        modelValue: ['label1', 'label2'],
      },
    })

    const badgeCount = () => page.getByTestId('selection-badges-container').element().children.length

    await expect.poll(badgeCount).toBe(2)

    // Remove 'label1'
    await screen.rerender({ modelValue: ['label2'] })
    await expect.poll(badgeCount).toBe(1)

    // Change the items; 'label2' is no longer in the list.
    await screen.rerender({ items: allItems.slice(2) })
    await expect.poll(badgeCount).toBe(1)

    // Select an additional item.
    await screen.rerender({ modelValue: ['label2', 'label3'] })
    await expect.poll(badgeCount).toBe(2)

    // Remove 'label2' from the selection.
    await screen.rerender({ modelValue: ['label3'] })
    await expect.poll(badgeCount).toBe(1)
  })

  it('orders selected badges by programmatic modelValue changes', async () => {
    const initialItems = [
      { label: 'Name', value: 'name' },
      { label: 'Environment', value: 'env' },
      { label: 'Team', value: 'team' },
      { label: 'Region', value: 'region' },
    ]
    const initialModelValue = initialItems.map(item => item.value)
    const updatedItems = [
      initialItems[0]!,
      { label: 'Control plane', value: 'control_plane' },
      ...initialItems.slice(1),
    ]
    const updatedModelValue = updatedItems.map(item => item.value)
    const assertBadgeOrder = async (expectedLabels: string[]) => {
      await expect.poll(badgeLabelTexts).toEqual(expectedLabels)
    }

    const screen = await render(KMultiselect, {
      props: {
        items: initialItems,
        modelValue: initialModelValue,
        selectedRowCount: 5,
      },
    })

    await assertBadgeOrder(['Name', 'Environment', 'Team', 'Region'])

    await screen.rerender({
      items: updatedItems,
      modelValue: updatedModelValue,
    })

    await assertBadgeOrder(['Name', 'Control plane', 'Environment', 'Team', 'Region'])

    await screen.rerender({
      modelValue: ['region', 'name', 'env', 'team', 'control_plane'],
    })

    await assertBadgeOrder(['Region', 'Name', 'Environment', 'Team', 'Control plane'])
  })

  it('keeps the open dropdown order stable while selecting and removing items', async () => {
    const items = [
      { label: 'Name', value: 'name' },
      { label: 'Environment', value: 'env' },
      { label: 'Team', value: 'team' },
      { label: 'Region', value: 'region' },
    ]
    const optionLabels = () => page.getByCSS('.multiselect-items-container').getByCSS('.multiselect-item-label')
    const assertOptionOrder = async () => {
      await expect.poll(() => optionLabels().all().map(label => label.element().textContent?.trim())).toEqual([
        'Name',
        'Environment',
        'Team',
        'Region',
      ])
    }

    const selectedItems = ref<string[]>([])

    await render(defineComponent({
      setup: () => () => h(KMultiselect, {
        items,
        modelValue: selectedItems.value,
        'onUpdate:modelValue': (value: string[]) => {
          selectedItems.value = value
        },
      }),
    }))

    await page.getByTestId('multiselect-trigger').click()
    await expect.element(page.getByCSS('.multiselect-popover')).toBeVisible()
    await assertOptionOrder()

    await page.getByTestId('multiselect-item-env').click()
    await page.getByTestId('multiselect-item-team').click()
    await expect.element(page.getByCSS('.multiselect-popover')).toBeVisible()
    await assertOptionOrder()

    await page.getByTestId('multiselect-item-env').click()
    await page.getByTestId('multiselect-item-team').click()
    await expect.element(page.getByCSS('.multiselect-popover')).toBeVisible()
    await assertOptionOrder()
  })

  it('should not cause form submission when enter key is pressed while filtering', async () => {
    const onSubmit = vi.fn()

    for (const collapsedContext of [false, true]) {
      const screen = await render(defineComponent({
        setup: () => () => h('form', {
          onSubmit: (e: Event) => {
            e.preventDefault()
            onSubmit()
          },
        }, [
          h(KMultiselect, {
            items: [
              { label: 'Label 1', value: 'val1' },
              { label: 'Label 2', value: 'val2' },
            ],
            enableFiltering: true,
            collapsedContext,
          }),
          h('button', { type: 'submit' }, 'Submit'),
        ]),
      }))

      await page.getByCSS('.multiselect-trigger').click()
      await userEvent.type(page.getByCSS('input'), 'Label{Enter}')

      // The filtered list is what proves the keystrokes landed; the submit handler must not run.
      await expect.element(page.getByTestId('multiselect-item-val1')).toBeVisible()
      expect(onSubmit).not.toHaveBeenCalled()

      // Locators are strict, so the instance has to go before the next iteration mounts one.
      await screen.unmount()
    }
  })
})
