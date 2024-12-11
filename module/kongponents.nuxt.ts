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

    // Import all components
    // const components = await import(resolver.resolve('../src/components/index.ts'))

    // let componentCount = 0

    // Loop through the imported components
    // Object.entries(components).forEach(([name, component]: [string, any]) => {
    //   if (component) {
    //     addComponent({
    //       name,
    //       filePath: component, // The file path of the component
    //       global: true,
    //       kebabName: kebabCase(name),
    //       pascalName: pascalCase(name),
    //     })
    //     // Increment component count
    //     componentCount++
    //   }
    // })

    // logger.success(`Globally registered ${componentCount} components`)

    addComponentsDir({
      path: resolver.resolve('../src/components/'),
      extensions: ['vue'],
      pattern: '**/*.vue',
      pathPrefix: false,
      prefix: '',
      global: true,
    })

    logger.success('Globally registered all Kongponents')
  },
})
