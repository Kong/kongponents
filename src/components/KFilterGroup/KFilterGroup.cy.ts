import { ref, type Ref } from 'vue'
import { mount } from 'cypress/vue'
import KFilterGroup from '@/components/KFilterGroup/KFilterGroup.vue'
import type { Filter, FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@/types'

describe('KFilterGroup', () => {
  const FILTER_LABEL_ID = 'filter-group-label'
  const FILTER_SELECTOR_ID = 'filter-selector'
  const getFilterSelector = (key: string) => `.interactive-pill[data-testid="filter-group-pill-${key}"]`

  const SIMPLE_FILTER_SELECTION: FilterSelection = {
    operator: 'eq',
    value: 'simple',
    text: 'Simple',
  }
  const BASIC_FILTER: Filter = { label: 'Basic filter' }
  const PINNED_FILTER: Filter = { label: 'Pinned filter', pinned: true }

  const render = ({
    filters,
    selection = {},
  }: {
    filters: FilterGroupFilters
    selection?: FilterGroupSelection
  }) => {
    const onApply = cy.spy().as('apply')
    const onClose = cy.spy().as('close')
    const onOpen = cy.spy().as('open')
    const onClear = cy.spy().as('clear')

    cy.mount(KFilterGroup as any, {
      props: {
        filters,
        modelValue: selection,
        onApply,
        onClose,
        onOpen,
        onClear,
      },
    }).as('filterGroup')
  }

  it('renders', () => {
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.getTestId(FILTER_LABEL_ID).should('exist').should('be.visible')
    cy.getTestId(FILTER_SELECTOR_ID).should('exist').should('be.visible')
    cy.get(getFilterSelector('pinned')).should('exist').should('be.visible')
    cy.get(getFilterSelector('basic')).should('not.exist')
  })

  it('renders without the filter selector when all filters have been added/pinned', () => {
    render({ filters: { pinned: PINNED_FILTER } })
    cy.getTestId(FILTER_SELECTOR_ID).should('not.exist')
    cy.get(getFilterSelector('pinned')).should('exist').should('be.visible')
  })

  it('renders pinned filters in the order they were provided', () => {
    render({
      filters: {
        pinned_a: PINNED_FILTER,
        pinned_z: PINNED_FILTER,
        pinned_b: PINNED_FILTER,
      },
    })
    const pillSelect = '.interactive-pill[data-testid*="filter-group-pill-"]'
    cy.get(pillSelect).should('have.length', 3).then(($els) => {
      expect($els.eq(0)).to.have.attr('data-testid', 'filter-group-pill-pinned_a')
      expect($els.eq(1)).to.have.attr('data-testid', 'filter-group-pill-pinned_z')
      expect($els.eq(2)).to.have.attr('data-testid', 'filter-group-pill-pinned_b')
    })
  })

  it('renders unpinned filters if the selection for it exists', () => {
    render({
      filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER },
      selection: { basic: SIMPLE_FILTER_SELECTION },
    })
    cy.getTestId(FILTER_SELECTOR_ID).should('not.exist')
    cy.get(getFilterSelector('pinned')).should('exist').should('be.visible')
    cy.get(getFilterSelector('basic')).should('exist').should('be.visible')
  })

  // TODO this works, but needs the apply functionality to really be reasonable test
  it('adds a filter when clicked', () => {
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.get(getFilterSelector('basic')).should('not.exist')
    cy.getTestId(FILTER_SELECTOR_ID).click()
    cy.get('[data-testid="dropdown-item-trigger"][value="basic"]').click()
    cy.get(getFilterSelector('basic')).should('exist').should('be.visible')
  })

  //TODO to be added when apply/content functionality is built out
  it.skip('renders added filters in the order in which they were added', () => {})
  it.skip('closes other open filters when a new one is opened', () => {})
  it.skip('removes non-pinned filters if no value is selected', () => {})
  it.skip('opens a filter automatically once it is selected', () => {})
  it.skip('emits @open', () => {})
  it.skip('emits @close', () => {})
  it.skip('emits @apply', () => {})
  it.skip('emits @clear', () => {})
})
