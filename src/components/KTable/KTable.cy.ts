import { h } from 'vue'
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
    it('displays an empty state when no data is available', () => {
      cy.mount(KTable, {
        props: {
          fetcher: () => ({ data: [] }),
          headers: options.headers,
          pageSize: 4,
        },
      })

      cy.get('.k-empty-state').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty!'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      cy.mount(KTable, {
        props: {
          fetcher,
          headers: options.headers,
          pageSize: 4,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      cy.getTestId('table-empty-state').should('contain.text', emptySlotContent)
    })

    it('displays a loading skeletion when the "loading" prop is set to true"', () => {
      cy.mount(KTable, {
        props: {
          loading: true,
        },
      })

      cy.get('.skeleton-table-wrapper').should('be.visible')
    })

    it('displays an error state when the "error" prop is set to true"', () => {
      cy.mount(KTable, {
        props: {
          error: true,
        },
      })

      cy.get('.k-empty-state.error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      cy.mount(KTable, {
        props: {
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('table-error-state').should('contain.text', errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', () => {
      const slowFetcher = () => {
        return new Promise((resolve) => setTimeout(resolve, 2500))
      }

      cy.mount(KTable, {
        props: {
          fetcher: slowFetcher,
          headers: options.headers,
          cacheIdentifier: 'loading-test',
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.get('.skeleton-table-wrapper').should('be.visible')
      cy.get('.k-empty-state').should('not.exist')
    })
  })

  describe('default', () => {
    it('renders link in action slot', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          disablePagination: true,
        },
        slots: {
          actions: () => h('a', { href: '#' }, 'Link'),
        },
      })

      cy.get('.table td:last-of-type > *').contains('a', 'Link')
    })

    it('renders content in the toolbar slot', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          disablePagination: true,
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      cy.get('.k-table .table-toolbar').find('button').should('be.visible')
      cy.get('.k-table .table-toolbar button').should('contain.text', 'Toolbar button')
    })

    it('has hover class when passed', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          rowHover: true,
        },
      })

      cy.get('.table').should('have.class', 'has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          resizeColumns: true,
        },
      })

      cy.get('.table').find('th.resizable').should('be.visible')
      cy.get('.resize-handle').should('exist')
    })

    it('renders column show/hide when headers.hidable is set', () => {
      // make ID column hidable
      options.headers[1].hidable = true
      const modifiedHeaderKey = options.headers[1].key

      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
        },
      })

      cy.get('.table').should('be.visible')
      // menu button is visible
      cy.getTestId('column-visibility-menu-button').should('be.visible')
      cy.getTestId('column-visibility-menu-button').click()

      // only columns with hidable set to true should be visible and checked by default
      cy.getTestId(`column-visibility-menu-item-${modifiedHeaderKey}`).should('be.visible')
      cy.getTestId(`column-visibility-menu-item-${options.headers[0].key}`).should('not.exist')
      cy.getTestId(`column-visibility-checkbox-${modifiedHeaderKey}`).should('be.visible')
      cy.getTestId(`column-visibility-checkbox-${modifiedHeaderKey}`).should('be.checked')

      // changes are applied only when Apply button is clicked
      cy.getTestId(`column-visibility-checkbox-${modifiedHeaderKey}`).click()
      cy.getTestId(`table-header-${modifiedHeaderKey}`).should('be.visible')
      cy.getTestId('apply-button').click()
      cy.getTestId(`table-header-${modifiedHeaderKey}`).should('not.exist')
    })

    it('renders tooltip when provided in headers', () => {
      options.headers[0].tooltip = 'This is a tooltip'

      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
        },
      })

      cy.getTestId(`tooltip-${options.headers[0].key}`).should('be.visible')
    })
  })

  describe('data revalidates and changes as expected', () => {
    it('when clicking a specific page number for non-offset pagination', () => {
      cy.mount(KTable, {
        propsData: {
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
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
      cy.getTestId('page-size-dropdown-trigger').click()
      cy.get('[data-testid="dropdown-item-trigger"][value="1"]').click()
      cy.getTestId('next-button').click()
      cy.get('.pagination-button').should('contain.text', 2 + '')
      cy.get('.table').find('tr').should('have.length', 4)
    })

    it('when clicking arrows for offset based pagination', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: offsetPaginationFetcher,
          loading: false,
          headers: offsetPaginationHeaders,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
      cy.getTestId('page-size-dropdown-trigger').click()
      cy.get('[data-testid="dropdown-item-trigger"][value="15"]').click({ multiple: true, force: true })
      cy.getTestId('next-button').should('exist')
      cy.get('.table').find('tr').should('have.length', 16)
    })

    it('when page size is changed', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return {
              data: largeDataSet,
            }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [1, 2, 3, 4],
          hidePaginationWhenOptional: false,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
      cy.getTestId('page-size-dropdown-trigger').click()
      cy.get('[data-testid="dropdown-item-trigger"][value="3"]').click({ multiple: true, force: true })
      cy.getTestId('next-button').click()
      cy.get('.pagination-button.active').should('contain.text', 2 + '')
      cy.get('.table').find('tr').should('have.length', 13)
    })

    it('when sort key or sort direction is changed and NOT using clientSideSort', () => {
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
      cy.mount(KTable, {
        propsData: {
          fetcher: sortHandlerFnFetcher,
          loading: false,
          headers: sortHandlerFnHeaders,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
      cy.getTestId('table-pagination').find('.kui-icon.chevron-down-icon').click({ force: true })
      cy.get('.table').find('tr').should('have.length', 6)
      cy.get('.table').find('.sort-icon').last().click()
      cy.get('.table').find('td:nth-child(4)').first().should('has.text', 'Just now')
    })

    it('reacts to changes in headers', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return {
              data: largeDataSet,
            }
          },
          loading: false,
          headers: [
            { label: 'Name', key: 'name' },
          ],
        },
      }).then((component) => {
        cy.get('.table').find('th').should('have.length', 1)
        cy.getTestId('table-header-name').should('be.visible').then(() => {
          component.wrapper.setProps({
            headers: [
              { label: 'Name', key: 'name' },
              { label: 'ID', key: 'id' },
            ],
          }).then(() => {
            cy.get('.table').find('th').should('have.length', 2)
            cy.getTestId('table-header-id').should('be.visible')
            cy.get('.table').find('td').eq(1).should('contain', '517526354743085')
          })
        })
      })
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
        },
      })

      cy.get('th').each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).should('have.class', 'sortable')
        }
      })
    })

    it('should allow disabling sorting', () => {
      cy.mount(KTable, {
        props: {
          headers: options.headers,
          fetcher: () => {
            return { data: options.data }
          },
          sortable: false,
        },
      })

      cy.get('th').each(($el) => {
        cy.wrap($el).should('not.have.class', 'sortable')
      })
    })
  })

  // describe('events', () => {
  //   it('@row:event', () => {
  //     const evtTrigger = jest.fn()
  //     cy.mount(KTable, {
  //       localVue,
  //       attachToDocument: true,
  //       props: {
  //         headers: options.headers,
  //         fetcher: () => { return { data: options.data } },
  //       },
  //       listeners: {
  //         'row:mouseover': evtTrigger,
  //       },
  //     })
  //     const bodyRow = wrapper.find('.k-table tbody tr')
  //     bodyRow.trigger('mouseover')
  //     expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'mouseover' }), options.data[0], 'row')
  //   })

  // it('@cell:event', () => {
  //   const evtTrigger = jest.fn()
  //   cy.mount(KTable, {
  //     localVue,
  //     attachToDocument: true,
  //     props: {
  //       headers: options.headers,
  //       fetcher: () => { return { data: options.data } },
  //     },
  //     listeners: {
  //       'cell:click': evtTrigger,
  //       'cell:mouseover': evtTrigger,
  //       'cell:mouseout': evtTrigger,
  //     },
  //   })

  //

  //     const bodyCell1 = wrapper.find('.k-table tbody td')
  //     const bodyCell2 = wrapper.find('.k-table tbody td:nth-child(2)')

  //     bodyCell1.trigger('click')
  //     bodyCell1.trigger('mouseover')
  //     bodyCell2.trigger('mouseout')
  //     expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'click' }), 'Basic Auth', 'cell')
  //     expect(evtTrigger).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'mouseover' }), 'Basic Auth', 'cell')
  //     expect(evtTrigger).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'mouseout' }), '517526354743085', 'cell')
  //   })
  // })

  describe('pagination', () => {
    it('displays pagination when fetcher provided', () => {
      cy.mount(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
    })

    it('does not display pagination when pagination disabled', () => {
      cy.mount(KTable, {
        props: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does not display pagination when no fetcher', () => {
      cy.mount(KTable, {
        props: {
          options,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than min pageSize', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return { data: options.data, total: options.data.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to min pageSize', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [12, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does display pagination when total is greater than min pageSize', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return { data: largeDataSet, total: largeDataSet.length }
          },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
    })

    it('does not display offset-based pagination when hidePaginationWhenOptional is true and total is less than min pageSize', () => {
      cy.mount(KTable, {
        propsData: {
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

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does display offset-based pagination when total is greater than min pageSize', () => {
      cy.mount(KTable, {
        propsData: {
          fetcher: () => {
            return { data: largeDataSet, offset: 'abc' }
          },
          loading: false,
          initialFetcherParams: { offset: 'abc' },
          headers: options.headers,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
    })

    it('refetch with paginationOffset: true', () => {
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
      cy.spy(fns, 'fetcher').as('fetcher')

      cy.mount(KTable, {
        propsData: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10],
          paginationOffset: true,
          hidePaginationWhenOptional: true,
          fetcherCacheKey: '0',
        },
      })

      // page 1
      cy.getTestId('table-pagination').should('be.visible')
      cy.get('.table tbody').find('tr').should('have.length', 10)
      cy.get('.table tbody').should('contain.text', 'row0')
      cy.get('@fetcher')
        .should('have.callCount', 1) // ensure fetcher is NOT called twice on load
        .should('have.been.calledWith', { pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ fetcherCacheKey: '1' }))) // manually trigger refetch
        .get('@fetcher')
        .should('have.callCount', 2)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // page 2
      cy.getTestId('next-button').click()
      cy.get('.table tbody').find('tr').should('have.length', 2)
      cy.get('.table tbody').should('contain.text', 'row10')
      cy.get('@fetcher')
        .should('have.callCount', 3)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ fetcherCacheKey: '2' }))) // manually trigger refetch
        .get('@fetcher')
        .should('have.callCount', 4)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 2, offset: '10', query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
    })

    it('refetch with paginationOffset: false', () => {
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
      cy.spy(fns, 'fetcher').as('fetcher')

      cy.mount(KTable, {
        propsData: {
          fetcher: fns.fetcher,
          initialFetcherParams: { pageSize: 10 },
          loading: false,
          headers: options.headers,
          paginationPageSizes: [10],
          paginationOffset: false,
          hidePaginationWhenOptional: true,
          fetcherCacheKey: '0',
        },
      })

      // page 1
      cy.getTestId('table-pagination').should('be.visible')
      cy.get('.table tbody').find('tr').should('have.length', 10)
      cy.get('.table tbody').should('contain.text', 'row0')
      cy.get('@fetcher')
        .should('have.callCount', 1) // ensure fetcher is NOT called twice on load
        .should('have.been.calledWith', { pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ fetcherCacheKey: '1' }))) // manually trigger refetch
        .get('@fetcher')
        .should('have.callCount', 2)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 1, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })

      // page 2
      cy.getTestId('next-button').click()
      cy.get('.table tbody').find('tr').should('have.length', 2)
      cy.get('.table tbody').should('contain.text', 'row10')
      cy.get('@fetcher')
        .should('have.callCount', 3)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ fetcherCacheKey: '2' }))) // manually trigger refetch
        .get('@fetcher')
        .should('have.callCount', 4)
        .its('lastCall')
        .should('have.been.calledWith', { pageSize: 10, page: 2, offset: null, query: '', sortColumnKey: '', sortColumnOrder: 'desc' })
    })
  })

  describe('misc', () => {
    it('triggers the internal search and revalidate after clearing the search input', () => {
      const fns = {
        fetcher: ({ query }: { query: string }) => {
          return { data: [{ query }] }
        },
      }

      cy.spy(fns, 'fetcher').as('fetcher')

      cy.mount(KTable, {
        propsData: {
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
        .get('@fetcher')
        .should('have.callCount', 1) // fetcher's 1st call
        .should('returned', { data: [{ query: '' }] })
        .get('@fetcher')
        .should('have.callCount', 1) // ensure fetcher is NOT called twice on load
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ searchInput: 'some-keyword' })))

      // fetcher call should be delayed (> 350ms for search func + 500ms for revalidate func)
      cy.get('@fetcher', { timeout: 1000 }) // fetcher's 2nd call
        .should('have.callCount', 2) // fetcher should be called once
        .should('returned', { data: [{ query: 'some-keyword' }] })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ searchInput: '' })))

      // fetcher should be called immediately (< 350ms for search func)
      cy.get('@fetcher', { timeout: 350 })
        .should('have.callCount', 3) // fetcher's 3rd call
        .should('returned', { data: [{ query: '' }] })
    })
  })
})
