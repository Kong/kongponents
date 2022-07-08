// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import { h } from 'vue'
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

/**
 * ALL TESTS MUST USE testMode
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: 'true' || 'loading'
 * }
 */

describe('KCatalog', () => {
  function getItems(count) {
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
    it('renders proper cards when using props', () => {
      const title = 'Cool beans!'
      const total = 5
      mount(KCatalog, {
        props: {
          testMode: 'true',
          title,
          fetcher: () => {
            return { data: getItems(total), total }
          },
        },
      })

      cy.get('.k-card-catalog-title').should('contain', title)
      cy.get('.k-catalog-page').should('exist')
      cy.get('.k-card-catalog-item').should('have.length', total)
    })

    it('renders slots when passed', () => {
      const slotContent = 'Look mah! No props (except testMode)'

      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          body: h('span', {}, slotContent),
        },
      })

      cy.get('.k-catalog-page').should('contain', slotContent)
    })

    it('renders slotted cards when passed', () => {
      const slotHeader = 'Look mah!'
      const slotBody = 'My body'

      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          cardTitle: h('span', {}, slotHeader),
          cardBody: h('span', {}, slotBody),
        },
      })

      cy.get('.k-card-title').should('contain', slotHeader)
      cy.get('.k-card-body').should('contain', slotBody)
    })

    it('renders slots when passed (with empty)', () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'

      mount(KCatalog, {
        props: {
          testMode: 'true',
          isLoading: false,
          fetcher: () => { return { data: [], total: 0 } },
        },
        slots: {
          'empty-state': h('span', {}, emptySlotContent),
        },
      })

      cy.get('[data-testid="k-card-catalog-empty-state"]').should('contain', emptySlotContent)
    })

    it('renders slots when passed (with error)', () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'

      mount(KCatalog, {
        props: {
          testMode: 'true',
          hasError: true,
          fetcher: () => { return { data: [], total: 0 } },
        },
        slots: {
          'error-state': h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('k-card-catalog-error-state').should('contain', errorSlotContent)
    })

    it('can change card sizes - small', () => {
      const total = 5

      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'small',
        },
      })

      cy.get('.k-card-small .catalog-item').should('have.length', total)
    })

    it('can change card sizes - large', () => {
      const total = 5

      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'large',
        },
      })

      cy.get('.k-card-large .catalog-item').should('have.length', total)
    })

    it('handles truncation', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
        },
      })

      cy.get('.multi-line-truncate').should('exist')
    })

    it('can disable truncation', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          noTruncation: true,
        },
      })

      cy.get('.multi-line-truncate').should('not.exist')
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is available', () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))

      mount(KCatalog, {
        props: {
          fetcher: fetcher,
          pageSize: 4,
        },
      })

      cy.get('.empty-state-wrapper').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))

      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: fetcher,
          pageSize: 4,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      cy.getTestId('k-card-catalog-empty-state').should('contain.text', emptySlotContent)
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', () => {
      mount(KCatalog, {
        props: {
          testMode: 'loading',
          fetcher: () => { return { data: [], total: 0 } },
          isLoading: true,
        },
      })

      cy.get('.skeleton-card-wrapper').should('be.visible')
    })

    it('displays an error state when the "hasError" prop is set to true"', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => { return { data: [], total: 0 } },
          hasError: true,
        },
      })

      cy.get('.empty-state-wrapper').should('be.visible')
      cy.get('.is-error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'
      mount(KCatalog, {
        props: {
          testMode: 'true',
          hasError: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('k-card-catalog-error-state').should('contain.text', errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', () => {
      const slowFetcher = () => {
        return new Promise((resolve) => setTimeout(resolve, 2500))
      }

      mount(KCatalog, {
        props: {
          testMode: 'loading',
          fetcher: slowFetcher,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.get('.skeleton-card-wrapper').should('be.visible')
      cy.get('.empty-state-wrapper').should('not.exist')
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher is provided', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          isLoading: false,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('k-catalog-pagination').should('be.visible')
    })

    it('allows disabling pagination', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          isLoading: false,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
        },
      })

      cy.getTestId('k-catalog-pagination').should('not.exist')
    })

    it('does not display pagination when no fetcher', () => {
      mount(KCatalog, {
        props: {
          testMode: 'true',
          fetcher: () => { return { data: [], total: 0 } },
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('k-catalog-pagination').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than pageSize', () => {
      mount(KCatalog, {
        propsData: {
          testMode: 'true',
          fetcher: () => { return { total: 10 } },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('k-pagination-container').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to pageSize', () => {
      mount(KCatalog, {
        propsData: {
          testMode: 'true',
          fetcher: () => {
            return { total: 15 }
          },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('k-pagination-container').should('not.exist')
    })

    it('does display pagination when total is greater than pageSize', () => {
      mount(KCatalog, {
        propsData: {
          testMode: 'true',
          fetcher: () => {
            return { total: 25 }
          },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('k-pagination-container').should('exist')
    })
  })
})
