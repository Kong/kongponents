import type { AnyElementOf } from '@/types/utils'

export const SkeletonTypeArray = [
  'table',
  'card',
  'form',
  'spinner',
  'fullscreen-kong',
  'fullscreen-generic',
  '', // default Skeleton.vue
] as const

export type SkeletonType = AnyElementOf<typeof SkeletonTypeArray>

export const SkeletonBoxWidthArray = ['1', '2', '5', '6', '10', '25', '50', '75', '100'] as const

export type SkeletonBoxWidth = AnyElementOf<typeof SkeletonBoxWidthArray>

export const SkeletonBoxHeightArray = ['1', '2'] as const

export type SkeletonBoxHeight = AnyElementOf<typeof SkeletonBoxHeightArray>
