/**
 * Convert a given number or string to a length with units. If number or numeric string, append `px`.
 * @param size A number or a string that can be used for a CSS size.
 * @returns A CSS size string with unit.
 */
export const normalizeSize = (size: number | string): string => {
  const numeric = Number(size)
  return !Number.isNaN(numeric) ? `${numeric}px` : `${size}`
}
