import { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

type ComponentModule = typeof components

// Export install function
export default {
  install: (app: App): void => {
    for (const key in components) {
      app.component(key, components[key as keyof ComponentModule])
    }
  },
}

// Export all components
export * from './components'
