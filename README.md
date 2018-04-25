# Kongponents 🍌

Kong Component [Vue](https://vuejs.org/) library.

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
