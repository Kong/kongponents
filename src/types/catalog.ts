import { AnyElementOf } from '@/types/utils'

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

export type SwrvState = 'VALIDATING' | 'VALIDATING_HAS_DATA' | 'PENDING' | 'SUCCESS' | 'SUCCESS_HAS_DATA' | 'ERROR' | 'STALE_IF_ERROR'

export interface SwrvStateData {
  hasData: boolean
  state: SwrvState
}
