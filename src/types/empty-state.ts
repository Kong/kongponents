export enum EmptyStateIconVariants {
  Default = 'default',
  Error = 'error',
  Search = 'search',
  Kong = 'kong',
}

export interface EmptyStateProps {
  /**
   * The title of the empty state.
   * @default ''
   */
  title?: string

  /**
   * The message of the empty state.
   * @default ''
   */
  message?: string

  /**
   * When true, shows action button.
   * @default true
   */
  actionButtonVisible?: boolean

  /**
   * Text within action button.
   * @default ''
   */
  actionButtonText?: string

  /**
   * When true, disable the action button.
   * @default false
   */
  actionButtonDisabled?: boolean

  /**
   * Type of the icon in empty state.
   * One of ['default', 'error', 'search', 'kong'].
   * @default 'default'
   */
  iconVariant?: EmptyStateIconVariant
}

export interface EmptyStateEmits {
  /**
   * Emitted when dismiss button is clicked.
   */
  'click-action': []
}

export interface EmptyStateSlots {
  /**
   * Slot for empty state content.
   */
  default?(): any

  /**
   * Slot for custom icon of the empty state.
   */
  icon?(): any

  /**
   * Slot for custom title of the empty state.
   */
  title?(): any

  /**
   * Slot for custom action area of the empty state.
   */
  action?(): any
}

export type EmptyStateIconVariant = `${EmptyStateIconVariants}`
