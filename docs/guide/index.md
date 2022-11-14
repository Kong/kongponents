---
title: Getting Started
---

![Kongponents Logo](/img/kongponents-logo.jpg)

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong's](https://konghq.com) application needs, but are generic enough to use in any web application.

## Install

To begin using Kongponents, start by installing the package into your project.

```sh
yarn add @kong/kongponents
```

If you choose to utilize any of the [CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) included in the `@kong/kongponents` package and your project uses [PostCSS](https://postcss.org/), you will likely need use the [`postcss-custom-properties` PostCSS plugin](https://github.com/postcss/postcss-custom-properties) so that the variables are preserved in their original form.

```sh
yarn add postcss-custom-properties --dev
```

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

### Optimize or Transpile Dependencies

Depending on your project setup, you may need to optimize or transpile the `@kong/kongponents` package in your project.

If your project uses [Vite](https://vitejs.dev), just add the following to your `vite.config.ts

```ts
export default defineConfig({
  build: {
    commonjsOptions: {
      include: [
        /@kong\/kongponents/,
        /node_modules/
      ]
    },
  }
})
```

If your project already has a `vue.config.ts` file, just add the following `transpileDependencies` entry

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
        // transpile Kongponents packages
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

## Using Kongponents from CDN

You can also use Kongponents in a project where there is no build system as long as Vue is included on the page.

::: tip NOTE
You must import the CSS from the `@kong/kongponents` package along with Vue.
:::

### Example

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/@kong/kongponents@8/dist/kongponents.umd.js"></script>
<link href="https://unpkg.com/@kong/kongponents@8/dist/style.css" rel="stylesheet" />

<div id="app">
  <k-button appearance="primary" v-on:click="count += 1" icon="plus">Add</k-button>
  <p>Click count: {{ count }}</p>
</div>

<script>
  const {
    createApp
  } = Vue
  const components = Kongponents
  createApp({
    components: {
      KButton: components.KButton
    },
    data() {
      return {
        count: 1
      }
    }
  }).mount('#app')
</script>
```

<iframe width="100%" height="300" style="width: 100%;" scrolling="no" title="Kongponents for Vue" src="https://codepen.io/adamdehaven/embed/KKowxVQ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/adamdehaven/pen/KKowxVQ">
  Kongponents for Vue</a> by Kong, Inc.
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
