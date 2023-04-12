import { AnyElementOf } from '@/types/utils'

export const TriggerAlignmentArray = ['leading', 'trailing'] as const

export type TriggerAlignment = AnyElementOf<typeof TriggerAlignmentArray>
