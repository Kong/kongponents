import type { AnyElementOf } from '@/types/utils'

export type SortColumnOrder = 'asc' | 'desc'

export interface TablePreferences {
  /** The number of items to display per page */
  pageSize?: number
  /** The column to sort by's `key` defined in the table headers */
  sortColumnKey?: string
  /** The order by which to sort the column, one of `asc` or `desc` */
  sortColumnOrder?: SortColumnOrder
}

export const TablePaginationTypeArray = ['default', 'offset', 'cursor'] as const

export type TablePaginationType = AnyElementOf<typeof TablePaginationTypeArray>

export interface TableHeader {
  key: string
  label: string
  sortable?: boolean
  hideLabel?: boolean
  useSortHandlerFn?: boolean
}

/**
 * Provide a type interface for KTable `column-*` slot names.
 *
 * This helps TypeScript infer the slot name in the template section so that
 * the slot props can be resolved.
 */
export type TableColumnSlotName = `column-${string}`

export type TableState = 'loading' | 'error' | 'success'

export const TableSortOrderArray = ['ascending', 'descending', ''] as const

export type TableSortOrder = AnyElementOf<typeof TableSortOrderArray>

export const TableTestModeArray = ['true', 'loading'] as const
export type TableTestMode = AnyElementOf<typeof TableTestModeArray>

export interface TableSortPayload {
  prevKey: string
  sortColumnKey: string
  sortColumnOrder: string
}
export interface TableStatePayload {
  state: TableState
  hasData: boolean
}
