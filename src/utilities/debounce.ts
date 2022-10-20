/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The initial function will be called after the debounced function stops being called for a certain number of milliseconds.
 *
 * @param initialFunction Initial function to debounce
 * @param delay Time to wait for recurring bounces
 * @returns the debounced function.
 */
export function debounce(initialFunction: (...args: any) => any, delay: number): (...args: any) => void {
  // Store timeout ID outside the returned function.
  let timeoutId: number

  return (...args) => {
    // If the debounced function was already invoked before, this will cancel the earlier timeout; thus, its callback will not be invoked.
    clearTimeout(timeoutId)

    // Starts a new timer which will call the initial function after the specified wait time unless the debounced function is called again.
    timeoutId = window.setTimeout(() => {
      initialFunction(...args)
    }, delay)
  }
}
