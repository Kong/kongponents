import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import KTable from '@/components/KTable/KTable.vue'
import { offsetPaginationHeaders, offsetPaginationFetcher } from '../../../mocks/KTableMockData'
import type { TableHeader } from '@/types'

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
    { label: 'ID', key: 'id', sortable: false, hideLabel: false },
    { label: 'Enabled', key: 'enabled', sortable: false, hideLabel: false },
    { label: '', key: 'actions', sortable: false, hideLabel: true },
  ] as TableHeader[],
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

describe('KTable', () => {
  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      await render(KTable, {
        props: {
          fetcher: () => ({ data: [] }),
          headers: options.headers,
          cacheIdentifier: 'states-empty',
        },
      })

      await expect.element(page.getByCSS('.k-empty-state')).toBeVisible()
    })

    it('displays an empty state when no data is available (slot)', async () => {
      const emptySlotContent = 'Look mah! I am empty!'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      await render(KTable, {
        props: {
          fetcher,
          headers: options.headers,
          cacheIdentifier: 'states-empty-slot',
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      await expect.element(page.getByTestId('table-empty-state')).toHaveTextContent(emptySlotContent)
    })

    it('displays a loading skeletion when the "loading" prop is set to true', async () => {
      await render(KTable, {
        props: {
          loading: true,
        },
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeVisible()
    })

    it('displays an error state when the "error" prop is set to true', async () => {
      await render(KTable, {
        props: {
          error: true,
        },
      })

      await expect.element(page.getByCSS('.k-empty-state.error')).toBeVisible()
    })

    it('displays an error state (slot)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      await render(KTable, {
        props: {
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      await expect.element(page.getByTestId('table-error-state')).toHaveTextContent(errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', async () => {
      // Never resolves — this test only proves the pending/loading state, not resolution.
      // A resolving timer would fire well after the test ends, into later tests.
      const slowFetcher = () => new Promise<{ data: never[] }>(() => {})

      await render(KTable, {
        props: {
          fetcher: slowFetcher,
          headers: options.headers,
          cacheIdentifier: 'loading-test',
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeVisible()
      await expect.element(page.getByCSS('.k-empty-state')).not.toBeInTheDocument()
    })
  })

  describe('default', () => {
    it('renders link in action slot', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          disablePagination: true,
          cacheIdentifier: 'default-link-action-slot',
        },
        slots: {
          actions: () => h('a', { href: '#' }, 'Link'),
        },
      })

      await expect.element(page.getByCSS('.table tbody tr').first()).toBeVisible()
      await expect.element(page.getByCSS('.table td:last-of-type a').first()).toHaveTextContent('Link')
    })

    it('renders content in the toolbar slot', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          disablePagination: true,
          cacheIdentifier: 'default-toolbar-slot',
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      await expect.element(page.getByCSS('.k-table .table-toolbar button')).toBeVisible()
      await expect.element(page.getByCSS('.k-table .table-toolbar button')).toHaveTextContent('Toolbar button')
    })

    it('has hover class when passed', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          rowHover: true,
          cacheIdentifier: 'default-hover-class',
        },
      })

      await expect.element(page.getByCSS('.table')).toHaveClass('has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          resizeColumns: true,
          cacheIdentifier: 'default-resize-columns',
        },
      })

      await expect.poll(() => page.getByCSS('.table th.resizable').all().length).toBeGreaterThan(0)
      await expect.poll(() => page.getByCSS('.resize-handle').all().length).toBeGreaterThan(0)
    })

    it('renders column show/hide when headers.hidable is set', async () => {
      // make ID column hidable — use a local clone to avoid mutating the shared options.headers
      const localHeaders = structuredClone(options.headers)
      localHeaders[1].hidable = true
      const modifiedHeaderKey = localHeaders[1].key

      await render(KTable, {
        props: {
          headers: localHeaders,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'default-column-visibility',
        },
      })

      await expect.element(page.getByCSS('.table')).toBeVisible()
      // menu button is visible
      await expect.element(page.getByTestId('column-visibility-menu-button')).toBeVisible()
      await page.getByTestId('column-visibility-menu-button').click()

      // only columns with hidable set to true should be visible and checked by default
      await expect.element(page.getByTestId(`column-visibility-menu-item-${modifiedHeaderKey}`)).toBeVisible()
      await expect.element(page.getByTestId(`column-visibility-menu-item-${localHeaders[0].key}`)).not.toBeInTheDocument()
      await expect.element(page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`)).toBeVisible()
      await expect.element(page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`)).toBeChecked()

      // changes are applied only when Apply button is clicked
      await page.getByTestId(`column-visibility-checkbox-${modifiedHeaderKey}`).click()
      await expect.element(page.getByTestId(`table-header-${modifiedHeaderKey}`)).toBeVisible()
      await page.getByTestId('apply-button').click()
      await expect.element(page.getByTestId(`table-header-${modifiedHeaderKey}`)).not.toBeInTheDocument()
    })

    it('renders tooltip when provided in headers', async () => {
      // use a local clone to avoid mutating the shared options.headers
      const localHeaders = structuredClone(options.headers)
      localHeaders[0].tooltip = 'This is a tooltip'

      await render(KTable, {
        props: {
          headers: localHeaders,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'default-tooltip',
        },
      })

      await expect.element(page.getByTestId(`tooltip-${localHeaders[0].key}`)).toBeVisible()
    })
  })

  describe('data revalidates and changes as expected', () => {
    it('when clicking a specific page number for non-offset pagination', async () => {
      await render(KTable, {
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
          paginationPageSizes: [1, 2],
          hidePaginationWhenOptional: false,
          cacheIdentifier: 'revalidates-page-number',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="1"]').first().click()
      await page.getByTestId('next-button').click()
      await expect.element(page.getByCSS('.pagination-button[aria-current="page"]')).toHaveTextContent('2')
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(4)
    })

    it('when clicking arrows for offset based pagination', async () => {
      await render(KTable, {
        props: {
          fetcher: offsetPaginationFetcher,
          loading: false,
          headers: offsetPaginationHeaders,
          cacheIdentifier: 'revalidates-offset-arrows',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="15"]').first().click()
      await expect.element(page.getByTestId('next-button')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(16)
    })

    it('when page size is changed', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return {
              data: largeDataSet,
            }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [1, 2, 3, 4],
          hidePaginationWhenOptional: false,
          cacheIdentifier: 'revalidates-page-size',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('page-size-dropdown-trigger').click()
      await page.getByCSS('[data-testid="dropdown-item-trigger"][value="3"]').first().click()
      await page.getByTestId('next-button').click()
      await expect.element(page.getByCSS('.pagination-button[aria-current="page"]')).toHaveTextContent('2')
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
      await render(KTable, {
        props: {
          fetcher: sortHandlerFnFetcher,
          loading: false,
          headers: sortHandlerFnHeaders,
          cacheIdentifier: 'revalidates-sort',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await page.getByTestId('table-pagination').getByCSS('.kui-icon.chevron-down-icon').click()
      await expect.poll(() => page.getByCSS('.table tr').all().length).toBe(6)
      await page.getByCSS('.table .sort-icon').last().click()
      await expect.element(page.getByCSS('.table td:nth-child(4)').first()).toHaveTextContent('Just now')
    })

    it('reacts to changes in headers', async () => {
      const screen = await render(KTable, {
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
          cacheIdentifier: 'revalidates-headers',
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
      await expect.element(page.getByCSS('.table tbody td:nth-child(2)').first()).toHaveTextContent('517526354743085')
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          cacheIdentifier: 'sorting-sortable-class',
        },
      })

      await expect.element(page.getByCSS('th').first()).toHaveClass('sortable')
    })

    it('should allow disabling sorting', async () => {
      await render(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          sortable: false,
          cacheIdentifier: 'sorting-disable',
        },
      })

      await expect.poll(() =>
        page.getByCSS('th').all().every(th => !th.element().classList.contains('sortable')),
      ).toBe(true)
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher provided', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
          cacheIdentifier: 'pagination-shows',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('does not display pagination when pagination disabled', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
          cacheIdentifier: 'pagination-disabled',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when no fetcher', async () => {
      await render(KTable, {
        props: {
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than min pageSize', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: options.data, total: options.data.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-hide-total-less',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to min pageSize', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [12, 15, 20],
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-hide-total-equal',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does display pagination when total is greater than min pageSize', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-show-total-greater',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('does not display offset-based pagination when hidePaginationWhenOptional is true and total is less than min pageSize', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: options.data, offset: null }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          initialFetcherParams: { offset: null },
          cacheIdentifier: 'offset-pagination',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).not.toBeInTheDocument()
    })

    it('does display offset-based pagination when total is greater than min pageSize', async () => {
      await render(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, offset: 'abc' }
          },
          loading: false,
          initialFetcherParams: { offset: 'abc' },
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-show-offset-greater',
        },
      })

      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
    })

    it('refetch with paginationOffset: true', async () => {
      const data: Array<{ name: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ name: 'row' + i })
      }
      const fns = {
        fetcher: (params: FetchParams) => {
          const { pageSize, page, offset } = params
          const start = offset ? Number(offset) : 0
          return {
            data: data.slice(start, start + pageSize),
            pagination: {
              offset: `${start + pageSize}`,
              page,
            },
          }
        },
      }
      const fetcher = vi.spyOn(fns, 'fetcher')

      const screen = await render(KTable, {
        props: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10],
          paginationOffset: true,
          hidePaginationWhenOptional: true,
          fetcherCacheKey: '0',
          cacheIdentifier: 'refetch-offset-true',
        },
      })

      // page 1
      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(10)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row0')
      await expect.poll(() => fetcher.mock.calls.length).toBe(1) // ensure fetcher is NOT called twice on load
      expect(fetcher).toHaveBeenCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      await screen.rerender({ fetcherCacheKey: '1' }) // manually trigger refetch
      await expect.poll(() => fetcher.mock.calls.length).toBe(2)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(2)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row10')
      await expect.poll(() => fetcher.mock.calls.length).toBe(3)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])

      await screen.rerender({ fetcherCacheKey: '2' }) // manually trigger refetch
      await expect.poll(() => fetcher.mock.calls.length).toBe(4)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])
    })

    it('refetch with paginationOffset: false', async () => {
      const data: Array<{ name: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ name: 'row' + i })
      }
      const fns = {
        fetcher: (params: FetchParams) => {
          const { pageSize, page } = params
          return {
            data: data.slice((page - 1) * pageSize, page * pageSize),
            total: data.length,
          }
        },
      }
      const fetcher = vi.spyOn(fns, 'fetcher')

      const screen = await render(KTable, {
        props: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10],
          paginationOffset: false,
          hidePaginationWhenOptional: true,
          fetcherCacheKey: '0',
          cacheIdentifier: 'refetch-offset-false',
        },
      })

      // page 1
      await expect.element(page.getByTestId('table-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(10)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row0')
      await expect.poll(() => fetcher.mock.calls.length).toBe(1) // ensure fetcher is NOT called twice on load
      expect(fetcher).toHaveBeenCalledWith({ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      await screen.rerender({ fetcherCacheKey: '1' }) // manually trigger refetch
      await expect.poll(() => fetcher.mock.calls.length).toBe(2)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.table tbody tr').all().length).toBe(2)
      await expect.element(page.getByCSS('.table tbody')).toHaveTextContent('row10')
      await expect.poll(() => fetcher.mock.calls.length).toBe(3)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])

      await screen.rerender({ fetcherCacheKey: '2' }) // manually trigger refetch
      await expect.poll(() => fetcher.mock.calls.length).toBe(4)
      expect(fetcher.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' }])
    })
  })

  describe('misc', () => {
    it('triggers the internal search and revalidate after clearing the search input', async () => {
      const fns = {
        fetcher: ({ query }: { query: string }) => {
          return { data: [{ query }] }
        },
      }

      const fetcher = vi.spyOn(fns, 'fetcher')

      const screen = await render(KTable, {
        props: {
          fetcher: fns.fetcher,
          loading: false,
          initialFetcherParams: { offset: 'abc' },
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          searchInput: '',
          cacheIdentifier: 'search-example',
        },
      })

      await expect.poll(() => fetcher.mock.calls.length).toBe(1) // fetcher's 1st call
      expect(fetcher).toHaveReturnedWith({ data: [{ query: '' }] })

      await screen.rerender({ searchInput: 'some-keyword' })

      // fetcher call should be delayed (> 350ms for search func + 500ms for revalidate func)
      await expect.poll(() => fetcher.mock.calls.length, { timeout: 1000 }).toBe(2) // fetcher's 2nd call
      expect(fetcher).toHaveReturnedWith({ data: [{ query: 'some-keyword' }] })

      await screen.rerender({ searchInput: '' })

      // fetcher should be called immediately (< 350ms for search func)
      await expect.poll(() => fetcher.mock.calls.length).toBe(3) // fetcher's 3rd call
      expect(fetcher).toHaveReturnedWith({ data: [{ query: '' }] })
    })
  })
})
