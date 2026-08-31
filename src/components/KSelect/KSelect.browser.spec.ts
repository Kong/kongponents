import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KSelect from '@/components/KSelect/KSelect.vue'
import type { SelectItem } from '@/types'

/**
 * The Cypress spec cleared the selection with `.trigger('click')` — a synthetic dispatch,
 * not a real pointer click — so this is the faithful translation.
 *
 * It also has to be a dispatch: once the internal KInput has been re-keyed (after selecting
 * or adding an item) the `<input>` starts hit-testing above the absolutely positioned clear
 * button in WebKit and Firefox, and a real `.click()` times out on "input intercepts pointer
 * events". Geometry is identical in all three engines, so this is a paint-order difference,
 * not a layout one.
 */
const clickClearSelection = (): void => {
  page.getByTestId('clear-selection-icon').element().dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

describe('KSelect', () => {
  it('renders props when passed', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['val1', 'val2', 'val3']
    const name = 'select-input'

    await render(KSelect, {
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
        name,
      },
    })

    await expect.element(page.getByCSS('.chevron-down-icon')).toBeVisible()
    await expect.element(page.getByTestId('select-input')).toHaveAttribute('name', name)
    await expect.element(page.getByTestId('select-input')).toBeVisible()
    await page.getByTestId('select-input').click()

    // `.select-popover` is KPop's `v-show`-toggled popover, so only visibility is meaningful.
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()
    await expect.element(page.getByTestId(`select-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`select-item-${vals[1]}`)).toHaveTextContent(labels[1]!)
    await expect.element(page.getByTestId(`select-item-${vals[2]}`)).toHaveTextContent(labels[2]!)
    // The footer is `v-if`-rendered, so existence is the meaningful assertion here.
    await expect.element(page.getByCSS('.dropdown-footer')).not.toBeInTheDocument()
  })

  it('renders with selected item', async () => {
    const selectedLabel = 'Label 1'

    await render(KSelect, {
      props: {
        items: [{ label: selectedLabel, value: 'val1', selected: true }],
      },
    })

    await expect.element(page.getByTestId('select-input')).toHaveValue(selectedLabel)
  })

  it('renders with disabled item', async () => {
    await render(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1', disabled: true }],
      },
    })

    await expect.element(page.getByCSS('.select-item button')).toHaveAttribute('disabled')
  })

  it('renders with correct px width', async () => {
    const width = 350

    await render(KSelect, {
      props: {
        width: width + '',
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true,
        }],
      },
    })

    await expect.poll(() => page.getByCSS('.k-select').element().getBoundingClientRect().width).toBe(width)
  })

  it('renders with correct label', async () => {
    const labelText = 'Cool Beans!'

    await render(KSelect, {
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

    await render(KSelect, {
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

  it('handles the `required` state correctly', async () => {
    await render(KSelect, {
      props: {
        label: 'A Label',
        required: true,
      },
    })

    await expect.element(page.getByCSS('.k-label')).toHaveClass('required')
  })

  it('reacts to text change and select', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']

    await render(KSelect, {
      props: {
        enableFiltering: true,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await page.getByTestId('select-input').click()

    await expect.element(page.getByTestId(`select-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`select-item-${vals[1]}`)).toHaveTextContent(labels[1]!)

    await page.getByCSS('input').fill(labels[0]!)

    await expect.element(page.getByTestId(`select-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    // Filtered-out items are `v-if`-removed from the list, so existence is meaningful here.
    await expect.element(page.getByTestId(`select-item-${vals[1]}`)).not.toBeInTheDocument()

    await page.getByTestId(`select-item-${vals[0]}`).click()
    await expect.element(page.getByTestId('select-input')).toHaveValue(labels[0]!)
  })

  it('ignores clicks on disabled item', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']

    await render(KSelect, {
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

    await page.getByTestId('select-input').click()

    // A real pointer click cannot reach a disabled button, so dispatch on the button itself —
    // that runs the item's own click handler, which is the code path being tested. (Dispatching
    // on the wrapper, as Cypress' `{ force: true }` effectively did, passes even when the item
    // is enabled, because the handler is bound to the button.)
    page.getByCSS(`[data-testid="select-item-${vals[0]}"] button`).element().dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await expect.element(page.getByTestId('select-input')).toHaveValue('')
  })

  it('allows slotting content into the items', async () => {
    const itemSlotContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'val1'

    await render(KSelect, {
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

    await expect.element(page.getByTestId(`select-item-${itemValue}`)).toHaveTextContent(itemSlotContent)
  })

  it('reuses item template slot for selected item element when prop is true', async () => {
    const itemSlotContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'val1'

    await render(KSelect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
        reuseItemTemplate: true,
      },
      slots: {
        'item-template': `<span data-testid="item-slot-content">${itemSlotContent}</span>`,
      },
    })

    await expect.element(page.getByTestId('item-slot-content').first()).toBeVisible()
    await expect.element(page.getByTestId('item-slot-content').first()).toHaveTextContent(itemSlotContent)
  })

  it('handles all states correctly when enableFiltering is true', async () => {
    const itemLabel = 'Label 1'
    // Annotated so `rerender` can add items later — an inferred `never[]` would reject them.
    const items: Array<SelectItem<string>> = []

    const screen = await render(KSelect, {
      props: {
        enableFiltering: true,
        loading: false,
        items,
      },
    })

    // Open first so KPop's async `open` handler can't reset `filterQuery` mid-typing.
    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()

    await userEvent.type(page.getByCSS('input'), 'a')
    await expect.poll(() => screen.emitted('query-change')).toContainEqual(['a'])

    await screen.rerender({ loading: true })
    await expect.element(page.getByTestId('select-loading')).toBeInTheDocument()

    await screen.rerender({ loading: false })
    await expect.element(page.getByTestId('select-loading')).not.toBeInTheDocument()

    await screen.rerender({ items: [{ label: itemLabel, value: 'label1' }] })
    await expect.element(page.getByTestId('select-item-label1')).toHaveTextContent(itemLabel)

    await page.getByTestId('select-item-label1').click()
    await expect.element(page.getByCSS('input')).toHaveValue(itemLabel)
    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('[data-testid="select-item-label1"] button')).toHaveClass('selected')
    await expect.poll(() => screen.emitted('query-change')).toContainEqual([''])
  })

  it('handles query change correctly', async () => {
    const itemLabel = 'Label 1'

    const screen = await render(KSelect, {
      props: {
        enableFiltering: true,
        loading: false,
        items: [{ label: itemLabel, value: 'label1' }],
      },
    })

    // Open the dropdown and let it settle first: KPop's `open` handler resets `filterQuery`
    // asynchronously, so typing straight into the click would have that reset land between
    // the first and second keystroke and emit an extra `''`.
    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()

    // `userEvent.type` keeps Cypress' keystroke-by-keystroke behaviour, which is what the
    // per-character emit count below is asserting.
    await userEvent.type(page.getByCSS('input'), itemLabel)
    // 1 emit for each character typed
    await expect.poll(() => screen.emitted('query-change')?.length).toBe(itemLabel.length)

    await page.getByTestId('select-item-label1').click()
    // selecting an item should not emit query change
    await expect.poll(() => screen.emitted('query-change')?.length).toBe(itemLabel.length)

    await page.getByTestId('select-input').click()
    // 1 for resetting query when opening dropdown
    await expect.poll(() => screen.emitted('query-change')?.length).toBe(itemLabel.length + 1)

    // simulate pasting a value
    const input = page.getByCSS('input').element() as HTMLInputElement
    input.value = itemLabel
    input.dispatchEvent(new Event('input', { bubbles: true }))
    // 1 for pasting the value
    await expect.poll(() => screen.emitted('query-change')?.length).toBe(itemLabel.length + 2)
  })

  it('can clear selection when clearable is true', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    await render(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
        clearable: true,
      },
    })

    await expect.element(page.getByCSS('input')).toHaveValue(labels[0]!)
    clickClearSelection()
    await expect.element(page.getByCSS('input')).toHaveValue('')
  })

  it('does not toggle dropdown when clear button clicked', async () => {
    await render(KSelect, {
      props: {
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true,
        }, {
          label: 'Label 2',
          value: 'label2',
        }],
        clearable: true,
      },
    })

    await expect.element(page.getByCSS('input')).toHaveValue('Label 1')
    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()
    clickClearSelection()
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()
    await expect.element(page.getByCSS('input')).toHaveValue('')
    await page.getByTestId('select-item-label2').click()
    await expect.element(page.getByCSS('.select-popover')).not.toBeVisible()
    await expect.element(page.getByCSS('input')).toHaveValue('Label 2')
    clickClearSelection()
    await expect.element(page.getByCSS('.select-popover')).not.toBeVisible()
    await expect.element(page.getByCSS('input')).toHaveValue('')
  })

  it('renders dropdown footer text when prop is passed', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['val1', 'val2', 'val3']
    const dropdownFooterText = 'Dropdown footer text'

    await render(KSelect, {
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

    await page.getByTestId('select-input').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    await render(KSelect, {
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

    await page.getByTestId('select-input').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(dropdownFooterText)
  })

  it('renders interactive content in the dropdown-footer slot', async () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const buttonText = 'Footer action'

    await render(KSelect, {
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

    await page.getByTestId('select-input').click()

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

    await render(KSelect, {
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

    await page.getByTestId('select-input').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveTextContent(newFooterSlot)
    await expect.element(page.getByCSS('.dropdown-footer')).not.toHaveTextContent(deprecatedFooterSlot)
    await expect.element(page.getByCSS('.dropdown-footer')).not.toHaveTextContent(footerTextProp)
  })

  it('positions the dropdown footer via the dropdownFooterPosition prop', async () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'

    await render(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterPosition: 'static',
      },
    })

    await page.getByTestId('select-input').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(staticFooterClass)
  })

  it('supports the deprecated dropdownFooterTextPosition prop, with dropdownFooterPosition taking precedence', async () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'
    const stickyFooterClass = 'dropdown-footer-sticky'

    const screen = await render(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
      },
    })

    await page.getByTestId('select-input').click()

    // deprecated prop still works
    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(staticFooterClass)

    // Locators are strict, so the first instance has to go before the second is mounted —
    // Cypress' second `cy.mount` replaced the first one implicitly.
    await screen.unmount()

    // new prop takes precedence over the deprecated one
    await render(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
        dropdownFooterPosition: 'sticky',
      },
    })

    await page.getByTestId('select-input').click()

    await expect.element(page.getByCSS('.dropdown-footer')).toBeVisible()
    await expect.element(page.getByCSS('.dropdown-footer')).toHaveClass(stickyFooterClass)
  })

  it('renders group titles and groups items in correct order (backwards compatible)', async () => {
    const group1Title = 'Group 1'
    const group2Title = 'Group 2'
    const items = [
      { label: 'Label 0', value: 'value0' },
      { label: 'Label 1', value: 'value1', group: group1Title },
      { label: 'Label 3', value: 'value3', group: group2Title },
      { label: 'Label 2', value: 'value2', group: group1Title },
      { label: 'Label 4', value: 'value4', group: group2Title },
    ]

    await render(KSelect, {
      props: {
        items,
      },
    })

    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-item').nth(0)).toHaveTextContent(items[0]!.label)
    await expect.element(page.getByCSS('.select-group-title').nth(0)).toHaveTextContent(group1Title)
    await expect.element(page.getByCSS('.select-group-title').nth(1)).toHaveTextContent(group2Title)
    await expect.element(page.getByCSS('.select-item').nth(1)).toHaveTextContent(items[1]!.label)
    await expect.element(page.getByCSS('.select-item').nth(2)).toHaveTextContent(items[3]!.label)
    await expect.element(page.getByCSS('.select-item').nth(3)).toHaveTextContent(items[2]!.label)
    await expect.element(page.getByCSS('.select-item').nth(4)).toHaveTextContent(items[4]!.label)
  })

  it('renders groups in custom order using SelectGroup interface', async () => {
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

    await render(KSelect, {
      props: {
        items,
      },
    })

    await page.getByTestId('select-input').click()
    // Ungrouped item should appear first
    await expect.element(page.getByCSS('.select-item').nth(0)).toHaveTextContent('Ungrouped Item')
    // Groups should appear in array order: Fish, then Birds
    await expect.element(page.getByCSS('.select-group-title').nth(0)).toHaveTextContent('Fish')
    await expect.element(page.getByCSS('.select-group-title').nth(1)).toHaveTextContent('Birds')
    // Items should be in their group order
    await expect.element(page.getByCSS('.select-item').nth(1)).toHaveTextContent('Salmon')
    await expect.element(page.getByCSS('.select-item').nth(2)).toHaveTextContent('Trout')
    await expect.element(page.getByCSS('.select-item').nth(3)).toHaveTextContent('Duck')
    await expect.element(page.getByCSS('.select-item').nth(4)).toHaveTextContent('Oriole')
  })

  it('handles mixed SelectGroup and SelectItem entries', async () => {
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

    await render(KSelect, {
      props: {
        items,
      },
    })

    await page.getByTestId('select-input').click()
    // Ungrouped items should appear first
    await expect.element(page.getByCSS('.select-item').nth(0)).toHaveTextContent('First Item')
    await expect.element(page.getByCSS('.select-item').nth(1)).toHaveTextContent('Second Item')
    // Then the group
    await expect.element(page.getByCSS('.select-group-title').nth(0)).toHaveTextContent('Grouped Items')
    await expect.element(page.getByCSS('.select-item').nth(2)).toHaveTextContent('Grouped 1')
    await expect.element(page.getByCSS('.select-item').nth(3)).toHaveTextContent('Grouped 2')
  })

  it('allows slotting selected item content', async () => {
    const selectedItemContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'val1'

    await render(KSelect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
      },
      slots: {
        'selected-item-template': `<span data-testid="selected-item-slot-content">${selectedItemContent}</span>`,
      },
    })

    await expect.element(page.getByTestId('selected-item-slot-content')).toBeVisible()
    await expect.element(page.getByTestId('selected-item-slot-content')).toHaveTextContent(selectedItemContent)
  })

  it('renders a selected-item-template slot that is added after mount', async () => {
    const selectedItemContent = 'I am slotted!'

    // `render()` has no `setData`, so the flag lives in a ref the test holds. A render function
    // is required here — `vue` resolves to the runtime-only build, so a `template` string would
    // silently render nothing.
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KSelect,
        { items: [{ label: 'Label 1', value: 'val1', selected: true }] },
        ready.value
          ? {
            'selected-item-template': () => h('span', { 'data-testid': 'selected-item-slot-content' }, selectedItemContent),
          }
          : {},
      ),
    }))

    await expect.element(page.getByTestId('selected-item-slot-content')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByTestId('selected-item-slot-content')).toBeVisible()
    await expect.element(page.getByTestId('selected-item-slot-content')).toHaveTextContent(selectedItemContent)
  })

  it('renders a label-tooltip slot that is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KSelect,
        { label: 'A label', items: [] },
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

  it('displays placeholder correctly when selected item slot is present', async () => {
    const selectedItemContent = 'I am slotted!'
    const placeholderText = 'Placeholder text'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    await render(KSelect, {
      props: {
        placeholder: placeholderText,
        enableFiltering: true,
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
      },
      slots: {
        'selected-item-template': `<span data-testid="selected-item-slot-content">${selectedItemContent}</span>`,
      },
    })

    await expect.element(page.getByTestId('selected-item-slot-content')).toBeVisible()
    await expect.element(page.getByTestId('selected-item-slot-content')).toHaveTextContent(selectedItemContent)
    await page.getByTestId('select-input').click()
    await expect.element(page.getByTestId('selected-item-slot-content')).not.toBeInTheDocument()
    await expect.poll(() => page.getByCSS('input').element().getAttribute('placeholder')).toContain(placeholderText)
  })

  it('allows adding an item with enableItemCreation', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']
    const newItem = 'Rock me'

    await render(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
        enableFiltering: true,
        clearable: true,
      },
    })

    await page.getByCSS('.select-input').click()
    await expect.element(page.getByTestId(`select-item-${vals[0]}`)).toHaveTextContent(labels[0]!)
    await expect.element(page.getByTestId(`select-item-${vals[1]}`)).toHaveTextContent(labels[1]!)
    // no adding a label that already exists
    await page.getByCSS('input').fill(labels[0]!)
    await expect.element(page.getByTestId('select-add-item')).not.toBeInTheDocument()
    await page.getByCSS('input').clear()
    // allows adding item substring of existing label
    await page.getByCSS('input').fill(labels[0]!.substring(0, labels[0]!.length - 1))
    await expect.element(page.getByTestId('select-add-item')).toBeVisible()
    await expect.element(page.getByTestId('select-add-item')).toHaveTextContent(labels[0]!.substring(0, labels[0]!.length - 1))
    await page.getByCSS('input').clear()
    // add new item
    await page.getByCSS('input').fill(newItem)
    await expect.element(page.getByTestId('select-add-item')).toHaveTextContent(newItem)
    await expect.element(page.getByTestId('select-add-item').getByCSS('button')).toBeEnabled()
    await page.getByTestId('select-add-item').getByCSS('button').click()
    // displays selected item correctly
    await expect.element(page.getByTestId('select-input')).toHaveValue(newItem)
    // item displays when searching
    await page.getByCSS('input').fill(newItem)
    await expect.element(page.getByCSS('.select-item .select-item-label')).toHaveTextContent(newItem)
    // no adding a label that already exists
    await expect.element(page.getByTestId('select-add-item')).not.toBeInTheDocument()
    // item gone when deselected
    clickClearSelection()
    await expect.element(page.getByTestId('select-input')).toHaveValue('')
    // gone when searching
    await page.getByCSS('input').clear()
    await page.getByCSS('input').fill(newItem)
    await expect.element(page.getByTestId('select-add-item')).toBeVisible()
    await expect.element(page.getByTestId('select-add-item')).toHaveTextContent(newItem)
  })

  it('renders add new value button disabled when itemCreationValidator returns false', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']
    const newItem = 'Rock me'

    await render(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
        enableFiltering: true,
        itemCreationValidator: () => false,
      },
    })

    await page.getByCSS('.select-input').click()
    await page.getByCSS('input').fill(newItem)
    await expect.element(page.getByTestId('select-add-item')).toHaveTextContent(newItem)
    await expect.element(page.getByTestId('select-add-item').getByCSS('button')).toBeDisabled()
  })

  it('updates selected status after items are mutated', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']

    const screen = await render(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
          selected: false,
        }],
      },
    })

    await page.getByCSS('.select-input input').click()
    await expect.element(page.getByCSS(`[data-testid="select-item-${vals[0]}"] button`)).toHaveClass('selected')
    await expect.element(page.getByCSS(`[data-testid="select-item-${vals[1]}"] button`)).not.toHaveClass('selected')

    // mutate items
    await screen.rerender({
      items: [{
        label: labels[0],
        value: vals[0],
        selected: false,
      }, {
        label: labels[1],
        value: vals[1],
        selected: true,
      }],
    })

    await expect.element(page.getByCSS(`[data-testid="select-item-${vals[0]}"] button`)).not.toHaveClass('selected')
    await expect.element(page.getByCSS(`[data-testid="select-item-${vals[1]}"] button`)).toHaveClass('selected')
  })

  it('emits selected, input, change events when item selected', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']

    const screen = await render(KSelect, {
      props: {
        modelValue: '',
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    await page.getByCSS('.select-input input').click()
    await page.getByTestId(`select-item-${vals[0]}`).click()

    await expect.poll(() => screen.emitted('selected')?.length).toBe(1)
    expect(screen.emitted('input')?.length).toBe(1)
    expect(screen.emitted('input')?.[0]?.[0]).toBe(vals[0])
    expect(screen.emitted('change')?.length).toBe(1)
  })

  it('emits input, change events correctly when item is cleared', async () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['val1', 'val2']

    const screen = await render(KSelect, {
      props: {
        modelValue: 'val1',
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
        clearable: true,
      },
    })

    clickClearSelection()

    await expect.poll(() => screen.emitted('input')?.length).toBe(1)
    expect(screen.emitted('input')?.[0]?.[0]).toBe(null)
    expect(screen.emitted('change')?.length).toBe(1)
    expect(screen.emitted('change')?.[0]?.[0]).toBe(null)
  })

  it('should not cause form submission when enter key is pressed while filtering', async () => {
    const onSubmit = vi.fn()

    await render(defineComponent({
      setup: () => () => h('form', {
        onSubmit: (e: Event) => {
          e.preventDefault()
          onSubmit()
        },
      }, [
        h(KSelect, {
          items: [
            { label: 'Label 1', value: 'val1' },
            { label: 'Label 2', value: 'val2' },
          ],
          enableFiltering: true,
        }),
        h('button', { type: 'submit' }, 'Submit'),
      ]),
    }))

    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-popover')).toBeVisible()
    await userEvent.type(page.getByCSS('input'), 'Label{Enter}')

    // The filtered item is what proves the keystrokes landed; the submit handler must not have run.
    await expect.element(page.getByTestId('select-item-val1')).toBeVisible()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('handles readonly state correctly', async () => {
    await render(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        readonly: true,
      },
    })

    await expect.element(page.getByCSS('.select-input input')).toHaveAttribute('readonly')
    // The chevron is `v-if`-rendered, so existence is the meaningful assertion here.
    await expect.element(page.getByCSS('.chevron-down-icon')).not.toBeInTheDocument()
    await page.getByTestId('select-input').click()
    await expect.element(page.getByCSS('.select-popover')).not.toBeVisible()
  })
})
