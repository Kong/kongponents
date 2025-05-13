import type { AnyElementOf } from '@/types/utils'

export const StepperStateArray = ['active', 'default', 'pending', 'completed', 'error'] as const

export type StepperState = AnyElementOf<typeof StepperStateArray>

export interface StepItem {
  label: string
  state?: StepperState
}

/**
 * @internal
 */
export interface StepProps {
  label: string
  state?: StepperState
  maxLabelWidth: string
}

export interface StepperProps {
  /**
   * Array of steps to display.
   */
  steps: StepItem[]

  /**
   * Maximum width of each step's label.
   * @default '170px'
   */
  maxLabelWidth?: string
}
