export type SliderMark = number | {
  value: number
  label: string
}

export interface SliderProps {
  /**
   * Slider label.
   * @default ''
   */
  label?: string

  /**
   * Minimum value of the slider.
   * @default 0
   */
  min?: number

  /**
   * Maximum value of the slider.
   * @default 10
   */
  max?: number

  /**
   * Step value for the slider.
   * @default 1
   */
  step?: number

  /**
   * Show mark text for each step.
   * @default false
   */
  showMarks?: boolean

  /**
   * Custom mark text for the slider steps.
   * @default undefined
   */
  marks?: SliderMark[]

  /**
   * Whether the slider is disabled.
   * @default false
   */
  disabled?: boolean
}

export interface SliderEmits {
  /**
   * Fired on change, returns the new value of the slider.
   */
  change: [value: number]

  /**
   * Fired on change, returns the new value of the slider.
   */
  'update:modelValue': [modelValue: number]
}


