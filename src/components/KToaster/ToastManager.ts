import { createVNode, render, ref } from 'vue'
import type { Ref, VNode } from 'vue'
import type { Toast, ToasterAppearance, ToasterOptions } from '@/types'
import { ToasterAppearances } from '@/types'
import KToaster from '@/components/KToaster/KToaster.vue'
import { getUniqueStringId } from '@/utilities'

const toasterContainerId = 'kongponents-toaster-container'
const toasterWrapperPrefix = 'kongponents-toaster-wrapper'

const toasterDefaults = {
  timeoutMilliseconds: 5000,
  appearance: ToasterAppearances.info,
}

const defaultZIndex = 10000

/**
 * Get or create the shared toaster container element.
 * Increments the reference count for tracking active instances.
 */
function getOrCreateSharedContainer(): HTMLElement {
  let container = document.getElementById(toasterContainerId)

  if (!container) {
    container = document.createElement('div')
    container.id = toasterContainerId
    container.setAttribute('data-instance-count', '0')
    document.body.appendChild(container)
  }

  // Increment reference count
  const count = parseInt(container.getAttribute('data-instance-count') || '0', 10)
  container.setAttribute('data-instance-count', String(count + 1))

  return container
}

/**
 * Release the shared toaster container.
 * Decrements the reference count and removes the container when count reaches 0.
 */
function releaseSharedContainer(): void {
  const container = document.getElementById(toasterContainerId)
  if (!container) {
    return
  }

  const count = parseInt(container.getAttribute('data-instance-count') || '0', 10)
  const newCount = Math.max(0, count - 1)

  if (newCount === 0) {
    container.remove()
  } else {
    container.setAttribute('data-instance-count', String(newCount))
  }
}

export default class ToastManager {
  private sharedContainer: HTMLElement | null = null
  private instanceWrapper: HTMLElement | null = null
  private toaster: VNode | null = null
  public toasts: Ref<Toast[]> = ref<Toast[]>([])
  private instanceId: string = getUniqueStringId()

  constructor(options?: ToasterOptions) {
    // For SSR, prevents failing on the build)
    if (typeof document === 'undefined') {
      console.warn('ToastManager should only be initialized in the browser environment. Docs: https://kongponents.konghq.com/components/toaster.html')

      return
    }

    // Get or create the shared container
    this.sharedContainer = getOrCreateSharedContainer()

    // Create this instance's wrapper div
    this.instanceWrapper = document.createElement('div')
    this.instanceWrapper.id = `${toasterWrapperPrefix}-${this.instanceId}`
    this.sharedContainer.appendChild(this.instanceWrapper)

    // Create the KToaster VNode
    this.toaster = createVNode(KToaster, {
      toasterState: this.toasts.value,
      zIndex: options?.zIndex ? options.zIndex : defaultZIndex,
      onClose: (key: string) => this.close(key),
    })

    // Render into the instance wrapper
    if (this.instanceWrapper) {
      render(this.toaster, this.instanceWrapper)
    }
  }

  setTimer(key: string, timeout: number): number {
    return window?.setTimeout(() => this.close(key), timeout) || 0
  }

  public open(args: Record<string, any> | string): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { key, timeoutMilliseconds, appearance, message, title } = args

    const toastKey: string = key ? String(key) : getUniqueStringId()
    const toastAppearance: ToasterAppearance = (appearance && Object.keys(ToasterAppearances).indexOf(appearance) !== -1) ? appearance : toasterDefaults.appearance
    const timer: number = this.setTimer(toastKey, timeoutMilliseconds || toasterDefaults.timeoutMilliseconds)
    const toasterMessage = typeof args === 'string' ? args : message

    // Add toaster to state
    this.toasts.value.push({
      key: toastKey,
      appearance: toastAppearance,
      title,
      message: toasterMessage,
      timer,
      timeoutMilliseconds: timeoutMilliseconds || toasterDefaults.timeoutMilliseconds,
    })
  }

  close(key: string): void {
    const i: number = this.toasts.value?.findIndex(n => key === n.key)
    clearTimeout(this.toasts.value[i]?.timer)
    this.toasts.value.splice(i, 1)
  }

  closeAll(): void {
    this.toasts.value.forEach(toast => clearTimeout(toast?.timer))
    this.toasts.value = []
  }

  public destroy() {
    if (this.instanceWrapper && this.sharedContainer) {
      // Unmount Vue component
      render(null, this.instanceWrapper)
      // Remove wrapper from shared container
      this.instanceWrapper.remove()
      // Decrement reference count and cleanup if needed
      releaseSharedContainer()
    }

    this.instanceWrapper = null
    this.sharedContainer = null
    this.toaster = null
  }
}
