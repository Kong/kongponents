import { mount } from 'cypress/vue'
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
    it('renders proper cards when using props', () => {
      const title = 'Cool beans!'
      const total = 5
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props',
          title,
          fetcher: () => {
            return { data: getItems(total), total }
          },
        },
      })

      cy.get('.catalog-title').should('contain', title)
      cy.get('.catalog-page').should('exist')
      cy.get('.k-catalog-item').should('have.length', total)
    })

    it('renders slots when passed', () => {
      const slotContent = 'Look mah! No props'

      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props1',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          body: h('span', {}, slotContent),
        },
      })

      cy.get('.catalog-page').should('contain', slotContent)
    })

    it('renders slotted cards when passed', () => {
      const slotHeader = 'Look mah!'
      const slotBody = 'My body'

      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props1',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
        },
        slots: {
          'card-title': h('span', {}, slotHeader),
          'card-body': h('span', {}, slotBody),
        },
      })

      cy.get('.card-title').should('contain', slotHeader)
      cy.get('.card-content').should('contain', slotBody)
    })

    it('renders slots when passed (with empty)', () => {
      const emptySlotContent = 'Look mah! I am empty!'

      mount(KCatalog, {
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

      cy.get('[data-testid="catalog-empty-state"]').should('contain', emptySlotContent)
    })

    it('renders slots when passed (with error)', () => {
      const errorSlotContent = 'Look mah! I am erroneous!'

      mount(KCatalog, {
        props: {
          error: true,
          fetcher: () => {
            return { data: [], total: 0 }
          },
        },
        slots: {
          'error-state': h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('catalog-error-state').should('contain', errorSlotContent)
    })

    it('renders content in the toolbar slot', () => {
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props1',
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          },
          disablePagination: true,
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      cy.get('.k-catalog .catalog-toolbar').find('button').should('be.visible')
      cy.get('.k-catalog .catalog-toolbar button').should('contain.text', 'Toolbar button')
    })

    it('can change card sizes - small', () => {
      const total = 5

      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'small',
        },
      })

      cy.get('.card-small .catalog-item').should('have.length', total)
    })

    it('can change card sizes - large', () => {
      const total = 5

      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props',
          fetcher: () => {
            return { data: getItems(total), total }
          },
          cardSize: 'large',
        },
      })

      cy.get('.card-large .catalog-item').should('have.length', total)
    })

    it('handles truncation', () => {
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props-long',
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
          cacheIdentifier: 'general-props-long',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          truncateDescription: false,
        },
      })

      cy.get('.multi-line-truncate').should('not.exist')
    })

    it('triggers the internal search and revalidate after clearing the search input', () => {
      const fns = {
        fetcher: ({ query }: { query: string }) => {
          return { data: [{ query }], total: 1 }
        },
      }

      cy.spy(fns, 'fetcher').as('fetcher')

      mount(KCatalog, {
        propsData: {
          fetcher: fns.fetcher,
          loading: false,
          paginationPageSizes: [10, 15, 20],
          searchInput: '',
          cacheIdentifier: 'search-example',
        },
      })
        .get('@fetcher')
        .should('have.callCount', 1) // fetcher's 1st call
        .should('returned', { data: [{ query: '' }], total: 1 })
        .wait(1000)
        .get('@fetcher')
        .should('have.callCount', 1) // ensure fetcher is NOT called twice on load
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ searchInput: 'some-keyword' })))

      // fetcher call should be delayed (> 350ms for search func + 500ms for revalidate func)
      cy.get('@fetcher', { timeout: 1000 }) // fetcher's 2nd call
        .should('have.callCount', 2) // fetcher should be called once
        .should('returned', { data: [{ query: 'some-keyword' }], total: 1 })
        .then(() => cy.wrap(Cypress.vueWrapper.setProps({ searchInput: '' })))

      // fetcher should be called immediately (< 350ms for search func)
      cy.get('@fetcher', { timeout: 350 })
        .should('have.callCount', 3) // fetcher's 3rd call
        .should('returned', { data: [{ query: '' }], total: 1 })
    })

    it('emits an event when card is clicked', () => {
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'general-props-long',
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          truncateDescription: false,
        },
      })

      cy.get('.k-catalog .catalog-item').first().click().then(() => {
        // Check for emitted event
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'card-click')
      })
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is available', () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))

      mount(KCatalog, {
        props: {
          fetcher,
          cacheIdentifier: 'pagination',
          pageSize: 4,
        },
      })

      cy.get('.k-empty-state').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty!'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))

      mount(KCatalog, {
        props: {
          cacheIdentifier: 'pagination',
          fetcher,
          pageSize: 4,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      cy.getTestId('catalog-empty-state').should('contain.text', emptySlotContent)
    })

    it('displays a loading skeletion when the "loading" prop is set to true"', () => {
      mount(KCatalog, {
        props: {
          fetcher: () => {
            return { data: [], total: 0 }
          },
          loading: true,
        },
      })

      cy.get('.catalog-skeleton-loader').should('be.visible')
    })

    it('displays an error state when the "error" prop is set to true"', () => {
      mount(KCatalog, {
        props: {
          fetcher: () => {
            return { data: [], total: 0 }
          },
          error: true,
        },
      })

      cy.get('.k-empty-state.error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous!'

      mount(KCatalog, {
        props: {
          fetcher: () => {
            return { data: [], total: 0 }
          },
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('catalog-error-state').should('contain.text', errorSlotContent)
    })

    it('displays a loading state and not an empty state when pending response', () => {
      const slowFetcher = () => {
        return new Promise((resolve) => setTimeout(resolve, 2500))
      }

      mount(KCatalog, {
        props: {
          fetcher: slowFetcher,
          cacheIdentifier: 'loading-test',
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.get('.catalog-skeleton-loader').should('be.visible')
      cy.get('.k-empty-state').should('not.exist')
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher is provided', () => {
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'pagination2',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('catalog-pagination').should('be.visible')
    })

    it('allows disabling pagination', () => {
      mount(KCatalog, {
        props: {
          cacheIdentifier: 'pagination2',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true,
        },
      })

      cy.getTestId('catalog-pagination').should('not.exist')
    })

    it('does not display pagination when no data', () => {
      mount(KCatalog, {
        props: {
          fetcher: () => {
            return { data: [], total: 0 }
          },
          paginationPageSizes: [10, 20, 30, 40],
        },
      })

      cy.getTestId('catalog-pagination').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than min pageSize', () => {
      mount(KCatalog, {
        propsData: {
          cacheIdentifier: 'pagination5',
          fetcher: () => {
            return { data: getItems(5), total: 5 }
          },
          loading: false,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('catalog-pagination').should('not.exist')
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to pageSize', () => {
      mount(KCatalog, {
        propsData: {
          cacheIdentifier: 'pagination',
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
          },
          loading: false,
          paginationPageSizes: [10, 15, 20],
          hidePaginationWhenOptional: true,
        },
      })

      cy.getTestId('catalog-pagination').should('not.exist')
    })

    it('does display pagination when total is greater than pageSize', () => {
      mount(KCatalog, {
        propsData: {
          fetcher: () => {
            return { data: getItems(25), total: 25 }
          },
          loading: false,
          hidePaginationWhenOptional: true,
          cacheIdentifier: 'pagination-example',
        },
      })

      cy.getTestId('catalog-pagination').should('exist')
    })
  })
})
