// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import { h, nextTick } from 'vue'
import KTable from '@/components/KTable/KTable.vue'

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
  ],
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

/**
 * ALL TESTS MUST USE testMode
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: 'true' || 'loading'
 * }
 */

describe('KTable', () => {
  describe('default', () => {
    it('renders link in action slot', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          disablePagination: true,
        },
        slots: {
          actions: () => h('a', { href: '#' }, 'Link'),
        },
      })

      cy.get('.k-table td:last-of-type > *').contains('a', 'Link')
    })

    it('has hover class when passed', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          hasHover: true,
        },
      })

      cy.get('.k-table').should('have.class', 'has-hover')
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
        },
      })

      cy.get('th').each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).should('have.class', 'sortable')
        }
      })
    })

    it('should allow disabling sorting', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          disableSorting: true,
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
  //     mount(KTable, {
  //       localVue,
  //       attachToDocument: true,
  //       props: {
  //         testMode: 'true',
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
  //   mount(KTable, {
  //     localVue,
  //     attachToDocument: true,
  //     props: {
  //       testMode: 'true',
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

  describe('states', () => {
    it('displays an empty state when no data is available', () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      mount(KTable, {
        props: {
          testMode: 'true',
          fetcher: fetcher,
          headers: options.headers,
          pageSize: 4,
        },
      })

      cy.get('.empty-state-wrapper').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      mount(KTable, {
        props: {
          testMode: 'true',
          fetcher: fetcher,
          headers: options.headers,
          pageSize: 4,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      cy.getTestId('k-table-empty-state').should('contain.text', emptySlotContent)
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', async () => {
      mount(KTable, {
        props: {
          testMode: 'loading',
          isLoading: true,
        },
      })

      cy.get('.skeleton-table-wrapper').should('be.visible')
    })

    it('displays an error state when the "hasError" prop is set to true"', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          hasError: true,
        },
      })

      cy.get('.empty-state-wrapper').should('be.visible')
      cy.get('.is-error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'
      mount(KTable, {
        props: {
          testMode: 'true',
          hasError: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('k-table-error-state').should('contain.text', errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', async () => {
      const slowFetcher = () => {
        return setTimeout(() => {
          return new Promise(resolve => resolve({ data: options.data }))
        }, 1000)
      }

      mount(KTable, {
        props: {
          testMode: 'loading',
          fetcher: slowFetcher,
          headers: options.headers,
          pageSize: 4,
        },
      })

      // Wait for loading state
      await nextTick()

      cy.get('.skeleton-table-wrapper').should('be.visible')
      cy.get('.empty-state-wrapper').should('not.exist')
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher provided', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('k-pagination-container').should('be.visible')
    })

    it('does not display pagination when pagination disabled', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
        },
      })

      cy.getTestId('k-pagination-container').should('not.exist')
    })

    it('does not display pagination when no fetcher', () => {
      mount(KTable, {
        props: {
          testMode: 'true',
          options,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('k-pagination-container').should('not.exist')
    })
  })
})
