import KToaster from './KToaster.vue'
import ToastManager from './ToastManager.js'

const plugin = {
  install (Vue) {
    Vue.component('KToaster', KToaster)
  }
}

export default plugin
export { KToaster, ToastManager }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
