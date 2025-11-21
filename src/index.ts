import type { App } from 'vue'
// Import all components
import * as components from './components'
// Import all styles
import './styles/styles.scss'

// Export Vue plugin by default
export default {
  install: (app: App): void => {
    for (const key in components) {
      // @ts-ignore - key is a valid string
      app.component(key, components[key])
    }
  },
}

// Export a named object exporting all available components. This is utilized to loop through all available components in this package.
export { components }

// Export all other named exports
export * from './components'
export * from './global-components'
export * from './types'
