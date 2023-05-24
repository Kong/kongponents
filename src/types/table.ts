export interface TablePreferences {
  /** The number of items to display per page */
  pageSize?: number
  /** The column to sort by's `key` defined in the table headers */
  sortColumnKey?: string
  /** The order by which to sort the column, one of `asc` or `desc` */
  sortColumnOrder?: 'asc' | 'desc'
}

export type TablePaginationType = 'default' | 'offset'

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

export type SwrvState = 'VALIDATING' | 'VALIDATING_HAS_DATA' | 'PENDING' | 'SUCCESS' | 'SUCCESS_HAS_DATA' | 'ERROR' | 'STALE_IF_ERROR'

export type EmitState = 'loading' | 'error' | 'empty' | 'has_data'

export interface SwrvStateData {
  hasData: boolean
  state: SwrvState,
  emitState: EmitState
}
