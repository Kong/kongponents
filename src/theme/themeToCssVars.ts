import type { KongponentsTheme } from '@/types/theme'
import { KONGPONENTS_THEME_TOKENS } from '@/theme/contract'

/**
 * A map of `--kui-*` custom property names to CSS values, suitable for binding
 * to an element's `style` (e.g. via Vue's `:style`) or for writing with
 * `element.style.setProperty`.
 */
export type ThemeStyleRecord = Record<string, string>

/** Cached Set for O(1) membership checks against the typed contract. */
const KNOWN_TOKENS = new Set<string>(KONGPONENTS_THEME_TOKENS)

/**
 * Convert a theme into a flat style record of `--kui-*` custom properties.
 *
 * The result can be bound directly to an element's inline `style` to scope the
 * theme to that element's subtree, or iterated to call `setProperty` on a host
 * element (see `applyTheme`).
 *
 * In development, warns when the theme contains a token that is not in the current
 * `KONGPONENTS_THEME_TOKENS` contract — catching typos and version-skew scenarios
 * (e.g. a theme authored against a newer version of Kongponents than is installed).
 *
 * @param theme - The theme to convert.
 * @returns A record of custom property name to value.
 */
export const themeToStyleRecord = (theme: KongponentsTheme): ThemeStyleRecord => {
  const style: ThemeStyleRecord = {}

  for (const [token, value] of Object.entries(theme)) {
    // Skip tokens explicitly set to undefined so they fall back to the design-token default.
    if (value != null) {
      if (import.meta.env.DEV && !KNOWN_TOKENS.has(token)) {
        console.warn(
          `[Kongponents] Unknown theme token "${token}". ` +
          'This token is not in the current KONGPONENTS_THEME_TOKENS contract — ' +
          'check for a typo or upgrade Kongponents to a version that includes it.',
        )
      }
      style[token] = value
    }
  }

  return style
}

/**
 * Convert a theme into a CSS rule string scoped to the provided selector.
 *
 * This is the "raw CSS escape hatch" / static-distribution form: the output can
 * be written to a `.css` file or injected as a `<style>` block to apply a theme
 * without any JavaScript. The default selector targets the document root.
 *
 * @param theme - The theme to convert.
 * @param selector - The CSS selector the overrides are scoped to.
 * @default selector ':root'
 * @returns A CSS rule string, e.g. `:root {\n  --kui-color-text-primary: #6f28ff;\n}`
 * @example
 * ```ts
 * themeToCssVars(portalTheme, '[data-kui-theme="portal"]')
 * // => '[data-kui-theme="portal"] {\n  --kui-color-text-primary: #6f28ff;\n}'
 * ```
 */
export const themeToCssVars = (theme: KongponentsTheme, selector: string = ':root'): string => {
  const declarations = Object.entries(themeToStyleRecord(theme))
    .map(([token, value]) => `  ${token}: ${value};`)
    .join('\n')

  return `${selector} {\n${declarations}\n}`
}
