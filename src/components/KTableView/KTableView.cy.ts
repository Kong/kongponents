import { h } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import type { TableViewHeader, RowBulkAction } from '@/types'

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
    it('displays an empty state when no data is available', () => {
      cy.mount(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      cy.get('.k-empty-state').should('be.visible')
    })

    it('displays an empty state when no data is available (slot)', () => {
      const emptySlotContent = 'Look mah! I am empty!'
      cy.mount(KTableView, {
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
      cy.mount(KTableView, {
        props: {
          loading: true,
        },
      })

      cy.get('.skeleton-table-wrapper').should('be.visible')
    })

    it('displays an error state when the "error" prop is set to true"', () => {
      cy.mount(KTableView, {
        props: {
          error: true,
        },
      })

      cy.get('.k-empty-state.error').should('be.visible')
    })

    it('displays an error state (slot)', () => {
      const errorSlotContent = 'Look mah! I am erroneous!'
      cy.mount(KTableView, {
        props: {
          error: true,
        },
        slots: {
          'error-state': () => h('span', {}, errorSlotContent),
        },
      })

      cy.getTestId('table-error-state').should('contain.text', errorSlotContent)
    })

    it('maintains the row state when data changes', () => {
      const firstRowLinkElement = 'table tbody td:nth(0)>a.cell-wrapper:nth(0)'
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowLink: () => ({
            to: '/link',
          }),
        },
      }).then(component => {
        cy.get(firstRowLinkElement).should('be.visible')
        cy.get(firstRowLinkElement).focus().then(() => {
          cy.get(firstRowLinkElement).should('have.focus').then(() => {
            component.wrapper.setProps({
              data: [...options.data].splice(1, options.data.length - 1),
            }).then(() => {
              cy.get(firstRowLinkElement).should('not.have.focus')
            })
          })
        })
      })
    })
  })

  describe('default', () => {
    it('renders link in action slot', () => {
      cy.mount(KTableView, {
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
      cy.mount(KTableView, {
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
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowHover: true,
        },
      })

      cy.get('.table').should('have.class', 'has-hover')
    })

    it('renders column resize toggles when resizeColumns is set', () => {
      cy.mount(KTableView, {
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

      cy.mount(KTableView, {
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

      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.getTestId(`tooltip-${options.headers[0].key}`).should('be.visible')
    })

    it('displays each row as link when rowLink prop is provided', () => {
      cy.mount(KTableView, {
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
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.getTestId('actions-dropdown').should('be.visible').and('have.length', options.data.length)
      cy.get('th').eq(options.headers.indexOf(options.headers.find((header => header.key === 'actions'))!)).find('.table-header-label').should('have.class', 'sr-only')
    })

    it('bulk actions in not enabled when rowKey prop is not provided', () => {
      cy.mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
        },
        slots: {
          'bulk-action-items': () => h('span', {}, 'Bulk action'),
        },
      })

      cy.getTestId('bulk-actions-dropdown').should('not.exist')
      cy.getTestId('table-header-bulk-actions-checkbox').should('not.exist')
      cy.get('th').eq(0).findTestId('table-header-bulk-actions-checkbox').should('not.exist')
      cy.getTestId('bulk-actions-checkbox').should('have.length', 0)
    })


    it('displays bulk actions column and dropdown when bulkActions key is provided', () => {
      cy.mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowKey: ({ id }: Record<string, any>) => `row-${id}-key`,
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
      cy.mount(KTableView, {
        props: {
          headers: [{ label: 'Bulk actions', key: 'bulkActions' }, ...options.headers],
          data: options.data,
          rowKey: 'id',
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

        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'row-select').and('have.length', 4)
        cy.wrap(Cypress.vueWrapper.emitted('row-select')?.[3][0]).should('have.length', options.data.length)
      })
    })

    it('handles bulk actions disabled state correctly', () => {
      cy.mount(KTableView, {
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

      cy.getTestId('bulk-actions-checkbox').eq(enabledCheckboxIndex).should('not.be.disabled')
      cy.getTestId('bulk-actions-checkbox').eq(disabledCheckboxIndex).should('be.disabled')
    })
  })

  describe('handles prop changes as expected', () => {
    it('reacts to changes in headers', () => {
      cy.mount(KTableView, {
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
    it('should render sortable columns correctly', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })

      cy.get('th').each(($el, index) => {
        cy.wrap($el).should(`${options.headers[index].sortable ? '' : 'not.'}have.class`, 'sortable')
        cy.wrap($el).find('.sort-icon').should(`${options.headers[index].sortable ? '' : 'not.'}exist`)
        cy.wrap($el).find('.active-sort-icon').should('not.exist')
      })
    })

    it('should emit event when sortable column is clicked', () => {
      cy.mount(KTableView, {
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

    it('should emit correct sort order when changing sort column', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
        },
      })
      cy.get('th').eq(0).click().then(() => {
        cy.wrap(Cypress.vueWrapper.emitted('sort')).should('have.length', 1)
        cy.wrap(Cypress.vueWrapper.emitted('sort')?.[0]?.[0]).should('have.property', 'sortColumnOrder', 'asc')
        cy.get('th').eq(1).click().then(() => {
          cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'sort').and('have.length', 2)
          cy.wrap(Cypress.vueWrapper.emitted('sort')?.[1]?.[0]).should('have.property', 'sortColumnOrder', 'asc')
        })
      })
    })

    it('should respect initial sort order from table preferences', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          tablePreferences: {
            sortColumnKey: 'name',
            sortColumnOrder: 'asc',
          },
        },
      })

      cy.getTestId('table-header-name').should('have.class', 'active-sort')
      cy.getTestId('table-header-name').should('have.attr', 'aria-sort', 'ascending')
    })
  })

  describe('pagination', () => {
    it('displays pagination when data is provided', () => {
      cy.mount(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
        },
      })

      cy.getTestId('table-pagination').should('be.visible')
    })

    it('does not display pagination when hidePagination prop is true', () => {
      cy.mount(KTableView, {
        props: {
          data: options.data,
          headers: options.headers,
          hidePagination: true,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('does not display pagination when data is empty', () => {
      cy.mount(KTableView, {
        props: {
          data: [],
          headers: options.headers,
        },
      })

      cy.getTestId('table-pagination').should('not.exist')
    })

    it('passes the correct props to the pagination component', () => {
      cy.mount(KTableView, {
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
    it('displays expand trigger for each row when function passed via rowExpandable prop returns true', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: (row: any) => row.expandable,
        },
      })

      cy.getTestId('expandable-row-control').should('have.length', options.data.filter(row => row.expandable).length).should('be.visible')
      cy.getTestId('expandable-content-row').should('have.length', options.data.filter(row => row.expandable).length)
    })

    it('displays content provided through row-expanded slot', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
        slots: {
          'row-expanded': '<span data-testid="slotted-expandable-content">Expandable content</span>',
        },
      })

      cy.getTestId('expandable-row-control').should('have.length', options.data.length).should('be.visible')
      cy.getTestId('expandable-content-row').should('have.length', options.data.length)

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

    it('renders a row expanded when rowExpanded prop returns true', () => {
      cy.mount(KTableView, {
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

      cy.getTestId('expandable-row-control').should('have.length', options.data.length).should('be.visible')
      cy.getTestId('expandable-content-row').should('have.length', options.data.length)

      cy.getTestId('expandable-content-row').findTestId('slotted-expandable-content').should('be.visible')
      cy.getTestId('expandable-row-control').eq(0).click().then(() => {
        cy.getTestId('expandable-content-row').eq(0).findTestId('slotted-expandable-content').should('not.be.visible')
      })
    })

    it('emits update:row-expanded event when row is expanded and collapsed', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
      })

      cy.getTestId('expandable-row-control').eq(0).click().then(() => {
        cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:row-expanded').and('have.length', 1)

        cy.getTestId('expandable-row-control').eq(0).click().then(() => {
          cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:row-expanded').and('have.length', 2)
        })
      })
    })


    it('does not display table header when hideHeaders prop is true', () => {
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          hideHeaders: true,
        },
      })

      cy.get('thead').should('not.exist')
    })

    it('disables column visibility, column resizing and bulk actions features and does not render toolbar slot when nested prop is true', () => {
      cy.mount(KTableView, {
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
      cy.mount(KTableView, {
        props: {
          headers: options.headers,
          data: options.data,
          rowExpandable: () => true,
        },
      }).then(component => {
        cy.getTestId('expandable-content-row').eq(0).should('not.be.visible')
        cy.getTestId('expandable-content-row').eq(1).should('not.be.visible')

        cy.getTestId('expandable-row-control').eq(0).click().then(() => {
          cy.getTestId('expandable-content-row').eq(0).should('be.visible')

          cy.getTestId('expandable-row-control').eq(1).click().then(() => {
            cy.getTestId('expandable-content-row').eq(1).should('be.visible').then(() => {
              component.wrapper.setProps({
                data: [...options.data].splice(0, options.data.length - 1),
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
