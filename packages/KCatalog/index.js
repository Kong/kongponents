import KCatalog from './KCatalog.vue'
import KCatalogItem from './KCatalogItem.vue'

const Plugin = {
  install (Vue) {
    Vue.component('KCardCatalog', KCatalog)
    Vue.component('KCatalogItem', KCatalogItem)
  }
}

export default Plugin
export { KCatalog, KCatalogItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
