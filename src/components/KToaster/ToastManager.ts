import { createVNode, render, ref } from 'vue'
import type { Ref, VNode } from 'vue'
import type { Toast, ToasterAppearance, ToasterOptions } from '@/types'
import { ToasterAppearances } from '@/types'
import KToaster from '@/components/KToaster/KToaster.vue'
import { getUniqueStringId } from '@/utilities'

const toasterContainerId = 'kongponents-toaster-container'

const toasterDefaults = {
  timeoutMilliseconds: 5000,
  appearance: ToasterAppearances.info,
}

const defaultZIndex = 10000

export default class ToastManager {
  private toastersContainer: HTMLElement | null = null
  private toaster: VNode | null = null
  public toasts: Ref<Toast[]> = ref<Toast[]>([])

  private zIndex: number = defaultZIndex

  constructor(options?: ToasterOptions) {
    // For SSR, prevents failing on the build)
    if (typeof document === 'undefined') {
      console.warn('ToastManager should only be initialized in the browser environment. Docs: https://kongponents.konghq.com/components/toaster.html')

      return
    }

    if (options?.zIndex) {
      this.zIndex = options.zIndex
    }

    this.setupToastersContainer()
  }

  private setupToastersContainer(): void {
    const toastersContainerEl = document?.querySelector(`#${toasterContainerId}`)
    if (this.toastersContainer && this.toaster && toastersContainerEl) {
      return
    }

    if (toastersContainerEl) {
      this.toastersContainer = toastersContainerEl as HTMLElement
    } else {
      this.toastersContainer = document.createElement('div')
      this.toastersContainer.id = toasterContainerId
      document.body.appendChild(this.toastersContainer)
    }

    this.toaster = createVNode(KToaster, {
      toasterState: this.toasts.value,
      zIndex: this.zIndex,
      onClose: (key: string) => this.close(key),
    })

    if (this.toastersContainer) {
      render(this.toaster, this.toastersContainer)
    }
  }

  setTimer(key: string, timeout: number): number {
    return window?.setTimeout(() => this.close(key), timeout) || 0
  }

  public open(args: Record<string, any> | string): void {
    this.setupToastersContainer()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { key, timeoutMilliseconds, appearance, message, title } = args

    const toastKey: string = key ? String(key) : getUniqueStringId()
    const toastAppearance: ToasterAppearance = (appearance && Object.keys(ToasterAppearances).indexOf(appearance) !== -1) ? appearance : toasterDefaults.appearance
    const timer: number = this.setTimer(key, timeoutMilliseconds || toasterDefaults.timeoutMilliseconds)
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
    if (this.toastersContainer) {
      render(null, this.toastersContainer)
      this.toastersContainer.remove()
      this.toastersContainer = null
      this.toaster = null
    }
  }
}
