import type { AnyElementOf } from '@/types/utils'

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

export const TablePaginationTypeArray = ['default', 'offset'] as const

export type TablePaginationType = AnyElementOf<typeof TablePaginationTypeArray>

export interface TableHeader {
  key: string
  label: string
  sortable?: boolean
  hidable?: boolean
  hideLabel?: boolean
  useSortHandlerFunction?: boolean
}

/**
 * Provide a type interface for KTable `column-*` slot names.
 *
 * This helps TypeScript infer the slot name in the template section so that
 * the slot props can be resolved.
 */
export type TableColumnSlotName = `column-${string}`

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
