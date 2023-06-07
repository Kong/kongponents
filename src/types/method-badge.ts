import type { BadgeShape } from '@/types'

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' | 'trace' | 'connect' | 'custom'
export type MethodShape = BadgeShape
export interface MethodBadgeColors {
  color: string
  backgroundColor: string
  borderColor: string
}

export const MethodsArray = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom'] as const
export const ShapesArray = ['rounded', 'rectangular'] as const
