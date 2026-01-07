import { createVNode, render, ref } from 'vue'
import type { Ref, VNode } from 'vue'
import type { Toast, ToasterAppearance, ToasterOptions } from '@/types'
import { ToasterAppearances } from '@/types'
import KToaster from '@/components/KToaster/KToaster.vue'
import { getUniqueStringId } from '@/utilities'
import SharedPool from './SharedPool'

const toasterContainerId = 'kongponents-toaster-container'

const toasterDefaults = {
  timeoutMilliseconds: 5000,
  appearance: ToasterAppearances.info,
}

class InternalToastManager {
  private toastersContainer: HTMLElement | null = null
  private toaster: VNode | null = null
  public toasts: Ref<Toast[]> = ref<Toast[]>([])

  constructor() {
    // For SSR, prevents failing on the build)
    if (typeof document === 'undefined') {
      console.warn('ToastManager should only be initialized in the browser environment. Docs: https://kongponents.konghq.com/components/toaster.html')

      return
    }

    this.toastersContainer = document.createElement('div')
    this.toastersContainer.id = toasterContainerId
    document.body.appendChild(this.toastersContainer)

    this.toaster = createVNode(KToaster, {
      toasterState: this.toasts.value,
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
    }
  }
}
const pool = new SharedPool<string, InternalToastManager>((state, id, item) => {
  switch (state) {
    case 'creating':
      return new InternalToastManager()
    case 'acquiring':
      return item
    case 'releasing':
      return item
    case 'destroying':
      item.destroy()
      return item
  }
})

export default class ToastManager {
  protected sym = Symbol(toasterContainerId)
  // public usage
  constructor()
  /**
   * @deprecated If you are using options to set zIndex, this never worked as
   * expected and doing this is now deprecated. You can remove `options` as an
   * argument.
   */
  constructor(options?: ToasterOptions)

  // internal usage
  constructor(options: ToasterOptions | undefined, manager: InternalToastManager)
  constructor(
    options?: ToasterOptions,
    protected manager: InternalToastManager = pool.acquire(toasterContainerId, this.sym),
  ) {}

  setTimer(...args: Parameters<InternalToastManager['setTimer']>): number {
    return this.manager.setTimer(...args)
  }

  open(...args: Parameters<InternalToastManager['open']>): void {
    return this.manager.open(...args)
  }

  close(...args: Parameters<InternalToastManager['close']>): void {
    return this.manager.close(...args)
  }

  closeAll(...args: Parameters<InternalToastManager['closeAll']>): void {
    return this.manager.closeAll(...args)
  }

  destroy() {
    return pool.release(toasterContainerId, this.sym)
  }
}
