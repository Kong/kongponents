import FilterSelector from '@/components/KFilterGroup/FilterSelector.vue'
import type { FilterGroupFilters } from '@/types'

describe('KFilterGroup - FilterSelector', () => {
  const SELECTOR_ID = 'filter-selector'

  const render = ({
    filters,
  }: {
    filters: FilterGroupFilters
  }) => {
    cy.mount(FilterSelector as any, {
      props: {
        filters,
        onSelectFilter: cy.spy().as('selectFilter'),
      },
    })
  }

  it('renders each filter in the dropdown in order', () => {
    const expectedText = ['Ayy', 'Zee', 'Jay']
    render({ filters: {
      a: { label: expectedText[0] },
      z: { label: expectedText[1] },
      j: { label: expectedText[2] },
    } })

    cy.getTestId(SELECTOR_ID).should('exist').click()
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', expectedText.length)
      .each((el, index) => {
        expect(el).to.have.text(expectedText[index])
      })
  })

  it('emits selectFilter with filter key on item click', () => {
    render({ filters: {
      a: { label: 'Ayy' },
    } })

    cy.getTestId(SELECTOR_ID).click()
    cy.get('@selectFilter').should('have.callCount', 0)
    cy.getTestId('dropdown-item-trigger')
      .should('have.length', 1)
      .should('have.text', 'Ayy')
      .click()
    cy.get('@selectFilter').should('have.been.calledWith', 'a')
  })

  it('is focused after click, and unfocused on blur', () => {
    render({ filters: {} })
    cy.getTestId(SELECTOR_ID).should('have.class', 'unfocused')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(SELECTOR_ID).should('have.class', 'focused')
    cy.getTestId(SELECTOR_ID).click()
    cy.getTestId(SELECTOR_ID).should('have.class', 'unfocused')
  })
})
