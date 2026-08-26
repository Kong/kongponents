import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KCatalog from '@/components/KCatalog/KCatalog.vue'

const largeDataSet = [
  {
    title: 'Item 1',
    description: "The item's description for number",
  },
  {
    title: 'Item 2',
    description: "The item's description for number 2",
  },
  {
    title: 'Item 3',
    description: "The item's description for number 3",
  },
  {
    title: 'Item 4',
    description: "The item's description for number 4",
  },
  {
    title: 'Item 5',
    description: "The item's description for number 5",
  },
  {
    title: 'Item 6',
    description: "The item's description for number 6",
  },
  {
    title: 'Item 7',
    description: "The item's description for number 7",
  },
  {
    title: 'Item 8',
    description: "The item's description for number 8",
  },
  {
    title: 'Item 9',
    description: "The item's description for number 9",
  },
  {
    title: 'Item 10',
    description: "The item's description for number 10",
  },
]

interface FetchParams {
  pageSize: number
  page: number
  query?: string
  offset?: string | null
}

describe('KCatalog', () => {
  function getItems(count: number) {
    const myItems = []

    for (let i = 0; i < count; i++) {
      myItems.push({
        title: 'Item ' + i,
        description: "The item's description for number " + i,
      })
    }

    return myItems
  }

  const longItem = {
    title: 'A very long item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat.',
  }

  describe('general', () => {
    it('renders proper cards when using props', async () => {
      const title = 'Cool beans!'
      const total = 5

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'renders-proper-cards',
          title,
          fetcher: () => {
            return { data: getItems(total), total }
          },
        },
      })

      await expect.element(page.getByTestId('catalog-title')).toHaveTextContent(title)
      await expect.element(page.getByCSS('.catalog-page')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.k-catalog-item').all().length).toBe(total)
    })

    it('renders slots when passed', async () => {
      const slotContent = 'Look mah! No props'

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'renders-slots-when-passed',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          body: h('span', {}, slotContent),
        },
      })

      await expect.element(page.getByCSS('.catalog-page')).toHaveTextContent(slotContent)
    })

    it('renders slotted cards when passed', async () => {
      const slotHeader = 'Look mah!'
      const slotBody = 'My body'

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'renders-slotted-cards',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          'card-title': h('span', {}, slotHeader),
          'card-body': h('span', {}, slotBody),
        },
      })

      await expect.element(page.getByCSS('.card-title')).toHaveTextContent(slotHeader)
      await expect.element(page.getByCSS('.card-content')).toHaveTextContent(slotBody)
    })

    it('renders slots when passed (with empty)', async () => {
      const emptySlotContent = 'Look mah! I am empty!'

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'general-props0',
          loading: false,
          fetcher: () => {
            return { data: [], total: 0 }
          },
        },
        slots: {
          'empty-state': h('span', {}, emptySlotContent),
        },
      })

      await expect.element(page.getByTestId('catalog-empty-state')).toHaveTextContent(emptySlotContent)
    })

    it('renders slots when passed (with error)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous!'

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'renders-slots-with-error',
          error: true,
          fetcher: () => {
            return { data: [], total: 0 }
          },
        },
        slots: {
          'error-state': h('span', {}, errorSlotContent),
        },
      })

      await expect.element(page.getByTestId('catalog-error-state')).toHaveTextContent(errorSlotContent)
    })

    it('renders content in the toolbar slot', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'renders-toolbar-slot',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
          disablePagination: true,
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      await expect.element(page.getByCSS('.k-catalog .catalog-toolbar').getByCSS('button')).toBeVisible()
      await expect.element(page.getByCSS('.k-catalog .catalog-toolbar button')).toHaveTextContent('Toolbar button')
    })

    it('renders a toolbar slot that is added after mount', async () => {
      const ready = ref(false)

      await render(defineComponent({
        setup: () => () => h(
          KCatalog,
          {
            cacheIdentifier: 'dynamic-toolbar-catalog',
            disablePagination: true,
            fetcher: () => ({ data: getItems(1), total: 1 }),
          },
          ready.value ? { toolbar: () => h('div', { 'data-testid': 'toolbar-content' }, 'Toolbar') } : {},
        ),
      }))

      await expect.element(page.getByTestId('catalog-toolbar')).not.toBeInTheDocument()
      ready.value = true
      await expect.element(page.getByTestId('catalog-toolbar')).toBeInTheDocument()
      await expect.element(page.getByTestId('toolbar-content')).toBeInTheDocument()
    })

    it('can change card sizes - small', async () => {
      const total = 5

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'card-size-small',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'small',
        },
      })

      await expect.poll(() => page.getByCSS('.card-small .catalog-item').all().length).toBe(total)
    })

    it('can change card sizes - large', async () => {
      const total = 5

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'card-size-large',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'large',
        },
      })

      await expect.poll(() => page.getByCSS('.card-large .catalog-item').all().length).toBe(total)
    })

    it('handles truncation', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'handles-truncation',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
        },
      })

      await expect.element(page.getByCSS('.multi-line-truncate')).toBeInTheDocument()
    })

    it('can disable truncation', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'disable-truncation',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          truncateDescription: false,
        },
      })

      await expect.element(page.getByCSS('.multi-line-truncate')).not.toBeInTheDocument()
    })

    it('triggers the internal search and revalidate after clearing the search input', async () => {
      const fns = {
        fetcher: ({ query }: { query: string }) => {
          return { data: [{ query }], total: 1 }
        },
      }

      const fetcherSpy = vi.spyOn(fns, 'fetcher')

      const screen = await render(KCatalog, {
        props: {
          fetcher: fns.fetcher,
          loading: false,
          paginationPageSizes: [10, 15, 20],
          searchInput: '',
          cacheIdentifier: 'search-example',
        },
      })

      // fetcher's 1st call
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(1)
      // ensure fetcher is NOT called twice on load
      expect(fetcherSpy).toHaveBeenCalledTimes(1)
      expect(fetcherSpy.mock.results[0].value).toEqual({ data: [{ query: '' }], total: 1 })

      await screen.rerender({ searchInput: 'some-keyword' })

      // fetcher call should be delayed (> 350ms for search func + 500ms for revalidate func)
      await expect.poll(() => fetcherSpy.mock.calls.length, { timeout: 1000 }).toBe(2)
      expect(fetcherSpy.mock.results[1].value).toEqual({ data: [{ query: 'some-keyword' }], total: 1 })

      await screen.rerender({ searchInput: '' })

      // fetcher should be called immediately (< 350ms for search func)
      await expect.poll(() => fetcherSpy.mock.calls.length, { timeout: 350 }).toBe(3)
      expect(fetcherSpy.mock.results[2].value).toEqual({ data: [{ query: '' }], total: 1 })
    })

    it('emits an event when card is clicked', async () => {
      const screen = await render(KCatalog, {
        props: {
          cacheIdentifier: 'card-click-event',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          truncateDescription: false,
        },
      })

      await page.getByCSS('.k-catalog .catalog-item').first().click()
      await expect.poll(() => screen.emitted()).toHaveProperty('card-click')
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      const fetcher = () => ({ data: [] as Array<{ title: string, description: string }> })

      await render(KCatalog, {
        props: {
          fetcher,
          cacheIdentifier: 'empty-state-no-data',
        },
      })

      await expect.element(page.getByCSS('.k-catalog').getByCSS('.k-empty-state')).toBeVisible()
    })

    it('displays an empty state when no data is available (slot)', async () => {
      const emptySlotContent = 'Look mah! I am empty!'
      const fetcher = () => ({ data: [] as Array<{ title: string, description: string }> })

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'empty-state-no-data-slot',
          fetcher,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      await expect.element(page.getByTestId('catalog-empty-state')).toHaveTextContent(emptySlotContent)
    })

    it('displays a loading skeletion when the loading prop is set to true', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'loading-skeleton',
          fetcher: () => {
            return { data: [], total: 0 }
          },
          loading: true,
        },
      })

      await expect.element(page.getByTestId('catalog-skeleton-loader')).toBeVisible()
    })

    it('displays an error state when the error prop is set to true', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'error-state-basic',
          fetcher: () => {
            return { data: [], total: 0 }
          },
          error: true,
        },
      })

      await expect.element(page.getByCSS('.k-empty-state.error')).toBeVisible()
    })

    it('displays an error state (slot)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous!'

      await render(KCatalog, {
        props: {
          cacheIdentifier: 'error-state-slot',
          fetcher: () => {
            return { data: [], total: 0 }
          },
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      await expect.element(page.getByTestId('catalog-error-state')).toHaveTextContent(errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', async () => {
      // Never resolves — this test only asserts the pending/loading state, not eventual data
      const pendingFetcher = () => new Promise<{ data: Array<{ title: string, description: string }> }>(() => {})

      await render(KCatalog, {
        props: {
          fetcher: pendingFetcher,
          cacheIdentifier: 'loading-test',
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      await expect.element(page.getByTestId('catalog-skeleton-loader')).toBeVisible()
      await expect.element(page.getByCSS('.k-empty-state')).not.toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher is provided', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'pagination-with-fetcher',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).toBeVisible()
    })

    it('allows disabling pagination', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'disable-pagination',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when no data', async () => {
      await render(KCatalog, {
        props: {
          fetcher: () => {
            return { data: [], total: 0 }
          },
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than min pageSize', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'pagination-offset1',
          fetcher: async () => ({ data: getItems(5), total: 5 }),
          loading: false,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).not.toBeInTheDocument()
    })

    it('does not display offset-based pagination when hidePaginationWhenOptional is true and total is less than min pageSize', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'pagination5',
          fetcher: async () => ({ data: getItems(5), offset: null }),
          loading: false,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
          paginationOffset: true,
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).not.toBeInTheDocument()
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to pageSize', async () => {
      await render(KCatalog, {
        props: {
          cacheIdentifier: 'hide-pagination-equal-pagesize',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).not.toBeInTheDocument()
    })

    it('does display pagination when total is greater than pageSize', async () => {
      await render(KCatalog, {
        props: {
          fetcher: () => {
            return { data: getItems(25), total: 25 }
          },
          loading: false,
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-example',
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).toBeInTheDocument()
    })

    it('does display offset-based pagination when total is greater than pageSize', async () => {
      await render(KCatalog, {
        props: {
          fetcher: () => {
            return { data: getItems(25), offset: 'abc' }
          },
          loading: false,
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-offset2',
          paginationOffset: true,
        },
      })

      await expect.element(page.getByTestId('catalog-pagination')).toBeInTheDocument()
    })

    it('refetch with paginationOffset: true', async () => {
      const data: Array<{ title: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ title: 'item' + i })
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
      const fetcherSpy = vi.spyOn(fns, 'fetcher')

      const screen = await render(KCatalog, {
        props: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          paginationPageSizes: [10],
          paginationOffset: true,
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'refetch-offset-true',
          fetcherCacheKey: '0',
        },
      })

      // page 1
      await expect.element(page.getByTestId('catalog-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.k-catalog-item').all().length).toBe(10)
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(1) // ensure fetcher is NOT called twice on load
      expect(fetcherSpy).toHaveBeenCalledWith({ pageSize: 10, page: 1, offset: null, query: '' })

      await screen.rerender({ fetcherCacheKey: '1' }) // manually trigger refetch
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(2)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 1, offset: null, query: '' }])

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.k-catalog-item').all().length).toBe(2)
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(3)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: '10', query: '' }])

      await screen.rerender({ fetcherCacheKey: '2' }) // manually trigger refetch
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(4)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: '10', query: '' }])
    })

    it('refetch with paginationOffset: false', async () => {
      const data: Array<{ title: string }> = []
      for (let i = 0; i < 12; i++) {
        data.push({ title: 'item' + i })
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
      const fetcherSpy = vi.spyOn(fns, 'fetcher')

      const screen = await render(KCatalog, {
        props: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          paginationPageSizes: [10],
          paginationOffset: false,
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'refetch-offset-false',
          fetcherCacheKey: '0',
        },
      })

      // page 1
      await expect.element(page.getByTestId('catalog-pagination')).toBeVisible()
      await expect.poll(() => page.getByCSS('.k-catalog-item').all().length).toBe(10)
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(1) // ensure fetcher is NOT called twice on load
      expect(fetcherSpy).toHaveBeenCalledWith({ pageSize: 10, page: 1, offset: null, query: '' })

      await screen.rerender({ fetcherCacheKey: '1' }) // manually trigger refetch
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(2)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 1, offset: null, query: '' }])

      // page 2
      await page.getByTestId('next-button').click()
      await expect.poll(() => page.getByCSS('.k-catalog-item').all().length).toBe(2)
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(3)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: null, query: '' }])

      await screen.rerender({ fetcherCacheKey: '2' }) // manually trigger refetch
      await expect.poll(() => fetcherSpy.mock.calls.length).toBe(4)
      expect(fetcherSpy.mock.lastCall).toEqual([{ pageSize: 10, page: 2, offset: null, query: '' }])
    })
  })
})
