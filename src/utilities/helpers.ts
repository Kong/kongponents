/** @description Checks whether provided string is a valid URL.
 * @param {string} string
 * @return {boolean} Whether the string is a valid URL.
 */

export const isValidUrl = (string: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(string)

    // No error was thrown, so return true
    return true
  } catch {
    // Invalid URL
    return false
  }
}
