import type { AnyElementOf } from '@/types/utils'

// TODO: remove when deprecated `type` prop is removed
export const RadioTypesArray = ['', 'radio', 'card'] as const

export type RadioTypes = AnyElementOf<typeof RadioTypesArray>
