import { createVNode, render, ref } from 'vue'
import type { Ref, VNode } from 'vue'
import type { Toast, ToasterOptions } from '@/types'
import { ToasterAppearances } from '@/types'
import KToaster from '@/components/KToaster/KToaster.vue'
import { getUniqueStringId } from '@/utilities'
import SharedPool from './SharedPool'

interface IToastManager {
  toasts: Ref<Toast[]>
  setTimer(key: string, timeout: number): number
  open(args: Record<string, any> | string): void
  close(key: string): void
  closeAll(): void
  destroy(): void
}

const toasterContainerId = 'kongponents-toaster-container'

const toasterDefaults = {
  timeoutMilliseconds: 5000,
  appearance: ToasterAppearances.info,
}

class SSRToastManager implements IToastManager {
  public toasts = ref<Toast[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTimer(...args: Parameters<IToastManager['setTimer']>) {
    return 0
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public open(...args: Parameters<IToastManager['open']>) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  close(...args: Parameters<IToastManager['close']>) {}
  closeAll() {}
  public destroy() {}

}
class DOMToastManager implements IToastManager {
  private toastersContainer: HTMLElement | null = null
  private toaster: VNode | null = null
  public toasts = ref<Toast[]>([])

  constructor() {
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

  setTimer(key: string, timeout: number) {
    return window?.setTimeout(() => this.close(key), timeout) || 0
  }

  public open(args: Record<string, any> | string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { key, timeoutMilliseconds, appearance, message, title } = args

    const toastKey = key ? String(key) : getUniqueStringId()
    const toastAppearance = ((appearance && Object.keys(ToasterAppearances).indexOf(appearance) !== -1) ?
      appearance : toasterDefaults.appearance) as (keyof typeof ToasterAppearances)
    const timer = this.setTimer(toastKey, timeoutMilliseconds || toasterDefaults.timeoutMilliseconds)
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

  close(key: string) {
    const i = this.toasts.value?.findIndex(n => key === n.key)
    clearTimeout(this.toasts.value[i]?.timer)
    this.toasts.value.splice(i, 1)
  }

  closeAll() {
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

const pool = new SharedPool<string, IToastManager>((state, id, item) => {
  switch (state) {
    case 'creating':
      // For SSR, prevents failing on the build)
      if (typeof document === 'undefined') {
        console.warn('ToastManager should only be initialized in the browser environment, all methods are noops. Docs: https://kongponents.konghq.com/components/toaster.html')
        return new SSRToastManager()
      }

      return new DOMToastManager()
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
  constructor(options: ToasterOptions | undefined, manager: IToastManager)
  constructor(
    options?: ToasterOptions,
    protected manager: IToastManager = pool.acquire(toasterContainerId, this.sym),
  ) {}

  get toasts() {
    return this.manager.toasts
  }

  setTimer(...args: Parameters<IToastManager['setTimer']>) {
    return this.manager.setTimer(...args)
  }

  open(...args: Parameters<IToastManager['open']>) {
    return this.manager.open(...args)
  }

  close(...args: Parameters<IToastManager['close']>) {
    return this.manager.close(...args)
  }

  closeAll(...args: Parameters<IToastManager['closeAll']>) {
    return this.manager.closeAll(...args)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  destroy(...args: Parameters<IToastManager['destroy']>) {
    return pool.release(toasterContainerId, this.sym)
  }
}
