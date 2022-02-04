import { App, Plugin } from 'vue'
// Import all components
import * as components from './components'
// Import all styles
import './styles/styles.scss'

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
