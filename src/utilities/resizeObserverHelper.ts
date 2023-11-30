/**
 * ResizeObserverHelper
 * @description Helper class for ResizeObserver
 * @param callback - Callback function on resize
 */

export class ResizeObserverHelper {
  private resizeObserver: ResizeObserver
  private callback: () => void

  private constructor(callback: () => void) {
    this.callback = callback

    this.resizeObserver = new ResizeObserver(entries => {
      // Wrapper 'window.requestAnimationFrame' is needed for disabling "ResizeObserver loop limit exceeded" error in DD
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }

        // Callback on resize
        callback()
      })
    })
  }

  public static create(callback: () => void): ResizeObserverHelper {
    return new ResizeObserverHelper(callback)
  }

  public observe(element: HTMLElement): void {
    if (!this.resizeObserver || !element) {
      return
    }

    this.resizeObserver.observe(element)
  }

  public unobserve(element: HTMLElement): void {
    if (!this.resizeObserver || !element) {
      return
    }

    this.resizeObserver.unobserve(element)
  }
}
