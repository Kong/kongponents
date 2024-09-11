import { mount } from 'cypress/vue'
import { h } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import type { TableHeader, RowBulkAction } from '@/types'

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
      bulkActionsDisabled: true,
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

    it('displays each row as link when rowLink prop is provided', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowLink: () => ({
            to: '/link',
          }),
        },
      })

      cy.get('table tbody td').each(($el) => {
        cy.wrap($el).should('have.class', 'row-link').should('be.visible')
      })

      cy.get('table tbody td>a.cell-wrapper').each(($el) => {
        cy.wrap($el).should('be.visible')
      })
    })
  })

  describe('reserved header keys', () => {
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

    it('displays bulk actions column and dropdown when bulkActions key is provided', () => {
      mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
        },
      })

      cy.getTestId('bulk-actions-dropdown').should('be.visible')
      cy.getTestId('bulk-actions-dropdown-trigger').should('be.visible').and('be.disabled')
      cy.get('th').eq(0).findTestId('table-header-bulk-actions-checkbox').should('be.visible')
      cy.getTestId('bulk-actions-checkbox').should('have.length', options.data.length)
      cy.getTestId('bulk-actions-checkbox').eq(0).click()
      cy.getTestId('bulk-actions-dropdown-trigger').and('not.be.disabled')
    })

    it('handles bulk actions indeterminate state correctly and emits event', () => {
      mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
        },
        slots: {
          'bulk-actions': () => h('span', {}, 'Bulk action'),
        },
      })

      cy.getTestId('bulk-actions-checkbox').eq(0).click()
      cy.getTestId('bulk-actions-checkbox').eq(1).click()
      cy.getTestId('bulk-actions-checkbox').eq(0).should('be.checked')
      cy.getTestId('bulk-actions-checkbox').eq(1).should('be.checked')
      cy.getTestId('bulk-actions-checkbox').eq(2).should('not.be.checked')
      cy.getTestId('table-header-bulk-actions-checkbox').should('not.be.checked')
      cy.getTestId('indeterminate-icon').should('exist')
      cy.getTestId('table-header-bulk-actions-checkbox').click().then(() => {
        cy.getTestId('bulk-actions-checkbox').eq(2).should('be.checked')
        cy.getTestId('indeterminate-icon').should('not.exist')

        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'row-select').and('have.length', 3)
        cy.wrap(Cypress.vueWrapper.emitted('row-select')?.[2][0]).should('have.length', options.data.length)
      })
    })

    it('handles bulk actions disabled state correctly', () => {
      mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowBulkActionEnabled: (row: Record<string, any>): RowBulkAction => {
            if (row.bulkActionsDisabled) {
              return false
            }

            return true
          },
        },
        slots: {
          'bulk-actions': () => h('span', {}, 'Bulk action'),
        },
      })

      const disabledCheckboxIndex = options.data.indexOf(options.data.find((row) => row.bulkActionsDisabled)!)
      const enabledCheckboxIndex = (options.data.length - disabledCheckboxIndex) === options.data.length ? options.data.length - 1 : options.data.length - disabledCheckboxIndex

      cy.getTestId('bulk-actions-checkbox').eq(enabledCheckboxIndex).should('not.be.disabled')
      cy.getTestId('bulk-actions-checkbox').eq(disabledCheckboxIndex).should('be.disabled')
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

  describe('pagination', () => {
    it('displays pagination when data is provided', () => {
      mount(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
    })

    it('does not display pagination when hidePagination prop is true', () => {
      mount(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          hidePagination: true,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does not display pagination when data is empty', () => {
      mount(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('passes the correct props to the pagination component', () => {
      mount(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          paginationAttributes: {
            totalCount: 100,
            currentPage: 2,
          },
        },
      })

      cy.getTestId('visible-items').eq(0).should('contain.text', '16 to 30  of 100')
    })
  })

  describe('expandable rows and nested tables', () => {
    it('displays expand trigger for each row when expandableRows prop is true', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          expandableRows: true,
        },
      })

      cy.getTestId('expandable-row-control').should('have.length', options.data.length).should('be.visible')
      cy.getTestId('expandable-content-row').should('have.length', options.data.length)
    })

    it('displays content provided through row-expanded slot', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          expandableRows: true,
        },
        slots: {
          'row-expanded': '<span data-testid="slotted-expandable-content">Expandable content</span>',
        },
      })

      cy.getTestId('expandable-content-row').findTestId('slotted-expandable-content').should('not.be.visible')
      cy.getTestId('expandable-row-control').eq(0).click().then(() => {
        cy.getTestId('expandable-content-row').eq(0).findTestId('slotted-expandable-content').should('be.visible')

        cy.getTestId('expandable-row-control').eq(1).click().then(() => {
          cy.getTestId('expandable-content-row').eq(1).findTestId('slotted-expandable-content').should('be.visible')

          cy.getTestId('expandable-row-control').eq(0).click().then(() => {
            cy.getTestId('expandable-content-row').eq(0).findTestId('slotted-expandable-content').should('not.be.visible')
            cy.getTestId('expandable-content-row').eq(1).findTestId('slotted-expandable-content').should('be.visible')
          })
        })
      })
    })

    it('emits row-expand event when row is expanded', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          expandableRows: true,
        },
      })

      cy.getTestId('expandable-row-control').eq(0).click().then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'row-expand').and('have.length', 1)
      })
    })


    it('does not display table header when hideHeaders prop is true', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          hideHeaders: true,
        },
      })

      cy.get('thead').should('not.exist')
    })

    it('disables column visibility, column resizing and bulk actions features and does not render toolbar slot when nested prop is true', () => {
      mount(KTableView, {
        props: {
          headers: [...options.headers, { ...options.headers[1], hidable: true }, { label: 'Bulk actions', key: 'bulkActions' }],
          data: options.data,
          resizeColumns: true,
          nested: true,
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
          'toolbar': '<span data-testid="slotted-toolbar-content">Toolbar content</span>',
        },
      })

      // column visibility
      cy.getTestId('column-visibility-menu-button').should('not.exist')

      // column resizing
      cy.get('.table').find('th').should('not.have.class', 'resizable')
      cy.get('.resize-handle').should('not.exist')

      // bulk actions
      cy.getTestId('bulk-actions-dropdown').should('not.exist')
      cy.getTestId('table-header-bulk-actions-checkbox').should('not.exist')
      cy.getTestId('bulk-actions-checkbox').should('not.exist')

      // toolbar slot
      cy.getTestId('slotted-toolbar-content').should('not.exist')
    })

    it('collapses all expanded rows when table data changes', () => {
      mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          expandableRows: true,
        },
      }).then(component => {
        cy.getTestId('expandable-content-row').eq(0).should('not.be.visible')
        cy.getTestId('expandable-content-row').eq(1).should('not.be.visible')

        cy.getTestId('expandable-row-control').eq(0).click().then(() => {
          cy.getTestId('expandable-content-row').eq(0).should('be.visible')

          cy.getTestId('expandable-row-control').eq(1).click().then(() => {
            cy.getTestId('expandable-content-row').eq(1).should('be.visible').then(() => {
              component.wrapper.setProps({
                data: [...options.data.splice(0, options.data.length - 1)],
              }).then(() => {
                cy.getTestId('expandable-content-row').eq(0).should('not.be.visible')
                cy.getTestId('expandable-content-row').eq(1).should('not.be.visible')
              })
            })
          })
        })
      })
    })
  })
})
