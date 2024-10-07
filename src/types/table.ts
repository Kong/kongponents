import type { RouteLocationRaw } from 'vue-router'

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

export interface TableViewHeader extends Omit<TableHeader, 'useSortHandlerFunction'> { }

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

export interface DataSelectState {
  rowKey: string
  selected: boolean
  disabled: boolean
}

export enum TableViewHeaderKeys {
  EXPANDABLE = 'expandable',
  ACTIONS = 'actions',
  BULK_ACTIONS = 'bulkActions',
}
