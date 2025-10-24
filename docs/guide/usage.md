# Usage

You can use Kongponents in your project in three ways, depending on your setup and needs:

- [Vue Plugin](#vue-plugin)
- [Import components as needed](#using-the-vue-plugin-in-nuxt)
- [Nuxt Module](#nuxt-module)

For standard Vue projects, you'll need to manually import the Kongponents CSS, since [Vite's library mode](https://vitejs.dev/guide/build.html#library-mode) doesn't currently support CSS in JS when building in library mode.

The easiest place to import the package styles is inside your Vue entry file (e.g. `main.ts`):

```ts
import '@kong/kongponents/dist/style.css'
```

::: tip NOTE
If you're using Nuxt, the module automatically handles component registration and style imports, so no extra setup is required.
:::

## Vue Plugin

If you plan to use a majority of the Kongponent components, you can import the package and register all Kongponents as a Vue Plugin and make them globally available in your app.

This method is only ideal if you are using a majority of the Kongponents in your project, as the unused components will not be tree-shaken.

```ts
// main.ts (or Vue entry file)

import { createApp } from 'vue'
import Kongponents from '@kong/kongponents'

// Import Kongponents styles
import '@kong/kongponents/dist/style.css'

const app = createApp(App)

// Install and register all Kongponents as a plugin
app.use(Kongponents)

app.mount('#app')
```

### Using the Vue Plugin in Nuxt

The majority of components are SSR-compatible so there is no extra configuration needed for using Kongponents in Nuxt or a server-side rendered project.

::: tip NOTE
We recommend using the official [Nuxt Module](#nuxt-module) for the best integration experience with Nuxt projects.
:::

```ts
// plugins/kongponents.ts

// Import the Kongponents Vue plugin
import Kongponents from '@kong/kongponents'
// Import Kongponents styles
import '@kong/kongponents/dist/style.css'
// In some NodeJS environments, the `crypto` module is not available by default, so import it and make it available on the server
import crypto from 'node:crypto'

export default defineNuxtPlugin({
  name: 'kongponents',
  setup(nuxtApp) {
    // Inject the crypto module into the global scope if it is not already available
    if (import.meta.server && typeof globalThis?.crypto === 'undefined') {
      globalThis.crypto = globalThis.crypto || crypto
    }
    // Initialize the Kongponents Vue plugin
    nuxtApp.vueApp.use(Kongponents)
  },
})
```

## Nuxt Module

Kongponents provides a first-class [Nuxt module](https://nuxt.com/docs/4.x/guide/concepts/modules) for seamless integration and automatic component registration. This is the most convenient and maintainable way to use Kongponents in your Nuxt app.

Most components are SSR-compatible, so no extra configuration is needed! Just add the module to your Nuxt configuration, and all components will be auto-imported and ready to use.

```ts [nuxt.config.ts]
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@kong/kongponents/nuxt'],

  kongponents: {
    components: {
      /**
       * Optional list of component names to include in auto-registration.
       * If unset or empty, all components will be included.
       */
      include: [],
      /**
       * Optional list of component names to exclude from auto-registration
       */
      exclude: [],
    },
    /**
     * Whether to register provided composables.
     * For example, you can access the included `useToast` composable.
     */
    composables: true,
  },
})
```

### composables

If you enable composables in the module options, you can access utilities like useToast directly in your Nuxt app.

#### useToast

`useToast` provides a simple way to trigger toast notifications from any component.

```ts
<script setup lang="ts">
const { showToast } = useToast()

showToast({
  message: 'Item added successfully!',
  appearance: 'success',
})
</script>
```

You can also pass additional options to customize the toast:

```ts
interface Toast {
  /**
    * Unique identifier of toaster
    * @default 'kongponents-toast'
    */
  key?: string
  /**
    * Title to display in toaster
    * @default undefined
    */
  title?: string
  /**
    * Text to display in toaster
    * @default 'Success'
    */
  message?: string
  /** 
   * Visual appearance of toaster
   @default 'success'
   */
  appearance?: 'info' | 'success' | 'danger' | 'warning' | 'system'
  /**
    * Duration in milliseconds before toaster auto-dismisses
    * @default 3000
    */
  timeoutMilliseconds?: number
  /**
    * ID of the timeout that automatically closes the toast after the specified duration.
    * Used internally to clear the timeout when the toast is manually closed.
    * @default undefined
    */
  timer?: number
}
```


## Individual components

Alternatively, you can import and register just the components you intend to use.

Import and registration can be done individually in the app entry file (e.g. `main.ts`) or within the parent component.

### Global Registration

```ts
// main.ts (or Vue entry file)

import { createApp } from 'vue'
import { KButton } from '@kong/kongponents'
import '@kong/kongponents/dist/style.css'
// If using Vue-CLI and webpack, you can likely use
// this path instead: import '~@kong/kongponents/dist/style.css'

const app = createApp(App)

// Register an individual Kongponent
app.component('KButton', KButton)

app.mount('#app')
```

### In-Component Registration

```html
<script lang="ts">
// YourComponent.vue

import { defineComponent } from 'vue'
import { KButton } from '@kong/kongponents'
// Import Kongponents styles here, or in the <style> block
import '@kong/kongponents/dist/style.css'
// If using Vue-CLI and webpack, you can likely use
// this path instead: import '~@kong/kongponents/dist/style.css'

export default defineComponent({
  name: 'YourComponent',
  components: { KButton },
})
</script>

<style>
/* Import Kongponents styles here, or in the <script> tag */
@import '@kong/kongponents/dist/style.css';
/* If using Vue-CLI and webpack, you can likely use
this path instead: import '~@kong/kongponents/dist/style.css' */
</style>
```

## TypeScript interfaces

:::tip NOTE
This step is only a suggestion for apps that globally register Kongponents. If you import components individually in the components where they are being used, this is not needed.
:::


If you globally register components in your app (via the [Vue Plugin](#vue-plugin) or one-by-one) you should modify your host application to register the global components for TypeScript hinting throughout your app.


In your host app, create an new declaration file `src/global-components.d.ts` with the following contents:

```ts
// Import the Kongponents GlobalComponents interface
import '@kong/kongponents/dist/types/global-components'

// Feel free to add your host app's other globally registered components as needed
import type YourGlobalComponent from './components/YourGlobalComponent.vue'

declare module '@vue/runtime-core' {
  // Add all host app globally-registered components
  export interface GlobalComponents {
    YourGlobalComponent: typeof YourGlobalComponent
  }
}
```

Next, ensure the `tsconfig.json` of your host application is set up to properly include your `global-components.d.ts` file. It should look something like this:

```json
{
  "compilerOptions": {
    // your settings
  },
  "include": [
    "src/**/*.ts"
    // other include rules
  ]
}
```

## Icons

Kongponents sources all icons from [`@kong/icons`](https://github.com/Kong/icons) library. If you wish to use standalone icons in your project, please refer to the `@kong/icons` documentation for instructions.
