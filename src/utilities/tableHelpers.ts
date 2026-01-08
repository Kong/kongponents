import type { TablePreferences, TablePaginationAttributes } from '@/types'

export const DEFAULT_PAGE_SIZE = 15

/**
 * @description Get the initial page size for the table
 * @param {TablePreferences} tablePreferences
 * @param {TablePaginationAttributes} paginationAttributes
 * @returns {number} The initial page size
 */
export const getInitialPageSize = (tablePreferences: TablePreferences, paginationAttributes: TablePaginationAttributes): number => {
  if (tablePreferences.pageSize) {
    return tablePreferences.pageSize
  } else if (paginationAttributes.initialPageSize) {
    return paginationAttributes.initialPageSize
  } else if (paginationAttributes.pageSizes && Array.isArray(paginationAttributes.pageSizes) && paginationAttributes.pageSizes.length) {
    return paginationAttributes.pageSizes[0]!
  }

  return DEFAULT_PAGE_SIZE
}
