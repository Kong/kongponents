import { inject, ref, type InjectionKey } from 'vue'
import type { KongponentsTheme, UseThemeReturn } from '@/types/theme'
import { applyTheme } from '@/theme/applyTheme'

/**
 * Injection key for the nearest Kongponents theme controller. Provided by the
 * Kongponents Vue plugin (app-level) and by each `KThemeProvider` (subtree).
 */
export const KONGPONENTS_THEME_INJECTION_KEY: InjectionKey<UseThemeReturn> = Symbol('kongponents-theme')

/**
 * Create a theme controller — a reactive `theme` ref plus a `setTheme` function
 * that updates the ref and re-applies the theme via the supplied `apply` callback.
 *
 * @param apply - Callback invoked with the theme whenever it changes (and once initially).
 * @param initialTheme - The theme to seed the controller with.
 * @returns A {@link UseThemeReturn} controller.
 */
export const createThemeController = (
  apply: (theme: KongponentsTheme | undefined) => void,
  initialTheme?: KongponentsTheme,
): UseThemeReturn => {
  const theme = ref<KongponentsTheme | undefined>(initialTheme)

  const setTheme = (next: KongponentsTheme | undefined): void => {
    theme.value = next
    apply(next)
  }

  // Apply the initial theme immediately so the controller and the DOM agree from the start.
  apply(initialTheme)

  return { theme, setTheme }
}

/**
 * Lazily-created fallback controller used when no plugin/provider is present.
 * Only created and cached in browser environments to prevent request-level state
 * contamination in SSR (module singletons persist across requests in Node).
 */
let fallbackController: UseThemeReturn | undefined

/**
 * Access the nearest Kongponents theme.
 *
 * Returns the theme controller provided by the closest `KThemeProvider`, or the
 * app-level controller registered by the Kongponents Vue plugin. When neither is
 * present, a shared fallback controller is returned that applies themes to the
 * document root, so `setTheme` still works in a plain app.
 *
 * @returns The current {@link UseThemeReturn} controller.
 * @example
 * ```ts
 * const { theme, setTheme } = useTheme()
 * setTheme(konnectNight) // switch the app to dark
 * ```
 */
export const useTheme = (): UseThemeReturn => {
  const provided = inject(KONGPONENTS_THEME_INJECTION_KEY, null)
  if (provided) {
    return provided
  }

  if (typeof window !== 'undefined') {
    if (!fallbackController) {
      fallbackController = createThemeController((theme) => applyTheme(theme))
    }
    return fallbackController
  }

  // SSR without a plugin/provider: return a per-call no-op so server state is never shared.
  return createThemeController(() => undefined)
}
