export type BadgeAppearance = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'custom' | 'neutral'
export type BadgeAppearanceRecord = Record<BadgeAppearance, BadgeAppearance>

export type BadgeShape = 'rounded' | 'rectangular'
export type BadgeShapeRecord = Record<BadgeShape, BadgeShape>

export const BadgeAppearances: BadgeAppearanceRecord = {
  default: 'default',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  custom: 'custom',
  neutral: 'neutral',
} as const

export const BadgeShapes: BadgeShapeRecord = {
  rounded: 'rounded',
  rectangular: 'rectangular',
} as const
