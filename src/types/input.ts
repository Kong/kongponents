import { TooltipAttributes } from '@/types/label'
import { AnyElementOf } from '@/types/utils'

export const SizeArray = ['small', 'medium', 'large'] as const
export type Size = AnyElementOf<typeof SizeArray>

export const IconPositionArray = ['start', 'end'] as const
export type IconPosition = AnyElementOf<typeof IconPositionArray>

export interface LabelAttributes {
  help?: string
  info?: string
  required?: boolean
  tooltipAttributes?: TooltipAttributes
}

export interface LimitExceededData {
  value: string
  length:number
  characterLimit: number
  limitExceeded: boolean
}
