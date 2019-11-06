[docsUrl]: https://kongponents.netlify.com

![](kongponents-logo.jpg?raw=true)

---
![](https://github.com/Kong/kongponents/workflows/Node%20CI/badge.svg)

Welcome to Kongponents, Kong's very own [Vue](https://vuejs.org/) component library. Kongponents offer teams the ability to reuse frequently needed UI elements, reducing each team's efforts. They should be simple on the surface and extensible. Kongponents should also be maintainable and easy to compose with others. Unique components that are tightly related to a particular application should not be turned into Kongponents. Kongponents are built and designed with Kong in mind first and may not meet your design requirements.

### Features
- **Works out of the box.** Vue components that work right out of the box.
- **Flexible & composable.** Simple APIs and easy to use theming capabilities.
- **Enterprise ready.** Designed enterprise web applications.

## Documentation & Community
- For documentation on developing, publishing & general component usage see the [Documentation](docsUrl).
- For questions please visit the [issues](https://github.com/Kong/kongponents/issues) tab. 

## Installation
Kongponents is a mono repo, managed by [Lerna](https://lerna.js.org/). It follows suggested Lerna directory structure with a root `packages` folder which contain all the components.

```
packages                     # root directory of all components
├── KButton                  
│   ├── KButton.spec.js
│   ├── KButton.stories.js
│   ├── KButton.vue
│   ├── Readme.md
│   └── package.json             # each component gets its own package.json
│                                # which is managed by Lerna.
├── KModal    
│   ├── KModal.spec.js           # .spec files are picked by test runner
│   ├── KModal.stories.js        # .stories are picked up by Storybook
│   ├── KModal.vue    
│   ├── Readme.md                
│   ├── __snapshots__            # Jest snapshots for component diff checks
│   │   └── KModal.spec.js.snap
│   └── package.json
├── KIcon
│   ├── ...
│   ├── ...
.   .
.
```

## Usage
Most packages export a single Vue component, to begin using them you will need to import each component individually. For a list of all components & their features see the [documentation](docsUrl).

```bash
$ yarn add  @kongponents/kbutton

# or

$ npm install @kongponents/kbutton
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

## Development
If you are interested in contributing to the Kongponents repo, please review [CONTRIBUTING.md](CONTRIBUTING.md) for Git standards. We use [VuePress]() to document and locally develop Kongponents. You can start the docs by running the following and then live developing in a `/docs/components/<component>.md`

```bash
$ yarn docs:dev
```

### Kongponents CLI
The Kongponents repo includes a CLI (KPM) to help with common tasks (creating, testing, etc). See the CLI help menu for details

```bash
$ node cli --help

# or install globally

$ npm install -g
$ kpm --help
```

### Creating a New Kongponent
Run the following command to create a new component. This command will scaffold a new component directory and necessary files from a [template](cli/template). A markdown docs file will also be generated in `/docs/components`.

```bash
$ kpm create <kongponent_name> -d <kongponent_description>
```

### Style Guidelines
All Kongponents should abide by the essential rules in Vue's [style guide](https://vuejs.org/v2/style-guide/). To maintain consistency, use conventions that already exist in other Kongponents: name the Kongponent with K, use camel case, and be as accurate as possible in naming Kongponents.

Provide as much detail in the [prop definitions](https://vuejs.org/v2/style-guide/#Prop-definitions-essential) as possible to (1) make the code self-documenting and (2) enable Vue to warn developers if they are providing props to the Kongponent incorrectly.  

Use predicates in names of data properties or methods that return booleans. For example, use “isDisabled” and “hasBorder” instead of “disabled” and “border”. Avoid abbreviations unless they are commonly used acronyms, e.g., “isUrl”, “http”.

### Avoiding Dependencies
Avoid introducing new dependencies into Kongponents. Part of this library's value is that it reduces the need for external UI libraries such as Vue Bootstrap. More broadly, dependencies in any component library could introduce stability and security issues, and it would quickly become difficult to prevent redundant dependencies with different versions in a given application.

### Documenting Kongponents
In addition to detailed prop definitions, each Kongponent must include a doc in the `/docs/components` directory that explains how the Kongponent is used. See an existing [component doc](/docs/components/button.md) for an example.


## Running Tests
Kongponents uses [Jest](https://jestjs.io/) & [Vue Test Utils](https://vue-test-utils.vuejs.org/) for tests.

```bash
# run all tests
yarn test

# run tests for single component
yarn test packages/KButton

# update snapshot for single component
yarn test packages/KButton --updateSnapshot
```

### Test Basics
Write unit tests for base functionality (e.g., that buttons work correctly, text displays on banners), as well as edge cases (e.g., invalid input, returning to an empty state after clearing the input).

## Asking Questions and Submitting Tickets

If you encounter difficulty working with Kongponents, or find a bug please [create a new issue](https://github.com/Kong/kongponents/issues). Document the steps to replicate the bug with screenshots and error messages, & browser version if possible.

You may also open a new issue to request a feature or an improvement. Please describe use cases for the team to review. If an alternative already exists, mention why a Kongponent would be a better approach. 
