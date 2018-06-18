# Kongponents 🍌

Kong Component [Vue](https://vuejs.org/) library. [kong.github.io/kongponents/](https://kong.github.io/kongponents/)

## Installation

Install [node + npm](https://nodejs.org/)

Clone and install dependencies
```bash
# clone the repo
git clone git@github.com:Kong/kong-portal.git

# Install node modules
npm install
```

## Running

### Development

```bash
# runs vue-styleguidist locally
npm run styleguide

# -- or --

# runs storybook locally for testing out all iterations of a component.
npm run storybook
```

Follow command output to know which localhost port to navigate to.

### Tests

```bash
# TODO 
npm test
```

## Publishing to NPM

We use [Lerna](https://lernajs.io/) to publish Kongponents. 

> Note: The following instructions are for Kongponent Beta development. These may chance when moved out of Beta.

**Publishing Single Components**
To publish a single component we run the following command with these parameters
- `--skip-git` This ensures there is no commit made to master when published
- `--npm-tag=beta` This keeps the NPM beta tag even if we've bumped the version
- `--scope` This command targets the single component vs the entire library. 
```bash
lerna publish --skip-git --npm-tag=beta --scope @kongponents/<KONGPONENT_NAME>
```

After the above command you will be prompted to select the version. If creating the first time select `Custom` and enter the current version. If bumping the version select `Custom` and increase the number after `-beta`
![version](https://dzwonsemrish7.cloudfront.net/items/1K2h3k2W1R3A0c0E0j05/Image%202018-06-18%20at%209.14.05%20AM.png)

**Publishing Multiple Components**
Publishing multiple components follows almost exact steps as above however we remove the `--scope` parameter from the command. Lerna will check for any differences in each component and prompt to select a new version for any that have changed. Follow the previous noted steps for each updated component.

## Directory Structure

Kongponents is a mono repo, managed by Lerna. It follows suggested Lerna directory structure with a root `packages` folder which contain all the components. Lerna allows easier developer experience through a single git repository, managed dependencies, and easy publishing of individual components. It's like blowing up the monolith, but you still have the perks of the monolith during development.

```
packages                     # root directory of all components
├── KButton                  
│   ├── KButton.spec.js
│   ├── KButton.stories.js
│   ├── KButton.vue
│   ├── Readme.md
│   └── package.json         # each component gets its own package.json
│                            # which is managed by Lerna.
├── KTable
│   ├── KTable.stories.js
│   ├── KTable.vue
│   ├── Readme.md
│   └── package.json
└── KModal
    ├── ...
    ├── ...
```
