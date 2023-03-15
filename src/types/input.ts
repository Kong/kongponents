import { TooltipAttributes } from '@/types/label'

export type Size = 'small' | 'medium' | 'large'
export type SizeRecord = Record<Size, Size>

export type IconPosition = 'start' | 'end'
export type IconPositionRecord = Record<IconPosition, IconPosition>

export interface LabelAttributes {
  help: string
  info: string
  tooltipAttributes: TooltipAttributes
}
