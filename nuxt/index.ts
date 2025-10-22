import { addPlugin, defineNuxtModule, createResolver, addComponent, useLogger, addImportsDir } from '@nuxt/kit'

import { components } from '@kong/kongponents'

type ComponentKeys = keyof typeof components
type ExcludedComponentKeys = Exclude<ComponentKeys, 'ToastManager' | 'KTable'>


export interface ModuleOptions {
  components?: {
    /**
     * List of components to include in auto-registration. If unset or empty, all components will be included.
     * @default []
     */
    include?: ComponentKeys[]
    /**
     * List of components to exclude from automatic registration
     * @default []
     */
    exclude?: ExcludedComponentKeys[]
  }
}

// Components that are deprecated or not meant for auto-registration
const DEPRECATED_COMPONENTS = ['ToastManager', 'KTable']

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents',
    configKey: 'kongponents',
  },
  defaults: {
    components: {
      include: [],
      exclude: [],
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('kongponents')

    // Register the styles
    nuxt.options.css.push('@kong/kongponents/dist/style.css')

    // Register the module's plugin (can be used for global styles, etc.)
    addPlugin(resolve('./runtime/plugins/kongponents'))

    // Register composables
    addImportsDir(resolve('./runtime/composables'))

    // Define a list of components that should be auto-registered.
    const includeList = options.components?.include || []
    // Define a list of components that should never be auto-registered.
    const excludeList = [...DEPRECATED_COMPONENTS, ...(options.components?.exclude || [])]

    const allComponentNames = Object.keys(components)

    const filteredComponents = allComponentNames.filter((name) => {
      // If include list is set, only register those
      if (includeList.length > 0 && !includeList.includes(name as ComponentKeys)) return false
      // Skip excluded or deprecated components
      if (excludeList.includes(name)) return false
      return true
    })

    if (filteredComponents.length === 0) {
      logger.warn('⚠️ No Kongponents components were registered. Check your include/exclude config.')
    }

    filteredComponents.forEach((name) => {
      addComponent({
        name,
        export: name,
        filePath: '@kong/kongponents',
        // !IMPORTANT: Components must be registered globally
        global: true,
        // 'all' means both client and server
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
