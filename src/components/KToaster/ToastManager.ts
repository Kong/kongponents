import KToaster from './KToaster.vue'
import type { Ref } from 'vue'
import { createApp, h, ref } from 'vue'
import type { ToasterAppearance, Toast } from '@/types'
import { ToasterAppearances } from '@/types'

const APPEARANCES = Object.keys(ToasterAppearances)

const DEFAULTS = {
  id: 'toaster-container',
  timeout: 5000,
  appearance: ToasterAppearances.info,
}

export default class ToastManager {
  public toasters: Ref<Toast[]>
  public timeout: number
  public appearance: string
  public id: string

  constructor(id = DEFAULTS.id, timeout = DEFAULTS.timeout, appearance = DEFAULTS.appearance) {
    this.toasters = ref<Toast[]>([])

    this.timeout = timeout
    this.appearance = appearance
    this.id = id

    this.mount()
  }

  mount() {
    // For SSR (still works on VuePress/VitePress site, but prevents failing on the build)
    if (typeof document === 'undefined') return

    // Create a component container for the notification to bind to
    const notificationContainer = document.createElement('div')
    notificationContainer.id = this.id
    document.body.appendChild(notificationContainer)

    const Toast = h(KToaster, {
      toasterState: this.toasters.value,
      onClose: (key: any) => this.close(key),
    })

    createApp(Toast).mount(`#${this.id}`)
  }

  setTimer(key: any, timeout: number): number {
    return setTimeout(() => this.close(key), timeout)
  }

  open(args: Record<string, any> | string): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { key, timeoutMilliseconds, appearance, message, title } = args

    const _key: any = key || (this.toasters.value.length) + new Date().getTime()
    const _appearance: ToasterAppearance = (appearance && APPEARANCES.indexOf(appearance) !== -1) ? appearance : this.appearance
    const timer: number = this.setTimer(_key, timeoutMilliseconds || this.timeout)

    // Add toaster to state
    this.toasters.value.push({
      key: _key,
      appearance: _appearance,
      title: title || _appearance.charAt(0).toUpperCase() + _appearance.slice(1),
      message: message || '',
      timer,
      timeoutMilliseconds: timeoutMilliseconds || this.timeout,
    })
  }

  close(key: any): void {
    const i: number = this.toasters.value?.findIndex(n => key === n.key)
    clearTimeout(this.toasters.value[i]?.timer)
    this.toasters.value.splice(i, 1)
  }

  closeAll(): void {
    this.toasters.value.forEach(toast => clearTimeout(toast?.timer))
    this.toasters.value.length = 0
  }
}
