import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {
  // Define module options here as needed
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'kongponents',
    configKey: 'kongponents',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('../src/components'),
      pathPrefix: false,
      prefix: '',
      global: true,
    })
  },
})

// export * from './types'
