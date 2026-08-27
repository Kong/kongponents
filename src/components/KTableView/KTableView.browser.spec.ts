import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import type { TableViewHeader, RowBulkAction } from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/utilities/tableHelpers'

const largeDataSet = [
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true',
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false',
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true',
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true',
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false',
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true',
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true',
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false',
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true',
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true',
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false',
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true',
  },
]

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'ID', key: 'id', sortable: true },
    { label: 'Enabled', key: 'enabled', sortable: false },
    { label: '', key: 'actions', sortable: false },
  ] as TableViewHeader[],
  data: [
    {
      name: 'Basic Auth',
      id: '517526354743085',
      enabled: 'true',
      expandable: true,
      expanded: true,
    },
    {
      name: 'Website Desktop',
      id: '328027447731198',
      enabled: 'false',
      bulkActionsDisabled: true,
      expandable: false,
    },
    {
      name: 'Android App',
      id: '405383051040955',
      enabled: 'true',
      expandable: false,
    },
  ],
}

describe('KTableView', () => {
  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      await render(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      await expect.element(page.getByCSS('.k-empty-state')).toBeVisible()
    })

    it('displays an empty state when no data is available (slot)', async () => {
      const emptySlotContent = 'Look mah! I am empty!'
      await render(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      await expect.element(page.getByTestId('table-empty-state')).toHaveTextContent(emptySlotContent)
    })

    it('displays a loading skeletion when the "loading" prop is set to true"', async () => {
      await render(KTableView, {
        props: {
          loading: true,
          data: [],
          headers: [],
        },
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeVisible()
    })

    it('displays an error state when the "error" prop is set to true"', async () => {
      await render(KTableView, {
        props: {
          error: true,
          data: [],
          headers: [],
        },
      })

      await expect.element(page.getByCSS('.k-empty-state.error')).toBeVisible()
    })

    it('displays an error state (slot)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      await render(KTableView, {
        props: {
          error: true,
          data: [],
          headers: [],
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      await expect.element(page.getByTestId('table-error-state')).toHaveTextContent(errorSlotContent)
    })

    it('maintains the row state when data changes', async () => {
      const screen = await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowLink: () => ({
            to: '/link',
          }),
        },
      })

      const firstCellLink = page.getByCSS('table tbody td').nth(0).getByCSS('a.cell-wrapper').nth(0)
      await expect.element(firstCellLink).toBeVisible()
      firstCellLink.element().focus()
      await expect.element(firstCellLink).toHaveFocus()

      await screen.rerender({
        data: [...options.data].splice(1, options.data.length - 1),
      })

      await expect.element(firstCellLink).not.toHaveFocus()
    })
  })

  describe('default', () => {
    const mountDynamicToolbar = async ({
      headers = options.headers.map(header => ({ ...header, hidable: false })),
      initialReady = false,
    }: { headers?: TableViewHeader[], initialReady?: boolean } = {}) => {
      const ready = ref(initialReady)

      await render(defineComponent({
        setup: () => () => h(
          KTableView,
          { data: options.data, headers },
          ready.value
            ? { toolbar: () => h('div', { 'data-testid': 'toolbar-content' }, 'Toolbar') }
            : {},
        ),
      }))

      return { ready }
    }

    it('renders link in action slot', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
        slots: {
          name: () => h('a', { href: '#' }, 'Link'),
        },
      })

      // `td:first-of-type` matches the first td in each row; use `.first()` to avoid strict-mode error
      await expect.element(page.getByCSS('.table td:first-of-type a').first()).toHaveTextContent('Link')
    })

    it('renders content in the toolbar slot', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      await expect.element(page.getByCSS('.k-table-view .table-toolbar').getByCSS('button')).toBeVisible()
      await expect.element(page.getByCSS('.k-table-view .table-toolbar button')).toHaveTextContent('Toolbar button')
    })

    it('renders a toolbar slot that is added after mount', async () => {
      const { ready } = await mountDynamicToolbar()

      await expect.element(page.getByTestId('table-toolbar')).not.toBeInTheDocument()
      ready.value = true
      await expect.element(page.getByTestId('table-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('toolbar-content')).toBeInTheDocument()
    })

    it('removes a toolbar slot after mount when no default toolbar controls are active', async () => {
      const { ready } = await mountDynamicToolbar({ initialReady: true })

      await expect.element(page.getByTestId('table-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('toolbar-content')).toBeInTheDocument()
      ready.value = false
      await expect.element(page.getByTestId('toolbar-content')).not.toBeInTheDocument()
      await expect.element(page.getByTestId('table-toolbar')).not.toBeInTheDocument()
    })

    it('removes a toolbar slot after mount while keeping active default toolbar controls', async () => {
      const { ready } = await mountDynamicToolbar({
        headers: options.headers.map((header, index) => ({ ...header, hidable: index === 1 })),
        initialReady: true,
      })

      await expect.element(page.getByTestId('table-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('toolbar-content')).toBeInTheDocument()
      ready.value = false
      await expect.element(page.getByTestId('toolbar-content')).not.toBeInTheDocument()
      await expect.element(page.getByTestId('table-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('column-visibility-menu-button')).toBeInTheDocument()
    })

    it('has hover class when passed', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowHover: true,
        },
      })

      await expect.element(page.getByCSS('.table')).toHaveClass('has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          resizeColumns: true,
        },
      })

      await expect.element(page.getByCSS('.table').getByCSS('th.resizable').first()).toBeVisible()
      await expect.element(page.getByCSS('.resize-handle').first()).toBeInTheDocument()
    })

    it('keeps the resize handle height in sync when the header row height changes', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          resizeColumns: true,
        },
      })

      const expectHandleHeightMatchesRow = async () => {
        await expect.poll(() => {
          const handleEl = page.getByCSS('.resize-handle').first().element()
          const row = handleEl.closest('tr')!
          const handleHeight = parseFloat(window.getComputedStyle(handleEl).height)
          const rowHeight = row.getBoundingClientRect().height
          return Math.abs(handleHeight - rowHeight) <= 1
        }).toBe(true)
      }

      await expectHandleHeightMatchesRow()

      document.querySelectorAll<HTMLElement>('th.table-headers').forEach((el) => {
        el.style.paddingTop = '60px'
      })

      await expectHandleHeightMatchesRow()
    })

    it('renders column show/hide when headers.hidable is set', async () => {
      // Use a local copy so the shared options.headers is not mutated
      const headers = structuredClone(options.headers)
      // make ID column hidable
      headers[1].hidable = true
      const modifiedHeaderKey = headers[1].key

      await render(KTableView, {
        props: {
          headers,
          data: options.data,
        },
      })

      await expect.element(page.getByCSS('.table')).toBeVisible()
      // menu button is visible
      await expect.element(page.getByTestId('column-visibility-menu-button')).toBeVisible()
      await page.getByTestId('column-visibility-menu-button').click()

      // only columns with hidable set to true should be visible and checked by default
      await expect.element(page.getByTestId(`column-visibility-menu-item-${modifiedHeaderKey}`)).toBeVisible()
      await expect.element(page.getByTestId(`column-visibility-menu-item-${headers[0].key}`)).not.toBeInTheDocument()
      await expect.element(page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`)).toBeVisible()
      await expect.element(page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`)).toBeChecked()

      // changes are applied only when Apply button is clicked
      await page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`).click()
      await expect.element(page.getByTestId(`table-header-${modifiedHeaderKey}`)).toBeVisible()
      await page.getByTestId('apply-button').click()
      await expect.element(page.getByTestId(`table-header-${modifiedHeaderKey}`)).not.toBeInTheDocument()
    })

    it('renders tooltip when provided in headers', async () => {
      // Use a local copy so the shared options.headers is not mutated
      const headers = structuredClone(options.headers)
      headers[0].tooltip = 'This is a tooltip'

      await render(KTableView, {
        props: {
          headers,
          data: options.data,
        },
      })

      await expect.element(page.getByTestId(`tooltip-${headers[0].key}`)).toBeVisible()
    })

    it('displays each row as link when rowLink prop is provided', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowLink: () => ({
            to: '/link',
          }),
        },
      })

      const expectedCellCount = options.data.length * options.headers.length
      await expect.poll(() => page.getByCSS('table tbody td.row-link').all().length).toBe(expectedCellCount)
      // The reserved 'actions' column renders a dropdown, not an a.cell-wrapper link
      const expectedLinkCount = options.data.length * options.headers.filter(h => h.key !== 'actions').length
      await expect.poll(() => page.getByCSS('table tbody td > a.cell-wrapper').all().length).toBe(expectedLinkCount)
    })
  })

  describe('reserved header keys', () => {
    it('displays actions dropdown when actions key is provided', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      await expect.poll(() => page.getByTestId('actions-dropdown').all().length).toBe(options.data.length)
      await expect.element(page.getByTestId('actions-dropdown').first()).toBeVisible()
      const actionsHeaderIndex = options.headers.indexOf(options.headers.find((header) => header.key === 'actions')!)
      await expect.element(page.getByCSS('th').nth(actionsHeaderIndex).getByCSS('.table-header-label')).toHaveClass('sr-only')
    })

    it('applies actionsDropdownPopoverAttributes to the actions dropdown popover', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          actionsDropdownPopoverAttributes: { zIndex: 9999 },
        },
        slots: {
          'action-items': () => h('span', {}, 'Action item'),
        },
      })

      await page.getByTestId('actions-dropdown').nth(0).getByTestId('row-actions-dropdown-trigger').click()
      // The action dropdown uses target: 'body', teleporting .popover out of .k-popover.
      // Scan all .popover elements to find the one that has z-index: 9999 applied.
      await expect.poll(() => {
        const popover = Array.from(document.querySelectorAll<HTMLElement>('.popover'))
          .find(el => (el.getAttribute('style') || '').includes('z-index: 9999'))
        return popover ? popover.getAttribute('style') : null
      }).toContain('z-index: 9999')
    })

    it('bulk actions in not enabled when rowKey prop is not provided', async () => {
      await render(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
        },
      })

      await expect.element(page.getByTestId('bulk-actions-dropdown')).not.toBeInTheDocument()
      await expect.element(page.getByTestId('table-header-bulk-actions-checkbox')).not.toBeInTheDocument()
      await expect.element(page.getByCSS('th').nth(0).getByTestId('table-header-bulk-actions-checkbox')).not.toBeInTheDocument()
      await expect.poll(() => page.getByTestId('bulk-actions-checkbox').all().length).toBe(0)
    })

    it('displays bulk actions column and dropdown when bulkActions key is provided', async () => {
      await render(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowKey: ({ id }: Record<string, any>) => `row-${id}-key`,
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
        },
      })

      await expect.element(page.getByTestId('bulk-actions-dropdown')).toBeVisible()
      await expect.element(page.getByTestId('bulk-actions-dropdown-trigger')).toBeVisible()
      await expect.element(page.getByTestId('bulk-actions-dropdown-trigger')).toBeDisabled()
      await expect.element(page.getByCSS('th').nth(0).getByTestId('table-header-bulk-actions-checkbox')).toBeVisible()
      await expect.poll(() => page.getByTestId('bulk-actions-checkbox').all().length).toBe(options.data.length)
      await page.getByTestId('bulk-actions-checkbox').nth(0).click()
      await expect.element(page.getByTestId('bulk-actions-dropdown-trigger')).not.toBeDisabled()
    })

    it('handles bulk actions indeterminate state correctly and emits event', async () => {
      const onRowSelect = vi.fn()

      await render(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowKey: 'id',
          onRowSelect,
        },
        slots: {
          'bulk-actions': () => h('span', {}, 'Bulk action'),
        },
      })

      await page.getByTestId('bulk-actions-checkbox').nth(0).click()
      await page.getByTestId('bulk-actions-checkbox').nth(1).click()
      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(0)).toBeChecked()
      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(1)).toBeChecked()
      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(2)).not.toBeChecked()
      await expect.element(page.getByTestId('table-header-bulk-actions-checkbox')).not.toBeChecked()
      await expect.element(page.getByTestId('indeterminate-icon')).toBeInTheDocument()

      await page.getByTestId('table-header-bulk-actions-checkbox').click()
      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(2)).toBeChecked()
      await expect.element(page.getByTestId('indeterminate-icon')).not.toBeInTheDocument()

      await expect.poll(() => onRowSelect.mock.calls.length).toBe(4)
      expect(Array.isArray(onRowSelect.mock.calls[3][0])).toBe(true)
      expect(onRowSelect.mock.calls[3][0]).toHaveLength(options.data.length)
    })

    it('handles bulk actions disabled state correctly', async () => {
      await render(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowBulkActionEnabled: (row: Record<string, any>): RowBulkAction => {
            if (row.bulkActionsDisabled) {
              return false
            }

            return true
          },
          rowKey: 'id',
        },
        slots: {
          'bulk-actions': () => h('span', {}, 'Bulk action'),
        },
      })

      const disabledCheckboxIndex = options.data.indexOf(options.data.find((row) => row.bulkActionsDisabled)!)
      const enabledCheckboxIndex = (options.data.length - disabledCheckboxIndex) === options.data.length ? options.data.length - 1 : options.data.length - disabledCheckboxIndex

      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(enabledCheckboxIndex)).not.toBeDisabled()
      await expect.element(page.getByTestId('bulk-actions-checkbox').nth(disabledCheckboxIndex)).toBeDisabled()
    })
  })

  describe('handles prop changes as expected', () => {
    it('reacts to changes in headers', async () => {
      const screen = await render(KTableView, {
        props: {
          data: largeDataSet,
          headers: [
            { label: 'Name', key: 'name' },
          ],
        },
      })

      await expect.poll(() => page.getByCSS('.table').getByCSS('th').all().length).toBe(1)
      await expect.element(page.getByTestId('table-header-name')).toBeVisible()

      await screen.rerender({
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
        ],
      })

      await expect.poll(() => page.getByCSS('.table').getByCSS('th').all().length).toBe(2)
      await expect.element(page.getByTestId('table-header-id')).toBeVisible()
      await expect.element(page.getByCSS('.table').getByCSS('td').nth(1)).toHaveTextContent('517526354743085')
    })
  })

  describe('sorting', () => {
    it('should render sortable columns correctly', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      for (let index = 0; index < options.headers.length; index++) {
        const th = page.getByCSS('th').nth(index)
        if (options.headers[index].sortable) {
          await expect.element(th).toHaveClass('sortable')
          await expect.element(th.getByCSS('.sort-icon')).toBeInTheDocument()
        } else {
          await expect.element(th).not.toHaveClass('sortable')
          await expect.element(th.getByCSS('.sort-icon')).not.toBeInTheDocument()
        }
        await expect.element(th.getByCSS('.active-sort-icon')).not.toBeInTheDocument()
      }
    })

    it('should emit event when sortable column is clicked', async () => {
      const onSort = vi.fn()

      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          onSort,
        },
      })

      await page.getByCSS('th').nth(0).click()
      await expect.element(page.getByCSS('th').nth(0)).toHaveClass('active-sort')
      await expect.poll(() => onSort.mock.calls.length).toBe(1)
    })

    it('should emit correct sort order when changing sort column', async () => {
      const onSort = vi.fn()

      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          onSort,
        },
      })

      await page.getByCSS('th').nth(0).click()
      await expect.poll(() => onSort.mock.calls.length).toBe(1)
      expect(onSort).toHaveBeenCalledWith(expect.objectContaining({ sortColumnOrder: 'asc' }))

      await page.getByCSS('th').nth(1).click()
      await expect.poll(() => onSort.mock.calls.length).toBe(2)
      expect(onSort).toHaveBeenCalledWith(expect.objectContaining({ sortColumnOrder: 'asc' }))
    })

    it('should respect initial sort order from table preferences', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          tablePreferences: {
            sortColumnKey: 'name',
            sortColumnOrder: 'desc',
          },
        },
      })

      await expect.element(page.getByTestId('table-header-name')).toHaveClass('active-sort')
      await expect.element(page.getByTestId('table-header-name')).toHaveAttribute('aria-sort', 'descending')

      // When already sorted in descending order, clicking should reset the sorting state
      await page.getByTestId('table-header-name').click()
      await expect.element(page.getByTestId('table-header-name')).not.toHaveClass('active-sort')
      await expect.element(page.getByTestId('table-header-name')).not.toHaveAttribute('aria-sort')
    })

    it('sorting a column 3 times resets the sort', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const onSort = vi.fn()

      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          onSort,
        },
      })

      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).not.toHaveClass('active-sort')

      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).toHaveClass('active-sort')
      await expect.poll(() => onSort.mock.calls.length).toBe(1)
      expect(onSort).toHaveBeenCalledWith({ prevKey: '', sortColumnKey: sortableColumnKey, sortColumnOrder: 'asc' })

      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).toHaveClass('active-sort')
      await expect.poll(() => onSort.mock.calls.length).toBe(2)
      expect(onSort).toHaveBeenCalledWith({ prevKey: sortableColumnKey, sortColumnKey: sortableColumnKey, sortColumnOrder: 'desc' })

      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).not.toHaveClass('active-sort')
      await expect.poll(() => onSort.mock.calls.length).toBe(3)
      expect(onSort).toHaveBeenCalledWith({ prevKey: sortableColumnKey, sortColumnKey: '', sortColumnOrder: 'desc' })
    })

    it('follows correct sorting state order when switching sort columns', async () => {
      const firstSortableColumnKey = options.headers.filter(header => header.sortable)[0].key
      const secondSortableColumnKey = options.headers.filter(header => header.sortable)[1].key

      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      await page.getByTestId(`table-header-${firstSortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${firstSortableColumnKey}`)).toHaveClass('active-sort')
      await expect.element(page.getByTestId(`table-header-${firstSortableColumnKey}`)).toHaveAttribute('aria-sort', 'ascending')

      await page.getByTestId(`table-header-${firstSortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${firstSortableColumnKey}`)).toHaveAttribute('aria-sort', 'descending')

      await page.getByTestId(`table-header-${secondSortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${secondSortableColumnKey}`)).toHaveClass('active-sort')
      await expect.element(page.getByTestId(`table-header-${secondSortableColumnKey}`)).toHaveAttribute('aria-sort', 'ascending')
      await expect.element(page.getByTestId(`table-header-${firstSortableColumnKey}`)).not.toHaveClass('active-sort')
      await expect.element(page.getByTestId(`table-header-${firstSortableColumnKey}`)).not.toHaveAttribute('aria-sort')
    })
  })

  describe('pagination', () => {
    it('displays pagination when data is provided', async () => {
      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('does not display pagination when hidePagination prop is true', async () => {
      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          hidePagination: true,
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when data is empty', async () => {
      await render(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('passes the correct props to the pagination component', async () => {
      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          paginationAttributes: {
            totalCount: 100,
            currentPage: 2,
          },
        },
      })

      await expect.element(page.getByTestId('visible-items').nth(0)).toHaveTextContent('16 to 30 of 100')
    })
  })

  describe('table preferences', () => {
    it('does not apply column width and visibility preferences when not set', async () => {
      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers.filter(header => header.key !== 'actions'),
        },
      })

      for (const header of options.headers.filter(header => header.key !== 'actions')) {
        await expect.element(page.getByTestId(`table-header-${header.key}`)).not.toHaveAttribute('style')
        await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
      }
    })

    it('applies column width and visibility preferences when set', async () => {
      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers.filter(header => header.key !== 'actions').map(header => {
            if (options.headers[1].key === header.key) {
              return { ...header, hidable: true }
            }
            return header
          }),
          tablePreferences: {
            columnWidths: options.headers.reduce((acc: Record<string, number>, header) => {
              acc[header.key] = 100
              return acc
            }, {} as Record<string, number>),
            columnVisibility: {
              [options.headers[1].key]: false, // hide ID column
            },
          },
        },
      })

      for (const header of options.headers.filter(header => header.key !== 'actions')) {
        if (options.headers[1].key === header.key) {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).not.toBeInTheDocument()
        } else {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).toHaveStyle({ width: '100px' })
          await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
        }
      }
    })

    it('correctly handles when page size, sort column key and order preferences are not passed', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key

      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
        },
      })

      // default page size is applied
      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(DEFAULT_PAGE_SIZE.toString())
      // no initial sort is applied
      await expect.element(page.getByCSS('thead th[aria-sort]')).not.toBeInTheDocument()
      // after sorting, ascending order is applied by default
      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).toHaveAttribute('aria-sort', 'ascending')
    })

    it('applies page size, sort column key and order preferences when passed', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const pageSize = 30

      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          tablePreferences: {
            pageSize: pageSize,
            sortColumnKey: sortableColumnKey,
            sortColumnOrder: 'desc',
          },
        },
      })

      // page size preference is applied
      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(pageSize.toString())
      // initial sort column is applied correctly
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).toHaveAttribute('aria-sort', 'descending')
    })

    it('emits update:table-preferences event immediately after initialization with parameters matching tablePreferences', async () => {
      // Use a local copy so the shared options.headers is not mutated
      const headers = structuredClone(options.headers)
      const sortableColumnKey = headers.find(header => header.sortable)?.key
      const pageSize = 30
      // make ID column hidable
      headers[1].hidable = true
      const hidableColumnKey = headers[1].key
      const columnVisibility = {
        [hidableColumnKey]: false,
      }
      const onUpdateTablePreferences = vi.fn()

      await render(KTableView, {
        props: {
          data: options.data,
          headers,
          tablePreferences: {
            pageSize: pageSize,
            sortColumnKey: sortableColumnKey,
            sortColumnOrder: 'desc',
            columnVisibility: columnVisibility,
          },
        },
        attrs: {
          'onUpdate:table-preferences': onUpdateTablePreferences,
        },
      })

      // should emit update:table-preferences immediately after initialization
      await expect.poll(() => onUpdateTablePreferences.mock.calls.length).toBe(1)
      expect(onUpdateTablePreferences).toHaveBeenCalledWith(expect.objectContaining({ pageSize, sortColumnKey: sortableColumnKey, sortColumnOrder: 'desc', columnVisibility }))
      expect(onUpdateTablePreferences.mock.calls[0][0]).toMatchObject({ columnVisibility: { [hidableColumnKey]: false } })
    })

    it('emits update:table-preferences event when table preferences are updated', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const newPageSize = 30
      const onUpdateTablePreferences = vi.fn()

      await render(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
        },
        attrs: {
          'onUpdate:table-preferences': onUpdateTablePreferences,
        },
      })

      // One-off, apply margin-top: 50px to the table to avoid overlapping with the dropdown menu
      page.getByCSS('.k-table-view').element().setAttribute('style', 'margin-top: 50px')

      // change page size
      await page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger').click()
      await page.getByTestId('dropdown-list').getByCSS(`button:has-text("${newPageSize}")`).click()
      await expect.poll(() => onUpdateTablePreferences.mock.calls.length).toBeGreaterThanOrEqual(1)
      expect(onUpdateTablePreferences).toHaveBeenCalledWith(expect.objectContaining({ pageSize: newPageSize }))

      // change sort column
      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.poll(() => onUpdateTablePreferences).toHaveBeenCalledWith(expect.objectContaining({ sortColumnKey: sortableColumnKey, sortColumnOrder: 'asc' }))
    })

    it('applies new table preferences when prop is updated', async () => {
      // Use a local copy so the shared options.headers is not mutated
      const headers = structuredClone(options.headers)
      const sortableColumnKey = headers.find(header => header.sortable)?.key
      const pageSize = 30
      headers[1].hidable = true
      const hidableColumnKey = headers[1].key

      const screen = await render(KTableView, {
        props: {
          data: options.data,
          headers,
        },
      })

      // initial state
      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(DEFAULT_PAGE_SIZE.toString())
      for (const header of headers) {
        await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
      }
      await expect.element(page.getByCSS('thead th[aria-sort]')).not.toBeInTheDocument()

      // update table preferences prop
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (screen.rerender as (props: any) => Promise<void>)({
        tablePreferences: {
          pageSize: pageSize,
          sortColumnKey: sortableColumnKey,
          sortColumnOrder: 'asc',
          columnVisibility: {
            [hidableColumnKey]: false, // hide ID column
          },
        },
      })

      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(pageSize.toString())
      await expect.element(page.getByTestId(`table-header-${sortableColumnKey}`)).toHaveAttribute('aria-sort', 'ascending')
      for (const header of headers) {
        if (header.key === hidableColumnKey) {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).not.toBeInTheDocument()
        } else {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
        }
      }
    })
  })

  describe('expandable rows and nested tables', () => {
    it('displays expand trigger for each row when function passed via rowExpandable prop returns true', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: (row: any) => row.expandable,
        },
      })

      const expandableRowCount = options.data.filter(row => row.expandable).length
      await expect.poll(() => page.getByTestId('expandable-row-control').all().length).toBe(expandableRowCount)
      await expect.element(page.getByTestId('expandable-row-control').first()).toBeVisible()
      await expect.poll(() => page.getByTestId('expandable-content-row').all().length).toBe(expandableRowCount)
    })

    it('displays content provided through row-expanded slot', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
        slots: {
          'row-expanded': '<span data-testid="slotted-expandable-content">Expandable content</span>',
        },
      })

      await expect.poll(() => page.getByTestId('expandable-row-control').all().length).toBe(options.data.length)
      await expect.element(page.getByTestId('expandable-row-control').first()).toBeVisible()
      await expect.poll(() => page.getByTestId('expandable-content-row').all().length).toBe(options.data.length)

      for (let i = 0; i < options.data.length; i++) {
        await expect.element(page.getByTestId('expandable-content-row').nth(i).getByTestId('slotted-expandable-content')).not.toBeVisible()
      }

      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(0).getByTestId('slotted-expandable-content')).toBeVisible()

      await page.getByTestId('expandable-row-control').nth(1).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(1).getByTestId('slotted-expandable-content')).toBeVisible()

      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(0).getByTestId('slotted-expandable-content')).not.toBeVisible()
      await expect.element(page.getByTestId('expandable-content-row').nth(1).getByTestId('slotted-expandable-content')).toBeVisible()
    })

    it('renders a row expanded when rowExpanded prop returns true', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
          rowExpanded: (row: any) => row.expanded,
        },
        slots: {
          'row-expanded': '<span data-testid="slotted-expandable-content">Expandable content</span>',
        },
      })

      await expect.poll(() => page.getByTestId('expandable-row-control').all().length).toBe(options.data.length)
      await expect.element(page.getByTestId('expandable-row-control').first()).toBeVisible()
      await expect.poll(() => page.getByTestId('expandable-content-row').all().length).toBe(options.data.length)

      await expect.element(page.getByTestId('expandable-content-row').nth(0).getByTestId('slotted-expandable-content')).toBeVisible()
      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(0).getByTestId('slotted-expandable-content')).not.toBeVisible()
    })

    it('emits update:row-expanded event when row is expanded and collapsed', async () => {
      const onUpdateRowExpanded = vi.fn()

      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
        attrs: {
          'onUpdate:row-expanded': onUpdateRowExpanded,
        },
      })

      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.poll(() => onUpdateRowExpanded.mock.calls.length).toBe(1)

      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.poll(() => onUpdateRowExpanded.mock.calls.length).toBe(2)
    })

    it('does not display table header when hideHeaders prop is true', async () => {
      await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          hideHeaders: true,
        },
      })

      await expect.element(page.getByCSS('thead')).not.toBeInTheDocument()
    })

    it('disables column visibility, column resizing and bulk actions features and does not render toolbar slot when nested prop is true', async () => {
      await render(KTableView, {
        props: {
          headers: [...options.headers, { ...options.headers[1], hidable: true }, { label: 'Bulk actions', key: 'bulkActions' }],
          data: options.data,
          resizeColumns: true,
          nested: true,
          rowKey: 'id',
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
          'toolbar': '<span data-testid="slotted-toolbar-content">Toolbar content</span>',
        },
      })

      // column visibility
      await expect.element(page.getByTestId('column-visibility-menu-button')).not.toBeInTheDocument()

      // column resizing
      await expect.element(page.getByCSS('.table').getByCSS('th.resizable').first()).not.toBeInTheDocument()
      await expect.element(page.getByCSS('.resize-handle').first()).not.toBeInTheDocument()

      // bulk actions
      await expect.element(page.getByTestId('bulk-actions-dropdown')).not.toBeInTheDocument()
      await expect.element(page.getByTestId('table-header-bulk-actions-checkbox')).not.toBeInTheDocument()
      await expect.element(page.getByTestId('bulk-actions-checkbox').first()).not.toBeInTheDocument()

      // toolbar slot
      await expect.element(page.getByTestId('slotted-toolbar-content')).not.toBeInTheDocument()
    })

    it('collapses all expanded rows when table data changes', async () => {
      const screen = await render(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
      })

      await expect.element(page.getByTestId('expandable-content-row').nth(0)).not.toBeVisible()
      await expect.element(page.getByTestId('expandable-content-row').nth(1)).not.toBeVisible()

      await page.getByTestId('expandable-row-control').nth(0).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(0)).toBeVisible()

      await page.getByTestId('expandable-row-control').nth(1).click()
      await expect.element(page.getByTestId('expandable-content-row').nth(1)).toBeVisible()

      await screen.rerender({
        data: [...options.data].splice(0, options.data.length - 1),
      })

      await expect.element(page.getByTestId('expandable-content-row').nth(0)).not.toBeVisible()
      await expect.element(page.getByTestId('expandable-content-row').nth(1)).not.toBeVisible()
    })
  })
})
