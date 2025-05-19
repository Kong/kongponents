import type { LabelAttributes } from './label'

export interface FileUploadProps {
  /**
   * Use the `labelAttributes` prop to configure the KLabel's props if using the `label` prop.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * String to be used as the label.
   * @default ''
   */
  label?: string

  /**
   * String to be displayed as help text.
   * @default ''
   */
  help?: string

  /**
   * The text that will be displayed on the button that triggers the click on the input.
   * @default 'Select file'
   */
  buttonText?: string

  /**
   * Placeholder to be displayed when no file is selected.
   * @default 'No file selected'
   */
  placeholder?: string

  /**
   * The file types the component can accept. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) for more information.
   */
  accept: string[]

  /**
   * The maximize size of file that can be uploaded.
   * The default maximum size is 5MB if not specified.
   * @default null
   */
  maxFileSize?: number

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @default false
   */
  error?: boolean

  /**
   * String to be displayed as an error message if `error` prop is `true`.
   * This prop will supersede the `help` prop if both have a value and `error` is `true`.
   * @default false
   */
  errorMessage?: string

  /**
   * Whether the file upload is disabled.
   * @default false
   */
  disabled?: boolean
}

export interface FileUploadEmits {
  'file-added': [value: FileList]
  'file-removed': []
  error: [value: FileList]
}

export interface FileUploadSlots {
  /**
   * Slot for an icon in front of the input field.
   */
  icon?(): any

  /**
   * Use this slot if you want to utilize HTML in the input label's tooltip.
   */
  'label-tooltip'?(): any
}
