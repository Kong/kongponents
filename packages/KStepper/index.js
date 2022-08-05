import KStepper from './KStepper'
import KStep from './KStep'

const Plugin = {
  install (Vue) {
    Vue.component('KStepper', KStepper)
    Vue.component('KStep', KStep)
  }
}

export default Plugin
export { KStepper, KStep }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
