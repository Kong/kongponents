import { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

// Export install function
export default {
  install: (app: App): void => {
    for (const key in components) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component(key, components[key])
    }
  },
}

// Export all components
export * from './components'
export * from './global-components'
