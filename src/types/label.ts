import type { PopPlacements } from '@/types'

export type Placement = PopPlacements
export interface TooltipAttributes {
  label?: string
  placement?: Placement
  maxWidth?: string
}
