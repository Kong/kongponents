import KCatalog from './KCatalog'
import KCatalogItem from './KCatalogItem'

const Plugin = {
  install (Vue) {
    Vue.component('KCatalog', KCatalog)
    Vue.component('KCatalogItem', KCatalogItem)
  }
}

export default Plugin
export { KCatalog, KCatalogItem }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
