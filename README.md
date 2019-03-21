# Kongponents 🍌

Welcome to Kongponents, Kong's very own [Vue](https://vuejs.org/) [component](https://vuejs.org/v2/guide/components.html#ad) library. See the reference documentation for each Kongponent at [kong.github.io/kongponents/](https://kong.github.io/kongponents/)

Kongponents offer multiple teams the ability to reuse frequently needed UI elements, reducing each team's efforts. They should be simple on the surface and extensible. Kongponents should also be maintainable and easy to compose with others (for example, KButton is reused in KModal and KEmptyState). Unique components that are tightly related to a particular application should not be turned into Kongponents.

If you are interested in contributing to the Kongponents repo, please review [CONTRIBUTING.md](CONTRIBUTING.md) for Git standards and release guidelines.

## Installation

Install [node + npm](https://nodejs.org/) + [yarn](https://yarnpkg.com/en/)

Clone and install dependencies
```bash
# clone the repo
git clone git@github.com:Kong/kongponents.git

# Install node modules
yarn
```

## Running

### Development

Run [Storybook](https://storybook.js.org/)
```bash
yarn storybook
```

Follow command output to know which localhost port to navigate to.

### Tests

```bash
# run all tests
yarn test
```

```bash
# run tests for single component
yarn test packages/Kmodal
```

## Kongponents CLI

See CLI usage

```bash
node cli --help

# or install globally

npm install -g
kpm --help

```

## Creating a New Kongponent

If you are interested in contributing to the Kongponents repo, please review [CONTRIBUTING.md](CONTRIBUTING.md) for Git standards.

Run the following command to create a new component built from the [template files](cli/template)

```bash
kpm create <kongponent_name> -d <kongponent_description>
```

### Style Guidelines

All Kongponents should abide by the essential rules in Vue's [style guide](https://vuejs.org/v2/style-guide/). To maintain consistency, use conventions that already exist in other Kongponents: name the Kongponent with K, use camel case, and be as accurate as possible in naming Kongponents.

Provide as much detail in the [prop definitions](https://vuejs.org/v2/style-guide/#Prop-definitions-essential) as possible to (1) make the code self-documenting and (2) enable Vue to warn developers if they are providing props to the Kongponent incorrectly.  

Use predicates in names of data properties or methods that return booleans. For example, use “isDisabled” and “hasBorder” instead of “disabled” and “border”. Avoid abbreviations unless they are commonly used acronyms, e.g., “isUrl”, “http”.

### Avoiding Dependencies

Avoid introducing new dependencies into Kongponents. Part of this library's value is that it reduces the need for external UI libraries such as Vue Bootstrap. More broadly, dependencies in any component library could introduce stability and security issues, and it would quickly become difficult to prevent redundant dependencies with different versions in a given application.

### Documenting Kongponents

In addition to detailed prop definitions, each Kongponent must include a `README` that models how the Kongponent and its related attributes would appear from the surface:

```javascript
const attributes = {
  description: '{%kongponent_description%}',
}

<{%kongponent_name%} :description="attributes.description">
  Hello from a slot
</{%kongponent_name%}>
```

VSCode has built-in descriptions and type checking for [JSDOC](https://github.com/jsdoc3/jsdoc) that avoids the need for TypeScript. Generate comments within code on as many methods as possible.

### Test Coverage

Write unit tests for base functionality (e.g., that buttons work correctly, text displays on banners), as well as edge cases (e.g., invalid input, returning to an empty state after clearing the input).

## Submitting a PR

A PR needs at least one approving review before it can be merged. To open a PR for a branch that is still a work in progress, use the WIP tag to let others know that it is not intended for final review. 

Before publishing a new version as detailed in [Publishing to NPM](#publishing-to-npm), update the version in `package.json`. If creating a new Kongponent, use `0.0.1-beta.1`. If updating, add `1` after `beta`.

Create a Git tag for the branch with the matching version number.

The WIP tag should not be removed until tests are passing and the versions in `package.json` and the release branch are up to date.

## Reviewing a PR

To review a PR, check that it meets the following requirements:

  * Does not introduce dependencies
  * Functional: all changes do not break existing APIs and if so, bump major version.
  * Tests pass: check the output of  `yarn test packages/<Kongponent>`
  * Naming: the files and the method and prop variables use the same naming conventions as other Kongponents
  * Framework style: abides by the essential rules in [Vue's style guide](https://vuejs.org/v2/style-guide/)
  * Cleanliness: does not have formatting issues, unused code (e.g., console.logs), or leftover comments
  * Docs: includes a technically accurate README, uses JSDOC where appropriate
  * Version: `package.json` and the release tag both reflect the same, accurate version

If any of the above are missing, the PR should be blocked until they are resolved. Needless to say, this list is not exhaustive. If the PR introduces anything that would be detrimental to developers or users, it should be blocked. 

There are often times when a suggested change would simply be a “nice-to-have”, and when blocking would create friction. The reviewer should note that the comment is a preference, and the PR author has discretion over how to address the request. In such cases, a reviewer's “approval” is pending the author's response to the feedback, rather than a change to the code.

## Publishing to NPM

We use [Lerna](https://lernajs.io/) to publish Kongponents. 

> Note: The following instructions are for Kongponent Beta development. These may change when moved out of Beta.

### Publishing Multiple Components

```bash
kpm publish-all
```
Lerna will check each component for differences and prompt you to select a version for any that have changed. If creating for the first time select `Custom` and enter `0.0.1-beta.<current_version>`. If bumping the version select `Custom` and increase the number after `-beta`

![version](https://dzwonsemrish7.cloudfront.net/items/0x0D0y1O3H3q0P321b3V/Image%202018-06-18%20at%208.54.31%20PM.png)

### Publishing Single Component

To publish a *single* component pass the name of the component as a parameter first
```bash
kpm publish <kongponent>
```
Follow the prompt as noted before.

## Directory Structure

Kongponents is a mono repo, managed by Lerna. It follows suggested Lerna directory structure with a root `packages` folder which contain all the components. Lerna allows easier developer experience through a single git repository, managed dependencies, and easy publishing of individual components. It's like blowing up the monolith, but you still have the perks of the monolith during development.

To see the structure of the Kongponent template created through the CLI, see: https://github.com/Kong/kongponents/tree/master/cli/template

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
│   ├── Readme.md                # Each Readme.md is used by vue-styleguidist
│   ├── __snapshots__            # Jest snapshots for component diff checks
│   │   └── KModal.spec.js.snap
│   └── package.json
├── KIcon
│   ├── ...
│   ├── ...
.   .
.
```

## Asking Questions and Submitting Tickets

If you encounter difficulty working with Kongponents, either in your own codebase or in contributing to this one, post questions in `#design-pattern-lib` or `#team-interfaces`. If you discover a problem but are unsure whether it's a bug, it may be resolved faster in the channels.

Log bugs with [Team Interfaces](https://konghq.atlassian.net/secure/RapidBoard.jspa?projectKey=INTF). Document the steps to replicate the bug with screenshots and error messages, if possible. Please also mention the browser, the versions and branches of the applications involved (e.g., [`kong-admin`](https://github.com/Kong/kong-admin), [`kong-ee`](https://github.com/Kong/kong-ee)), and your configuration for Kong.

To request a feature or an improvement, describe use cases for the team to review in `#design-pattern-lib` or `#team-interfaces`. If an alternative already exists, mention why a Kongponent would be a better approach. 
