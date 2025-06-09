import type { LimitExceededData } from './input'
import type { LabelAttributes } from './label'

/**
 * @deprecated Use `LimitExceededData` instead.
 */
export type TextAreaLimitExceed = LimitExceededData

export interface TextAreaProps {
  /**
   * To set the value of the textarea without using `v-model`.
   * @default ''
   */
  modelValue?: string

  /**
   * String to be used as the textarea label.
   * @default ''
   */
  label?: string

  /**
   * Use the `labelAttributes` prop to configure the KLabel's props when using the `label` prop.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * Use this prop to specify a character limit for the input.
   * See the @char-limit-exceeded event for more details.
   * @default 2048
   */
  characterLimit?: false | number

  /**
   * `rows` can be used to specify height of the textarea.
   * @default 5
   */
  rows?: number

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @default false
   */
  error?: boolean

  /**
   * Whether to allow vertically resizing using the drag handle in the right-hand corner of the textarea.
   * @default false
   */
  resizable?: boolean

  /**
   * Whether to automatically adjust the height of the textarea based on its content.
   * @default false
   */
  autosize?: boolean

  /**
   * String to be displayed as help text.
   * @default ''
   */
  help?: string

  /**
   * Whether to allow vertically resizing using the drag handle in the right-hand corner of the textarea.
   * @default false
   * @deprecated Use `resizable` instead.
   */
  isResizable?: boolean

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @default false
   * @deprecated Use `error` instead.
   */
  hasError?: boolean
}

export interface TextAreaEmits {
  /**
   * Triggered when the value of the textarea changes.
   */
  input: [value: string]

  /**
   * Triggered when the value of the textarea changes.
   */
  'update:modelValue': [value: string]

  /**
   * Triggers when the text starts or stops exceeding the limit, returns an object @LimitExceededData.
   */
  'char-limit-exceeded': [data: LimitExceededData]
}

export interface TextAreaSlots {
  /**
   * Slot for tooltip content if textarea has a label and label has tooltip.
   */
  'label-tooltip'?: () => any
}
