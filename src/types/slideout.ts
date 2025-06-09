export interface KSlideoutProps {
  /**
   * Controls the visibility of the slideout.
   * @default false
   */
  visible?: boolean

  /**
   * Enables or disables the overlay, allowing interaction with background content while the slideout is expanded.
   * @default true
   */
  hasOverlay?: boolean

  /**
   * Defines the offset from the top of the page.
   * @default 0
   */
  offsetTop?: number | string

  /**
   * Closes the slideout when clicking outside of it.
   * @default true
   */
  closeOnBlur?: boolean

  /**
   * Closes the slideout when pressing the Escape key.
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * The title displayed at the top of the slideout.
   * @default ''
   */
  title?: string

  /**
   * The maximum width of the slideout.
   * @default '500px'
   */
  maxWidth?: number | string

  /**
   * The z-index of the slideout.
   * @default 9999
   */
  zIndex?: number
}

export interface KSlideoutEmits {
  /**
   * Emitted when the slideout is closed.
   */
  close: []
}

export interface KSlideoutSlots {
  /**
   * Slot for custom content inside the slideout.
   */
  default?: []

  /**
   * Slot for custom title content.
   */
  title?: []
}
