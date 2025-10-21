import { addPlugin, defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

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
  async setup() {
    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./plugin'))

    addComponent({
      name: 'KAlert',
      export: 'KAlert',
      filePath: '@kong/kongponents',
      global: true,
      mode: 'all',
    })
  },
})
