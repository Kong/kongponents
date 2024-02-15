export type ToasterAppearance = 'info' | 'success' | 'danger' | 'warning' | 'system'

export interface Toast {
  key?: any // unique identifier of toaster
  title: string // Title of toaster
  message?: string // Text to display in toaster
  appearance?: ToasterAppearance
  timeoutMilliseconds?: number
  timer?: any
}

export type ToasterAppearancesRecord = Record<ToasterAppearance, ToasterAppearance>
export const ToasterAppearances: ToasterAppearancesRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  system: 'system',
}
