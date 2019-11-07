[docsUrl]: https://kongponents.netlify.com

![](kongponents-logo.jpg?raw=true)

---
![](https://github.com/Kong/kongponents/workflows/Node%20CI/badge.svg)

Welcome to Kongponents, Kong's very own [Vue](https://vuejs.org/) component library. Kongponents offer teams the ability to reuse frequently needed UI elements, reducing each team's efforts. They should be simple on the surface and extensible. Kongponents should also be maintainable and easy to compose with others. Unique components that are tightly related to a particular application should not be turned into Kongponents. Kongponents are built and designed with Kong in mind first and may not meet your design requirements.

## Getting Started
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
Most packages export a single Vue component, to begin using them you will need to import each component individually. Checkout the [documentation](docsUrl) to get started.
