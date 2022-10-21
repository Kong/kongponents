/**
 * @description Capitalize a string.
 * @param {string} str
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description Checks whether the given string has symbols.
 * @param {string} str
 */
function hasSymbols(str: string) {
  return /[!"#%&'()*+,./:;<=>?@[\\\]^`{|}]/u.exec(str) // without " ", "$", "-" and "_"
}

/**
 * @description Convert text to PascalCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
export function pascalCase(str: string) {
  return capitalize(camelCase(kebabCase(str)))
}

/**
 * @description Convert text to camelCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
export function camelCase(str: string) {
  if (isPascalCase(str)) {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }
  return str.replace(/[-_](\w)/gu, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * @description Checks whether the given string is PascalCase.
 * @param {string} str
 */
export function isPascalCase(str: string) {
  if (
    hasSymbols(str) ||
    /^[a-z]/u.exec(str) ||
    /-|_|\s/u.exec(str) // kebab or snake or space
  ) {
    return false
  }
  return true
}

/**
 * @description Transform a given string into a lowercase, kebab-case version of the string.
 * @param {string} str - The string to kebab-case.
 * @return {string} Lowercase and kebab-case version of the input string.
 */
export function kebabCase(str: string): string {
  if (!str || str.trim() === '') {
    return ''
  }

  return str.trim().replace(/ /g, '-').replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()).replace(/--+/g, '-').replace(/-+$/g, '')
}

/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
export function kongponentSrcPath(name: string): string {
  return `src/components/${pascalCase(name)}`
}

/**
 * @description Get the title-case component name
 * @param {string} str
 * @return {string} Title case component name
 */
export function titleCaseComponentName(str: string): string {
  return kebabCase(str).replace(/^k-/, '').split('-').map(word => capitalize(word)).join(' ')
}

/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
export function kongponentDocFilename(name: string): string {
  return `${kebabCase(name).replace(/^k-/gi, '')}`
}
