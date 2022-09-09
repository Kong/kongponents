"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kongponentDocFilename = exports.titleCaseComponentName = exports.kongponentSrcPath = exports.kebabCase = exports.isPascalCase = exports.camelCase = exports.pascalCase = exports.capitalize = void 0;
/**
 * @description Capitalize a string.
 * @param {string} str
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
/**
 * @description Checks whether the given string has symbols.
 * @param {string} str
 */
function hasSymbols(str) {
    return /[!"#%&'()*+,./:;<=>?@[\\\]^`{|}]/u.exec(str); // without " ", "$", "-" and "_"
}
/**
 * @description Convert text to PascalCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
function pascalCase(str) {
    return capitalize(camelCase(kebabCase(str)));
}
exports.pascalCase = pascalCase;
/**
 * @description Convert text to camelCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */
function camelCase(str) {
    if (isPascalCase(str)) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str.replace(/[-_](\w)/gu, (_, c) => (c ? c.toUpperCase() : ''));
}
exports.camelCase = camelCase;
/**
 * @description Checks whether the given string is PascalCase.
 * @param {string} str
 */
function isPascalCase(str) {
    if (hasSymbols(str) ||
        /^[a-z]/u.exec(str) ||
        /-|_|\s/u.exec(str) // kebab or snake or space
    ) {
        return false;
    }
    return true;
}
exports.isPascalCase = isPascalCase;
/**
 * @description Transform a given string into a lowercase, kebab-case version of the string.
 * @param {string} str - The string to kebab-case.
 * @return {string} Lowercase and kebab-case version of the input string.
 */
function kebabCase(str) {
    if (!str || str.trim() === '') {
        return '';
    }
    return str.trim().replace(/ /g, '-').replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()).replace(/--+/g, '-').replace(/-+$/g, '');
}
exports.kebabCase = kebabCase;
/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
function kongponentSrcPath(name) {
    return `src/components/${pascalCase(name)}`;
}
exports.kongponentSrcPath = kongponentSrcPath;
/**
 * @description Get the title-case component name
 * @param {string} str
 * @return {string} Title case component name
 */
function titleCaseComponentName(str) {
    return kebabCase(str).replace(/^k-/, '').split('-').map(word => capitalize(word)).join(' ');
}
exports.titleCaseComponentName = titleCaseComponentName;
/**
 * @description Get the path (from root) to the new Kongponent in the src/components directory
 * @param {string} pascalCaseName PascalCase component name
 * @return {*}  {string} Path to the new Kongponent source files
 */
function kongponentDocFilename(name) {
    return `${kebabCase(name).replace(/^k-/gi, '')}`;
}
exports.kongponentDocFilename = kongponentDocFilename;
//# sourceMappingURL=strings.js.map