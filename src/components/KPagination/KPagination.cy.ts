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

  it('does not render the detached last-page button when mounted on the last page', () => {
    // Reproduces a bug where mounting at the last page rendered "1 ... 7 8 ... 8"
    // (the last page number appeared both inside pagesVisible and as the detached last-page button)
    cy.mount(KPagination, {
      props: {
        totalCount: 116,
        pageSizes: [15, 30, 50],
        initialPageSize: 15,
        currentPage: 8,
        testMode: true,
      },
    })

    cy.getTestId('last-button').should('not.exist')
    cy.get('[data-testid="page-8-button"]').should('have.length', 1)
    cy.get('.pagination-button.active').should('contain.text', '8')
  })
})
