import KButton from '../../packages/KButton/KButton.vue'
import KTable from '../../packages/KTable/KTable.vue'

export function components (Vue) {
  Vue.component('KButton', KButton),
  Vue.component('KTable', KTable)
}

export function stories () {
  const req = require.context('../../packages', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.stories\.js$/)
  req
    .keys()
    .forEach((filename) => req(filename))
}
