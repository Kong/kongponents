---
title: Getting Started
next: false
---

<img src="../kongponents-logo.jpg" />

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong](https://konghq.com)'s application needs, but are generic enough to use in any web application.

## Installation
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
