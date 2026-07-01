import type { Ref, VNode } from 'vue'
import type { KUI_THEMEABLE_TOKENS } from '@kong/design-tokens/themeable-tokens'

/** `KUI_THEMEABLE_TOKENS` is an array of `{ name, description, category, value }` records; the theme keys are their `name`s. */
type KongponentsThemeToken = (typeof KUI_THEMEABLE_TOKENS)[number]['name']

/**
 * A Kongponents theme.
 *
 * A theme is a partial map of themeable `--kui-*` custom properties (see
 * {@link KongponentsThemeToken}) to CSS values. Only the tokens you wish to
 * override need to be present; any token left out falls back to the value
 * provided by the consumer's `@kong/design-tokens` stylesheet.
 *
 * Values are emitted verbatim as CSS custom property values, so any valid CSS
 * value is allowed (e.g. `'#6f28ff'`, `'1rem'`, `'var(--brand-accent)'`).
 *
 * @example
 * ```ts
 * const portal: KongponentsTheme = {
 *   '--kui-color-text-primary': '#6f28ff',
 *   '--kui-color-background-primary': '#6f28ff',
 *   '--kui-border-radius-30': '999px',
 * }
 * ```
 */
export type KongponentsTheme = Partial<Record<KongponentsThemeToken, string>>

/**
 * Options accepted by the Kongponents Vue plugin `install` method.
 */
export interface KongponentsPluginOptions {
  /**
   * An optional app-level theme. When provided, the theme is applied to the
   * document root (`:root`) on install so it cascades to every Kongponent —
   * including teleported content (modals, toasts, popovers) — as well as any
   * host-app or downstream component that consumes `--kui-*` tokens.
   * @default undefined
   */
  theme?: KongponentsTheme
}

/**
 * Props for the `KThemeProvider` component.
 */
export interface ThemeProviderProps {
  /**
   * The theme to apply. Only the `--kui-*` tokens present are overridden.
   * @default undefined
   */
  theme?: KongponentsTheme

  /**
   * When `true`, the theme is applied to the document root (`:root`) so it
   * cascades to the entire page — including teleported content (modals, toasts,
   * popovers) and any host-app/downstream component consuming `--kui-*` tokens.
   * When `false`, the theme is scoped to this provider's element subtree via
   * inline custom properties (teleported children are not affected).
   * @default false
   */
  global?: boolean

  /**
   * The tag used to render the provider's wrapper element.
   * @default 'div'
   */
  tag?: string

  /**
   * Optional value written to the `data-kui-theme` attribute on the wrapper,
   * useful for targeting the subtree from static CSS.
   * @default undefined
   */
  name?: string
}

export interface ThemeProviderSlots {
  /**
   * Default slot for the content that should receive the theme.
   */
  default?(): VNode[]
}

/**
 * The shape returned by the `useTheme` composable.
 */
export interface UseThemeReturn {
  /**
   * The current app-level theme, or `undefined` when no theme has been applied.
   * Reactive: updates when {@link UseThemeReturn.setTheme} is called.
   */
  theme: Ref<KongponentsTheme | undefined>

  /**
   * Apply (or replace) the app-level theme at runtime by writing its tokens to
   * the document root. Use this to switch brands or toggle light/dark.
   * @param theme - The theme to apply, or `undefined` to clear previously applied tokens.
   */
  setTheme: (theme: KongponentsTheme | undefined) => void
}
