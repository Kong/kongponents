import type { App } from 'vue'
// Import all components
import * as components from './components'
// Import all styles
import './styles/styles.scss'
import type { KongponentsPluginOptions } from './types/theme'
import { KONGPONENTS_THEME_INJECTION_KEY, createThemeController } from './composables/useTheme'
import { applyTheme } from './theme/applyTheme'

// Export Vue plugin by default
export default {
  install: (app: App, options: KongponentsPluginOptions = {}): void => {
    for (const key in components) {
      // @ts-ignore - key is a valid string
      app.component(key, components[key])
    }

    /**
     * Register an app-level theme controller so `useTheme()` works app-wide and,
     * when a theme is provided, apply it to the document root so it cascades to
     * every component (including teleported content) from a single definition.
     */
    const themeController = createThemeController((theme) => applyTheme(theme), options.theme)
    app.provide(KONGPONENTS_THEME_INJECTION_KEY, themeController)
  },
}

// Export a named object exporting all available components.
// This is utilized to loop through all available components in this package.
export { components }

// All other named exports
export * from './components'
export * from './global-components'
export * from './types'

// Theming API exports
export * from './theme'
export { useTheme, createThemeController, KONGPONENTS_THEME_INJECTION_KEY } from './composables/useTheme'
