import type { FocusTrapTabbableOptions } from 'focus-trap'
import type { ButtonAppearance } from './button'

export interface ModalProps {
  /**
   * Whether the modal is shown.
   * @default false
   */
  visible?: boolean

  /**
   * Modal title.
   * @default ''
   */
  title?: string

  /**
   * Text displayed in the action button.
   * @default ''
   */
  actionButtonText?: string

  /**
   * Appearance of the action button.
   * One of ['primary', 'secondary', 'tertiary', 'danger', 'none'].
   * @default 'primary'
   */
  actionButtonAppearance?: ButtonAppearance

  /**
   * Whether the action button is disabled.
   * @default false
   */
  actionButtonDisabled?: boolean

  /**
   * Whether to hide the cancel button.
   * @default false
   */
  hideCancelButton?: boolean

  /**
   * Text displayed in the cancel button.
   * @default ''
   */
  cancelButtonText?: string

  /**
   * Appearance of the cancel button.
   * One of ['primary', 'secondary', 'tertiary', 'danger', 'none'].
   * @default 'tertiary'
   */
  cancelButtonAppearance?: ButtonAppearance

  /**
   * Whether the cancel button is disabled.
   * @default false
   */
  cancelButtonDisabled?: boolean

  /**
   * Options to be passed to [focus-trap](https://github.com/focus-trap/focus-trap)'s `tabbableOptions`, which is responsible for trapping focus inside the modal box.
   */
  tabbableOptions?: FocusTrapTabbableOptions

  /**
   * Max width of the modal.
   * @default '500px'
   */
  maxWidth?: number | string

  /**
   * Max height of the modal.
   * @default 'calc(100vh - 200px)'
   */
  maxHeight?: number | string

  /**
   * Whether clicking on backdrop should close the modal.
   * @default false
   */
  closeOnBackdropClick?: boolean

  /**
   * Whether pressing the `escape` key should close the modal.
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to hide close icon next to the title.
   * @default false
   */
  hideCloseIcon?: boolean

  /**
   * Whether the modal window should take up almost the whole screen.
   * @default false
   */
  fullScreen?: boolean

  /**
   * Whether KModal should set focus on the first visible input field as soon as modal opens.
   * @default false
   */
  inputAutofocus?: boolean

  /**
   * `zIndex` value for the modal.
   * @default 1100
   */
  zIndex?: number
}

export interface ModalEmits {
  /**
   * Emitted when action button is clicked.
   */
  proceed: []

  /**
   * Emitted when cancel button or close icon (when not hidden) is clicked.
   */
  cancel: []
}

export interface ModalSlots {
  /**
   * Slot for modal content.
   */
  default?(): any

  /**
   * Slot for modal title.
   */
  title?(): any

  /**
   * Slot for modal footer content.
   */
  footer?(): any

  /**
   * Slot for cusom buttons in modal footer.
   */
  'footer-actions'?(): any

  /**
   * Used to override the default header/content/footer layout with just a wrapper container to provide custom layout.
   */
  content?(): any
}

export type ModalAttributes = Pick<ModalProps,
  | 'tabbableOptions'
  | 'maxWidth'
  | 'maxHeight'
  | 'closeOnBackdropClick'
  | 'inputAutofocus'
>
