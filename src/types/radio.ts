import { AnyElementOf } from '@/types/utils'

export const RadioTypesArray = ['radio', 'card'] as const

export type RadioTypes = AnyElementOf<typeof RadioTypesArray>
