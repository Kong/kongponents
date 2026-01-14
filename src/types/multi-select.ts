import type { LabelAttributes } from './label'
import type { PopoverAttributes } from './popover'
export interface MultiselectItem<T extends string = string> {
  label: string
  value: T
  key?: string
  selected?: boolean
  disabled?: boolean
  custom?: boolean
  group?: string
}

export interface MultiselectGroup<T extends string = string> extends Record<string, any> {
  label: string
  key?: string
  items: Array<MultiselectItem<T>>
}

export type MultiselectEntry<T extends string = string> =
  | MultiselectItem<T>
  | MultiselectGroup<T>

export interface MultiselectFilterFunctionParams<T extends string = string> {
  items: Array<MultiselectItem<T>>
  query: string
}

export type DropdownFooterTextPosition = 'sticky' | 'static'

/**
 * @internal
 */
export interface MultiselectItemProps<T extends string> {
  item: MultiselectItem<T>
}

/**
 * @internal
 */
export interface MultiselectItemEmits<T extends string = string> {
  selected: [item: MultiselectItem<T>]
  'arrow-down': []
  'arrow-up': []
}

/**
 * @internal
 */
export interface MultiselectItemSlots {
  content?: () => any
}

/**
 * @internal
 */
export interface MultiselectItemsProps<T extends string> {
  items?: Array<MultiselectEntry<T>>
  itemCreationEnabled?: boolean
  filterString?: string
  itemCreationValid?: boolean
}

/**
 * @internal
 */
export interface MultiselectItemsEmits<T extends string = string> {
  selected: [item: MultiselectItem<T>]
  'add-item': []
}

export interface MultiselectProps<T extends string, U extends boolean = false> {
  /**
   * The current value of the multiselect (v-model).
   * @default []
   */
  modelValue?: U extends true ? Array<T | string> : T[]

  /**
   * The label for the multiselect.
   * @default ''
   */
  label?: string

  /**
   * The help text displayed below the multiselect.
   * @default ''
   */
  help?: string

  /**
   * Indicates whether there is an error state.
   * @default false
   */
  error?: boolean

  /**
   * Additional attributes for the label element.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * The placeholder text displayed when no value is selected.
   * @default ''
   */
  placeholder?: string

  /**
   * The placeholder text displayed in the search input.
   * @default ''
   */
  searchPlaceholder?: string

  /**
   * Attributes for the popover component.
   * @default {}
   */
  kpopAttributes?: Omit<PopoverAttributes, 'trigger'>

  /**
   * The maximum height of the dropdown.
   * @default '300px'
   */
  dropdownMaxHeight?: number | string

  /**
   * The width of the multiselect and popover's min-width.
   * @default '100%'
   */
  width?: number | string

  /**
   * Number of rows of selections to show when focused.
   * @default 1
   */
  selectedRowCount?: number

  /**
   * Determines whether to show total selected count (false), or
   * row(s) of selections when collapsed.
   * @default false
   */
  collapsedContext?: boolean

  /**
   * The items available for selection.
   * Items must have a label and value.
   * {
   *   label: 'Item 1',
   *   value: 'item1'
   * }
   * @default []
   */
  items?: U extends true ? Array<MultiselectEntry<T | string>> : Array<MultiselectEntry<T>>

  /**
   * Override the default filter functionality of case-insensitive search on the label.
   * @default (params) => params.items.filter(item => item.label?.toLowerCase().includes(params.query?.toLowerCase()))
   */
  filterFunction?: (params: MultiselectFilterFunctionParams<(U extends true ? T | string : T)>) => Array<MultiselectItem<(U extends true ? T | string : T)>>

  /**
   * A flag for enabling autosuggest mode.
   * @default false
   */
  autosuggest?: boolean

  /**
   * Allow creating new items.
   * @default false
   */
  enableItemCreation?: boolean & U

  /**
   * Loading state in autosuggest.
   * @default false
   */
  loading?: boolean

  /**
   * The text displayed in the dropdown footer.
   * @default ''
   */
  dropdownFooterText?: string

  /**
   * The position of the dropdown footer text.
   * Accepted values: 'sticky' and 'static'.
   * @default 'sticky'
   */
  dropdownFooterTextPosition?: DropdownFooterTextPosition

  /**
   * Validator function for item creation.
   * @default () => true
   */
  itemCreationValidator?: (query: string) => boolean
}

export interface MultiselectEmits<T extends string = string> {
  selected: [items: Array<MultiselectItem<T>>]
  input: [values: string[]]
  change: [item: MultiselectItem<T> | null]
  'update:modelValue': [values: T[]]
  'query-change': [query: string]
  'item-added': [item: MultiselectItem]
  'item-removed': [item: MultiselectItem<T>]
}

export interface MultiselectSlots<T extends string = string> {
  /**
   * Slot for customizing multiselect label's tooltip.
   */
  'label-tooltip'?: () => any

  /**
   * Slot to customize the look and feel of items.
   */
  'item-template'?: (props: { item: MultiselectItem<T> }) => any

  /**
   * Slot for empty state dropdown of the multiselect.
   */
  empty?: () => any

  /**
   * Slot for dropdown footer in multiselect.
   */
  'dropdown-footer-text'?: () => any

  /**
   * Slot for icon in the selected item badge.
   */
  'item-badge-icon'?: (props: { item: MultiselectItem<T> }) => any
}
