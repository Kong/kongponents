import type { AnyElementOf } from '@/types/utils'

export const BorderVariantsArray = ['borderTop', 'noBorder', 'border'] as const

export type BorderVariant = AnyElementOf<typeof BorderVariantsArray>
