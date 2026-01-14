import type { LabelAttributes } from './label'
import type { PopoverAttributes } from './popover'

export interface SelectItem<T extends string | number = string | number> extends Record<string, any> {
  label: string
  value: T
  /** Optional parameter that will be appended with `-selected` when selected */
  key?: string
  selected?: boolean
  disabled?: boolean
  group?: string
}

export interface SelectItemWithGroup<T extends string | number = string | number> extends SelectItem<T> {
  group: string
}

export interface SelectGroup<T extends string | number = string | number> extends Record<string, any> {
  label: string
  key?: string
  items: Array<SelectItem<T>>
}

export type SelectEntry<T extends string | number = string | number> =
  | SelectItem<T>
  | SelectGroup<T>

/**
 * @internal
 */
export interface SelectItemProps<T extends string | number> {
  item: SelectItem<T>
}

/**
 * @internal
 */
export interface SelectItemEmits<T extends string | number> {
  selected: [value: SelectItem<T>]
  'arrow-down': []
  'arrow-up': []
}

/**
 * @internal
 */
export interface SelectItemSlots {
  content(): any
}

/**
 * @internal
 */
export interface SelectItemsProps<T extends string | number> {
  items?: Array<SelectEntry<T>>
  itemCreationEnabled?: boolean
  filterString?: string
  itemCreationValid?: boolean
}

/**
 * @internal
 */
export interface SelectItemsEmits<T extends string | number> {
  selected: [item: SelectItem<T>]
  'add-item': []
}

/**
 * @internal
 */
export interface SelectItemsSlots<T extends string | number> {
  content(props: { item: SelectItem<T> }): any
}

export interface SelectFilterFunctionParams<T extends string | number> {
  query: string
  items: Array<SelectItem<T>>
}

export type SelectDropdownFooterTextPosition = 'sticky' | 'static'

export interface SelectProps<T extends string | number, U extends boolean = false> {
  /**
   * To set the value of the select without using `v-model`.
   * @default ''
   */
  modelValue?: NoInfer<(U extends true ? T | string : T) | '' | null>

  /**
   * Attributes to be passed to underlying KPopover component.
   * See KPopover's props for more info.
   * @default {}
   */
  kpopAttributes?: Omit<PopoverAttributes, 'trigger'>

  /**
   * Maximum height for dropdown container.
   * @default '300px'
   */
  dropdownMaxHeight?: number | string

  /**
   * Label associated with the select element.
   * @default ''
   */
  label?: string

  /**
   * Label attributes to be passed to underlying KLabel component.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * The width of the select and popover's min-width.
   * @default '100%'
   */
  width?: number | string

  /**
   * Placeholder to be displayed when no item is selected.
   * @default ''
   */
  placeholder?: string

  /**
   * Items are JSON objects with required 'label' and 'value'.
   * Can be SelectItem or SelectGroup for custom group ordering.
   * {
   *   label: 'Item 1',
   *   value: 'item1'
   * }
   * @default []
   */
  items?: U extends true ? Array<SelectEntry<T | string>> : Array<SelectEntry<T>>

  /**
   * Control whether the select supports filtering.
   * @default false
   */
  enableFiltering?: boolean

  /**
   * Override default filter functionality of case-insensitive search on label.
   * @default (params: SelectFilterFunctionParams) => params?.items?.filter((item: SelectItem) => item.label?.toLowerCase().includes(params.query?.toLowerCase()))
   */
  filterFunction?: NoInfer<
    (params: SelectFilterFunctionParams<U extends true ? T | string : T>) =>
      | (U extends true
        ? Array<SelectItem<T | string>>
        : Array<SelectItem<T>>)
      | true
  >

  /**
   * Loading state in autosuggest.
   * @default false
   */
  loading?: boolean

  /**
   * A flag for clearing selection.
   * @default false
   */
  clearable?: boolean

  /**
   * Dropdown footer text.
   * @default ''
   */
  dropdownFooterText?: string

  /**
   * Dropdown footer text position.
   * Accepted values: 'sticky' and 'static'.
   * @default 'sticky'
   */
  dropdownFooterTextPosition?: SelectDropdownFooterTextPosition

  /**
   * If true and item-template is passed, will display item-template content inside selected-slot-template.
   * @default false
   */
  reuseItemTemplate?: boolean

  /**
   * Allow creating new items.
   * @default false
   */
  enableItemCreation?: boolean & U

  /**
   * Validator function for item creation.
   * @default () => true
   */
  itemCreationValidator?: (query: string) => boolean

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @default false
   */
  error?: boolean

  /**
   * String to be displayed as help text.
   * @default ''
   */
  help?: string
}

export interface SelectEmits<T extends string | number> {
  /**
   * Emitted when a new item is selected.
   */
  selected: NoInfer<[item: SelectItem<T>]>

  /**
   * Emitted when selected item is changed or cleared.
   */
  input: NoInfer<[value: T | null]>

  /**
   * Emitted when selected item is changed or cleared.
   */
  change: NoInfer<[item: SelectItem<T> | null]>

  /**
   * Emitted when selected item is changed or cleared.
   */
  'update:modelValue': NoInfer<[value: T | null]>

  /**
   * Emitted when the query in the input field changes.
   */
  'query-change': [query: string]

  /**
   * Emitted when a new item is created when `enableItemCreation` is true.
   */
  'item-added': [value: SelectItem<string>]

  /**
   * Emitted when an item is removed when `enableItemCreation` is true.
   */
  'item-removed': [value: SelectItem<string>]
}

export interface SelectSlots<T extends string | number> {
  /**
   * Use this slot to pass custom content to the items.
   */
  'item-template'?: NoInfer<(props: { item: SelectItem<T> }) => any>

  /**
   * Use this slot to provide custom content to the selected item.
   */
  'selected-item-template'?: NoInfer<(props: { item: SelectItem<T> }) => any>

  /**
   * A slot alternative for the `dropdownFooterText` prop.
   */
  'dropdown-footer-text'?(): any

  /**
   * Content to be displayed when `loading` prop is true.
   * Note that this slot only applies when `enableFiltering` is true.
   */
  loading?(): any

  /**
   * Slot to display custom content when items is empty or no items match filter query.
   */
  empty?(): any

  /**
   * Use this slot to pass any custom content to label tooltip.
   */
  'label-tooltip'?(): any

  /**
   * Use this slot for inserting icons before the input field.
   */
  before?(): any
}
