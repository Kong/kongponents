import KDropdownMenu from './KDropdownMenu.vue'
import KDropdownItem from './KDropdownItem.vue'

const Plugin = {
  install (Vue) {
    Vue.component('KDropdownMenu', KDropdownMenu)
    Vue.component('KDropdownItem', KDropdownItem)
  }
}

export default Plugin
export { KDropdownMenu, KDropdownItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
