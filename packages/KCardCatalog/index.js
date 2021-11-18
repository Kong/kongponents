import KCardCatalog from './KCardCatalog'
import KCardCatalogItem from './KCardCatalogItem'

const Plugin = {
  install (Vue) {
    Vue.component('KCardCatalog', KCardCatalog)
    Vue.component('KCardCatalogItem', KCardCatalogItem)
  }
}

export default Plugin
export { KCardCatalog, KCardCatalogItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
