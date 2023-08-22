import type { AnyElementOf } from '@/types/utils'

export const StepperStateArray = ['active', 'default', 'pending', 'completed', 'error'] as const

export type StepperState = AnyElementOf<typeof StepperStateArray>

export interface StepItem {
  label: string
  state?: StepperState
}
