import type { AnyElementOf } from '@/types/utils'
import type { LabelAttributes } from './label'

// TODO: remove when deprecated `type` prop is removed
export const RadioTypesArray = ['', 'radio', 'card'] as const

export type RadioTypes = AnyElementOf<typeof RadioTypesArray>

export type RadioModelValue = string | number | boolean | object

export interface RadioProps<T extends RadioModelValue | null> {
  /**
   * Sets whether or not radio is selected.
   */
  modelValue: T

  /**
   * Text placed to the right of the radio.
   * @default ''
   */
  label?: string

  /**
   * Used to configure the KLabel's props.
   * @default {}
   */
  labelAttributes?: LabelAttributes

  /**
   * Description text placed under the radio label.
   * @default ''
   */
  description?: string

  /**
   * The value of the KRadio option that will be emitted by the `change` and `update:modelValue` events.
   */
  selectedValue: NoInfer<Exclude<T, null>>

  /**
   * Boolean to indicate whether the element is in an error state and should apply error styling.
   * @default false
   */
  error?: boolean

  /**
   * Set this prop to true to change the appearance of the KRadio component to a card-style design.
   * @default false
   */
  card?: boolean

  /**
   * Whether to show the radio button in card.
   * @default true
   */
  cardRadioVisible?: boolean

  /**
   * The type of radio to render.
   * One of ['vertical', 'horizontal'].
   * @default 'vertical'
   */
  cardOrientation?: 'horizontal' | 'vertical'

  /**
   * The type of radio to render.
   * One of ['', 'radio', 'card'].
   * @deprecated Use `card` prop instead.
   * @default ''
   */
  type?: RadioTypes
}

export interface RadioEmits<T extends RadioModelValue> {
  /**
   * Emitted when the radio is selected.
   */
  change: NoInfer<[value: T]>

  /**
   * Emitted when the radio is selected.
   */
  'update:modelValue': NoInfer<[value: T]>
}

export interface RadioSlots {
  /**
   * The label content.
   */
  default(): any

  /**
   * The description content.
   */
  description?(): any

  /**
   * The tooltip content displayed after the radio label.
   */
  tooltip?(): any
}
