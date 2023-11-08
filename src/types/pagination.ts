import type { AnyElementOf } from '@/types/utils'

export const PaginationTypeArray = ['default', 'offset', 'cursor'] as const

export type PaginationType = AnyElementOf<typeof PaginationTypeArray>

export interface PageChangedData {
  page: number
  pageCount: number
  firstItem: number
  lastItem: number
  visibleItems: any[]
}

export interface PageSizeChangedData {
  pageSize: number
  pageCount: number
}
