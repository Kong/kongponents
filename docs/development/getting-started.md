# Getting Started

## Installation
To begin developing Kongponents you will need to import each component individually. For a list of all components & their features see the [components](/components/) section.

```bash
$ yarn add  @kongponents/kbutton

# or

$ npm install --save @kongponents/kbutton
```

```js
// Import and register components globally
import KButton from '@kongponents/kbutton';
Vue.component('KButton', KButton);

// Or

// Import inside a single component
import KButton from '@kongponents/kbutton';
export default {
  ...
  components: { KButton },
  ...
};
```
