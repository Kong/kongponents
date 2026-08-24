import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KPagination from '@/components/KPagination/KPagination.vue'

describe('KPagination', () => {
  const myItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const pageSizes = [2, 4, 6]

  /**
   * `data-testid="visible-items"` is rendered twice — once for the large-screen breakpoint
   * and once for the small-screen one — so a bare `getByTestId` is ambiguous under Vitest's
   * strict locators. The 1366px test viewport shows the large-screen copy.
   */
  const visibleItems = () => page.getByCSS('.pagination-text.large-screen[data-testid="visible-items"]')

  it('correctly renders props', async () => {
    const currPage = 2
    await render(KPagination, {
      props: {
        totalCount: 9,
        pageSizes,
        currentPage: currPage,
        items: myItems,
      },
    })

    await expect.element(visibleItems()).toHaveTextContent('3 to 4')
    await expect.element(visibleItems()).toHaveTextContent('of 9')
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(currPage + '')

    for (let i = 0; i < pageSizes.length; i++) {
      await expect.element(page.getByCSS(`[data-testid="dropdown-item-trigger"][value="${pageSizes[i]}"]`)).toBeInTheDocument()
    }
  })

  it('goes to first page', async () => {
    await render(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
      },
    })

    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(1 + '')
    await page.getByTestId('next-button').click()
    await page.getByTestId('next-button').click()
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(3 + '')
    await page.getByTestId('page-1-button').click()
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(1 + '')
  })

  it('goes to previous page', async () => {
    await render(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
      },
    })

    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(1 + '')
    await page.getByTestId('next-button').click()
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(2 + '')
    await page.getByTestId('previous-button').click()
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent(1 + '')
  })

  it('can change page size', async () => {
    await render(KPagination, {
      props: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
      },
    })

    await expect.element(page.getByTestId('page-size-dropdown-trigger')).toHaveTextContent('2 items per page')
    await page.getByTestId('page-size-dropdown-trigger').click()
    await page.getByCSS('[data-testid="dropdown-item-trigger"][value="4"]').click()
    await expect.element(page.getByTestId('page-size-dropdown-trigger')).toHaveTextContent('4 items per page')
  })

  it('does not render the detached last-page button when mounted on the last page', async () => {
    // Reproduces a bug where mounting at the last page rendered "1 ... 7 8 ... 8"
    // (the last page number appeared both inside pagesVisible and as the detached last-page button)
    await render(KPagination, {
      props: {
        totalCount: 116,
        pageSizes: [15, 30, 50],
        initialPageSize: 15,
        currentPage: 8,
      },
    })

    await expect.element(page.getByTestId('last-button')).not.toBeInTheDocument()
    await expect.poll(() => page.getByCSS('[data-testid="page-8-button"]').all().length).toBe(1)
    await expect.element(page.getByCSS('.pagination-button.active')).toHaveTextContent('8')
  })
})
