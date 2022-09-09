/**
 * @description Capitalize a string.
 * @param {string} str
 */
export declare function capitalize(str: string): string;
/**
 * @description Convert text to PascalCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
export declare function pascalCase(str: string): string;
/**
 * @description Convert text to camelCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
export declare function camelCase(str: string): string;
/**
 * @description Checks whether the given string is PascalCase.
 * @param {string} str
 */
export declare function isPascalCase(str: string): boolean;
/**
 * @description Transform a given string into a lowercase, kebab-case version of the string.
 * @param {string} str - The string to kebab-case.
 * @return {string} Lowercase and kebab-case version of the input string.
 */
export declare function kebabCase(str: string): string;
/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
export declare function kongponentSrcPath(name: string): string;
/**
 * @description Get the title-case component name
 * @param {string} str
 * @return {string} Title case component name
 */
export declare function titleCaseComponentName(str: string): string;
/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
export declare function kongponentDocFilename(name: string): string;
