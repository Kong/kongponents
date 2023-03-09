export interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}

export type CardSize = 'small' | 'medium' | 'large'
export type CardSizeRecord = Record<CardSize, CardSize>

export interface CatalogItem {
  title: string
  description: string
}
