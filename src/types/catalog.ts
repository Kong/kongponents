import type { AnyElementOf } from '@/types/utils'

export interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}

export const CardSizeArray = ['large', 'medium', 'small'] as const

export type CardSize = AnyElementOf<typeof CardSizeArray>

export interface CatalogItem extends Record<string, any> {
  id?: string
  title: string
  description: string
  key?: string
}

export type CatalogState = 'loading' | 'error' | 'success'
