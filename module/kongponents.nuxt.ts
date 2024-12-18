import { defineNuxtModule, createResolver, addComponentsDir, useLogger /*, addComponent */ } from '@nuxt/kit'
// import { kebabCase, pascalCase } from 'scule'

export interface ModuleOptions {
  // Define module options here as needed
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'kongponents',
    configKey: 'kongponents',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('default-portal-pages')

    logger.start('Initializing Kongponents')

    // let componentCount = 0

    // const allComponents = [
    //   {
    //     name: 'KInput',
    //     filePath: resolver.resolve('../src/components/KInput/KInput.vue'),
    //   },
    //   {
    //     name: 'KButton',
    //     filePath: resolver.resolve('../src/components/KButton/KButton.vue'),
    //   },
    // ]

    // // Loop through the imported components
    // for (const c of allComponents) {
    //   addComponent({
    //     name: c.name,
    //     filePath: c.filePath,
    //     global: true,
    //     kebabName: kebabCase(c.name),
    //     pascalName: pascalCase(c.name),
    //   })
    //   // Increment component count
    //   componentCount++
    // }

    // logger.success(`Globally registered ${componentCount} components`)

    // 🥲 this doesn't work
    addComponentsDir({
      path: resolver.resolve('../src/components/'),
      extensions: ['vue'],
      pattern: '**/*.vue',
      pathPrefix: false,
      prefix: '',
      global: true,
    })

    // TODO: Add KToggle

    logger.success('Globally registered all Kongponents')
  },
})
