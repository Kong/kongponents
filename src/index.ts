import type { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

// COMMENT TEST

// Export install function
export default {
  install: (app: App): void => {
    for (const key in components) {
      // @ts-ignore
      app.component(key, components[key])
    }
  },
}

// Export all components
export * from './components'
export * from './global-components'
export * from './types'
