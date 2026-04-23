import KFilterGroup from '@/components/KFilterGroup/KFilterGroup.vue'
import type { Filter, FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@/types'

describe('KFilterGroup', () => {
  const FILTER_LABEL_ID = 'filter-group-label'
  const FILTER_SELECTOR_ID = 'filter-selector'
  const CANCEL_ID = 'filter-pill-cancel'
  const APPLY_ID = 'filter-pill-apply'
  const INPUT_ID = 'filter-pill-input'
  const CLEAR_ID = 'interactive-pill-clear-icon'
  const getFilterSelector = (key: string) => `[data-testid="filter-group-pill-${key}"] .interactive-pill`
  const getPopoverSelector = (key: string) => `[data-testid="filter-group-pill-${key}"] .popover`

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

  const addAndApplyInputFilter = (key: string) => {
    cy.getTestId(FILTER_SELECTOR_ID).click()
    cy.get(`[data-testid="dropdown-item-trigger"][value="${key}"]`).click()
    cy.get(getPopoverSelector(key)).findTestId(INPUT_ID).type('foo')
    cy.get(getPopoverSelector(key)).findTestId(APPLY_ID).click()
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
    const pillSelect = '[data-testid*="filter-group-pill-"]'
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

  it('adds a filter when clicked', () => {
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.get(getFilterSelector('basic')).should('not.exist')
    cy.getTestId(FILTER_SELECTOR_ID).click()
    cy.get('[data-testid="dropdown-item-trigger"][value="basic"]').click()
    cy.get(getPopoverSelector('basic')).findTestId(INPUT_ID).type('foo')
    cy.get(getPopoverSelector('basic')).findTestId(APPLY_ID).click()
    cy.get(getFilterSelector('basic')).should('exist').should('be.visible')
  })

  it('removes non-pinned filters if no value is selected', () => {
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.get(getFilterSelector('basic')).should('not.exist')
    cy.getTestId(FILTER_SELECTOR_ID).click()
    cy.get('[data-testid="dropdown-item-trigger"][value="basic"]').click()
    cy.get(getPopoverSelector('basic')).findTestId(CANCEL_ID).click()
    cy.get(getFilterSelector('basic')).should('not.exist')
  })

  it('hides the filter selector when all filters are visible', () => {
    render({ filters: { pinned: PINNED_FILTER } })
    cy.getTestId(FILTER_SELECTOR_ID).should('not.exist')
  })

  it('hides the filter selector when all filters are visible because the user added them', () => {
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.getTestId(FILTER_SELECTOR_ID).should('exist')
    addAndApplyInputFilter('basic')
    cy.getTestId(FILTER_SELECTOR_ID).should('not.exist')
  })

  it('renders added filters in the order in which they were added', () => {
    render({
      filters: {
        basic_a: BASIC_FILTER,
        basic_z: BASIC_FILTER,
        basic_b: BASIC_FILTER,
      },
    })
    addAndApplyInputFilter('basic_z')
    addAndApplyInputFilter('basic_b')
    addAndApplyInputFilter('basic_a')

    const pillSelect = '[data-testid*="filter-group-pill-"]'

    cy.get(pillSelect).should('have.length', 3).then(($els) => {
      expect($els.eq(0)).to.have.attr('data-testid', 'filter-group-pill-basic_z')
      expect($els.eq(1)).to.have.attr('data-testid', 'filter-group-pill-basic_b')
      expect($els.eq(2)).to.have.attr('data-testid', 'filter-group-pill-basic_a')
    })
  })

  it('emits @open', () => {
    cy.get('@open').should('have.callCount', 0)
    cy.get('@close').should('have.callCount', 0)

    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.get(getFilterSelector('pinned')).click()

    cy.get('@open').should('have.callCount', 1)
    cy.get('@close').should('have.callCount', 0)
  })

  it('emits @close', () => {
    cy.get('@open').should('have.callCount', 0)
    cy.get('@close').should('have.callCount', 0)

    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    cy.get(getFilterSelector('pinned')).click()

    cy.get('@open').should('have.callCount', 1)
    cy.get('@close').should('have.callCount', 0)

    cy.get(getFilterSelector('pinned')).click()

    cy.get('@open').should('have.callCount', 1)
    cy.get('@close').should('have.callCount', 1)
  })

  it('emits @apply', () => {
    cy.get('@apply').should('have.callCount', 0)
    render({ filters: { basic: BASIC_FILTER, pinned: PINNED_FILTER } })
    addAndApplyInputFilter('basic')
    cy.get('@apply').should('have.callCount', 1)
  })

  it('emits @clear', () => {
    cy.get('@apply').should('have.callCount', 0)
    cy.get('@clear').should('have.callCount', 0)

    render({ filters: { basic: BASIC_FILTER } })
    addAndApplyInputFilter('basic')

    cy.get('@apply').should('have.callCount', 1)
    cy.get('@clear').should('have.callCount', 0)

    cy.getTestId(CLEAR_ID).click()

    cy.get('@apply').should('have.callCount', 1)
    cy.get('@clear').should('have.callCount', 1)
  })
})
