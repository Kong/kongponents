import { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

// Export install function
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install: (app: App, options: Record<string, any>) => {
    for (const key in components) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component(key, components[key])
    }
  },
}

// Export all components
export * from './components'
