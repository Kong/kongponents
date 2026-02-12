import type { SelectEntry } from './select'
import type { PopPlacement } from './popover'

export type Operator = 'eq' | 'neq' | 'contains' | 'exists' | 'lt' | 'lte' | 'gt' | 'gte'

export interface Filter {
  label: string
  operators?: Operator[]
  options?: SelectEntry[]
  multiple?: boolean
  pinned?: boolean
  placement?: PopPlacement
}

export interface FilterSelection {
  operator: Operator
  value: string | string[] | number | number[] | boolean | boolean[]
  text: string
}

export type FilterGroupFilters = Record<string, Filter>
export type FilterGroupSelection = Record<string, FilterSelection | undefined>

export interface FilterGroupProps {
  filters: FilterGroupFilters
}

export interface FilterGroupEmits {
  apply: [appliedFilterKey: string, selection: FilterGroupSelection]
  clear: [clearedFilterKey: string, selection: FilterGroupSelection]
  open: [openedFilterKey: string]
  close: [closedFilterKey: string]
}