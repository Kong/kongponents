import type { LabelAttributes } from './input'

export interface CheckboxProps {
  /**
   * Use v-model to bind the checked state of the underlying <input>.
   * The v-model binds to the modelValue prop of the component and sets
   * current checked state of the input.
   * @required
   */
  modelValue: boolean

  /**
   * Will place label text to the right of the checkbox. Can also be slotted.
   * @default ''
   */
  label?: string

  /**
   * KCheckbox has an instance of KLabel for supporting tooltip text.
   * Use the labelAttributes prop to configure the KLabel's props.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * Will place description text under the checkbox label. Can also be slotted.
   * @default ''
   */
  description?: string

  /**
   * Use this prop to apply error styling to the component.
   * @default false
   */
  error?: boolean
}

export interface CheckboxEmits {
  /**
   * Fired on change, returns the checked status of the checkbox (boolean).
   */
  change: [changed: boolean]

  /**
   * Fired on change, returns the checked status of the checkbox (boolean).
   */
  input: [value: boolean]

  /**
   * Fired on change, returns the checked status of the checkbox (boolean).
   */
  'update:modelValue': [modelValue: boolean]
}

export interface CheckboxSlots {
  /**
   * Content passed in to the default slot will be shown as the label content.
   * The slot content takes precedence over the label prop.
   */
  default?(): any

  /**
   * Provides a slot for tooltip content displayed after the checkbox label.
   */
  tooltip?(): any

  /**
   * Content passed in to the description slot will be shown as the description content.
   * The slot content takes precedence over the description prop.
   */
  description?(): any
}
