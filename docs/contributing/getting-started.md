# Getting Started

In this section we will focus on the steps and nuances of developing Kongponents. Lets start with installation.

## Installation

Clone the Kongponents repository

```sh
git clone https://github.com/Kong/kongponents.git
```

Install dependencies with `yarn` or `npm`

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  cd kongponents && yarn
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  cd kongponents && npm install
  ```

  </CodeGroupItem>
</CodeGroup>

The CLI should have been built for you after installation. In case it failed (you won't see a `/bin` folder in the project), manually generate the CLI

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn build:cli
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm run build:cli
  ```

  </CodeGroupItem>
</CodeGroup>

Run the docs locally

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn docs:dev
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm run docs:dev
  ```

  </CodeGroupItem>
</CodeGroup>

Perform a full build

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn build
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm run build
  ```

  </CodeGroupItem>
</CodeGroup>

## CLI

It is recommended to use the CLI (`create-kongponent`) when creating new components as it will scaffold all the required files. You can run it locally from the package or install it globally.

### Run local CLI

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn create-kongponent
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm run create-kongponent
  ```

  </CodeGroupItem>
</CodeGroup>

### Install global CLI

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  # Link the package
  yarn link

  # Run the CLI
  create-kongponent
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  # Link the package
  npm link

  # Run the CLI
  create-kongponent
  ```

  </CodeGroupItem>
</CodeGroup>

## Create a new Kongponent

When creating a new component with the CLI it will perform the following actions:

- Creates `/src/components/{KongponentName}/` directory with the following files:
  - `{KongponentName}.spec.ts` - Cypress Component Test file
  - `{KongponentName}.vue` - Component file
- Adds `/src/components/{KongponentName}/{KongponentName}.vue` to the exports in `/src/components/index.ts`
- Creates a VuePress markdown file at `/docs/components/{kongponent}.md` (you have to manually add this file to the VuePress sidebar in `docs/.vuepress/config.ts`).

  :::warning NOTE
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
          ├── {KongponentName}.spec.ts
          └── {KongponentName}.vue
```

## Edit the Doc file

Each component has an associated file in the `/docs/components` directory. After scaffolding the new component file, a doc file should be present named the same as your new component. Below are the steps to add the file to the docs site and how to get started editing.

### Renaming the file (if needed)

Rename the file to correspond to what type of component it is. For documentation purposes page names should be based on what the component is vs its Kongponent `K` name.

e.g. `kbutton.md` &rarr; `button.md` ; `kcard.md` &rarr; `card.md`

### Update the page title

Update the first line of the doc to match the file name. This is what is displayed as the page title & in the sidebar.

```md
# {Name}

**{KongponentName}** - description
```

### Add the doc file to the sidebar

Although the CLI will create a file in the docs directory, it does not add it to the sidebar config.

Add the component to the desired location in the sidebar

```ts
// docs/.vuepress/config.ts

{
  text: 'Kongponents',
  children: [
    '/components/',
    {
      text: 'Components',
      children: [
        ...
        '/components/{komponent}', // Should be the name of the `.md` markdown file, without the extension
        ...
      ]
    }
  ]
}
```
