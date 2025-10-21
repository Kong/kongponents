import { defineNuxtModule, createResolver, addPlugin } from '@nuxt/kit'


export interface ModuleOptions {
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents/nuxt',
    configKey: 'kongponents',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    prefix: 'k',
  },
  async setup(options: ModuleOptions) {
    // TODO: find a way to register the components

  },
})
