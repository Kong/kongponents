import { AnyElementOf } from '@/types/utils'

export const PromptVariantsArray = ['info', 'warning', 'danger'] as const

export type PromptVariants = AnyElementOf<typeof PromptVariantsArray>
