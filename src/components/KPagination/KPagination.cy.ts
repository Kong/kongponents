import { mount } from 'cypress/vue'
import KPagination from '@/components/KPagination/KPagination.vue'

describe('KPagination', () => {
  const myItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const pageSizes = [2, 4, 6]

  it('correctly renders props', () => {
    const currPage = 2
    mount(KPagination, {
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
    cy.get('.pagination-button.active a').should('contain.text', currPage + '')

    for (let i = 0; i < pageSizes.length; i++) {
      cy.getTestId(`k-select-item-${pageSizes[i]}`).should('exist')
    }
  })

  it('goes to first page', () => {
    mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.get('.pagination-button.active').should('contain.text', 1 + '')
    cy.getTestId('next-btn').find('a').click()
    cy.getTestId('next-btn').find('a').click()
    cy.get('.pagination-button.active').should('contain.text', 3 + '')
    cy.getTestId('page-1-btn').find('a').click()
    cy.get('.pagination-button.active').should('contain.text', 1 + '')
  })

  it('goes to previous page', () => {
    mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.get('.pagination-button.active').should('contain.text', 1 + '')
    cy.getTestId('next-btn').find('a').click()
    cy.get('.pagination-button.active').should('contain.text', 2 + '')
    cy.getTestId('prev-btn').find('a').click()
    cy.get('.pagination-button.active').should('contain.text', 1 + '')
  })

  it('can change page size', () => {
    mount(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true,
      },
    })

    cy.getTestId('k-select-input').find('.k-button').should('contain.text', '2 items per page')
    cy.getTestId('k-select-input').find('button').click({ multiple: true, force: true })
    cy.getTestId('k-select-item-4').find('button').click({ multiple: true, force: true })
    cy.getTestId('k-select-input').find('.k-button').should('contain.text', '4 items per page')
  })
})
