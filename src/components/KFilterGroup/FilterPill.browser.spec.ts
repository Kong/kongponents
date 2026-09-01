import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import FilterPill from '@/components/KFilterGroup/FilterPill.vue'
import KButton from '@/components/KButton/KButton.vue'
import type { Filter, FilterPillSlotProps, FilterSelection } from '@/types'

describe('KFilterGroup - FilterPill', () => {
  const PILL_ID = 'filter-pill'
  const CONTENT_ID = 'filter-pill-content'
  const CLEAR_ICON_ID = 'interactive-pill-clear-icon'
  const OPEN_ICON_ID = 'interactive-pill-open-icon'
  const APPLY_ID = 'filter-pill-apply'
  const CANCEL_ID = 'filter-pill-cancel'
  const INPUT_ID = 'filter-pill-input'
  const SELECT_ID = 'filter-pill-select'
  const MULTISELECT_ID = 'filter-pill-multiselect'

  const renderFilterPill = async ({
    filter,
    initOpen,
    selection = undefined,
    custom = false,
    slots = undefined,
  }: {
    filter: Filter
    initOpen?: boolean
    selection?: FilterSelection
    custom?: boolean
    slots?: Record<string, (props: FilterPillSlotProps) => any>
  }) => {
    const onApply = vi.fn()
    const onClose = vi.fn()
    const onOpen = vi.fn()
    const onClear = vi.fn()

    const screen = await render(FilterPill as any, {
      props: {
        filter,
        initOpen,
        selection,
        custom,
        onApply,
        onClose,
        onOpen,
        onClear,
      },
      slots,
    })

    return { screen, onApply, onClose, onOpen, onClear }
  }

  it('renders closed by default', async () => {
    await renderFilterPill({ filter: { label: 'Foo' } })
    await expect.element(page.getByTestId(CONTENT_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(CONTENT_ID)).not.toBeVisible()
  })

  it('renders open when initOpen is true', async () => {
    await renderFilterPill({ filter: { label: 'Foo' }, initOpen: true })
    await expect.element(page.getByTestId(CONTENT_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(CONTENT_ID)).toBeVisible()
  })

  it('renders the selection text', async () => {
    await renderFilterPill({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    await expect.element(page.getByTestId(PILL_ID)).toHaveTextContent(/^Foo = Ayy$/)
  })

  it('renders the selection text with the correct operator text', async () => {
    const { screen } = await renderFilterPill({ filter: { label: 'Foo' } })
    const ops = ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'] as const
    const expected = [' = ', ' ≠ ', ': ', ': ', ' < ', ' ≤ ', ' > ', ' ≥ ']

    for (let i = 0; i < ops.length; i++) {
      await screen.rerender({ selection: { operator: ops[i], value: 'a', text: 'Ayy' } })
      await expect.element(page.getByTestId(PILL_ID)).toHaveTextContent(new RegExp(`^Foo${expected[i]}Ayy$`))
    }
  })

  it('renders the selection text with the operatorDelimiter if set', async () => {
    const { screen } = await renderFilterPill({ filter: { label: 'Foo' } })
    const ops = ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'] as const
    const operatorDelimiter = ' !!! '

    for (const op of ops) {
      await screen.rerender({ selection: { operator: op, value: 'a', text: 'Ayy', operatorDelimiter } })
      await expect.element(page.getByTestId(PILL_ID)).toHaveTextContent(/^Foo !!! Ayy$/)
    }
  })

  it('renders clear icon when selection is defined', async () => {
    await renderFilterPill({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).toBeVisible()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).not.toBeInTheDocument()
  })

  it('renders open icon when selection is undefined', async () => {
    await renderFilterPill({ filter: { label: 'Foo' }, selection: undefined })
    await expect.element(page.getByTestId(OPEN_ICON_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).toBeVisible()
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).not.toBeInTheDocument()
  })

  it('toggles open state when clicked', async () => {
    await renderFilterPill({ filter: { label: 'Foo' }, initOpen: true })
    await expect.element(page.getByTestId(CONTENT_ID)).toBeVisible()
    await page.getByTestId(PILL_ID).click()
    await expect.element(page.getByTestId(CONTENT_ID)).not.toBeVisible()
    await page.getByTestId(PILL_ID).click()
    await expect.element(page.getByTestId(CONTENT_ID)).toBeVisible()
  })

  it('emits @open/@close when opened/closed', async () => {
    const { onOpen, onClose } = await renderFilterPill({ filter: { label: 'Foo' }, initOpen: true })

    // initOpen counts as an open
    await expect.poll(() => onOpen.mock.calls.length).toBe(1)
    expect(onClose).toHaveBeenCalledTimes(0)

    await page.getByTestId(PILL_ID).click()

    expect(onOpen).toHaveBeenCalledTimes(1)
    await expect.poll(() => onClose.mock.calls.length).toBe(1)

    await page.getByTestId(PILL_ID).click()

    await expect.poll(() => onOpen.mock.calls.length).toBe(2)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('emits @clear when clear button is clicked', async () => {
    const { onClear } = await renderFilterPill({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    await page.getByTestId(CLEAR_ICON_ID).click()
    await expect.poll(() => onClear.mock.calls.length).toBe(1)
  })

  describe('popover content interactions', () => {
    it('emits @close when cancel button is clicked', async () => {
      const { onClose } = await renderFilterPill({ filter: { label: 'Foo' } })
      await page.getByTestId(PILL_ID).click()
      await page.getByTestId(CANCEL_ID).click()
      await expect.poll(() => onClose.mock.calls.length).toBe(1)
    })

    it('emits @apply when apply button is clicked', async () => {
      const { onApply } = await renderFilterPill({ filter: { label: 'Foo' } })
      await page.getByTestId(PILL_ID).click()
      await expect.element(page.getByTestId(APPLY_ID)).toHaveAttribute('disabled')
      await page.getByTestId(INPUT_ID).fill('foo')
      await page.getByTestId(APPLY_ID).click()
      await expect.poll(() => onApply.mock.calls.length).toBe(1)
    })

    it('text input: focuses the input if the filter is an input type', async () => {
      await renderFilterPill({ filter: { label: 'Foo' } })
      await expect.element(page.getByTestId(INPUT_ID)).toBeInTheDocument()
      await expect.element(page.getByTestId(INPUT_ID)).not.toBeVisible()
      await expect.element(page.getByTestId(INPUT_ID)).not.toHaveFocus()
      await page.getByTestId(PILL_ID).click()
      await expect.element(page.getByTestId(INPUT_ID)).toBeVisible()
      await expect.element(page.getByTestId(INPUT_ID)).toHaveFocus()
    })

    it('select input: emits apply with the selected content', async () => {
      const { onApply } = await renderFilterPill({
        filter: {
          label: 'Foo',
          multiple: false,
          options: [
            { label: 'Bar', value: 'bar' },
            { label: 'Baz', value: 'baz' },
          ],
        },
      })
      await page.getByTestId(PILL_ID).click()
      await page.getByTestId(SELECT_ID).click()
      await page.getByTestId('select-item-baz').click()
      await page.getByTestId(APPLY_ID).click()
      await expect.poll(() => onApply.mock.calls.length).toBe(1)
      expect(onApply).toHaveBeenCalledWith({ operator: 'eq', text: 'Baz', value: 'baz' })
    })

    it('multi select input: emits apply with multiple selected content', async () => {
      const { onApply } = await renderFilterPill({
        filter: {
          label: 'Foo',
          multiple: true,
          options: [
            { label: 'Bar', value: 'bar' },
            { label: 'Baz', value: 'baz' },
          ],
        },
      })
      await page.getByTestId(PILL_ID).click()
      await page.getByTestId(MULTISELECT_ID).click()
      await page.getByTestId('multiselect-item-baz').click()
      await page.getByTestId('multiselect-item-bar').click()
      // Close the multiselect dropdown by focusing its search input then pressing Escape.
      page.getByTestId('multiselect-dropdown-input').element().focus()
      await userEvent.keyboard('{Escape}')
      await page.getByTestId(APPLY_ID).click()
      await expect.poll(() => onApply.mock.calls.length).toBe(1)
      expect(onApply).toHaveBeenCalledWith({ operator: 'eq', text: 'Baz, Bar', value: ['baz', 'bar'] })
    })

    describe('custom filter slot props', () => {
      const CUSTOM_OPTIONS = [{ label: 'Bar', value: 'bar' }, { label: 'Baz', value: 'baz' }]

      it('passes filter/selection state through to the slot', async () => {
        await renderFilterPill({
          custom: true,
          filter: {
            label: 'Foo',
            multiple: true,
            operators: ['eq', 'neq'],
            options: CUSTOM_OPTIONS,
          },
          selection: { operator: 'neq', value: 'a', text: 'Ayy' },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('span', { 'data-testid': 'custom-options' }, JSON.stringify(props.options)),
              h('span', { 'data-testid': 'custom-multiple' }, String(props.multiple)),
              h('span', { 'data-testid': 'custom-operators' }, JSON.stringify(props.operators)),
              h('span', { 'data-testid': 'custom-value' }, JSON.stringify(props.value)),
              h('span', { 'data-testid': 'custom-text' }, props.text),
              h('span', { 'data-testid': 'custom-operator' }, props.operator),
            ]),
          },
        })
        await page.getByTestId(PILL_ID).click()
        await expect.element(page.getByTestId('custom-options')).toHaveTextContent(JSON.stringify(CUSTOM_OPTIONS))
        await expect.element(page.getByTestId('custom-multiple')).toHaveTextContent('true')
        await expect.element(page.getByTestId('custom-operators')).toHaveTextContent(JSON.stringify(['eq', 'neq']))
        await expect.element(page.getByTestId('custom-value')).toHaveTextContent(JSON.stringify('a'))
        await expect.element(page.getByTestId('custom-text')).toHaveTextContent('Ayy')
        await expect.element(page.getByTestId('custom-operator')).toHaveTextContent('neq')
      })

      it('emits @apply built from setValue/setOperator', async () => {
        const { onApply } = await renderFilterPill({
          custom: true,
          filter: { label: 'Foo', operators: ['eq', 'neq'], options: CUSTOM_OPTIONS },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('button', {
                'data-testid': 'custom-set-value',
                onClick: () => props.setValue('baz', 'Baz'),
              }, 'set value'),
              h('button', {
                'data-testid': 'custom-set-operator',
                onClick: () => props.setOperator('neq'),
              }, 'set operator'),
            ]),
          },
        })
        await page.getByTestId(PILL_ID).click()
        await page.getByTestId('custom-set-value').click()
        await page.getByTestId('custom-set-operator').click()
        await page.getByTestId(APPLY_ID).click()
        await expect.poll(() => onApply.mock.calls.length).toBe(1)
        expect(onApply).toHaveBeenCalledWith({ operator: 'neq', text: 'Baz', value: 'baz' })
      })

      it('disables/enables apply via setApplyState', async () => {
        // KButton registered explicitly so its `disabled` prop maps to a native
        // button[disabled] — making toBeDisabled() reliable.
        const onApply = vi.fn()
        await render(FilterPill as any, {
          props: {
            filter: { label: 'Foo' },
            custom: true,
            onApply,
          },
          global: {
            components: { KButton },
          },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('button', {
                'data-testid': 'custom-disable',
                onClick: () => props.setApplyState(false),
              }, 'disable'),
              h('button', {
                'data-testid': 'custom-enable',
                onClick: () => props.setApplyState(true),
              }, 'enable'),
            ]),
          },
        })

        await page.getByTestId(PILL_ID).click()
        await expect.element(page.getByTestId(APPLY_ID)).not.toBeDisabled()

        await page.getByTestId('custom-disable').click()
        await expect.element(page.getByTestId(APPLY_ID)).toBeDisabled()

        await page.getByTestId('custom-enable').click()
        await expect.element(page.getByTestId(APPLY_ID)).not.toBeDisabled()
        await page.getByTestId(APPLY_ID).click()
        await expect.poll(() => onApply.mock.calls.length).toBe(1)
      })

      it('still emits @apply with undefined if setValue is never called', async () => {
        const { onApply } = await renderFilterPill({
          custom: true,
          filter: { label: 'Foo' },
          slots: {
            default: () => h('div', { 'data-testid': 'bare-custom-slot' }, 'no destructured props used'),
          },
        })
        await page.getByTestId(PILL_ID).click()
        await page.getByTestId(APPLY_ID).click()
        await expect.poll(() => onApply.mock.calls.length).toBe(1)
        expect(onApply).toHaveBeenCalledWith(undefined)
      })
    })
  })
})
