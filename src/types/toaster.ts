export type ToasterAppearance = 'info' | 'success' | 'danger' | 'warning' | 'system'

export interface Toast {
  /** unique identifier of toaster */
  key?: any
  /** Title of toaster */
  title?: string
  /** Text to display in toaster */
  message?: string
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
