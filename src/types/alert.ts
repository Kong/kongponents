export type AlertAppearance = 'info' | 'success' | 'danger' | 'warning'
export type AlertAppearanceRecord = Record<AlertAppearance, AlertAppearance>

export const AlertAppearances: AlertAppearanceRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
}
