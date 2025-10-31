import { defineNuxtModule, createResolver, addComponent, useLogger, addImportsDir } from '@nuxt/kit'
import { components } from '@kong/kongponents'

type ComponentKeys = keyof typeof components
type ExcludedComponentKeys = Exclude<ComponentKeys, 'ToastManager' | 'KTable' | 'KModalFullscreen' | 'KDropdownMenu'>


export interface ModuleOptions {
  components?: {
    /**
     * List of component names to include in auto-registration. If unset or empty, all components will be included.
     * @default []
     */
    include?: ComponentKeys[]
    /**
     * List of component names to exclude from automatic registration
     * @default []
     */
    exclude?: ExcludedComponentKeys[]
  }
  /**
   * Whether to register provided composables.
   * For example, you can access the included `useToast` composable.
   * @default true
   */
  composables?: boolean
}

// Components that should always be excluded from auto-registration
const ALWAYS_EXCLUDE_COMPONENTS = ['ToastManager', 'KTable', 'KModalFullscreen', 'KDropdownMenu']

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
    composables: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('kongponents')

    // Register the styles
    nuxt.options.css.push('@kong/kongponents/dist/style.css')

    if (options.composables) {
      // Register composables
      addImportsDir(resolve('./runtime/composables'))
    }

    // Define a list of components that should be auto-registered.
    const includeList = options.components?.include || []
    // Define a list of components that should never be auto-registered.
    const excludeList = [...ALWAYS_EXCLUDE_COMPONENTS, ...(options.components?.exclude || [])]

    const filteredComponents = Object.keys(components).filter(
      (name) =>
        // Only include components that start with 'K' (e.g., KButton)
        name.startsWith('K')
      // If an include list is provided, only keep those in the list
      && (includeList.length === 0 || includeList.includes(name as ComponentKeys))
      // Exclude any components explicitly listed in the exclude list
      && !excludeList.includes(name),
    )


    if (filteredComponents.length === 0) {
      logger.warn('⚠️ No Kongponents components were registered. Check your include/exclude config.')
    }

    filteredComponents.forEach((name) => {
      addComponent({
        name,
        export: name,
        filePath: '@kong/kongponents',
        //!IMPORTANT: we must register components as global
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

    logger.success('Kongponents module has been registered 🚀')
  },
})
