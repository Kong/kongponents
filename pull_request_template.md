### Summary

  
#### Changes made:
*

### Vue 3 Upgrade

We are currently in the process of upgrading Kongponents to Vue 3. If changes are made to a component or doc file on the `main` branch, a corresponding PR needs to be made into the `next` branch that includes:

- The component feature/fix, updated for Vue 3 and the Composition API
- Doc updates, again, for Vue 3 and the Composition API
- Updates to the corresponding `.spec.ts` test file(s) to utilize Cypress Component Tests. 

If you have questions, tag `@adamdehaven` or `@kaiarrowood`.

**Does your PR modify a component [that already exists on the `next` branch](https://github.com/Kong/kongponents/tree/next/src/components)?**

  - [ ] **Yes**, and there is a corresponding PR to update the component on the `next` branch
    - `LINK_TO_PR_ON_NEXT_BRANCH` (**required**)
  - [ ] **No**, the component does not yet exist on `next` branch.

### PR Checklist
- [ ] Does not introduce dependencies
- [ ] **Functional:** all changes do not break existing APIs and if so, bump major version.
- [ ] **Tests pass:** check the output of yarn test packages/<Kongponent>
- [ ] **Naming:** the files and the method and prop variables use the same naming conventions as other Kongponents
- [ ] **Framework style:** abides by the essential rules in Vue's style guide
- [ ] **Cleanliness:** does not have formatting issues, unused code (e.g., console.logs), or leftover comments
- [ ] **Docs:** includes a technically accurate README, uses JSDOC where appropriate
