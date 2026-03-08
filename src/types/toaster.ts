export type ToasterAppearance = 'info' | 'success' | 'danger' | 'warning' | 'system'

export interface Toast {
  /** Unique identifier of toaster */
  key?: string
  /** Title of toaster */
  title?: string
  /** Text to display in toaster */
  message?: string
  appearance?: ToasterAppearance
  timeoutMilliseconds?: number
  timer?: number
}

export type ToasterAppearancesRecord = Record<ToasterAppearance, ToasterAppearance>
export const ToasterAppearances: ToasterAppearancesRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  system: 'system',
}

export interface ToasterOptions {
  zIndex?: number
}

export interface ToasterProps {
  /**
   * The toaster state.
   * @default []
   */
  toasterState: Array<Toast & { key: string }>

  /**
   * @deprecated zIndex provided through ToasterOptions is set on the shared container on initialization. This prop is no longer used.
   */
  zIndex?: number
}

export interface ToasterEmits {
  /**
   * Emitted when a toaster is closed.
   */
  close: [val: string]
}
