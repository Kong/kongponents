import { page } from 'vitest/browser'
import { onTestFinished } from 'vitest'

/**
 * Parks the mouse pointer in the bottom-right corner of the viewport.
 *
 * Playwright's pointer position survives between tests, so a component can mount *under* the
 * cursor left behind by a previous test and fire `mouseenter` on its own — making hover tests
 * pass whether or not their `hover()` call does anything. `locator.unhover()` doesn't help: it
 * hovers `html > body`, parking the cursor at the centre of the page.
 *
 * Call it **before** `render()`; parking afterwards still lets the component mount under the
 * stale cursor long enough for a retrying `toBeVisible()` to catch.
 *
 * ```ts
 * await resetPointer()
 * await render(KPop, { props: { trigger: 'hover' } })
 * await page.getByCSS('.slottedEl').hover()
 * ```
 */
export const resetPointer = async (): Promise<void> => {
  const parkingSpot = document.createElement('div')

  /**
   * On top of everything, in the corner furthest from where components mount — but inset from the
   * edge, because the iframe is scaled down to the real window and a flush-corner spot lands
   * ~2px outside it, which Playwright can never scroll a fixed element back into.
   */
  parkingSpot.setAttribute('style', 'position: fixed; right: 32px; bottom: 32px; height: 8px; width: 8px; z-index: 2147483647;')
  document.body.appendChild(parkingSpot)

  /**
   * Cleaned up at the end of the test rather than straight after the hover: pulling the element
   * out from under a stationary pointer forces the browser to recompute its hover chain, and
   * Firefox defers that until the next mouse move — which is the test's own `hover()`.
   */
  onTestFinished(() => parkingSpot.remove())

  await page.elementLocator(parkingSpot).hover()
}
