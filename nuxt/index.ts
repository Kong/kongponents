import { addPlugin, defineNuxtModule, createResolver, addComponent, useLogger } from '@nuxt/kit'

import { components } from '@kong/kongponents'

export interface ModuleOptions {
  /**
   * Prefix to use for registered components
   * @default 'K'
   */
  prefix?: string
  /**
   * List of components to exclude from automatic registration
   * @default []
   */
  exclude?: Array<Exclude<keyof typeof components, 'ToastManager' | 'KTable'>>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents/nuxt',
    configKey: 'kongponents',
  },
  defaults: {
    prefix: 'K',
    exclude: [],
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger()

    // Register the module's plugin (can be used for global styles, etc.)
    addPlugin(resolve('./runtime/plugin'))

    // Define a blacklist of components that should never be auto-registered.
    // Includes user-specified exclusions merged with a fixed internal list.
    const blacklist = ['ToastManager', 'KTable', ...(options.exclude || [])]

    Object.entries(components).forEach(([name]) => {
      if (!name || blacklist.includes(name)) return

      const componentName = `${options.prefix}${name.startsWith('K') ? name.slice(1) : name}`

      addComponent({
        name: componentName,
        export: name,
        filePath: '@kong/kongponents',
        global: true,
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
