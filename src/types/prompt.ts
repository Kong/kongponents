import type { ButtonAppearance } from './button'
import type { ModalAttributes } from './modal'

export interface PromptProps {
  /**
   * Whether the prompt is shown.
   * @default false
   */
  visible?: boolean

  /**
   * Prompt title.
   * @default ''
   */
  title?: string

  /**
   * Message to be displayed in prompt content section.
   * @default ''
   */
  message?: string

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
   * A string the user must type before the action button becomes enabled.
   * @default ''
   */
  confirmationText?: string

  /**
   * Text shown above the input field when `confirmationText` prop is present.
   * @default 'Type {confirmationText} to confirm your action.'
   */
  confirmationPrompt?: string

  /**
   * `KPrompt` provides a `modalAttributes` prop to expose secondary `KModal` component props for customization.
   * @default {}
   */
  modalAttributes?: ModalAttributes

  /**
   * Error message text that will be displayed once user attempts to proceed after having typed in the wrong confirmation prompt.
   * @default 'You must enter the text as indicated above to confirm.'
   */
  errorMessage?: string
}

export interface PromptEmits {
  /**
   * Emitted when action button is clicked.
   */
  proceed: []

  /**
   * Emitted when cancel button is clicked.
   */
  cancel: []
}

export interface PromptSlots {
  /**
   * Slot for prompt content.
   */
  default?(): any

  /**
   * Slot for prompt title.
   */
  title?(): any
}
