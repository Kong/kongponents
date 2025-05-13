export type SegmentedControlSize = 'small' | 'large'

export interface SegmentedControlOption<T extends string | number | boolean = string | number> {
  label?: string
  value: T
  disabled?: boolean
}

export interface SegmentedControlProps<T extends SegmentedControlOption<string | number | boolean>[] | string[]> {
  /**
   * The value of the currently selected option.
   */
  modelValue?: T extends string[] ? T[number] : T extends SegmentedControlOption<string | number | boolean>[] ? T[number]['value'] : never

  /**
   * An array of options for each button.
   */
  options: T

  /**
   * Size variations.
   * One of ['small', 'large'].
   * @default 'small'
   */
  size?: SegmentedControlSize

  /**
   * Whether the control is disabled.
   * @default false
   */
  disabled?: boolean
}

export interface SegmentedControlEmits<T extends string | number | boolean> {
  /**
   * Emitted when the selected value changes.
   */
  click: [value: T]

  /**
   * Emitted when the selected value changes.
   */
  'update:modelValue': [value: T]
}

export interface SegmentedControlSlots<T extends SegmentedControlOption<string | number | boolean>[] | string[]> {
  /**
   * Each option's content.
   */
  'option-label'(props: { option: T extends string[] ? SegmentedControlOption<T[number]> : T[number] }): any
}
