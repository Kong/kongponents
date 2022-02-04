import { App, Plugin } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles

const install: Plugin = (app: App) => {
  for (const key in components) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.component(key, components[key])
  }
}

// Export install function
export default install

// Export all components
export * from './components'
