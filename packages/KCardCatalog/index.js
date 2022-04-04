import KCardCatalog from './KCardCatalog'
import KCatalogItem from './KCatalogItem'

const Plugin = {
  install (Vue) {
    Vue.component('KCardCatalog', KCardCatalog)
    Vue.component('KCatalogItem', KCatalogItem)
  }
}

export default Plugin
export { KCardCatalog, KCatalogItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
