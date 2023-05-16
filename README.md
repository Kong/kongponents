[![Kong Kongponents](/docs/.vitepress/public/img/kongponents-logo.jpg?raw=true)][docsUrl]

---

[![Publish](https://github.com/Kong/kongponents/actions/workflows/publish.yml/badge.svg)](https://github.com/Kong/kongponents/actions/workflows/publish.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Kongponents is a Vue component library of frequently needed UI elements. They were developed to solve [Kong's](https://konghq.com) application needs, but are generic enough to use in any web application.

## Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/426d5e0a-fc41-4c1d-ba80-38417b614394/deploy-status?branch=main)](https://app.netlify.com/sites/kongponents/deploys)

[Kongponents Docs][docsUrl] are powered by VitePress and the source can be viewed [here](docs/).

[docsUrl]: https://kongponents.konghq.com

### Committing Changes

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

[Commitizen](https://github.com/commitizen/cz-cli) and [Commitlint](https://github.com/conventional-changelog/commitlint) are used to help build and enforce commit messages.

It is __highly recommended__ to use the following command in order to create your commits:

```sh
yarn commit
```

This will trigger the Commitizen interactive prompt for building your commit message.

#### Enforcing Commit Format

[Lefthook](https://github.com/evilmartians/lefthook) is used to manage Git Hooks within the repo. A `commit-msg` hook is automatically setup that enforces commit message stands with `commitlint`, see [`lefthook.yml`](./lefthook.yml).

