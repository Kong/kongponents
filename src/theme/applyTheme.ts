import type { KongponentsTheme } from '@/types/theme'
import { themeToCssVars } from '@/theme/themeToCssVars'

const STYLE_ELEMENT_ID = 'kongponents-theme'

/**
 * Apply a theme by injecting a `<style>` element containing `:root {}` custom
 * property overrides into `<head>`.
 *
 * Injecting a stylesheet (rather than writing inline styles to `<html>`) means
 * the theme sits at the same cascade tier as `@kong/design-tokens` — specificity
 * `0,0,1,0` for `:root`, with source order as the tiebreaker. The injected
 * `<style>` is appended last, so it wins over the design-tokens base CSS while
 * still allowing consumers to override individual tokens at the same tier if
 * they need to.
 *
 * Because custom properties inherit, every Kongponent — including teleported
 * content such as modals, toasts, and popovers rendered to `<body>` — as well as
 * any host-app or downstream component that consumes `--kui-*` tokens, resolves
 * to the themed values.
 *
 * Calling again replaces the previous `<style>` element entirely, so stale tokens
 * from a previous theme are automatically removed. Passing `undefined` removes the
 * element, restoring the design-token defaults.
 *
 * This is a no-op in non-browser (SSR) environments.
 *
 * @param theme - The theme to apply, or `undefined` to clear previously applied tokens.
 */
export const applyTheme = (theme: KongponentsTheme | undefined): void => {
  if (typeof document === 'undefined') {
    return
  }

  document.getElementById(STYLE_ELEMENT_ID)?.remove()

  if (!theme) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ELEMENT_ID
  style.textContent = themeToCssVars(theme)
  document.head.appendChild(style)
}
