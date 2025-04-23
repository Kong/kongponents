import { type PopoverAttributes } from './popover'
export interface MultiselectItem {
  label: string
  value: string
  key?: string
  selected?: boolean
  disabled?: boolean
  custom?: boolean
  group?: string
}

export interface MultiselectFilterFunctionParams {
  items: MultiselectItem[]
  query: string
}

export type DropdownFooterTextPosition = 'sticky' | 'static'

export interface MultiselectProps {
  /**
   * The current value of the multiselect (v-model).
   * @default []
   */
  modelValue?: string[]

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
  labelAttributes?: Record<string, any>

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
  kpopAttributes?: Omit<PopoverAttributes, 'target' | 'trigger'>

  /**
   * The maximum height of the dropdown.
   * @default '300'
   */
  dropdownMaxHeight?: string

  /**
   * The width of the multiselect and popover's min-width.
   * @default '100%'
   */
  width?: string

  /**
   * Number of rows of selections to show when focused.
   * @default 1
   */
  selectedRowCount?: number

  /**
   * Determines whether to show total selected count (false), or
   * row(s) of selections when collapsed
   * @default false
   */
  collapsedContext?: boolean

  /**
   * The items available for selection.
   * Items must have a label and value.
   * {
   *  label: 'Item 1',
   *  value: 'item1'
   * }
   * @default []
   */
  items?: MultiselectItem[]

  /**
   * Override the default filter functionality of case-insensitive search on the label.
   * @default (params) => params.items.filter(item => item.label?.toLowerCase().includes(params.query?.toLowerCase()))
   */
  filterFunction?: (params: MultiselectFilterFunctionParams) => MultiselectItem[]

  /**
   * A flag for enabling autosuggest mode.
   * @default false
   */
  autosuggest?: boolean

  /**
   * Allow creating new items.
   * @default false
   */
  enableItemCreation?: boolean

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

export interface MultiselectEmits {
  'selected': [items: MultiselectItem[]]
  'input': [values: string[]]
  'change': [item: MultiselectItem | null]
  'update:modelValue': [values: string[]]
  'query-change': [query: string]
  'item-added': [item: MultiselectItem]
  'item-removed': [item: MultiselectItem]
}

export interface MultiselectSlots {
  /**
   * Slot for customizing multiselect label's tooltip.
   */
  'label-tooltip'?: () => any

  /**
   * Slot to customize the look and feel of items.
   */
  'item-template'?: (props: { item: MultiselectItem }) => any

  /**
   * Slot for empty state dropdown of the multiselect.
   */
  empty?: () => any

  /**
   * Slot for dropdown footer in multiselect.
   */
  'dropdown-footer-text'?: () => any
}
