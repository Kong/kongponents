export interface PageChangeData {
  page: number
  pageCount: number
  firstItem: number
  lastItem: number
  visibleItems: any[]
}

export interface PageSizeChangeData {
  pageSize: number
  pageCount: number
}

export interface PaginationProps {
  /**
   * The array of items to be paginated.
   * @default []
   */
  items?: any[]

  /**
   * The total number of items.
   * @default 0
   */
  totalCount?: number

  /**
   * The available page size options.
   * @default [15, 30, 50, 75, 100]
   */
  pageSizes?: number[]

  /**
   * The initial page size.
   * @default null
   */
  initialPageSize?: number | null

  /**
   * The number of neighboring pages to display on each side of the current page.
   * @default 1
   */
  neighbors?: number

  /**
   * The current page number.
   * @default null
   */
  currentPage?: number | null

  /**
   * Disables the page jump functionality.
   */
  disablePageJump?: boolean

  /**
   * Enables or disables offset mode(offset mode omits the concept of pages).
   */
  offset?: boolean

  /**
   * Disables the "previous" button in offset mode.
   */
  offsetPreviousButtonDisabled?: boolean

  /**
   * Disables the "next" button in offset mode.
   */
  offsetNextButtonDisabled?: boolean
}

export interface PaginationEmits {
  /**
   * Emitted when the page changes, pass the current page information along with it.
   */
  pageChange: [data: PageChangeData]
  /**
   * Emitted when the page size changes, pass the current page size and page count.
   */
  pageSizeChange: [data: PageSizeChangeData]
  /**
   * Emitted when going to the next page in offset mode.
   */
  getNextOffset: []
  /**
   * Emitted when going to the previous page in offset mode.
   */
  getPreviousOffset: []
}
