import KToaster, { toasterAppearances } from './KToaster.vue'
import Vue from 'vue'

const APPEARANCES = Object.keys(toasterAppearances)

const DEFAULTS = {
  id: 'toaster-container',
  timeout: 5000,
  appearance: toasterAppearances['info']
}

export default class ToastManager {
  constructor (id = DEFAULTS.id, timeout = DEFAULTS.timeout, appearance = DEFAULTS.appearance) {
    this.toasters = []

    this.timeout = timeout
    this.appearance = appearance
    this.id = id

    this.mount()
  }

  mount () {
    // Create a component container for the notification to bind to
    const notificationContainer = document.createElement('div')

    notificationContainer.id = this.id
    document.body.appendChild(notificationContainer)

    // Extend the notification SFC as a class and mount it to the container
    const ComponentClass = Vue.extend(KToaster)
    var notificationInstance = new ComponentClass({
      data: {
        toasterState: this.toasters
      }
    })

    notificationInstance.$mount('#' + this.id).$on('close', key => {
      this.close(key)
    })
  }

  setTimer (key, timeout) {
    setTimeout(() => this.close(key), timeout)
  }

  open (args) {
    const { key, timeoutMilliseconds, appearance, message } = args

    const _key = key || new Date().getTime()
    const _appearance = (appearance && APPEARANCES.indexOf(appearance) !== -1)
      ? appearance
      : this.appearance
    const timer = this.setTimer(_key, timeoutMilliseconds || this.timeout)

    // Add toaster to state
    this.toasters.push({
      key: _key,
      appearance: _appearance,
      message: message || args,
      timer: timer,
      timeoutMilliseconds: timeoutMilliseconds || this.timeout
    })
  }

  close (key) {
    const i = this.toasters.findIndex(n => key === n.key)

    clearTimeout(this.toasters[i].timer)
    this.toasters.splice(i, 1)
  }
}
