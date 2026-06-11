import type { KongponentsTheme } from '@/types/theme'
import { themeToStyleRecord } from '@/theme/themeToCssVars'

/**
 * Tracks the token names a previous `applyTheme` call set on a given element,
 * so a subsequent call can remove tokens that the new theme no longer defines
 * (e.g. when switching from a brand theme back to a lighter subset).
 */
const appliedTokensByTarget = new WeakMap<HTMLElement, Set<string>>()

/**
 * Apply a theme by writing its `--kui-*` custom properties to a target element.
 *
 * Writing to the document root (the default) is the "define once, apply
 * everywhere" mechanism: because custom properties inherit, every Kongponent —
 * including teleported content such as modals, toasts, and popovers rendered to
 * `<body>` — as well as any host-app or downstream component that consumes
 * `--kui-*` tokens, resolves to the themed values.
 *
 * Tokens set by a previous call on the same target that are absent from the new
 * theme are removed. Passing `undefined` clears all previously applied tokens.
 *
 * This is a no-op in non-browser (SSR) environments where no target is available.
 *
 * @param theme - The theme to apply, or `undefined` to clear previously applied tokens.
 * @param target - The element to write the custom properties to.
 * @default target document.documentElement (the `:root` element)
 */
export const applyTheme = (
  theme: KongponentsTheme | undefined,
  target?: HTMLElement,
): void => {
  const element = target ?? (typeof document !== 'undefined' ? document.documentElement : undefined)

  if (!element) {
    return
  }

  const style = theme ? themeToStyleRecord(theme) : {}
  const nextTokens = new Set(Object.keys(style))

  const previousTokens = appliedTokensByTarget.get(element)
  if (previousTokens) {
    for (const token of previousTokens) {
      if (!nextTokens.has(token)) {
        element.style.removeProperty(token)
      }
    }
  }

  for (const [token, value] of Object.entries(style)) {
    element.style.setProperty(token, value)
  }

  appliedTokensByTarget.set(element, nextTokens)
}
