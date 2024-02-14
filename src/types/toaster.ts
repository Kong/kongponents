export type ToasterAppearance = 'info' | 'success' | 'danger' | 'warning' | 'system'

export interface Toast {
  key?: any // unique identifier of toaster
  appearance?: ToasterAppearance
  title: string // Title of toaster
  message?: string // Text to display in toaster
  timer?: any
  timeoutMilliseconds?: number
}

export type ToasterAppearancesRecord = Record<ToasterAppearance, ToasterAppearance>
export const ToasterAppearances: ToasterAppearancesRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  system: 'system',
}
