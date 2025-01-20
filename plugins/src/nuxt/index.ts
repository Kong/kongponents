import { defineNuxtModule, addComponent } from '@nuxt/kit'
import { components as allComponents } from '@kong/kongponents'

export interface ModuleOptions {
  components: Partial<Record<keyof typeof allComponents, boolean>> | boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kong/kongponents',
    configKey: 'kongponents',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    components: true,
  },
  setup(options, _nuxt) {
    // Import Kongponents styles
    _nuxt.options.css.push('@kong/kongponents/dist/style.css')

    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(allComponents)
          .filter(([name]) => options.components[name] ?? true)
          .flatMap(([_, components]) => components)
      }

      return options.components ? Object.values(allComponents).flat() : []
    }

    // we need this because of KDropdownMenu
    const addedNames = new Set<string>()

    getComponents().forEach((component) => {
      if (typeof component === 'object') {
        const name = component?.name || component.__name

        // If the component is already added, skip it
        if (addedNames.has(name)) return

        addComponent({
          name: name,
          export: name,
          filePath: '@kong/kongponents',
          mode: 'all',
        })

        addedNames.add(name)
      }

    })
  },
})
