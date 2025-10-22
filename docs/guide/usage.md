# Usage

There are two ways to use Kongponents in your project: [globally register all Kongponents via a Vue plugin](#vue-plugin), or [register individual Kongponents](#individual-components) as needed.

**Regardless of which method you choose** you will also need to import the Kongponents CSS into your project ([Vite](https://vitejs.dev/guide/build.html#library-mode) does not currently support CSS in JS when building in library mode).

The easiest place to import the package styles is inside your Vue entry file (e.g. `main.ts`).

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

Kongponents provides a first-class [Nuxt module](https://nuxt.com/docs/4.x/guide/concepts/modules) for seamless integration and automatic component registration.

Most components are SSR-compatible so there is no extra configuration needed beyond adding the module.

```ts [nuxt.config.ts]
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@kong/kongponents/nuxt'],

  kongponents: {
    components: {
      /**
       * Optional list of components to include in auto-registration. If unset or empty, all components will be included.
       */
      include: [],
      /**
       * Optional list of components to exclude from auto-registration
       */
      exclude: [],
    },
    /**
     * Whether to register composables globally
     * you can use composables like `useToast`
     */
    composables: true,
  },
})
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
