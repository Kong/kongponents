# Getting Started

In this section we will focus on the steps and nuances of developing Kongponents. Lets start with installation.

## Installation
 - Git clone the Kongponents repository: `git clone https://github.com/Kong/kongponents.git`
 - Install dependencies in the root of the directory: `cd kongponents && yarn install` 
 - Build the latest css changes, as the built file is gitignored: `yarn build:styles`
 - Run the docs locally: `yarn docs:dev`

## CLI
It is recommended to use the CLI (KPM) when creating new components as it will scaffold all the required files. You can run it locally we suggest installing it globally.

```bash
$ node cli --help

# or install globally

$ npm install -g
$ kpm --help
```

## Creating a new Kongponent
When creating a new component with the CLI it will scaffold up a number of files. Including a Vue component, spec file and a docs page.

```bash
# Passing the -d flag allows you to specify a description
# for the package.json file as well as a default prop message.

$ kpm create <kongponent_name> -d "<kongponent_description>"
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

## Editing Doc file
Each component has an associated file in the `/docs/components` directory. After scaffolding the new component file a doc file named the same as your component. Below are the steps to add the file to the docs site and how to get started editing.

1) **Renaming the file**  
First we rename the file to what type of component it is. For documentation purposes page names should be based on what the component is vs its Kongponent `K` name.
    - ex. `kbutton.md` &rarr; `button.md` ; `kcard.md` &rarr; `card.md`

1) **Update the page title**  
Update the first line of the doc to match the file name. This is what is displayed as the page title & in the sidebar.  
    ```md
    # {%kongponent_name%}

    **{%kongponent_name%}** - description
    ```  

1) **Add to sidebar**  
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
