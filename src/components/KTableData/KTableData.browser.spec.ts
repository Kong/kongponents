import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { h, ref, defineComponent } from 'vue'
import { render } from 'vitest-browser-vue'
import KTableData from '@/components/KTableData/KTableData.vue'
import { offsetPaginationHeaders, offsetPaginationFetcher } from '../../../mocks/KTableMockData'
import type { TableDataHeader, SortHandlerFunctionParam } from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/utilities/tableHelpers'

interface FetchParams {
  pageSize: number
  page: number
  query?: string
  sortColumnKey?: string
  sortColumnOrder?: 'asc' | 'desc'
  offset?: string | null
}

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
    { label: 'Name', key: 'name', sortable: true, hideLabel: false },
    { label: 'ID', key: 'id', sortable: true, hideLabel: false },
    { label: 'Enabled', key: 'enabled', sortable: false, hideLabel: false },
    { label: '', key: 'link', sortable: false, hideLabel: true },
  ] as TableDataHeader[],
  data: [
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
  ],
}

const DEFAULT_FETCHER_PARAMS = {
  pageSize: 15,
  page: 1,
  offset: null,
  query: '',
  sortColumnKey: '',
  sortColumnOrder: 'desc',
}

describe('KTableData', () => {
  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => ({ data: [] }),
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: 4,
          },
          cacheIdentifier: 'empty-state-no-data',
        },
      })

      await expect.element(page.getByCSS('.k-empty-state')).toBeVisible()
    })

    it('displays an empty state when no data is available (slot)', async () => {
      const emptySlotContent = 'Look mah! I am empty!'

      const fetcher = (() => new Promise(resolve => resolve({ data: [] }))) as any
      await render(KTableData, {
        props: {
          fetcher,
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: 4,
          },
          cacheIdentifier: 'empty-state-slot',
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      await expect.element(page.getByTestId('table-empty-state')).toHaveTextContent(emptySlotContent)
    })

    it('displays a loading skeleton when the loading prop is set to true', async () => {
      await render(KTableData, {
        props: { loading: true } as any,
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeVisible()
    })

    it('displays an error state when the error prop is set to true', async () => {
      await render(KTableData, {
        props: { error: true } as any,
      })

      await expect.element(page.getByCSS('.k-empty-state.error')).toBeVisible()
    })

    it('displays an error state (slot)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      await render(KTableData, {

        props: { error: true } as any,
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      await expect.element(page.getByTestId('table-error-state')).toHaveTextContent(errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', async () => {
      const slowFetcher = (() => new Promise(() => {})) as any // never resolves — test only proves pending state

      await render(KTableData, {
        props: {
          fetcher: slowFetcher,
          headers: options.headers,
          cacheIdentifier: 'loading-test',
          paginationAttributes: {
            pageSizes: [10, 20, 30, 40],
          },
        },
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeVisible()
      await expect.element(page.getByCSS('.k-empty-state')).not.toBeInTheDocument()
    })
  })

  describe('default', () => {
    it('renders content in a cell slot', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          hidePagination: true,
          cacheIdentifier: 'renders-content-in-a-cell-slot',
        },
        slots: {
          link: () => h('a', { href: '#' }, 'Link'),
        },
      })

      // wait for data rows to appear before asserting on slot content; link slot appears in every row so use first()
      await expect.element(page.getByCSS('.table tbody tr').first()).toBeInTheDocument()
      await expect.element(page.getByCSS('.table td:last-of-type a').first()).toHaveTextContent('Link')
    })

    it('renders content in the toolbar slot', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          hidePagination: true,
          cacheIdentifier: 'toolbar-slot',
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      await expect.element(page.getByCSS('.k-table-data .table-toolbar button')).toBeVisible()
      await expect.element(page.getByCSS('.k-table-data .table-toolbar button')).toHaveTextContent('Toolbar button')
    })

    it('forwards a toolbar slot that is added after mount', async () => {
      const ready = ref(false)

      await render(defineComponent({
        setup: () => () => h(
          KTableData,
          {
            cacheIdentifier: 'dynamic-toolbar-table-data',
            fetcher: () => ({ data: options.data }),
            headers: options.headers.map(header => ({ ...header, hidable: false })),
            hidePagination: true,
          },
          ready.value
            ? { toolbar: () => h('div', { 'data-testid': 'toolbar-content' }, 'Toolbar') }
            : {},
        ),
      }))

      await expect.element(page.getByTestId('table-toolbar')).not.toBeInTheDocument()
      ready.value = true
      await expect.element(page.getByTestId('table-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('toolbar-content')).toBeInTheDocument()
    })

    it('has hover class when passed', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          rowHover: true,
          cacheIdentifier: 'has-hover-class',
        },
      })

      await expect.element(page.getByCSS('.table')).toHaveClass('has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          resizeColumns: true,
          cacheIdentifier: 'resize-columns',
        },
      })

      await expect.element(page.getByCSS('.table th.resizable').first()).toBeVisible()
      await expect.element(page.getByCSS('.resize-handle').first()).toBeInTheDocument()
    })

    it('renders column show/hide when headers.hidable is set', async () => {
      // make ID column hidable — clone to avoid mutating shared options.headers
      const headers = options.headers.map((h, i) => i === 1 ? { ...h, hidable: true } : h)
      const modifiedHeaderKey = headers[1].key

      await render(KTableData, {
        props: {
          headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'column-visibility',
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
      // clone to avoid mutating shared options.headers
      const headers = options.headers.map((h, i) => i === 0 ? { ...h, tooltip: 'This is a tooltip' } : h)

      await render(KTableData, {
        props: {
          headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'header-tooltip',
        },
      })

      await expect.element(page.getByTestId(`tooltip-${headers[0].key}`)).toBeVisible()
    })
  })

  describe('data revalidates and changes as expected', () => {
    it('when clicking a specific page number for non-offset pagination', async () => {
      await render(KTableData, {
        props: {
          initialFetcherParams: {
            page: 1,
            pageSize: 1,
          },
          fetcher: () => {
            return {
              data: options.data,
              total: options.data.length,
            }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [1, 2],
          },
          cacheIdentifier: 'page-number-pagination',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="1"]').click()
      await page.getByTestId('next-button').click()
      await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent('2')
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(4)
    })

    it('when clicking arrows for offset based pagination', async () => {
      await render(KTableData, {
        props: {

          fetcher: offsetPaginationFetcher as any,
          loading: false,
          headers: offsetPaginationHeaders,
          cacheIdentifier: 'offset-based-pagination-arrows',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="15"]').first().click()
      await expect.element(page.getByTestId('next-button')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(16)
    })

    it('when page size is changed', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return {
              data: largeDataSet,
            }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [1, 2, 3, 4],
          },
          cacheIdentifier: 'page-size-changed',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="3"]').first().click()
      await page.getByTestId('next-button').click()
      await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent('2')
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(13)
    })

    it('when sort key or sort direction is changed and NOT using clientSideSort', async () => {
      const sortHandlerFnHeaders = [
        { label: 'Host', key: 'hostname', sortable: true },
        { label: 'Version', key: 'version', sortable: true },
        { label: 'Connected', key: 'connected', sortable: true },
        { label: 'Last Seen', key: 'last_seen', sortable: true, useSortHandlerFunction: true },
      ]
      const sortHandlerFnFetcher = () => {
        return {
          data: [
            {
              id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
              version: '2.8.2.0-enterprise-edition',
              hostname: '59e591ae3776',
              last_ping: 1649855072,
              connected: 'Connected',
              last_seen: 'Just now',
            },
            {
              id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
              version: '2.7.0.0-enterprise-edition',
              hostname: '19e591ae3776',
              last_ping: 1649362660,
              connected: 'Connected',
              last_seen: '3 hours ago',
            },
            {
              id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
              version: '2.8.1.0-enterprise-edition',
              hostname: '79e591ae3776',
              last_ping: 1649355460,
              connected: 'Connected',
              last_seen: '5 hours ago',
            },
            {
              id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
              version: '2.8.0.0-enterprise-edition',
              hostname: '99e591ae3776',
              last_ping: 1648855072,
              connected: 'Disconnected',
              last_seen: '6 days ago',
            },
            {
              id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
              version: '2.6.0.0-enterprise-edition',
              hostname: '89e591ae3776',
              last_ping: 1648155072,
              connected: 'Disconnected',
              last_seen: '14 days ago',
            },
          ],
        }
      }

      await render(KTableData, {
        props: {
          fetcher: sortHandlerFnFetcher,
          loading: false,
          headers: sortHandlerFnHeaders,
          cacheIdentifier: 'sort-direction-changed',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(6)
      await page.getByCSS('.table .sort-icon').last().click()
      await expect.element(page.getByCSS('.table td:nth-child(4)').first()).toHaveTextContent(new RegExp('^Just now$'))
    })

    it('reacts to changes in headers', async () => {
      const screen = await render(KTableData, {
        props: {
          fetcher: () => {
            return {
              data: largeDataSet,
            }
          },
          loading: false,
          headers: [
            { label: 'Name', key: 'name' },
          ],
          cacheIdentifier: 'reacts-to-changes-in-headers',
        },
      })

      await expect.poll(() => page.getByCSS('.table th').all().length).toBe(1)
      await expect.element(page.getByTestId('table-header-name')).toBeVisible()

      await screen.rerender({
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
        ],
      })

      await expect.poll(() => page.getByCSS('.table th').all().length).toBe(2)
      await expect.element(page.getByTestId('table-header-id')).toBeVisible()
      await expect.element(page.getByCSS('.table td').nth(1)).toHaveTextContent('517526354743085')
    })
  })

  describe('sorting', () => {
    it('should render sortable columns correctly', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'sortable-columns',
        },
      })

      await expect.poll(() => page.getByCSS('th').all().length).toBe(options.headers.length)
      const ths = page.getByCSS('th').all()
      for (let index = 0; index < options.headers.length; index++) {
        if (options.headers[index].sortable) {
          await expect.element(ths[index]).toHaveClass('sortable')
          await expect.element(ths[index].getByCSS('.sort-icon')).toBeInTheDocument()
        } else {
          await expect.element(ths[index]).not.toHaveClass('sortable')
          await expect.element(ths[index].getByCSS('.sort-icon')).not.toBeInTheDocument()
        }
        await expect.element(ths[index].getByCSS('.active-sort-icon')).not.toBeInTheDocument()
      }
    })

    it('should allow disabling sorting', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          sortable: false,
          cacheIdentifier: 'disable-sorting',
        },
      })

      await expect.poll(() => page.getByCSS('th').all().length).toBe(options.headers.length)
      const ths = page.getByCSS('th').all()
      for (const th of ths) {
        await expect.element(th).not.toHaveClass('sortable')
      }
    })

    it('should support client-side sorting', async () => {
      const fetcher = vi.fn(() => ({ data: options.data }))

      await render(KTableData, {
        props: {
          headers: options.headers,
          clientSort: true,
          fetcher,
          cacheIdentifier: 'should-support-client-side-sorting',
        },
      })

      await expect.poll(() => fetcher.mock.calls.length).toBe(1)

      await page.getByCSS('th').nth(0).click()
      await expect.element(page.getByCSS('td').nth(0)).toHaveTextContent('Android App')

      // ensure fetcher is NOT called again on client-side sort
      expect(fetcher).toHaveBeenCalledTimes(1)
    })

    it('should respect initial sort order from initial fetcher params', async () => {
      await render(KTableData, {
        props: {
          headers: options.headers,
          clientSort: true,
          fetcher: () => {
            return { data: options.data }
          },
          initialFetcherParams: {
            sortColumnKey: 'name',
            sortColumnOrder: 'desc',
          },
          cacheIdentifier: 'initial-sort-order',
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

      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          onSort,
          cacheIdentifier: 'sort-resets-after-three',
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

      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'sort-column-switch',
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
    it('displays pagination when fetcher provided', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [10, 20, 30, 40],
          },
          cacheIdentifier: 'pagination-with-fetcher',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('does not display pagination when pagination hidden', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [10, 20, 30, 40],
          },
          hidePagination: true,
          cacheIdentifier: 'pagination-hidden',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when no fetcher', async () => {
      await render(KTableData, {
        props: { paginationAttributes: { pageSizes: [10, 20, 30, 40] } } as any,
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than page size', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: options.data, total: options.data.length }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: options.data.length + 1,
            pageSizes: [10, 15, 20],
          },
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'hide-optional-pagination-less',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to page size', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: largeDataSet.length,
            pageSizes: [12, 15, 20],
          },
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'hide-optional-pagination-equal',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does display pagination when total is greater than page size', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length + 1 }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: largeDataSet.length - 1,
            pageSizes: [10, 15, 20],
          },
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'show-pagination-greater',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('does not display offset-based pagination when hidePaginationWhenOptional is true and total is less than page size', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: options.data, offset: null }
          },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: 15,
            pageSizes: [10, 15, 20],
          },
          hidePaginationWhenOptional: true,
          initialFetcherParams: { offset: null },
          cacheIdentifier: 'offset-pagination',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does display offset-based pagination when total is greater than page size', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, offset: 'abc' }
          },
          loading: false,
          initialFetcherParams: { offset: 'abc' },
          headers: options.headers,
          paginationAttributes: {
            initialPageSize: largeDataSet.length - 1,
            pageSizes: [10, 15, 20],
            totalCount: largeDataSet.length + 1,
          },
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'show-offset-pagination-greater',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('refetch with pagination offset: true', async () => {
      const data: Array<{ name: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ name: 'row' + i })
      }
      const fetcher = vi.fn((params: FetchParams) => {
        const { pageSize, page, offset } = params
        const start = offset ? Number(offset) : 0
        return {
          data: data.slice(start, start + pageSize),
          pagination: {
            offset: `${start + pageSize}`,
            page,
          },
        }
      })

      const screen = await render(KTableData, {
        props: {

          fetcher: fetcher as any,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [10],
            offset: true,
          },
          fetcherCacheKey: '0',
          cacheIdentifier: 'refetch-pagination-offset-true',
        },
      })

      // page 1
      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(10)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row0')
      // ensure fetcher is NOT called twice on load
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // manually trigger refetch
      await screen.rerender({ fetcherCacheKey: '1' })
      await expect.poll(() => fetcher.mock.calls.length).toBe(2)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(2)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row10')
      await expect.poll(() => fetcher.mock.calls.length).toBe(3)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // manually trigger refetch on page 2
      await screen.rerender({ fetcherCacheKey: '2' })
      await expect.poll(() => fetcher.mock.calls.length).toBe(4)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
    })

    it('refetch with pagination offset: false', async () => {
      const data: Array<{ name: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ name: 'row' + i })
      }
      const fetcher = vi.fn((params: FetchParams) => {
        const { pageSize, page } = params
        return {
          data: data.slice((page - 1) * pageSize, page * pageSize),
          total: data.length,
        }
      })

      const screen = await render(KTableData, {
        props: {

          fetcher: fetcher as any,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [10],
          },
          hidePaginationWhenOptional: true,
          fetcherCacheKey: '0',
          cacheIdentifier: 'refetch-pagination-offset-false',
        },
      })

      // page 1
      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(10)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row0')
      // ensure fetcher is NOT called twice on load
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // manually trigger refetch
      await screen.rerender({ fetcherCacheKey: '1' })
      await expect.poll(() => fetcher.mock.calls.length).toBe(2)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(2)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row10')
      await expect.poll(() => fetcher.mock.calls.length).toBe(3)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // manually trigger refetch on page 2
      await screen.rerender({ fetcherCacheKey: '2' })
      await expect.poll(() => fetcher.mock.calls.length).toBe(4)
      expect(fetcher).toHaveBeenLastCalledWith({ pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
    })
  })

  describe('table preferences', () => {
    it('does not apply column width and visibility preferences when not set', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: options.data }
          },
          headers: options.headers,
          cacheIdentifier: 'no-preferences-set',
        },
      })

      for (const header of options.headers) {
        await expect.element(page.getByTestId(`table-header-${header.key}`)).not.toHaveAttribute('style')
        await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
      }
    })

    it('applies column width and visibility preferences when set', async () => {
      await render(KTableData, {
        props: {
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'column-preferences-set',
          headers: options.headers.map(header => {
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

      for (const header of options.headers) {
        if (options.headers[1].key === header.key) {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).not.toBeInTheDocument()
        } else {
          await expect.element(page.getByTestId(`table-header-${header.key}`)).toHaveStyle({ width: '100px' })
          await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
        }
      }
    })

    it('correctly handles when page size, sort column key and order preferences are not passed', async () => {
      const fetcher = vi.fn(() => ({ data: options.data }))

      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher,
          cacheIdentifier: 'correctly-handles-no-preferences',
        },
      })

      // calls fetcher with default page size, sort column key and order
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher).toHaveBeenLastCalledWith({
        pageSize: DEFAULT_PAGE_SIZE,
        page: 1,
        offset: null,
        query: '',
        sortColumnKey: '',
        sortColumnOrder: 'desc',
      })
    })

    it('applies page size, sort column key and order preferences when passed', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const pageSize = 30

      const fetcher = vi.fn(() => ({ data: options.data }))

      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher,
          cacheIdentifier: 'applies-preferences-when-passed',
          tablePreferences: {
            pageSize: pageSize,
            sortColumnKey: sortableColumnKey,
            sortColumnOrder: 'asc',
          },
        },
      })

      // calls fetcher with provided page size, sort column key and order
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher).toHaveBeenLastCalledWith({
        pageSize: pageSize,
        page: 1,
        offset: null,
        query: '',
        sortColumnKey: sortableColumnKey,
        sortColumnOrder: 'asc',
      })
    })

    it('emits update:table-preferences event when table preferences are updated', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const newPageSize = 30
      const onUpdateTablePreferences = vi.fn()

      await render(KTableData, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'update-table-preferences',
          'onUpdate:table-preferences': onUpdateTablePreferences,
        },
      })

      // change page size
      await page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger').click()
      await page.getByTestId('dropdown-list').getByText(newPageSize.toString()).click()
      await expect.poll(() => onUpdateTablePreferences.mock.calls.length).toBe(1)
      expect(onUpdateTablePreferences).toHaveBeenCalledWith(expect.objectContaining({ pageSize: newPageSize }))

      // change sort column
      await page.getByTestId(`table-header-${sortableColumnKey}`).click()
      await expect.poll(() => onUpdateTablePreferences.mock.calls.length).toBe(2)
      expect(onUpdateTablePreferences).toHaveBeenCalledWith(expect.objectContaining({ sortColumnKey: sortableColumnKey, sortColumnOrder: 'asc' }))
    })

    it('clientSort = true: applies new table preferences when prop is updated', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const pageSize = 30
      // clone to avoid mutating shared options.headers
      const headers = options.headers.map((h, i) => i === 1 ? { ...h, hidable: true } : h)
      const hidableColumnKey = headers[1].key

      const fetcher = vi.fn(() => ({ data: options.data }))

      const screen = await render(KTableData, {
        props: {
          headers,
          fetcher,
          cacheIdentifier: 'clientsort-applies-new-preferences-1',
        },
      })

      // initial state
      // calls fetcher with default page size, sort column key and order
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher).toHaveBeenLastCalledWith(DEFAULT_FETCHER_PARAMS)

      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(DEFAULT_PAGE_SIZE.toString())
      for (const header of headers) {
        await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
      }
      await expect.element(page.getByCSS('thead th[aria-sort]')).not.toBeInTheDocument()

      // update table preferences prop
      await (screen.rerender as (props: Record<string, any>) => Promise<void>)({
        tablePreferences: {
          pageSize: pageSize,
          sortColumnKey: sortableColumnKey,
          sortColumnOrder: 'asc',
          columnVisibility: {
            [hidableColumnKey]: false, // hide ID column
          },
        },
      })

      // updated state
      // calls fetcher with new page size, sort column key and order
      await expect.poll(() => fetcher.mock.calls.length).toBe(2)
      expect(fetcher).toHaveBeenLastCalledWith({
        ...DEFAULT_FETCHER_PARAMS,
        pageSize: pageSize,
        sortColumnKey: sortableColumnKey,
        sortColumnOrder: 'asc',
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

    it('clientSort = true: applies new table preferences when prop is updated', async () => {
      const sortableColumnKey = options.headers.find(header => header.sortable)?.key
      const pageSize = 30
      // clone to avoid mutating shared options.headers
      const headers = options.headers.map((h, i) => {
        if (i === 1) return { ...h, hidable: true }
        if (h.key === sortableColumnKey) return { ...h, useSortHandlerFunction: true }
        return h
      })
      const hidableColumnKey = headers[1].key

      const sortHandlerFunction = vi.fn(({ data }: SortHandlerFunctionParam) => data)

      const screen = await render(KTableData, {
        props: {
          headers,
          fetcher: () => {
            return { data: options.data }
          },
          clientSort: true,
          sortHandlerFunction,
          cacheIdentifier: 'clientsort-applies-new-preferences-2',
        },
      })

      // initial state
      // does not call sortHandlerFunction on load
      expect(sortHandlerFunction).not.toHaveBeenCalled()

      await expect.element(page.getByTestId('table-pagination').getByTestId('page-size-dropdown-trigger')).toHaveTextContent(DEFAULT_PAGE_SIZE.toString())
      for (const header of headers) {
        await expect.element(page.getByTestId(`table-header-${header.key}`)).toBeVisible()
      }
      await expect.element(page.getByCSS('thead th[aria-sort]')).not.toBeInTheDocument()

      // update table preferences prop
      await (screen.rerender as (props: Record<string, any>) => Promise<void>)({
        tablePreferences: {
          pageSize: pageSize,
          sortColumnKey: sortableColumnKey,
          sortColumnOrder: 'asc',
          columnVisibility: {
            [hidableColumnKey]: false, // hide ID column
          },
        },
      })

      // updated state
      // calls sortHandlerFunction with new sort column key and order
      await expect.poll(() => sortHandlerFunction.mock.calls.length).toBe(1)
      expect(sortHandlerFunction).toHaveBeenLastCalledWith({
        key: sortableColumnKey,
        prevKey: '',
        sortColumnOrder: 'asc',
        data: options.data,
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

  describe('misc', () => {
    it('triggers the internal search and revalidate after clearing the search input', async () => {
      const fetcher = vi.fn(({ query = '' }: { query?: string }) => {
        return { data: [{ query }] }
      })

      const screen = await render(KTableData, {
        props: {
          fetcher,
          loading: false,
          initialFetcherParams: { offset: 'abc' },
          headers: options.headers,
          paginationAttributes: {
            pageSizes: [10, 15, 20],
          },
          hidePaginationWhenOptional: true,
          searchInput: '',
          cacheIdentifier: 'search-example',
        },
      })

      // fetcher's 1st call
      await expect.poll(() => fetcher.mock.calls.length).toBe(1)
      expect(fetcher.mock.results[0].value).toEqual({ data: [{ query: '' }] })

      await screen.rerender({ searchInput: 'some-keyword' })

      // fetcher call should be delayed (> 350ms for search func + 500ms for revalidate func)
      await expect.poll(() => fetcher.mock.calls.length, { timeout: 1000 }).toBe(2)
      expect(fetcher.mock.results[1].value).toEqual({ data: [{ query: 'some-keyword' }] })

      await screen.rerender({ searchInput: '' })

      // fetcher should be called immediately (< 350ms for search func)
      await expect.poll(() => fetcher.mock.calls.length).toBe(3)
      expect(fetcher.mock.results[2].value).toEqual({ data: [{ query: '' }] })
    })
  })
})
