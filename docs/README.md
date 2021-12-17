---
title: Getting Started
next: false
---

<img src="../kongponents-logo.jpg" />

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong](https://konghq.com)'s application needs, but are generic enough to use in any web application.

## Installation

To begin using Kongponents, you must first import the base `@kongponents/styles` package. [Read more about the style guide usage](./style-guide/usage.md).

Next, you will need to install each desired component. You can install multiple components at once, or one at a time as needed.

```bash
$ yarn add @kongponents/styles @kongponents/kbutton

# or

$ npm install @kongponents/styles @kongponents/kbutton
```

You will likely need to transpile all of the `@kongponents` packages in your project. If your project already has a `vue.config.js` file, just add the following `transpileDependencies` entry

```js
// vue.config.js

module.exports = {
  transpileDependencies: [
    /@kongponents\/.*/
  ]
}
```

If your project does not have a `vue.config.js` file and instead uses webpack config files, you can add a loader rule (for example, for `babel-loader`) similar to the following (only showing the relevant entries)

```js
// webpack.config.js

module.exports = (env) => {
  return {
    module: {
      loaders: [
        // transpile @kongponents packages
        {
          test: /\.js$/,
          include: /(node_modules)\/(@kongponents)/,
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

If you choose to utilize any of the [CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) included in the `@kongponents` packages and your project uses [PostCSS](https://postcss.org/), you will likely need use the [`postcss-custom-properties` PostCSS plugin](https://github.com/postcss/postcss-custom-properties) so that the variables are preserved in their original form.

```sh
$ yarn add postcss-custom-properties --dev

# or

$ npm install postcss-custom-properties --save-dev
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

## Usage

You can import and register components globally (e.g. in your Vue entry file, like `main.js`)

```js
import KButton from '@kongponents/kbutton';
Vue.component('KButton', KButton);
```

Or locally inside another component

```js
import KButton from '@kongponents/kbutton';
export default {
  ...
  components: { KButton },
  ...
};
```

## Without Bundle System

You can also use Kongponents in a project where there is no build system as long as Vue is included on the page. Each Kongponent [is packaged as a `umd.js` file](https://cli.vuejs.org/guide/build-targets.html#library), so as long as you have loaded Vue in your project the Kongponent will work as intended.

:::tip Note
You must import the CSS from the `@kongponents/styles` package along with Vue.
:::

<iframe width="100%" height="300" style="width: 100%;" scrolling="no" title="Vue 2 with Kongponents" src="https://codepen.io/adamdehaven/embed/RwLVQLw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/adamdehaven/pen/RwLVQLw">
  Vue 2 with Kongponents</a> by Adam DeHaven (<a href="https://codepen.io/adamdehaven">@adamdehaven</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
