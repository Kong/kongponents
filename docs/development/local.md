# Local Development

## Installation
 - Git clone the Kongponents repository: `git clone https://github.com/Kong/kongponents.git`
 - Install dependencies in the root of the directory: `cd kongponents && yarn install` 
 - Run the docs locally: `yarn docs:dev`

:::tip
See the [contributing doc](https://github.com/Kong/kongponents/blob/master/CONTRIBUTING.md) for info on submitting PRs.
:::

## CLI
It is recommended to use the CLI (KPM) when creating new components as it will scaffold all the required files.

### Install
Ensure the CLI is installed

```bash
$ node cli --help

# or install globally

$ npm install -g
$ kpm --help
```

### Create a new Kongponent
1. **Scaffold the new component files**
```bash
$ kpm create <kongponent_name> -d <kongponent_description>
```

Once ran, a new directory will be created in `/packages/{%kongponent_name%}` and in `/docs/{%kongponent_name%}` 

```bash
{%kongponent_name%}
├── CHANGELOG.md
├── {%kongponent_name%}.spec.js
├── {%kongponent_name%}.vue
├── README.md
├── docs
│   └── {%kongponent_name%}.md
└── package.json
```

2. **Link docs page correctly**

Although the `kpm create` command will create a file in the docs directory it does not import the component into VuePress nor does it add it to the sidebar.

- In `/docs/.vuepress/enhanceApp.js` import & use the component
  ```js
  // Globally import all Kongponents
  ...
  import {%kongponent_name%} from '../../packages/{%kongponent_name%}'

  export default ({
    Vue,
    options,
    router,
    siteData
  }) => {
  ...
  Vue.component('{%kongponent_name%}', {%kongponent_name%})
  ```
- In `/docs/.vuepress/config.js` add the component to the correct place in the sidebar
  ```js
  {
    title: 'Kongponents',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '/components/',
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ...
          {%komponent_name%}
          ...
        ]
      }
    ]
  }
  ```
- Rename the markdown file
  Last step is to rename the markdown file to the canonical name of the component (i.e. `kalert.md` -> `alert.md`, `kbutton.md` -> `button.md`, etc). For documentation purposes page names should be based on what the component is vs its Kongponent `K` name.

### Developing
While actively developing the new Kongponent, use the new vuepress markdown file to test out and develop. You can also link the component locally and develop inside your app by following the below steps. 

1. Navigate into the package you want to develop and run `yarn link`
  ```bash
  $ cd packages/{%kongponent_name%}
  $ yarn link
  ```
  If done correctly you will see a success message
  ```bash
  success Registered "@kongponents/{%kongponent_name%}".
  info You can now run `yarn link "@kongponents/{%kongponent_name%}"` in the projects where you want to use this package and it will be used instead.
  ```

2. Inside the root of your application register the linked component
  ```bash
  $ yarn link "@kongponents/{%kongponent_name%}"
  ```
  Now you actively develop the new component from the kongponents repo inside your application.  
