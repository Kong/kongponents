---
title: Getting Started
next: false
sidebarDepth: 1
---

![Kongponents Logo](/img/kongponents-logo.jpg)

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong's](https://konghq.com) application needs, but are generic enough to use in any web application.

## Installation

To begin using Kongponents, being by installing the package into your project using `yarn` or `npm`.

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn add @kong/kongponents
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm install @kong/kongponents
  ```

  </CodeGroupItem>
</CodeGroup>

You will likely need to transpile the `@kong/kongponents` package in your project. If your project already has a `vue.config.ts` file, just add the following `transpileDependencies` entry

```ts
// vue.config.ts

module.exports = {
  transpileDependencies: [
    /@kong\/kongponents/
  ]
}
```

If your project does not have a `vue.config.ts` file and instead uses webpack config files, you can add a loader rule (for example, for `babel-loader`) similar to the following (only showing the relevant entries)

```js
// webpack.config.js

module.exports = (env) => {
  return {
    module: {
      loaders: [
        // transpile @kongponents packages
        {
          test: /\.js$/,
          include: /(node_modules)\/(@kong\/kongponents)/,
          loader: 'babel-loader',
        },
        // process all .js files, but ignore all other node_modules not listed above
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
      ]
    }
  }
}
```

If you choose to utilize any of the [CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) included in the `@kong/kongponents` package and your project uses [PostCSS](https://postcss.org/), you will likely need use the [`postcss-custom-properties` PostCSS plugin](https://github.com/postcss/postcss-custom-properties) so that the variables are preserved in their original form.

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn add postcss-custom-properties --dev
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm install postcss-custom-properties --save-dev
  ```

  </CodeGroupItem>
</CodeGroup>

Next, add a `postcss.config.js` file to your project with the following content

```js
// postcss.config.js

module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      preserve: true
    }
  }
})
```

## Usage

There are two ways to use Kongponents in your project

### Globally install all Kongponents

If you plan to use a majority of the Kongponent components, you can import the package and install as a Vue Plugin to register all components and make them globally available in your app.

This method is only ideal if you are using a majority of the Kongponents in your project, as the unused components will not be tree-shaken.

```ts
// main.ts (or Vue entry file)

import { createApp } from 'vue'
import Kongponents from '@kong/kongponents'

const app = createApp(App)

// Install and register all Kongponents as a plugin
app.use(Kongponents)

app.mount('#app')
```

### Register individual Kongponents

Alternatively, you can import and register just the components you intend to use.

Import and registration can be done globally in your Vue entry file (e.g. `main.ts`), or locally, just in the component where it will be used.

<CodeGroup>
  <CodeGroupItem title="Global Registration" active>

  ```ts
  // main.ts (or Vue entry file)

  import { createApp } from 'vue'
  import { KButton } from '@kong/kongponents'

  const app = createApp(App)

  // Register an individual Kongponent
  app.component('KButton', KButton)

  app.mount('#app')
  ```

  </CodeGroupItem>

  <CodeGroupItem title="In-Component Registration">

  ```ts
  // YourComponent.vue

  import { defineComponent } from 'vue'
  import { KButton } from '@kong/kongponents'

  export default defineComponent({
    name: 'YourComponent',
    components: { KButton },
  })
  ```

  </CodeGroupItem>
</CodeGroup>

## Without Bundle System

You can also use Kongponents in a project where there is no build system as long as Vue is included on the page.

:::tip Note
You must import the CSS from the `@kong/kongponents` package along with Vue.
:::

:::danger WARNING
This example needs to be updated for Vue 3.
:::

<iframe width="100%" height="300" style="width: 100%;" scrolling="no" title="Vue 2 with Kongponents" src="https://codepen.io/adamdehaven/embed/RwLVQLw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/adamdehaven/pen/RwLVQLw">
  Vue 2 with Kongponents</a> by Adam DeHaven (<a href="https://codepen.io/adamdehaven">@adamdehaven</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
