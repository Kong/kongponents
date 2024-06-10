import type { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles
import { v4 as uuidv4 } from 'uuid'

interface KongponentsOptions {
  kongponentsId: () => string
}

const defaultKongponentsOptions: KongponentsOptions = {
  kongponentsId: uuidv4,
}

// Export install function
export default {
  install: (app: App, options?: KongponentsOptions): void => {
    const kongponentsOptions = Object.assign({}, defaultKongponentsOptions, options)

    app.provide('kongponentsId', kongponentsOptions.kongponentsId)

    for (const key in components) {
      // @ts-ignore: key is a valid string
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
