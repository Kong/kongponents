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

> Note: The following instructions are for Kongponent Beta development. These may change when moved out of Beta.

### Publishing Multiple Components

```bash
npm run publish
```
Lerna will check each component for differences and prompt you to select a version for any that have changed. If creating for the first time select `Custom` and enter `0.0.1-beta.<current_version>`. If bumping the version select `Custom` and increase the number after `-beta`

![version](https://dzwonsemrish7.cloudfront.net/items/0x0D0y1O3H3q0P321b3V/Image%202018-06-18%20at%208.54.31%20PM.png)

### Publishing Single Component

To publish a *single* component pass the name of the component as a parameter first and add `:scope`
```bash
component=kicon npm run publish:scope
```
Follow the prompt as noted before.

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
