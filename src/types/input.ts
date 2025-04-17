import type { TooltipAttributes } from '@/types/tooltip'

export interface LabelAttributes {
  info?: string
  required?: boolean
  tooltipAttributes?: TooltipAttributes
  /** @deprecated in favor of `info` */
  help?: string
}

export interface LimitExceededData {
  value: string
  length: number
  characterLimit: number
  limitExceeded: boolean
}
