---
title: Getting Started
next: false
---

<img src="../kongponents-logo.jpg" />

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong](https://konghq.com)'s application needs, but are generic enough to use in any web application.

## Local Installation
To begin developing Kongponents you will need to import each component individually.

```bash
$ yarn add  @kongponents/kbutton

# or

$ npm install @kongponents/kbutton
```

Import and register components globally

```js
import KButton from '@kongponents/kbutton';
Vue.component('KButton', KButton);
```

Or locally inside a component

```js
import KButton from '@kongponents/kbutton';
export default {
  ...
  components: { KButton },
  ...
};
```

## Without Bundle System
You can also install Kongponents into a project where there is no build system
as long as Vue is included. Each Kongponent is packaged as a `umd.js` file, so as long as you have loaded Vue in your project the Kongponent will work as intended.

<iframe width="100%" height="300" src="//jsfiddle.net/darrenjennings/khesrbLc/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
