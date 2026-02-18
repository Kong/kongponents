import FilterPill from '@/components/KFilterGroup/FilterPill.vue'
import type { Filter, FilterSelection } from '@/types'

describe('KFilterGroup - FilterPill', () => {
  const PILL_ID = 'filter-pill'
  const CONTENT_ID = 'filter-pill-content'
  const CLEAR_ICON_ID = 'interactive-pill-clear-icon'
  const OPEN_ICON_ID = 'interactive-pill-open-icon'

  const render = ({
    filter,
    initOpen,
    selection = undefined,
  }: {
    filter: Filter
    initOpen?: boolean
    selection?: FilterSelection
  }) => {
    const onApply = cy.spy().as('apply')
    const onClose = cy.spy().as('close')
    const onOpen = cy.spy().as('open')
    const onClear = cy.spy().as('clear')

    cy.mount(FilterPill as any, {
      props: {
        filter,
        initOpen,
        selection,
        onApply,
        onClose,
        onOpen,
        onClear,
      },
    }).as('filterPill')
  }

  it('renders closed by default', () => {
    render({ filter: { label: 'Foo' } })
    cy.getTestId(CONTENT_ID).should('exist').should('not.be.visible')
  })

  it('renders open when initOpen is true', () => {
    render({ filter: { label: 'Foo' }, initOpen: true })
    cy.getTestId(CONTENT_ID).should('exist').should('be.visible')
  })

  it('renders the selection text', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.getTestId(PILL_ID).should('have.text', 'Foo = Ayy')
  })

  it('renders the selection text with the correct operator text', () => {
    render({ filter: { label: 'Foo' } })
    const ops = ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte']
    const expected = [' = ', ' ≠ ', ' in ', ': ', ' < ', ' ≤ ', ' > ', ' ≥ ']

    ops.forEach((op, index) => {
      cy.get('@filterPill')
        .its('wrapper')
        .invoke('setProps', {
          selection: { operator: op, value: 'a', text: 'Ayy' },
        })
      cy.getTestId(PILL_ID).should('have.text', `Foo${expected[index]}Ayy`)
    })
  })

  it('renders clear icon when selection is defined', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.getTestId(CLEAR_ICON_ID).should('exist').should('be.visible')
    cy.getTestId(OPEN_ICON_ID).should('not.exist')
  })

  it('renders open icon when selection is undefined', () => {
    render({
      filter: { label: 'Foo' },
      selection: undefined,
    })
    cy.getTestId(OPEN_ICON_ID).should('exist').should('be.visible')
    cy.getTestId(CLEAR_ICON_ID).should('not.exist')
  })

  it('toggles open state when clicked', () => {
    render({ filter: { label: 'Foo' }, initOpen: true })
    cy.getTestId(CONTENT_ID).should('be.visible')
    cy.getTestId(PILL_ID).click()
    cy.getTestId(CONTENT_ID).should('not.be.visible')
    cy.getTestId(PILL_ID).click()
    cy.getTestId(CONTENT_ID).should('be.visible')
  })

  it('emits @open/@close when opened/closed', () => {
    cy.get('@open').should('have.callCount', 0)
    cy.get('@close').should('have.callCount', 0)

    render({ filter: { label: 'Foo' }, initOpen: true })

    cy.get('@open').should('have.callCount', 1) // because initOpen counts
    cy.get('@close').should('have.callCount', 0)

    cy.getTestId(PILL_ID).click()

    cy.get('@open').should('have.callCount', 1)
    cy.get('@close').should('have.callCount', 1)

    cy.getTestId(PILL_ID).click()

    cy.get('@open').should('have.callCount', 2)
    cy.get('@close').should('have.callCount', 1)
  })

  it('emits @clear when clear button is clicked', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.get('@clear').should('have.callCount', 0)
    cy.getTestId(CLEAR_ICON_ID).click()
    cy.get('@clear').should('have.callCount', 1)
  })

  // TODO update these tests when the content is built
  it.skip('emits apply when apply button is clicked', () => {})
  it.skip('emits close when cancel button is clicked', () => {})
})
