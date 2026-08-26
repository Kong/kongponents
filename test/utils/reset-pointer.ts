import { page } from 'vitest/browser'

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

  // Fixed to the corner furthest from where components mount, and on top of whatever is there, so
  // the hover lands on this element rather than on something belonging to a previous test.
  parkingSpot.setAttribute('style', 'position: fixed; right: 0; bottom: 0; height: 4px; width: 4px; z-index: 2147483647;')
  document.body.appendChild(parkingSpot)

  try {
    await page.elementLocator(parkingSpot).hover()
  } finally {
    parkingSpot.remove()
  }
}
