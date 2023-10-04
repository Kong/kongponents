export type AlertAppearance = 'info' | 'success' | 'danger' | 'warning'
export type AlertAppearanceRecord = Record<AlertAppearance, AlertAppearance>

export type AlertSize = '' | 'small' | 'large'
export type AlertType = 'alert' | 'banner'
export type AlertDismissType = 'none' | 'icon' | 'button'

export const AlertAppearances: AlertAppearanceRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
}
