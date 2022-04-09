### Summary

#### Changes made

### Vue 3 Upgrade

We are currently in the process of upgrading Kongponents to Vue 3. Any changes on the `beta` branch should ensure that:

* The component, component tests, and docs have been updated for Vue 3 and the Composition API.
* The test file(s) should be migrated from `vue-test-utils` and should utilize [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction).

If you have questions, tag `@adamdehaven` or `@kaiarrowood`.

### PR Checklist

* [ ] Does not introduce dependencies
* [ ] **Functional:** all changes do not break existing APIs and if so, bump major version.
* [ ] **Tests pass:** check the output of yarn test packages/<Kongponent>
* [ ] **Naming:** the files and the method and prop variables use the same naming conventions as other Kongponents
* [ ] **Framework style:** abides by the essential rules in Vue's style guide
* [ ] **Cleanliness:** does not have formatting issues, unused code (e.g., console.logs), or leftover comments
* [ ] **Docs:** includes a technically accurate README, uses JSDOC where appropriate
