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
   * One of ['info', 'success', 'warning', 'danger', 'neutral', 'decorative', BadgeMethodAppearance]
   * @default 'info'
   */
  appearance?: BadgeAppearance
  /**
   * Tooltip text that will be displayed on hover.
   */
  tooltip?: string
  /**
   * Whether tooltip should only be shown when the badge is truncated.
   */
  truncationTooltip?: boolean
  /**
   * Max width to apply truncation at
   * Is superseded by CSS variable if both provided
   */
  maxWidth?: string
  /**
   * A boolean whether or not to show the icon before the badge text (or after).
   */
  iconBefore?: boolean
}

export type BadgeSlots = {
  default?(): any
  icon?(): any
}
