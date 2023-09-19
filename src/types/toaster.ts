import { type AlertAppearance, type AlertAppearanceRecord, AlertAppearances } from '@/types/alert'

export interface Toast {
  key?: any // unique identifier of toaster
  appearance?: AlertAppearance
  message: string // Text to display in toaster
  timer?: any
  timeoutMilliseconds?: number
}

export const toasterAppearances: AlertAppearanceRecord = AlertAppearances
