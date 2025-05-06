import type { AnyElementOf, NonUndefined } from '@/types/utils'

export const SkeletonTypeArray = [
  'table',
  'card',
  'form',
  'spinner',
  'fullscreen-kong',
  'fullscreen-generic',
  '', // default Skeleton.vue
] as const

export type SkeletonType = AnyElementOf<typeof SkeletonTypeArray>

export const SkeletonBoxWidthArray = ['1', '2', '5', '6', '10', '25', '50', '75', '100'] as const

export type SkeletonBoxWidth = AnyElementOf<typeof SkeletonBoxWidthArray>

export const SkeletonBoxHeightArray = ['1', '2'] as const

export type SkeletonBoxHeight = AnyElementOf<typeof SkeletonBoxHeightArray>

export interface SkeletonBoxProps {
  /**
   * Width of the skeleton box in relative units.
   * One of ['1', '2', '5', '6', '10', '25', '50', '75', '100'].
   * @default '1'
   */
  width?: SkeletonBoxWidth

  /**
   * Height of the skeleton box in relative units.
   * One of ['1', '2'].
   * @default '1'
   */
  height?: SkeletonBoxHeight
}

export interface SkeletonProps {
  /**
   * The type of skeleton to render.
   * One of ['', 'table', 'card', 'form', 'spinner', 'fullscreen-kong', 'fullscreen-generic'].
   * @default ''
   */
  type?: SkeletonType

  /**
   * Number of milliseconds to wait before showing the skeleton state.
   * @default 0
   */
  delayMilliseconds?: number

  /**
   * Number of the skeleton cards.
   * @default 1
   */
  cardCount?: number

  /**
   * Width of the skeleton card in relative units.
   * @default ''
   */
  cardMaxWidth?: string

  /**
   * Number of the skeleton table rows.
   * @default 5
   */
  tableRows?: number

  /**
   * Number of the skeleton table columns.
   * @default 6
   */
  tableColumns?: number

  /**
   * Progress of the skeleton loading indicator.
   * @default null
   */
  progress?: number | null

  /**
   * Whether to hide the progress bar.
   * @default false
   */
  hideProgress?: boolean

  /**
   * `zIndex` of the skeleton overlay.
   * @default 10500
   */
  zIndex?: number
}

/**
 * @internal
 */
export type SkeletonCardProps = {
  cardCount: SkeletonProps['cardCount']
  maxWidth: SkeletonProps['cardMaxWidth']
}

/**
 * @internal
 */
export type SkeletonTableProps = {
  rows: SkeletonProps['tableRows']
  columns: SkeletonProps['tableColumns']
}

/**
 * @internal
 */
export type SkeletonFullscreenProps = Pick<SkeletonProps, 'progress' | 'hideProgress' | 'zIndex'>

export interface SkeletonSlots {
  /**
   * The content for each skeleton row when `type` is `table`.
   */
  default?(): any

  /**
   * The header of each skeleton card when `type` is `card`.
   */
  'card-header'?(): any

  /**
   * The content of each skeleton card when `type` is `card`.
   */
  'card-content'?(): any

  /**
   * The footer of each skeleton card when `type` is `card`.
   */
  'card-footer'?(): any
}

/**
 * @internal
 */
export type SkeletonCardSlots = Pick<SkeletonSlots, 'card-header' | 'card-content' | 'card-footer'>

/**
 * @internal
 */
export type SkeletonTableSlots = Pick<SkeletonSlots, 'default'>
