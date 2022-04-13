import { App, Plugin } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

// Export install function
const plugin: Plugin = {
  install: (app: App): void => {
    for (const key in components) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component(key, components[key])
    }
  },
}

export default plugin

// Export all components
export * from './components'
