import type { TablePreferences, TablePaginationAttributes } from '@/types'

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
  } else if (paginationAttributes.pageSizes) {
    return paginationAttributes.pageSizes[0]
  }

  return 15 // default page size
}
