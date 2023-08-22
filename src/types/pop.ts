import type { AnyElementOf } from '@/types/utils'

export const PopTriggerArray = ['click', 'hover'] as const

export type PopTrigger = AnyElementOf<typeof PopTriggerArray>

export const PopPlacementsArray = [
  'auto',
  'top',
  'topStart',
  'topEnd',
  'left',
  'leftStart',
  'leftEnd',
  'right',
  'rightStart',
  'rightEnd',
  'bottom',
  'bottomStart',
  'bottomEnd',
] as const

export type PopPlacements = AnyElementOf<typeof PopPlacementsArray>
