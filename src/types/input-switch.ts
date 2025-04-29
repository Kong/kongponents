import type { TooltipAttributes } from './tooltip'

export type InputSwitchSize = 'small' | 'large'

export interface InputSwitchProps {
  /**
  * Sets whether or not toggle is checked.
  */
  modelValue: boolean

  /**
   * Size variations.
   * One of ['small', 'large'].
   * @default 'small'
   */
  size?: InputSwitchSize

  /**
   * Overrides default on/off label text.
   * @default '''
   */
  label?: string

  /**
   * Whether the switch is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The tooltip text to be displayed when the switch is disabled.
   */
  disabledTooltipText?: string

  /**
   * Use the `tooltipAttributes` prop to configure the KTooltip's props when using the `disabledTooltipText` prop.
   * @default {}
   */
  tooltipAttributes?: TooltipAttributes

  /**
   * Whether the label should be placed before the switch.
   * @default false
   */
  labelBefore?: boolean
}

export interface InputSwitchEmits {
  /**
   * Emitted when the switch is toggled.
   */
  change: [value: boolean]

  /**
   * Emitted when the switch is toggled.
   */
  input: [value: boolean]

  /**
   * Emitted when the switch is toggled.
   */
  'update:modelValue': [value: boolean]
}

export interface InputSwitchSlots {
  /**
   * Slot for custom input switch label.
   */
  label?(): any
}
