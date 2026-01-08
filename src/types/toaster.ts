import type { Ref } from 'vue'

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
  toasterState: Ref<Array<Toast & { key: string }>>

  /**
   * The z-index of the toaster.
   * @default 10000
   */
  zIndex?: number
}

export interface ToasterEmits {
  /**
   * Emitted when a toaster is closed.
   */
  close: [val: string]
}
