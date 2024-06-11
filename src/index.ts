import type { App } from 'vue'
import * as components from './components' // Import all components
import './styles/styles.scss' // Import all styles
import { kongponentsGetUniqueId, defaultKongponentsPlugin } from '@/types'
import type { KongponentsPlugin } from '@/types'

// Export install function
export default {
  install: (app: App, options?: KongponentsPlugin): void => {
    const kongponentsPlugin = Object.assign({}, defaultKongponentsPlugin, options)

    app.provide(kongponentsGetUniqueId, kongponentsPlugin.uniqueIdFn)

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
