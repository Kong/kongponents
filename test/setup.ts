import { locators } from 'vitest/browser'
// Runs once per component test file, in the browser.
//
// Kongponent styles are global: appearance mixins, design tokens and layout rules all
// live in `styles.scss` rather than in the SFCs. Component tests assert on computed
// styles (`toHaveStyle`), visibility and truncation, so without this import those
// assertions would test an unstyled component and pass or fail for the wrong reasons.
import '@/styles/styles.scss'
import type { Locator } from 'vitest/browser'

// Vitest's `page` deliberately exposes only semantic, accessibility-first selectors —
// there is no `page.locator('.some-class')`. That's a sound default for application
// tests, but Kongponents is a component library: class names like `.k-badge` and
// `.badge-content` are published API that consumers style against, and asserting on
// them is the point rather than a shortcut. The Cypress suite relies on CSS selectors
// roughly 1,100 times for that reason.
//
// `locators.extend` is the sanctioned escape hatch. Returning a selector string (rather
// than wrapping an element via `page.elementLocator`) yields a real lazy locator, so it
// retries like any built-in selector and chains off both `page` and another `Locator` —
// which is what makes `cy.get(...).find(...)` translate cleanly.
//
// Prefer `getByRole`/`getByTestId` where a semantic selector genuinely fits. Reach for
// `getByCSS` when the class itself is the contract under test.
locators.extend({
  getByCSS: (css: string) => `css=${css}`,
})

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByCSS(css: string): Locator
  }
}
