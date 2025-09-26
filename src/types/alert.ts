export type AlertAppearance = 'info' | 'success' | 'danger' | 'warning' | 'decorative'
export type AlertAppearanceRecord = Record<AlertAppearance, AlertAppearance>

export const AlertAppearances: AlertAppearanceRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  decorative: 'decorative',
}

export interface AlertProps {
  /**
   * The title of the alert.
   */
  title?: string

  /**
   * The message of the alert.
   */
  message?: string

  /**
   * Base styling of the alert.
   * One of ['info', 'success', 'danger', 'warning'].
   * @default 'info'
   */
  appearance?: AlertAppearance

  /**
   * When true, shows an icon.
   * @default false
   */
  showIcon?: boolean

  /**
   * When true, shows a close button.
   * @default false
   */
  dismissible?: boolean
}

export interface AlertEmits {
  /**
   * Emitted when dismiss button is clicked.
   */
  dismiss: []
}

export interface AlertSlots {
  /**
   * Slot for alert message content.
   */
  default?(): any

  /**
   * Slot for custom icon to the left of the alert message.
   */
  icon?(): any
}
