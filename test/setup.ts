import { locators } from 'vitest/browser'
/**
 * Kongponent styles are global — appearance mixins, design tokens and layout rules live
 * in `styles.scss`, not in the SFCs. Without this import, assertions on computed styles,
 * visibility and truncation would run against an unstyled component.
 */
import '@/styles/styles.scss'
import type { Locator } from 'vitest/browser'

/**
 * Vitest's `page` exposes only semantic selectors — there is no `page.locator('.foo')`.
 * Kongponents is a component library, though: class names like `.k-badge` are published
 * API that consumers style against, which is why the Cypress suite uses CSS selectors
 * ~1,100 times.
 *
 * `locators.extend` is the sanctioned escape hatch. Returning a selector string (rather
 * than wrapping an element via `page.elementLocator`) yields a real lazy locator, so it
 * retries like any built-in selector and chains off both `page` and another `Locator` —
 * which is what makes `cy.get(...).find(...)` translate cleanly.
 *
 * Prefer `getByRole`/`getByTestId` where a semantic selector fits; reach for `getByCSS`
 * when the class itself is the contract under test.
 */
locators.extend({
  getByCSS: (css: string) => `css=${css}`,
})

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByCSS(css: string): Locator
  }
}
