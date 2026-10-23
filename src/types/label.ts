import type { TooltipAttributes } from './tooltip'

export interface LabelProps {
  /**
   * Use the `info` prop to display information help text.
   * @default ''
   */
  info?: string

  /**
   * Use this prop on labels for required fields.
   * Adds a red dot in front of a label.
   * @default false
   */
  required?: boolean

  /**
   * Use the `tooltipAttributes` prop to configure the KTooltip's props if using the `info` prop.
   * @default {}
   */
  tooltipAttributes?: TooltipAttributes
}

export interface LabelSlots {
  /**
   * Label content.
   */
  default?(): any

  /**
   * Should you need to utilize HTML in the tooltip, you may use the tooltip slot.
   */
  tooltip?(): any
}

export type LabelAttributes = Pick<LabelProps,
  | 'info'
  | 'required'
  | 'tooltipAttributes'
> & {
  'data-testid'?: string
}
