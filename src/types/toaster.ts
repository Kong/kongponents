import type { AlertAppearance, AlertAppearanceRecord } from '@/types/alert'
import { appearances } from '@/components/KAlert/KAlert.vue'

export interface Toast {
  key?: any // unique identifier of toaster
  appearance?: AlertAppearance
  message: string // Text to display in toaster
  timer?: any
  timeoutMilliseconds?: number
}

export const toasterAppearances: AlertAppearanceRecord = appearances
