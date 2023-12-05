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

// All other named exports
export * from './components'
export * from './global-components'
export * from './types'
