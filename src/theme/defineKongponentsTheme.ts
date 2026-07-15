import type { KongponentsTheme } from '@/types/theme'

/**
 * Identity helper for authoring a strongly-typed Kongponents theme.
 *
 * Wrapping a theme object in this helper provides editor autocomplete for the
 * themeable `--kui-*` tokens and rejects unknown token names at compile time,
 * without changing the value at runtime.
 *
 * @param theme - The theme definition.
 * @returns The same theme object, typed as {@link KongponentsTheme}.
 * @example
 * ```ts
 * export const portalTheme = defineKongponentsTheme({
 *   '--kui-color-text-primary': '#6f28ff',
 *   '--kui-color-background-primary': '#6f28ff',
 * })
 * ```
 */
export const defineKongponentsTheme = (theme: KongponentsTheme): KongponentsTheme => theme
