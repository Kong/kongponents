# Contributing

In this section we will focus on the steps and nuances of developing Kongponents. Lets start with installation.

## Installation

Clone the Kongponents repository

```sh
git clone https://github.com/Kong/kongponents.git
```

Install dependencies

```sh
cd kongponents && yarn install --frozen-lockfile
```

Next, let's generate [the CLI](#cli) that can be used to easy scaffold new Kongponent components. _This likely was ran automatically after installing dependencies._

```sh
yarn build:cli
```

Run the docs local dev server with hot-module reload

```sh
yarn docs:dev
```

Build the docs and preview the built files locally

```sh
yarn docs:preview
```

Perform a full build of all Kongponents and the Docs site

```sh
yarn build
```

Perform a full build of all Kongponents and output a `/bundle-analyzer/stats-treemap.html` to view the output.

```sh
yarn build:visualize
```

## CLI

It is **highly recommended** to utilize the included CLI when creating new Kongponents as it will scaffold all the necessary files.

```sh
yarn create-kongponent
```

## Create a new Kongponent

When creating a new component with the CLI it will perform the following actions:

- Creates `/src/components/{KongponentName}/` directory with the following files:
  - `{KongponentName}.cy.ts` - Cypress Component Test file
  - `{KongponentName}.vue` - Component file
- Adds `/src/components/{KongponentName}/{KongponentName}.vue` to the exports in `/src/components/index.ts`
- Creates a VitePress markdown file at `/docs/components/{kongponent}.md` (you have to manually add this file to the VitePress sidebar in `docs/.vitepress/config.ts`).

::: warning NOTE
If your component is exported via an `index.ts` file, or anything other than the default `{KongponentName}.vue` file, you will need to modify `/src/components/index.ts` accordingly.
:::

Once ran, this will be the resulting file structure:

```bash
├── docs/
│   └── components/
│       └── {kongponent}.md
└── src/
    └── components/
        └── {KongponentName}/
          ├── {KongponentName}.cy.ts
          └── {KongponentName}.vue
```

### Important: Type Exports

:::tip TIP
As long as you create the new Kongponent via `yarn create-package` this step is automated.
:::

You **must** manually add the new component type to the module export located at `src/global-components.ts`. Just add your new component to the bottom of the list.

```ts{10}
// src/global-components.ts
import type * as components from './components'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    KAlert: typeof components.KAlert
    KBadge: typeof components.KBadge
    KBreadcrumbs: typeof components.KBreadcrumbs
    KButton: typeof components.KButton
    YourNewComponent: typeof components.YourNewComponent
  }
}
```

### Add the doc file to the sidebar

Although the CLI will create a file in the docs directory, the new doc file **is not automatically added to the docs sidebar config**.

Add the component to the desired location in the sidebar

```ts{11-16}
// docs/.vitepress/config.ts

sidebar: {
  // Components sidebar
  '/components/': [
    {
      text: 'Components',
      collapsible: true,
      items: [
        ...
        {
          // The name of the rendered element, e.g. "Alert"
          text: '{Component Name}',
          // The name of the `.md` markdown file without the extension, e.g. "/components/alert.md"
          link: '/components/{component-name}',
        },
        ...
      ]
    }
  ]
}
```

## Edit the Doc file

Each component has an associated file in the `/docs/components` directory. After scaffolding the new component file, a doc file should be present named the same as your new component. Below are the steps to add the file to the docs site and how to get started editing.

### Renaming the file (if needed)

The docs markdown file should be named correctly if generated from the [`create-kongponent` CLI](#cli). If necessary, rename the file to correspond to what type of component it is. For documentation purposes page names should be based on what the component is vs its Kongponent `K` name.

#### Examples

- `kbutton.md` &rarr; `button.md`
- `kcard.md` &rarr; `card.md`
- `kdatetimepicker` &rarr; `datetime-picker.md`

### Update the page title

Update the first line of the doc to match the file name. This is what is displayed as the page title & in the sidebar.

```md
# {Name}

**{KongponentName}** - description
```

### Importing type declarations and interfaces

When importing type declarations or interfaces, you can use a relative path instead of the `@/` alias so that the types are properly resolved within consuming packages. See the example below:

```ts
import { StepperState } from './KStepState.vue'
```

This repository utilizes [`tsc-alias`](https://www.npmjs.com/package/tsc-alias) to replace these paths during the build; however, either method is acceptable.

### Style guidelines

In order to prevent component styles from leaking out into the consuming application, **all** component styles **MUST** adhere to one of the following rules:

1. (Preferred) All styles must be `scoped` within your components with `<style lang="scss" scoped>`.
   1. If you need to target nested components (e.g. Kongponents) to override styles, you'll need to utilize [deep selectors](https://vuejs.org/api/sfc-css-features.html#deep-selectors)

    ```html
    <style lang="scss" scoped>
    .your-component-class {
      :deep(.k-button) {
        /* KButton override styles go here */
        border-color: red;
      }
    }
    </style>
    ```

2. All component styles must be wrapped in a unique wrapper class so that styles do not leak out into the consuming application.

    The class name should follow the syntax `.k-{component-name}-*`

   This is a good practice even if you go with option one outlined above.

    ```html
    <style lang="scss">
    .k-button {
      /* All other styles must go inside the wrapper */
    }
    </style>
    ```

#### Relative units

Kongponent styles should **never** use relative font units; specifically, do not use `rem` or `em` units.

We cannot control the `html` base font size and therefore these relative units are not predictable within a host application. Use `px` (pixels) or a similar unit instead.

## Testing your component

You're free to play around with your component on the local instance of the docs site by running `yarn docs:dev`; however, you may also want to test your local changes in a consuming application.

1. Run `yarn link` from the root of the Kongponents repository

    ```sh
    yarn link

    yarn link v1.22.17
    success Registered "@kong/kongponents".
    info You can now run `yarn link "@kong/kongponents"` in the projects where you want to use this package and it will be used instead.
    ✨  Done in 0.04s.
    ```

1. Build the Kongponents package

    ```sh
    yarn build:kongponents
    ```
1. As the instructions above outline, next, inside your consuming application, run `yarn link "@kong/kongponents"`

    ```sh
    yarn link "@kong/kongponents"

    yarn link v1.22.19
    success Using linked package for "@kong/kongponents".
    ✨  Done in 0.04s.
    ```

    Now that the dependency is linked, your local project will utilize the local build.

    :::tip TIP
    If your project utilizes Vite, you may need to dedupe your dependency tree to avoid errors when running locally. Inside your `vite.config.ts` file, insert the following configuration:

    ```ts{5}
    export default defineConfig({
      resolve: {
        // Use this option to force Vite to always resolve listed dependencies to the same copy (from project root)
        // Allows utilizing `yarn link "{package-name}"` without throwing errors
        dedupe: ['vue']
      },
    })
    ```
    :::

1. When you're finished testing, don't forget to run `yarn unlink` inside the Kongponents directory.

    ```sh
    yarn unlink

    yarn unlink v1.22.17
    success Unregistered "@kong/kongponents".
    info You can now run `yarn unlink "@kong/kongponents"` in the projects where you no longer want to use this package.
    ✨  Done in 0.04s.
    ```

## Sandbox

The sandbox mode in Kongponents provides developers with a controlled environment to test and ensure that no styles from the docs app leak through into the component library. This feature guarantees that the components look and function as intended, without any external interference.

By using the sandbox mode, you can have confidence that components maintain their visual consistency, regardless of the context in which they are used.

```sh
yarn dev:sandbox
```

## Committing Changes

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

[Commitizen](https://github.com/commitizen/cz-cli) and [Commitlint](https://github.com/conventional-changelog/commitlint) are used to help build and enforce commit messages.

It is __highly recommended__ to use the following command in order to create your commits:

```sh
yarn commit
```

This will trigger the Commitizen interactive prompt for building your commit message and will allow you to preview your commit.

### Enforcing Commit Format

[Lefthook](https://github.com/evilmartians/lefthook) is used to manage Git Hooks within the repo. See see the current `/lefthook.yml` here:

<<< @/../lefthook.yml{yaml}

A `commit-msg` hook is automatically setup that enforces commit message stands with `commitlint`.

A `pre-push` hook is configured to run Stylelint and ESLint before pushing your changes to the remote repository.

## Recommended IDE Setup

We recommend using [VSCode](https://code.visualstudio.com/) along with the [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

### Types for vue components 

All types related to component should be included in `types` folder. And exported in `index.ts` file.
```bash
── src/
    └── types/
     ├── {Kongponent-name}.ts
     └── index.ts
```
When importing type to a component we use import with `type` prefix
```ts
import type { SomeType } from '@/types'
```

### Tips when typing vue component
 - Use whenever possible ts String Literal Types instead of `String` for props.
 - Avoid using `Object` type as props, use interface instead.
