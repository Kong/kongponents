import KPagination from '@/components/KPagination/KPagination.vue'

describe('KPagination', () => {
  const myItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const pageSizes = [2, 4, 6]

  it('correctly renders props', () => {
    const currPage = 2
    cy.mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes,
        currentPage: currPage,
        items: myItems,
        testMode: true,
      },
    })

    cy.getTestId('visible-items').should('contain.text', '3 to 4')
    cy.getTestId('visible-items').should('contain.text', 'of 9')
    cy.get('.pagination-button.active').should('contain.text', currPage + '')

    for (let i = 0; i < pageSizes.length; i++) {
      cy.get(`[data-testid="dropdown-item-trigger"][value="${pageSizes[i]}"]`).should('exist')
    }
  })

  it('goes to first page', () => {
    cy.mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.get('.pagination-button.active').should('contain.text', 1 + '')
    cy.getTestId('next-button').click()
    cy.getTestId('next-button').click()
    cy.get('.pagination-button.active').should('contain.text', 3 + '')
    cy.getTestId('page-1-button').click()
    cy.get('.pagination-button.active').should('contain.text', 1 + '')
  })

  it('goes to previous page', () => {
    cy.mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.get('.pagination-button.active').should('contain.text', 1 + '')
    cy.getTestId('next-button').click()
    cy.get('.pagination-button.active').should('contain.text', 2 + '')
    cy.getTestId('previous-button').click()
    cy.get('.pagination-button.active').should('contain.text', 1 + '')
  })

  it('can change page size', () => {
    cy.mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.getTestId('page-size-dropdown-trigger').contains('2 items per page')
    cy.getTestId('page-size-dropdown-trigger').click({ multiple: true, force: true })
    cy.get('[data-testid="dropdown-item-trigger"][value="4"]').click({ multiple: true, force: true })
    cy.getTestId('page-size-dropdown-trigger').contains('4 items per page')
  })

  it('can keep visible pages after update total count', () => {
    const initialCount = 50
    const updatedCount = 75
    const items = Array.from({ length: initialCount })

    cy.mount(KPagination, {
      props: {
        totalCount: initialCount,
        items,
        pageSizes: [2, 4, 6],
        currentPage: 7,
        testMode: true,
      },
    }).then(({ wrapper }) => {
      cy.get('.pagination-button.active').should('exist')

      wrapper.setProps({ items: Array.from({ length: updatedCount }), totalCount: updatedCount }).then(() => {
        cy.get('.pagination-button.active').should('exist')
      })
    })
  })
})
