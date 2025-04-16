export interface PageChangeData<T = any> {
  page: number
  pageCount: number
  firstItem: number
  lastItem: number
  visibleItems: T[]
}

export interface PageSizeChangeData {
  pageSize: number
  pageCount: number
}

export interface PaginationProps<T> {
  /**
   * Optional array of items that can be provided for easy pagination.
   * Slice of this array with visible items is returned as visibleItems inside the pageChange event.
   * @default []
   */
  items?: T[]

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
   * @default false
   */
  disablePageJump?: boolean

  /**
   * Enables or disables offset mode(offset mode omits the concept of pages).
   * @default false
   */
  offset?: boolean

  /**
   * Disables the "previous" button in offset mode.
   * @default false
   */
  offsetPreviousButtonDisabled?: boolean

  /**
   * Disables the "next" button in offset mode.
   * @default false
   */
  offsetNextButtonDisabled?: boolean
}

export interface PaginationEmits<T> {
  /**
   * Emitted when the page changes, pass the current page information along with it.
   */
  pageChange: [data: PageChangeData<T>]
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
