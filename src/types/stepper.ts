export type StepperState = '' | 'active' | 'default' | 'pending' | 'completed' | 'error'

export interface StepItem {
  label: string
  state?: StepperState
}
