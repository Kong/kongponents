import type { TooltipAttributes } from '@/types/label'

export interface LabelAttributes {
  help?: string
  info?: string
  required?: boolean
  tooltipAttributes?: TooltipAttributes
}

export interface LimitExceededData {
  value: string
  length: number
  characterLimit: number
  limitExceeded: boolean
}
