import { createVNode, render, ref } from 'vue'
import type { Ref, AppContext, VNode } from 'vue'
import type { Toast, ToasterAppearance, ToasterOptions } from '@/types'
import { ToasterAppearances } from '@/types'
import KToaster from '@/components/KToaster/KToaster.vue'
import { v4 as uuidv4 } from 'uuid'

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

  constructor(appContext: AppContext, options?: ToasterOptions) {
    // For SSR, prevents failing on the build)
    if (typeof document === 'undefined') return

    this.toastersContainer = document.createElement('div')
    this.toastersContainer.id = toasterContainerId
    document.body.appendChild(this.toastersContainer)

    this.toaster = createVNode(KToaster, {
      toasterState: this.toasts.value,
      zIndex: options?.zIndex ? options.zIndex : defaultZIndex,
      onClose: (key: any) => this.close(key),
    })
    this.toaster.appContext = { ...appContext }
    if (this.toastersContainer) {
      render(this.toaster, this.toastersContainer)
    }
  }

  setTimer(key: any, timeout: number): number {
    return setTimeout(() => this.close(key), timeout)
  }

  public open(args: Record<string, any> | string): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { key, timeoutMilliseconds, appearance, message, title } = args

    const toastKey: any = key || uuidv4()
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

  close(key: any): void {
    const i: number = this.toasts.value?.findIndex(n => key === n.key)
    clearTimeout(this.toasts.value[i]?.timer)
    this.toasts.value.splice(i, 1)
  }

  closeAll(): void {
    this.toasts.value.forEach(toast => clearTimeout(toast?.timer))
    this.toasts.value.length = 0
  }

  public destroy() {
    if (this.toastersContainer) {
      render(null, this.toastersContainer)
      this.toastersContainer.remove()
    }
  }
}