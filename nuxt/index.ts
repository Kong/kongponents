import { addPlugin, defineNuxtModule, createResolver, addComponent, useLogger } from '@nuxt/kit'

import { components } from '@kong/kongponents'

export interface ModuleOptions {
  /**
   * List of components to exclude from automatic registration
   * @default []
   */
  exclude?: Array<Exclude<keyof typeof components, 'ToastManager' | 'KTable'>>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents',
    configKey: 'kongponents',
  },
  defaults: {
    exclude: [],
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('kongponents')

    // Register the module's plugin (can be used for global styles, etc.)
    addPlugin(resolve('./runtime/plugin'))

    // Define a list of components that should never be auto-registered.
    // Includes user-specified exclusions merged with a fixed internal list.
    const excludeList = ['ToastManager', 'KTable', ...(options.exclude || [])]

    Object.entries(components).forEach(([name]) => {
      if (!name || excludeList.includes(name)) return

      addComponent({
        name,
        export: name,
        filePath: '@kong/kongponents',
        // !IMPORTANT: Components must be registered globally
        global: true,
        // all means both client and server
        mode: 'all',
      })
    })

    /**
     * Integrate with Nuxt DevTools by adding a "Kongponents" tab.
     * This gives quick access to documentation within the DevTools UI.
     */
    // @ts-ignore - nuxt types are missing devtools hook
    nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'kongponents',
        title: 'Kongponents',
        icon: 'https://kongponents.konghq.com/img/kong-logomark.png',
        view: {
          type: 'iframe',
          src: 'https://kongponents.konghq.com',
        },
      })
    })

    logger.success('🚀 Kongponents module has been registered.')
  },
})
