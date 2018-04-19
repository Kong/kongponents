import KButton from '../components/KButton/KButton.vue'
import KTable from '../components/KTable/KTable.vue'

export function components (Vue) {
  Vue.component('KButton', KButton),
  Vue.component('KTable', KTable)
}

export function stories () {
  const req = require.context('../components', true, /\.stories\.js$/)
  req
    .keys()
    .forEach((filename) => req(filename))
}
