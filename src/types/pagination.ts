export type PaginationType = 'default' | 'offset'

export interface PageChangeData {
  page: number
  pageCount: number
  firstItem: number
  lastItem: number
  visibleItems: any[]
}

export interface PageSizeChangeData {
  pageSize: number
  pageCount: number
}
