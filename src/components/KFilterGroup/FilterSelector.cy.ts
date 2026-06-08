import FilterSelector from '@/components/KFilterGroup/FilterSelector.vue'
import type { FilterGroupFilters } from '@/types'

describe('KFilterGroup - FilterSelector', () => {
  const SELECTOR_ID = 'filter-selector'
  const FILTERING_ID = 'filter-selector-item-filtering'
  const FILTERING_NO_ITEMS_ID = 'filter-selector-no-items'

  const render = ({
    filters,
    itemFiltering = false,
    slots = {},
  }: {
    filters: FilterGroupFilters
    itemFiltering?: boolean
    slots?: any
  }) => {
    cy.mount(FilterSelector as any, {
      props: {
        filters,
        itemFiltering,
        onSelect: cy.spy().as('select'),
      },
      slots,
    })
  }

  it('renders each filter in the dropdown in order', () => {
    const expectedText = ['Ayy', 'Zee', 'Jay']
    render({ filters: {
      a: { label: expectedText[0]! },
      z: { label: expectedText[1]! },
      j: { label: expectedText[2]! },
    } })

    cy.getTestId(SELECTOR_ID).should('exist').click()
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', expectedText.length)
      .each((el, index) => {
        expect(el).to.have.text(expectedText[index]!)
      })
  })

  it('emits @select with filter key on item click', () => {
    render({ filters: {
      a: { label: 'Ayy' },
    } })

    cy.getTestId(SELECTOR_ID).click()
    cy.get('@select').should('have.callCount', 0)
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 1)
      .should('have.text', 'Ayy')
      .click()
    cy.get('@select').should('have.been.calledWith', 'a')
  })

  it('is focused after click, and unfocused on blur', () => {
    render({ filters: {} })
    cy.getTestId(SELECTOR_ID).should('have.class', 'unfocused')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(SELECTOR_ID).should('have.class', 'focused')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(SELECTOR_ID).should('have.class', 'unfocused')
  })

  it('does not have a search bar when itemFiltering is false', () => {
    render({
      filters: { a: { label: 'Ayy' } },
      itemFiltering: false,
    })
    cy.getTestId(FILTERING_ID).should('not.exist')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(FILTERING_ID).should('not.exist')
  })

  it('has a search bar when itemFiltering is true, and focuses it', () => {
    render({
      filters: { a: { label: 'Ayy' } },
      itemFiltering: true,
    })
    cy.getTestId(FILTERING_ID).should('exist')
    cy.getTestId(FILTERING_ID).should('not.be.visible')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(FILTERING_ID).should('be.visible').and('be.focused')
  })

  it('filters items when you type in the itemFiltering input', () => {
    render({
      filters: {
        a: { label: 'Ayy' },
        b: { label: 'Bee' },
        c: { label: 'Cee' },
        f: { label: 'Eff' },
      },
      itemFiltering: true,
    })
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(FILTERING_NO_ITEMS_ID).should('not.exist')

    cy.getTestId(FILTERING_ID).type('e')
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 3) // b, c, f
      .and('have.text', 'BeeCeeEff')

    cy.getTestId(FILTERING_ID).type('e')
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 2) // b, c
      .and('have.text', 'BeeCee')

    cy.getTestId(FILTERING_ID).type('x')
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 0) // no matches

    cy.getTestId(FILTERING_NO_ITEMS_ID)
      .should('exist')
      .and('be.visible')
  })

  it('exposes a slot for each filter item', () => {
    render({
      filters: {
        a: { label: 'Ayy' },
      },
      slots: {
        'filter-item-a': '<div>hello</div>',
      },
    })
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 1)
      .should('have.text', 'hello')
  })
})
