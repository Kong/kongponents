import type { Component } from 'vue'
import type { ButtonAppearance } from './button'
import type { PopoverAttributes } from './popover'

export interface DropdownItem<T extends string | number = string | number> {
  label: string
  // This follows the vue-router RawLocation interface type
  to?: string | object
  value?: T
  selected?: boolean
  hasDivider?: boolean
  danger?: boolean
}

export type DropdownItemType = 'link' | 'button' | 'default'

export type DropdownItemRenderedType = 'link' | 'router-link' | 'button' | 'div'

export interface DropdownItemRenderedComponent {
  tag: string | Component
  onClick?: ((event: MouseEvent) => void)
  attrs: {
    type?: 'button'
    class?: string
    isRounded?: boolean
    disabled?: boolean
    to?: string | object
    href?: string
  }
}

export type DropdownItemRenderedRecord = Record<DropdownItemRenderedType, DropdownItemRenderedComponent>

export interface DropdownItemProps<T extends DropdownItem<string | number> | null> {
  /**
   * See `DropdownItem`.
   * @default null
   */
  item?: T

  /**
   * Use this prop to add a divider above the item.
   * @default false
   */
  hasDivider?: boolean

  /**
   * Whether to apply danger styles to the item.
   * @default false
   */
  danger?: boolean

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the item is selected.
   * @default false
   */
  selected?: boolean

  /**
   * Internal use only - for tracking selection in conjunction with items prop.
   * @internal
   * @default false
   */
  selectionMenuChild?: boolean

  /**
   * The event handler that triggers when the item is clicked.
   */
  onClick?: (event: MouseEvent) => any

  /**
   * Triggers when the item is clicked.
   */

  /**
   * Whether to apply danger styles to the item.
   * @deprecated Use `danger` instead.
   * @default false
   */
  isDangerous?: boolean
}

export interface DropdownItemEmits<T extends DropdownItem<string | number> | null> {
  /**
   * Triggers when the item is clicked.
   */
  click: [event: MouseEvent]

  /**
   * Triggers when the item is clicked when `selectionMenuChild` is true.
   * Returns the selected menu item object or `null`.
   */
  change: NoInfer<[item: T]>
}

export interface DropdownItemSlots {
  /**
   * The label of the item.
   */
  default?: () => any
}

export interface DropdownProps<T extends string | number> {
  /**
   * Use this prop when a visual indication of the currently selected menu item is needed.
   * @default false
   */
  selectionMenu?: boolean

  /**
   * Use this prop to customize the default trigger KButton's `appearance` prop.
   * @default 'primary'
   */
  appearance?: ButtonAppearance


  /**
   * The text for the dropdown trigger button.
   * @default ''
   */
  triggerText?: string

  /**
   * Whether the trigger button should show a caret icon.
   * @default false
   */
  showCaret?: boolean

  /**
   * The width of the dropdown body (defaults to `''`).
   * @default ''
   */
  width?: number | string

  /**
   * Use the `kpopAttributes` prop to configure the KPop props dropdown.
   * @default {}
   */
  kpopAttributes?: Omit<PopoverAttributes, 'trigger'>

  /**
   * An array of objects containing a required `label` property and other optional properties which will render a menu of KDropdownItems.
   * @default []
   */
  items?: Array<DropdownItem<T>>

  /**
   * Whether the dropdown is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Text to display on hover if dropdown is disabled.
   * @default ''
   */
  disabledTooltip?: string

  /**
   * The text for the dropdown trigger button.
   * @deprecated Use `triggerText` instead.
   */
  label?: string
}

export interface DropdownEmits<T extends string | number> {
  /**
   * Triggers when dropdown is opened/closed.
   */
  toggleDropdown: [open: boolean]

  /**
   * Triggers when an item is selected.
   */
  change: NoInfer<[item: DropdownItem<T>]>
}

export interface DropdownSlots {
  /**
   * The trigger element for opening/closing the menu.
   */
  default?: () => any

  /**
   * You can customize the appearance of dropdown items using this slot.
   */
  items?: (props: {
    /**
     * Function that triggers dropdown close.
     */
    closeDropdown: () => void

    /**
     * Function that lets KDropdown track selected item when selectionMenu is true.
     */
    handleSelection: (item: DropdownItem) => void
  }) => any
}
