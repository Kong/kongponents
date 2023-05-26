export type PaginationType = 'default' | 'offset'

export interface PageChangedData {
  page: number
  pageCount: number,
  firstItem: number,
  lastItem: number,
  visibleItems: any[],
}

export interface PageSizeChangedData {
  pageSize: number,
  pageCount: number
}
