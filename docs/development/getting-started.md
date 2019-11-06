# Getting Started
Kongponents offer teams the ability to reuse frequently needed UI elements across applications. They should be simple on the surface and extensible. Kongponents should also be maintainable and easy to compose with others. They were developed to solve Kong's application needs, but are generic enough to use in any Vue web application.

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
Vue.use(KButton);

// Or

// Import inside a single component
import KButton from '@kongponents/kbutton';
export default {
  ...
  components: { KButton },
  ...
};
```
