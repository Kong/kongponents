import type { TooltipAttributes } from './tooltip'

export type BadgeMethodAppearance = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'connect' | 'trace' | 'custom'
export type BadgeAppearance = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'decorative' | BadgeMethodAppearance
export type BadgeMethodAppearanceRecord = Record<BadgeMethodAppearance, BadgeMethodAppearance>
export type BadgeAppearanceRecord = Record<BadgeAppearance, BadgeAppearance>

export const BadgeMethodAppearances: BadgeMethodAppearanceRecord = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch',
  options: 'options',
  head: 'head',
  connect: 'connect',
  trace: 'trace',
  custom: 'custom',
} as const

export const BadgeAppearances: BadgeAppearanceRecord = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  decorative: 'decorative',
  neutral: 'neutral',
  ...BadgeMethodAppearances,
} as const

export interface BadgeProps {
  /**
   * Base style of the badge.
   * One of ['info', 'success', 'warning', 'danger', 'neutral', 'decorative', BadgeMethodAppearance].
   * @default 'info'
   */
  appearance?: BadgeAppearance

  /**
   * Tooltip text that will be displayed on hover.
   * @default false
   */
  tooltip?: string

  /**
   * Whether tooltip should only be shown when the badge is truncated.
   * @default true
   */
  truncationTooltip?: boolean

  /**
   * Max width to apply truncation at
   * Is superseded by CSS variable if both provided.
   * @default '200px'
   */
  maxWidth?: number | string

  /**
   * A boolean whether or not to show the icon before the badge text (or after).
   * @default true
   */
  iconBefore?: boolean

  /**
   * Use the `tooltipAttributes` prop to configure the KTooltip's props when using the `tooltip` prop.
   * @default {}
   */
  tooltipAttributes?: TooltipAttributes
}

export type BadgeSlots = {
  /**
   * The badge content.
   */
  default?(): any

  /**
   * Used to pass an icon or (other element) into the badge. Positioning (whether this slot content is rendered before or after the badge content) is configured with the `iconBefore` prop.
   */
  icon?(): any
}
