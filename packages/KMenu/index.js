import KMenu from './KMenu'
import KMenuDivider from './KMenuDivider'
import KMenuItem from './KMenuItem'

const Plugin = {
  install (Vue) {
    Vue.component('KMenu', KMenu)
    Vue.component('KMenuDivider', KMenuDivider)
    Vue.component('KMenuItem', KMenuItem)
  }
}

export default Plugin
export { KMenu, KMenuDivider, KMenuItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
