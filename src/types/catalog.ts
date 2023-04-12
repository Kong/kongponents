import { AnyElementOf } from '@/types/utils'

export interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}

export const CardSizeArray = ['large', 'medium', 'small'] as const

export type CardSize = AnyElementOf<typeof CardSizeArray>

export interface CatalogItem {
  title: string
  description: string
}
