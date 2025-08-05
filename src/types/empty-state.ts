export enum EmptyStateIconVariants {
  Default = 'default',
  Error = 'error',
  Search = 'search',
  Kong = 'kong',
}

export interface EmptyStateFeature {
  key?: string
  title: string
  description: string
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

  /**
   * Whether the icon should be rendered in a rectangular container.
   * @default false
   */
  iconBackground?: boolean

  /**
   * If provided, will display card for each feature, along with an icon slot, a title, and a short description.
   * @default []
   */
  features?: EmptyStateFeature[]
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

  /**
   * Slot for custom image to be displayed at the top of the empty state instead of the icon.
   */
  image?(): any

  /**
   * Slot for custom icon of the empty state feature card.
   */
  [key: `feature-${string}-icon`]: () => any | undefined

  /**
   * Content to be displayed at the bottom of the empty state component, separated by a divider line.
   */
  footer?(): any
}

export type EmptyStateIconVariant = `${EmptyStateIconVariants}`
