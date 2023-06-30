import { AnyElementOf } from '@/types/utils'

export const SwitcherTypeArray = ['table', 'grid'] as const

export type SwitcherType = AnyElementOf<typeof SwitcherTypeArray>
