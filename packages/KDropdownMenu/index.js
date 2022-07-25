import KDropdown from './KDropdown'
import KDropdownItem from './KDropdownItem'

const Plugin = {
  install (Vue) {
    Vue.component('KDropdown', KDropdown)
    Vue.component('KDropdownItem', KDropdownItem)
  }
}

export default Plugin
export { KDropdown, KDropdownItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
