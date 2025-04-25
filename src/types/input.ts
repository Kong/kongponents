import type { LabelAttributes } from './label'

export interface InputProps {
  /**
   * To set the value of the input element without using `v-model`.
   * @defaults ''
   */
  modelValue?: string | number

  /**
   * String to be used as the input label.
   * @defaults ''
   */
  label?: string

  /**
   * KCheckbox has an instance of KLabel for supporting tooltip text.
   * Use the labelAttributes prop to configure the KLabel's props.
   * @defaults {}
   */
  labelAttributes?: LabelAttributes

  /**
   * String to be displayed as help text.
   * @defaults ''
   */
  help?: string

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @defaults false
   */
  error?: boolean

  /**
   * String to be displayed as an error message if `error` prop is `true`.
   * This prop will supersede the `help` prop if both have a value and `error` is `true`.
   * @defaults false
   */
  errorMessage?: string

  /**
   * Use this prop to specify a character limit for the input.
   * See the @char-limit-exceeded event for more details.
   * @defaults null
   */
  characterLimit?: number

  /**
   * @deprecated in favor of `error`
   */
  hasError?: boolean

  /**
   * HTML Input Element `type` attribute.
   * @defaults 'text'
   */
  type?: string

  /**
   * When passing type="password", setting showPasswordMaskToggle to true
   * will render an eye icon to the right of input clicking on which
   * allows toggling masking the input value on and off.
   * @defaults false
   */
  showPasswordMaskToggle?: boolean
}

export interface InputEmits {
  /**
   * To listen for changes to the KInput value.
   */
  input: [val: string]

  /**
   * To listen for changes to the KInput value, automatically set by `v-model`.
   */
  'update:modelValue': [val: string]

  /**
   * Fired when the text starts or stops exceeding the limit, returns an object @LimitExceededData.
   */
  'char-limit-exceeded': [val: LimitExceededData]
}

export interface InputSlots {
  /**
   * Inserting icons before the input field.
   */
  before?(): any
  /**
   * Inserting icons after the input field.
   */
  after?(): any
  /**
   * Slot for customizing the input label's tooltip.
   */
  'label-tooltip'?(): any
}

export interface LimitExceededData {
  value: string
  length: number
  characterLimit: number
  limitExceeded: boolean
}
