import type { AnyElementOf } from '@/types/utils'

export const PopTriggerArray = ['click', 'hover'] as const

export type PopTrigger = AnyElementOf<typeof PopTriggerArray>

export const PopPlacementsArray = [
  'auto',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
] as const

export type PopPlacement = AnyElementOf<typeof PopPlacementsArray>

/**
 * @deprecated Use `PopPlacement` instead.
 */
export type Placement = PopPlacement

/**
 * @deprecated Use `PopPlacement` instead.
 */
export type PopPlacements = PopPlacement

/**
 * @internal
 */
export interface PopTeleportWrapperProps {
  useTeleport?: boolean
  target?: string | null
}

/**
 * @internal
 */
export interface PopTeleportWrapperSlots {
  default(): any
}

export interface PopProps {
  /**
   * Popover trigger button text.
   * @default ''
   */
  buttonText?: string

  /**
   * Popover container title.
   */
  title?: string

  /**
   * Placement of the popover.
   * One of ['auto', 'top', 'top-start', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end'].
   * @default 'auto'
   */
  placement?: PopPlacement

  /**
   * Whether popover should be opened on trigger element click or mouseover.
   * One of ['click', 'hover'].
   * @default 'click'
   */
  trigger?: PopTrigger

  /**
   * The timeout in milliseconds for popover to wait before it closes when trigger prop is hover.
   * @default 300
   */
  popoverTimeout?: number

  /**
   * Whether to hide close button in popover content.
   * @default false
   */
  hideCloseIcon?: boolean

  /**
   * Whether to hide the popover caret.
   * @default false
   */
  hideCaret?: boolean

  /**
   * Whether or not the popover should close when a user clicks within the popover content.
   * @default false
   */
  closeOnPopoverClick?: boolean

  /**
   * Whether the popover should be disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Width of the popover container.
   * @default '200px'
   */
  width?: string

  /**
   * Maximum width of the popover container.
   * @default 'none'
   */
  maxWidth?: string

  /**
   * Maximum height of the popover container.
   * @default 'none'
   */
  maxHeight?: string

  /**
   * List of class names you want to assign to `.k-popover` element.
   * @default ''
   */
  popoverClasses?: string

  /**
   * The tag name of the popover wrapper element.
   * @default 'div'
   */
  tag?: string

  /**
   * The `z-index` value for the popover.
   * @default 1000
   */
  zIndex?: number

  /**
   * The offset of the popover from the trigger element.
   * @default '16px'
   */
  offset?: string

  /**
   * In certain scenarios, you may want to attach the popover to other target elements.
   * To achieve this, use the target prop to specify a selector for the element where the popover will be teleported.
   * When falsy value is passed, the teleport will be disabled, therefore popover won't be teleported.
   * @default null
   */
  target?: string | null
}

export interface PopEmits {
  /**
   * Emitted when the popover is opened.
   */
  open: []

  /**
   * Emitted when the popover is closed.
   */
  close: []

  /**
   * Emitted when the popover content is clicked.
   */
  'popover-click': []
}

export interface PopSlots {
  /**
   * Slot for passing custom popover trigger element.
   */
  default?:() => any

  /**
   * Slot for passing popover content.
   */
  content?:() => any

  /**
   * Slot for passing custom popover title.
   */
  title?:() => any

  /**
   * Slot for passing footer content that goes directly underneath main popover content.
   */
  footer?: () => any
}

export type PopoverAttributes = Pick<PopProps,
  | 'placement'
  | 'popoverClasses'
  | 'popoverTimeout'
  | 'offset'
  | 'width'
  | 'hideCaret'
  | 'maxWidth'
  | 'disabled'
  /** Not supported in KDropdown, KSelect and KMultiselect */
  | 'target'
  | 'trigger'
> & {
  'data-testid'?: string
}
