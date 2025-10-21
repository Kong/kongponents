import { addPlugin, defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

import { components } from '@kong/kongponents'

export interface ModuleOptions {
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents/nuxt',
    configKey: 'kongponents',
  },
  defaults: {
    prefix: 'k',
  },
  setup(options) {
    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./plugin'))

    for (const component of Object.values(components)) {
      // @ts-ignore - __name exists
      const name = component.__name || component.name || ''
      if (!name) continue
      addComponent({
        name: `${options.prefix}${name.replace('K', '')}`,
        export: component.name,
        filePath: '@kong/kongponents',
        global: true,
        mode: 'all',
      })
    }
  },
})
