import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import KFilterGroup from '@/components/KFilterGroup/KFilterGroup.vue'
import type { Filter, FilterGroupFilters, FilterGroupSelection, FilterPillSlotProps, FilterSelection } from '@/types'

describe('KFilterGroup', () => {
  const FILTER_LABEL_ID = 'filter-group-label'
  const FILTER_SELECTOR_ID = 'filter-selector'
  const CANCEL_ID = 'filter-pill-cancel'
  const APPLY_ID = 'filter-pill-apply'
  const INPUT_ID = 'filter-pill-input'
  const CLEAR_ID = 'interactive-pill-clear-icon'
  const getFilterSelector = (key: string) => `[data-testid="filter-group-pill-${key}"] .interactive-pill`
  const getPopoverSelector = (key: string) => `[data-testid="filter-group-pill-${key}"] .popover`

  const SIMPLE_FILTER_SELECTION: FilterSelection = {
    operator: 'eq',
    value: 'simple',
    text: 'Simple',
  }
  const BASIC_FILTER: Filter = { label: 'Basic filter' }
  const PINNED_FILTER: Filter = { label: 'Pinned filter', pinned: true }

  const renderFilterGroup = async ({
    filters,
    groupLabel = undefined,
    selection = {},
    slots = {},
  }: {
    filters: FilterGroupFilters
    groupLabel?: string
    selection?: FilterGroupSelection
    slots?: any
  }) => {
    const onApply = vi.fn()
    const onClose = vi.fn()
    const onOpen = vi.fn()
    const onClear = vi.fn()

    await render(KFilterGroup as any, {
      props: {
        filters,
        groupLabel,
        modelValue: selection,
        onApply,
        onClose,
        onOpen,
        onClear,
      },
      slots,
    })

    return { onApply, onClose, onOpen, onClear }
  }

  const addAndApplyInputFilter = async (key: string) => {
    await page.getByTestId(FILTER_SELECTOR_ID).click()
    await page.getByCSS(`[data-testid="dropdown-item-trigger"][value="${key}"]`).click()
    await page.getByCSS(getPopoverSelector(key)).getByTestId(INPUT_ID).fill('foo')
    await page.getByCSS(getPopoverSelector(key)).getByTestId(APPLY_ID).click()
  }

  it('renders', async () => {
    await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await expect.element(page.getByTestId(FILTER_LABEL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(FILTER_LABEL_ID)).toBeVisible()
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).toBeVisible()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeVisible()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).not.toBeInTheDocument()
  })

  it('renders without the filter selector when all filters have been added/pinned', async () => {
    await renderFilterGroup({ filters: { pinned: PINNED_FILTER } })
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).not.toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeVisible()
  })

  it('renders pinned filters in the order they were provided', async () => {
    await renderFilterGroup({
      filters: {
        pinned_a: PINNED_FILTER,
        pinned_z: PINNED_FILTER,
        pinned_b: PINNED_FILTER,
      },
    })
    const pillSelect = '[data-testid*="filter-group-pill-"]'
    await expect.poll(() => page.getByCSS(pillSelect).all().length).toBe(3)
    await expect.element(page.getByCSS(pillSelect).nth(0)).toHaveAttribute('data-testid', 'filter-group-pill-pinned_a')
    await expect.element(page.getByCSS(pillSelect).nth(1)).toHaveAttribute('data-testid', 'filter-group-pill-pinned_z')
    await expect.element(page.getByCSS(pillSelect).nth(2)).toHaveAttribute('data-testid', 'filter-group-pill-pinned_b')
  })

  it('renders unpinned filters if the selection for it exists', async () => {
    await renderFilterGroup({
      filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER },
      selection: { basic: SIMPLE_FILTER_SELECTION },
    })
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).not.toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('pinned'))).toBeVisible()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).toBeVisible()
  })

  it('adds a filter when clicked', async () => {
    await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await expect.element(page.getByCSS(getFilterSelector('basic'))).not.toBeInTheDocument()
    await page.getByTestId(FILTER_SELECTOR_ID).click()
    await page.getByCSS('[data-testid="dropdown-item-trigger"][value="basic"]').click()
    await page.getByCSS(getPopoverSelector('basic')).getByTestId(INPUT_ID).fill('foo')
    await page.getByCSS(getPopoverSelector('basic')).getByTestId(APPLY_ID).click()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).toBeInTheDocument()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).toBeVisible()
  })

  it('removes non-pinned filters if no value is selected', async () => {
    await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await expect.element(page.getByCSS(getFilterSelector('basic'))).not.toBeInTheDocument()
    await page.getByTestId(FILTER_SELECTOR_ID).click()
    await page.getByCSS('[data-testid="dropdown-item-trigger"][value="basic"]').click()
    await page.getByCSS(getPopoverSelector('basic')).getByTestId(CANCEL_ID).click()
    await expect.element(page.getByCSS(getFilterSelector('basic'))).not.toBeInTheDocument()
  })

  it('hides the filter selector when all filters are visible', async () => {
    await renderFilterGroup({ filters: { pinned: PINNED_FILTER } })
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).not.toBeInTheDocument()
  })

  it('hides the filter selector when all filters are visible because the user added them', async () => {
    await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).toBeInTheDocument()
    await addAndApplyInputFilter('basic')
    await expect.element(page.getByTestId(FILTER_SELECTOR_ID)).not.toBeInTheDocument()
  })

  it('renders added filters in the order in which they were added', async () => {
    await renderFilterGroup({
      filters: {
        basic_a: BASIC_FILTER,
        basic_z: BASIC_FILTER,
        basic_b: BASIC_FILTER,
      },
    })
    await addAndApplyInputFilter('basic_z')
    await addAndApplyInputFilter('basic_b')
    await addAndApplyInputFilter('basic_a')

    const pillSelect = '[data-testid*="filter-group-pill-"]'
    await expect.poll(() => page.getByCSS(pillSelect).all().length).toBe(3)
    await expect.element(page.getByCSS(pillSelect).nth(0)).toHaveAttribute('data-testid', 'filter-group-pill-basic_z')
    await expect.element(page.getByCSS(pillSelect).nth(1)).toHaveAttribute('data-testid', 'filter-group-pill-basic_b')
    await expect.element(page.getByCSS(pillSelect).nth(2)).toHaveAttribute('data-testid', 'filter-group-pill-basic_a')
  })

  it('exposes slots for filter items', async () => {
    await renderFilterGroup({
      filters: { basic_a: BASIC_FILTER },
      slots: {
        'filter-item-basic_a': '<div class="slot-test">hello</div>',
      },
    })
    await page.getByTestId(FILTER_SELECTOR_ID).click()
    await expect.element(page.getByCSS('[data-testid="dropdown-item-trigger"] .slot-test')).toBeInTheDocument()
  })

  it('forwards custom filter slot props', async () => {
    const CUSTOM_OPTIONS = [{ label: 'Bar', value: 'bar' }, { label: 'Baz', value: 'baz' }]
    const { onApply } = await renderFilterGroup({
      filters: {
        custom: { label: 'Custom', options: CUSTOM_OPTIONS, pinned: true },
      },
      slots: {
        'filter-custom': (props: FilterPillSlotProps) => h('button', {
          'data-testid': 'custom-set-value',
          onClick: () => props.setValue('baz', 'Baz'),
        }, 'set value'),
      },
    })
    await page.getByCSS(getFilterSelector('custom')).click()
    await page.getByTestId('custom-set-value').click()
    await page.getByCSS(getPopoverSelector('custom')).getByTestId(APPLY_ID).click()
    await expect.poll(() => onApply.mock.calls.length).toBe(1)
    expect(onApply).toHaveBeenCalledWith('custom', {
      custom: { operator: 'eq', text: 'Baz', value: 'baz' },
    })
    await expect.element(page.getByCSS(getFilterSelector('custom'))).toHaveTextContent('Baz')
  })

  it('emits @open', async () => {
    const { onOpen, onClose } = await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await page.getByCSS(getFilterSelector('pinned')).click()
    await expect.poll(() => onOpen.mock.calls.length).toBe(1)
    expect(onClose).toHaveBeenCalledTimes(0)
  })

  it('emits @close', async () => {
    const { onOpen, onClose } = await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await page.getByCSS(getFilterSelector('pinned')).click()
    await expect.poll(() => onOpen.mock.calls.length).toBe(1)
    expect(onClose).toHaveBeenCalledTimes(0)

    await page.getByCSS(getFilterSelector('pinned')).click()
    expect(onOpen).toHaveBeenCalledTimes(1)
    await expect.poll(() => onClose.mock.calls.length).toBe(1)
  })

  it('emits @apply', async () => {
    const { onApply } = await renderFilterGroup({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    await addAndApplyInputFilter('basic')
    await expect.poll(() => onApply.mock.calls.length).toBe(1)
  })

  it('emits @clear', async () => {
    const { onApply, onClear } = await renderFilterGroup({ filters: { basic: BASIC_FILTER } })
    await addAndApplyInputFilter('basic')
    await expect.poll(() => onApply.mock.calls.length).toBe(1)
    expect(onClear).toHaveBeenCalledTimes(0)

    await page.getByTestId(CLEAR_ID).click()
    expect(onApply).toHaveBeenCalledTimes(1)
    await expect.poll(() => onClear.mock.calls.length).toBe(1)
  })
})
