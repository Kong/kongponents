import type { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

// Export install function
export default {
  install: (app: App): void => {
    for (const key in components) {
      // @ts-ignore
      app.component(key, components[key])
    }
  },
}

// Export a named object exporting all available components. This is utilized to loop through all available components in this package.
export { components }

// All other named exports
export * from './components'
export * from './global-components'
export * from './types'
