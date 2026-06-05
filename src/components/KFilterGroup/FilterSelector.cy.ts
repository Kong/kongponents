import FilterSelector from '@/components/KFilterGroup/FilterSelector.vue'
import type { FilterGroupFilters } from '@/types'

describe('KFilterGroup - FilterSelector', () => {
  const SELECTOR_ID = 'filter-selector'

  const render = ({
    disabled = false,
    filters,
    slots = {},
  }: {
    disabled?: boolean
    filters: FilterGroupFilters
    slots?: any
  }) => {
    cy.mount(FilterSelector as any, {
      props: {
        disabled,
        filters,
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

  it('while enabled, displays item triggers when clicked', () => {
    render({
      disabled: false,
      filters: { a: { label: 'a' } },
    })

    cy.getTestId(SELECTOR_ID).should('exist').click()
    cy.getTestId('dropdown-item-trigger').should('be.visible')
  })

  it('while disabled, displays nothing when clicked', () => {
    render({
      disabled: true,
      filters: { a: { label: 'a' } },
    })

    cy.getTestId(SELECTOR_ID).should('exist').click()
    cy.getTestId('dropdown-item-trigger').should('not.be.visible')
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
