import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import FilterSelector from '@/components/KFilterGroup/FilterSelector.vue'
import type { FilterGroupFilters } from '@/types'

describe('KFilterGroup - FilterSelector', () => {
  const SELECTOR_ID = 'filter-selector'
  const FILTERING_ID = 'filter-selector-item-filtering'
  const FILTERING_NO_ITEMS_ID = 'filter-selector-no-items'

  const renderSelector = async ({
    filters,
    itemFiltering = false,
    slots = {},
  }: {
    filters: FilterGroupFilters
    itemFiltering?: boolean
    slots?: any
  }) => {
    const onSelect = vi.fn()
    await render(FilterSelector as any, {
      props: { filters, itemFiltering, onSelect },
      slots,
    })
    return { onSelect }
  }

  it('renders each filter in the dropdown in order', async () => {
    const expectedText = ['Ayy', 'Zee', 'Jay']
    await renderSelector({
      filters: {
        a: { label: expectedText[0]! },
        z: { label: expectedText[1]! },
        j: { label: expectedText[2]! },
      },
    })

    await expect.element(page.getByTestId(SELECTOR_ID)).toBeInTheDocument()
    await page.getByTestId(SELECTOR_ID).click()
    const items = page.getByTestId('dropdown-item-trigger')
    await expect.poll(() => items.all().length).toBe(expectedText.length)
    for (let i = 0; i < expectedText.length; i++) {
      await expect.element(items.nth(i)).toHaveTextContent(expectedText[i]!)
    }
  })

  it('readonly filters do not render in the dropdown', async () => {
    const expectedText = ['Ayy', 'Zee', 'Jay']
    await renderSelector({
      filters: {
        a: { label: expectedText[0]! },
        z: { label: expectedText[1]! },
        j: { label: expectedText[2]!, readonly: true },
      },
    })

    await page.getByTestId(SELECTOR_ID).click()
    const items = page.getByTestId('dropdown-item-trigger')
    await expect.poll(() => items.all().length).toBe(2)
    for (let i = 0; i < 2; i++) {
      await expect.element(items.nth(i)).toHaveTextContent(expectedText[i]!)
    }
  })

  it('emits @select with filter key on item click', async () => {
    const { onSelect } = await renderSelector({ filters: { a: { label: 'Ayy' } } })

    await page.getByTestId(SELECTOR_ID).click()
    const items = page.getByTestId('dropdown-item-trigger')
    await expect.poll(() => items.all().length).toBe(1)
    await expect.element(items.nth(0)).toHaveTextContent('Ayy')
    await items.nth(0).click()
    await expect.poll(() => onSelect.mock.calls.length).toBe(1)
    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('is focused after click, and unfocused on blur', async () => {
    await renderSelector({ filters: {} })
    await expect.element(page.getByTestId(SELECTOR_ID)).toHaveClass('unfocused')
    await page.getByTestId(SELECTOR_ID).click()
    await expect.element(page.getByTestId(SELECTOR_ID)).toHaveClass('focused')
    await page.getByTestId(SELECTOR_ID).click()
    await expect.element(page.getByTestId(SELECTOR_ID)).toHaveClass('unfocused')
  })

  it('does not have a search bar when itemFiltering is false', async () => {
    await renderSelector({ filters: { a: { label: 'Ayy' } }, itemFiltering: false })
    await expect.element(page.getByTestId(FILTERING_ID)).not.toBeInTheDocument()
    await page.getByTestId(SELECTOR_ID).click()
    await expect.element(page.getByTestId(FILTERING_ID)).not.toBeInTheDocument()
  })

  it('has a search bar when itemFiltering is true, and focuses it', async () => {
    await renderSelector({ filters: { a: { label: 'Ayy' } }, itemFiltering: true })
    await expect.element(page.getByTestId(FILTERING_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(FILTERING_ID)).not.toBeVisible()
    await page.getByTestId(SELECTOR_ID).click()
    await expect.element(page.getByTestId(FILTERING_ID)).toBeVisible()
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveFocus()
  })

  it('has a search bar when itemFiltering is true, and resets it on open', async () => {
    await renderSelector({ filters: { a: { label: 'Ayy' } }, itemFiltering: true })
    await page.getByTestId(SELECTOR_ID).click()

    // initial state: visible, focused, empty value
    await expect.element(page.getByTestId(FILTERING_ID)).toBeVisible()
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveFocus()
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveValue('')

    // type into the search bar
    await page.getByTestId(FILTERING_ID).fill('hello')
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveValue('hello')

    // close and re-open
    await userEvent.keyboard('{Escape}')
    await expect.element(page.getByTestId(FILTERING_ID)).not.toBeVisible()
    await page.getByTestId(SELECTOR_ID).click()

    // should be reset to initial state
    await expect.element(page.getByTestId(FILTERING_ID)).toBeVisible()
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveFocus()
    await expect.element(page.getByTestId(FILTERING_ID)).toHaveValue('')
  })

  it('filters items when you type in the itemFiltering input', async () => {
    await renderSelector({
      filters: {
        a: { label: 'Ayy' },
        b: { label: 'Bee' },
        c: { label: 'Cee' },
        f: { label: 'Eff' },
      },
      itemFiltering: true,
    })
    await page.getByTestId(SELECTOR_ID).click()
    await expect.element(page.getByTestId(FILTERING_NO_ITEMS_ID)).not.toBeInTheDocument()

    await page.getByTestId(FILTERING_ID).fill('e')
    const items = page.getByTestId('dropdown-item-trigger')
    await expect.poll(() => items.all().length).toBe(3) // b, c, f
    await expect.element(items.nth(0)).toHaveTextContent('Bee')
    await expect.element(items.nth(1)).toHaveTextContent('Cee')
    await expect.element(items.nth(2)).toHaveTextContent('Eff')

    await page.getByTestId(FILTERING_ID).fill('ee')
    await expect.poll(() => items.all().length).toBe(2) // b, c
    await expect.element(items.nth(0)).toHaveTextContent('Bee')
    await expect.element(items.nth(1)).toHaveTextContent('Cee')

    await page.getByTestId(FILTERING_ID).fill('eex')
    await expect.poll(() => items.all().length).toBe(0)
    await expect.element(page.getByTestId(FILTERING_NO_ITEMS_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(FILTERING_NO_ITEMS_ID)).toBeVisible()
  })

  it('exposes a slot for each filter item', async () => {
    await renderSelector({
      filters: { a: { label: 'Ayy' } },
      slots: {
        'filter-item-a': '<div>hello</div>',
      },
    })
    await page.getByTestId(SELECTOR_ID).click()
    const items = page.getByTestId('dropdown-item-trigger')
    await expect.poll(() => items.all().length).toBe(1)
    await expect.element(items.nth(0)).toHaveTextContent('hello')
  })
})
