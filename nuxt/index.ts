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
      addComponent({
        name: `${options.prefix}${component.name?.replace('K', '')}`,
        export: component.name,
        filePath: '@kong/kongponents',
        global: true,
        mode: 'all',
      })
    }
  },
})
