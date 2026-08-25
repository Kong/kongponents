import { page } from 'vitest/browser'

/**
 * Moves the mouse pointer out of the way of anything a test is about to mount.
 *
 * Playwright's pointer position is a property of the browser context, not of the page, so it
 * survives between tests. Components remount at the same coordinates every time, which means a
 * component can render *underneath* the cursor the previous test left behind — and the browser
 * then fires `mouseenter` on it without the test asking for one. Hover tests written against that
 * state pass whether or not their `hover()` call does anything.
 *
 * `locator.unhover()` is not a fix: it is implemented as "hover `html > body`", so it parks the
 * cursor at the *centre of the body*, which is frequently still over the component under test.
 *
 * This parks the pointer in the bottom-right corner of the viewport instead, by hovering a
 * throwaway element pinned there. Call it **before** `render()` — parking afterwards still leaves
 * a window in which the component mounts under the stale cursor and shows a popover transiently,
 * which is long enough for a retrying `toBeVisible()` to catch.
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
