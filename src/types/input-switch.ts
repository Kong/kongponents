import { AnyElementOf } from '@/types/utils'

export const LabelPositionArray = ['left', 'right'] as const
export type LabelPosition = AnyElementOf<typeof LabelPositionArray>
