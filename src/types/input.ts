import type { TooltipAttributes } from '@/types/label'

export interface LabelAttributes {
  info?: string
  required?: boolean
  tooltipAttributes?: TooltipAttributes
  help?: string // @deprecated in favor of `info`
}

export interface LimitExceededData {
  value: string
  length: number
  characterLimit: number
  limitExceeded: boolean
}
