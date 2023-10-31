export type BadgeMethodAppearance = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'connect' | 'trace' | 'custom'
export type BadgeAppearance = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | BadgeMethodAppearance
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
  neutral: 'neutral',
  ...BadgeMethodAppearances,
} as const
