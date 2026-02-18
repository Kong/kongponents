import type { SelectEntry } from './select'
import type { PopPlacement } from './popover'

/**
 * The filter's operator:
 *
 * eq - equal
 * neq - not equal
 * contains - interpretation depends on the filter's implementation
 * exists - interpretation depends on the filter's implementation
 * lt - less than
 * lte - less than or equal to
 * gt - greater than
 * gte - greater than or equal to
 */
export type FilterOperator = 'eq' | 'neq' | 'contains' | 'exists' | 'lt' | 'lte' | 'gt' | 'gte'

export interface Filter {
  /**
   * Displays in the filter selection dropdown and in the pill
   */
  label: string

  /**
   * The list of FilterOperators supported by this filter
   * @default ['eq']
   */
  operators?: FilterOperator[]

  /**
   * The list of options the user can choose from in the filter. If unset, the
   * filter renders a text input instead
   * @default undefined
   */
  options?: SelectEntry[]

  /**
   * Whether a user can select more than one `option` or not.
   * @default false
   */
  multiple?: boolean

  /**
   * If true the filter's pill is always rendered, regardless of whether it has
   * an active selection.
   * @default false
   */
  pinned?: boolean

  /**
   * The placement this filter's popover should use
   * @default 'bottom-start'
   */
  placement?: PopPlacement
}

export interface FilterSelection {
  /**
   * The operator this selection should be evaluated with
   */
  operator: FilterOperator

  /**
   * The value input by the user
   */
  value: string | string[] | number | number[]

  /**
   * The user facing display string for this selection. Displays in the pill and
   * is truncated with an ellipsis when too long.
   */
  text: string
}

/**
 * All filters the KFilterGroup can render
 */
export type FilterGroupFilters = Record<string, Filter>

/**
 * The selection for an entire KFilterGroup
 */
export type FilterGroupSelection = Record<string, FilterSelection | undefined>

/**
 * @internal
 */
export interface FilterPillProps {
  /**
   * The filter this pill renders
   */
  filter: Filter

  /**
   * Whether to initialize the pill with its popover open
   * @default false
   */
  initOpen?: boolean

  /**
   * This filter's current selection
   * @default undefined
   */
  selection?: FilterSelection
}

export interface FilterGroupProps {
  /**
   * The filters to render in the KFilterGroup. Displays pinned filters as pills
   * in the order they are defined. All other filters are displayed in the
   * FilterSelector in the order in which they are defined.
   */
  filters: FilterGroupFilters

  /**
   * The label to display on the FilterSelector
   * @default 'Add filter'
   */
  selectorLabel?: string
}

export interface FilterGroupEmits {
  /**
   * When a user triggers "apply" in a filter's popover, this is fired. Provides
   * the key of the filter that was triggered and the KFilterGroup's new
   * selection object.
   */
  apply: [appliedFilterKey: string, selection: FilterGroupSelection]

  /**
   * When a user triggers the X on a filter pill, this is fired. Provides the
   * key of the filter that was triggered and the KFilterGroup's new selection
   * object.
   */
  clear: [clearedFilterKey: string, selection: FilterGroupSelection]

  /**
   * When a user triggers a filter's popover to open, this is fired. Provides the
   * key of the filter that was triggered.
   */
  open: [openedFilterKey: string]

  /**
   * When a user triggers a filter's popover to close, this is fired. Provides the
   * key of the filter that was triggered.
   */
  close: [closedFilterKey: string]
}