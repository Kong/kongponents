import type { AnyElementOf } from '@/types/utils'
import type { offset } from '@floating-ui/vue'

export const PopTriggerArray = ['click', 'hover'] as const

export type PopTrigger = AnyElementOf<typeof PopTriggerArray>

export const PopPlacementsArray = [
  'auto',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
] as const

export type PopPlacements = AnyElementOf<typeof PopPlacementsArray>

export interface PopoverAttributes {
  popoverClasses?: string
  offset?: string
}

