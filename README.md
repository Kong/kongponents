[![](kongponents-logo.jpg?raw=true)][docsUrl]

---
![](https://github.com/Kong/kongponents/workflows/Node%20CI/badge.svg)
[![](https://img.shields.io/codecov/c/github/Kong/kongponents.svg?style=flat-square)](https://codecov.io/github/Kong/kongponents)

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong](https://konghq.com)'s application needs, but are generic enough to use in any web application.

## Documentation

[Kongponents Docs][docsUrl] are powered by VuePress and the source can be viewed [here](docs/README.md).

[docsUrl]: https://kongponents.konghq.com

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
