import type { RouteLocationRaw } from 'vue-router'
import type { ButtonAppearance, EmptyStateIconVariant } from '@/types'

export type SortColumnOrder = 'asc' | 'desc'

export interface TablePreferences {
  /** The number of items to display per page */
  pageSize?: number
  /** The column to sort by's `key` defined in the table headers */
  sortColumnKey?: string
  /** The order by which to sort the column, one of `asc` or `desc` */
  sortColumnOrder?: SortColumnOrder
  /** The customized column widths, if resizing is allowed */
  columnWidths?: Record<string, number>
  /** Column visibility, if visibility is toggleable */
  columnVisibility?: Record<string, boolean>
}

export type TableViewData = Record<string, any>[]

/**
 * @deprecated in favor of TableDataHeader
 */
export interface TableHeader {
  /** Must be unique for each column */
  key: string
  /** Visible column header text */
  label?: string
  /** This property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** Allow toggling column visibility */
  hidable?: boolean
  /** When provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** Whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
  /** Whether KTable should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}

export interface TableViewHeader {
  /** Must be unique for each column */
  key: string
  /** Visible column header text */
  label?: string
  /** This property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** Allow toggling column visibility */
  hidable?: boolean
  /** When provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** Whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
}

export interface TableDataHeader extends TableViewHeader {
  /** Whether KTable should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}

/**
 * Provide a type interface for KTable `column-*` and `tooltip-*` slot names.
 *
 * This helps TypeScript infer the slot name in the template section so that
 * the slot props can be resolved.
 */
export type TableColumnSlotName = `column-${string}`
export type TableColumnTooltipSlotName = `tooltip-${string}`

export type TableState = 'loading' | 'error' | 'success' | 'empty'

export interface TableSortPayload {
  prevKey: string
  sortColumnKey: string
  sortColumnOrder: string
}
export interface TableStatePayload {
  state: TableState
  hasData: boolean
}

export interface RowLink {
  /** RouteLocationRaw or url string for row link */
  to?: RouteLocationRaw | string
  /** Target for row link */
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export interface TablePaginationAttributes {
  totalCount?: number
  pageSizes?: number[]
  initialPageSize?: number
  currentPage?: number
  offset?: boolean
  disablePageJump?: boolean
  offsetPreviousButtonDisabled?: boolean
  offsetNextButtonDisabled?: boolean
}

export type RowBulkAction = boolean | { enabled: boolean, disabledTooltip?: string }

export interface SortHandlerFunctionParam {
  /** The key of the column to be sorted */
  key: string
  /** The key of the column previously sorted */
  prevKey: string
  /** The order in which to sort the column (asc or desc) */
  sortColumnOrder: 'asc' | 'desc'
  /** The data returned from the fetcher function response */
  data: Array<Record<string, any>>
}

/**
 * Parameter object for the cellAttrs prop function
 */
export interface CellAttrsParam {
  headerKey: string
  row: Record<string, any>
  rowIndex: number
  colIndex: number
}

interface TablePropsShared {
  /**
   * Allow columns to be resized
   */
  resizeColumns?: boolean
  /**
   * Used to customize the initial state of the table.
   * Column visibility/width.
   */
  tablePreferences?: TablePreferences
  /**
   * Enables hover highlighting to table rows
   */
  rowHover?: boolean
  /**
   * A function that conditionally specifies row attributes on each row
   */
  rowAttrs?: (row: Record<string, any>) => Record<string, any>
  /**
   * A function that conditionally turns a row into a link
   */
  rowLink?: (row: Record<string, any>) => RowLink
  /**
   * A function that conditionally specifies whether bulk actions are disabled for a row and the tooltip to display. Default value: () => true
   */
  rowBulkActionEnabled?: (row: Record<string, any>) => RowBulkAction
  /**
   * Provide the name of the data property key to utilize as a unique identifier, or a function that receives the `row` object as a parameter that generates a unique identifier string for each row.
   */
  rowKey?: string | ((row: Record<string, any>) => string),
  /**
   * A function that conditionally specifies cell attributes
   */
  cellAttrs?: (param: CellAttrsParam) => Record<string, any>
  /**
   * A prop that enables a loading skeleton
   */
  loading?: boolean
  /**
   * A prop to pass in a custom empty state title
   */
  emptyStateTitle?: string
  /**
   * A prop to pass in a custom empty state message
   */
  emptyStateMessage?: string
  /**
   * A prop to pass in a custom empty state action route
   */
  emptyStateActionRoute?: RouteLocationRaw | string
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionMessage?: string
  emptyStateIconVariant?: EmptyStateIconVariant
  emptyStateButtonAppearance?: ButtonAppearance
  /**
   * A prop that enables the error state
   */
  error?: boolean
  /**
   * A prop to pass in a custom error state title
   */
  errorStateTitle?: string
  /**
   * A prop to pass in a custom error state message
   */
  errorStateMessage?: string
  /**
   * A prop to pass in a custom error state action route
   */
  errorStateActionRoute?: RouteLocationRaw | string
  /**
   * A prop to pass in a custom error state action message
   */
  errorStateActionMessage?: string
  maxHeight?: string,
  hidePagination?: boolean
  paginationAttributes?: TablePaginationAttributes
  /**
   * Enable expandable rows
   */
  rowExpandable?: (row: Record<string, any>) => boolean
  /**
   * Hide the table header
   */
  hideHeaders?: boolean
  /**
   * Nested table
   */
  nested?: boolean
  /**
   * A boolean to hide pagination when total table records number is less than or equal to page size
   */
  hidePaginationWhenOptional?: boolean
  /**
   * A prop for hiding the toolbar
   */
  hideToolbar?: boolean
}

export interface TableViewProps extends TablePropsShared {
  data: TableViewData
  /**
   * A prop to pass in an array of headers for the table
   */
  headers: TableViewHeader[]
}

export interface TableDataProps extends TablePropsShared {
  fetcher: (param: TableDataFetcherParams) => Promise<any>
  /**
   * A prop to pass in an array of headers for the table
   */
  headers: TableDataHeader[]
  fetcherCacheKey?: string
  cacheIdentifier?: string
  searchInput?: string
  initialFetcherParams?: TableDataFetcherParams
  clientSort?: boolean
  sortHandlerFunction?: (param: SortHandlerFunctionParam) => Record<string, any>[]
  sortable?: boolean
  hidePaginationWhenOptional?: boolean
}

export interface TableDataFetcherParams {
  /**
   * The number of items to display per page.
   */
  pageSize?: number
  /**
   * The currently active page.
   */
  page?: number
  /**
   * A text string to filter table data on (defined in the searchInput prop).
   */
  query?: string
  /**
   * Sortable column key (defined in the headers prop).
   */
  sortColumnKey?: string
  /**
   * Sorting order.
   */
  sortColumnOrder?: 'asc' | 'desc'
  /**
   * The value of the offset for offset-based pagination. Offset must be included in the fetcher params for offset-based pagination to work properly.
   */
  offset?: string | null
}

export interface TableViewSelectState {
  rowKey: string
  selected: boolean
  disabled: boolean
}

export enum TableViewHeaderKeys {
  EXPANDABLE = 'expandable',
  ACTIONS = 'actions',
  BULK_ACTIONS = 'bulkActions',
}
