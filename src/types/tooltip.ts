import type { PopoverAttributes, PopPlacement } from './popover'

export interface TooltipProps {
  /**
   * Text to show in tooltip.
   * @default ''
   */
  text?: string

  /**
   * Define which side the tooltip displays.
   * One of ['auto', 'top', 'top-start', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end'].
   * @default 'bottom'
   */
  placement?: PopPlacement

  /**
   * Set the max-width of the ktooltip.
   * @default 'none'
   */
  maxWidth?: number | string

  /**
   * Text to show in tooltip.
   * @default ''
   * @deprecated Use `text` instead.
   */
  label?: string

  /**
   * A string to be used as id attribute on underlying `role="tooltip"` element.
   * Useful for setting accessible attributes (such as `aria-describedby`) on other elements.
   * @default ''
   */
  tooltipId?: string

  /**
   * The `z-index` value for the tooltip.
   * @default 9999
   */
  zIndex?: number

  /**
   * Use the kpopAttributes prop to configure the underlying KPop's props.
   * @default {}
   */
  kpopAttributes?: PopoverAttributes

  /**
   * Whether the tooltip should be disabled.
   * @default false
   */
  disabled?: boolean
}

export interface TooltipSlots {
  /**
   * The default slot takes in the element you want the popover to be triggered over.
   */
  default?(): any

  /**
   * The content slot allows you to slot in any html content.
   */
  content?(): any
}

export type TooltipAttributes = Pick<TooltipProps, 'label' | 'placement' | 'maxWidth'>
