import type { AnyElementOf } from '@/types/utils'
import type { HeaderTag } from './card'

export const TriggerAlignmentArray = ['leading', 'trailing'] as const

export type TriggerAlignment = AnyElementOf<typeof TriggerAlignmentArray>

export interface CollapseProps {
  /**
   * Whether the collapsible section is collapsed.
   * @default true
   */
  modelValue?: boolean

  /**
   * The title of the collapsible section.
   */
  title?: string

  /**
   * HTML element you want title to be rendered as.
   * One of ['div', 'p', 'span', 'a', 'legend', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].
   * @default 'div'
   */
  titleTag?: HeaderTag

  /**
   * The label of the trigger.
   * @default ''
   */
  triggerLabel?: string

  /**
   * The alignment of the trigger.
   * One of ['leading', 'trailing'].
   * @default 'leading'
   */
  triggerAlignment?: TriggerAlignment
}

export interface CollapseEmits {
  /**
   * Emitted when the trigger is clicked.
   */
  toggle: [collapsed: boolean]

  /**
   * Emitted when the `modelValue` is changed.
   */
  'update:modelValue': [collapsed: boolean]
}

export interface CollapseSlots {
  /**
   * Content to be hidden or shown when clicking the trigger.
   */
  default?(): any

  /**
   * Content displayed above the collapsible content that is always visible.
   */
  'visible-content'?(): any

  /**
   * Contents of the trigger link anchor; click handling is built-in.
   */
  'trigger-content'?(): any

  /**
   * Completely control the trigger, including managing click events.
   */
  trigger?(props: { isCollapsed: boolean, toggle: () => void }): any

  /**
   * Slot for custom title content.
   */
  title?(): any
}
