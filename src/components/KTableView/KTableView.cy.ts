import { mount } from 'cypress/vue'
import { h } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import type { TableHeader } from '@/types'

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
    { label: 'ID', key: 'id', sortable: false },
    { label: 'Enabled', key: 'enabled', sortable: false },
    { label: '', key: 'actions', sortable: false },
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

describe('KTableView', () => {
  describe('states', () => {
    it('displays an empty state when no data is available', () => {
      mount(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      cy.get('.k-empty-state').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty!'
      mount(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
        slots: {
          'empty-state': () => h('span', {}, emptySlotContent),
        },
      })

      cy.getTestId('table-empty-state').should('contain.text', emptySlotContent)
    })

    it('displays a loading skeletion when the "loading" prop is set to true"', () => {
      mount(KTableView, {
        props: {
          loading: true,
        },
      })

      cy.get('.skeleton-table-wrapper').should('be.visible')
    })

    it('displays an error state when the "error" prop is set to true"', () => {
      mount(KTableView, {
        props: {
          error: true,
        },
      })

      cy.get('.k-empty-state.error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      mount(KTableView, {
        props: {
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('table-error-state').should('contain.text', errorSlotContent)
    })
  })

  describe('default', () => {
    it('renders link in action slot', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
        slots: {
          name: () => h('a', { href: '#' }, 'Link'),
        },
      })

      cy.get('.table td:first-of-type > *').contains('a', 'Link')
    })

    it('renders content in the toolbar slot', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
        slots: {
          toolbar: () => h('button', {}, 'Toolbar button'),
        },
      })

      cy.get('.k-table-view .table-toolbar').find('button').should('be.visible')
      cy.get('.k-table-view .table-toolbar button').should('contain.text', 'Toolbar button')
    })

    it('has hover class when passed', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowHover: true,
        },
      })

      cy.get('.table').should('have.class', 'has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
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

      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
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

      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.getTestId(`tooltip-${options.headers[0].key}`).should('be.visible')
    })

    it('displays actions dropdown when actions key is provided', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.getTestId('actions-dropdown').should('be.visible').and('have.length', options.data.length)
      cy.get('th').eq(options.headers.indexOf(options.headers.find((header => header.key === 'actions'))!)).find('.table-header-label').should('have.class', 'sr-only')
    })

    it.skip('displays each cell as link when configured', () => {
      // TODO
    })
  })

  describe('handles prop changes as expected', () => {
    it('reacts to changes in headers', () => {
      mount(KTableView, {
        propsData: {
          data: largeDataSet,
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
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.get('th').each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).should('have.class', 'sortable')
        }
      })
    })

    it('should emit event when sortable column is clicked', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.get('th').eq(0).click().then(() => {
        cy.get('th').eq(0).should('have.class', 'active-sort')
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'sort').and('have.length', 1)
      })
    })
  })
})
