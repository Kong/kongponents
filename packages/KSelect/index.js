import KSelect from './KSelect'
import KSelectItem from './KSelectItem'

const Plugin = {
  install (Vue) {
    Vue.component('KSelect', KSelect)
    Vue.component('KSelectItem', KSelectItem)
  }
}

export default Plugin
export { KSelect, KSelectItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
