import GButton from './components/button/button.vue'

export function components (Vue) {
  Vue.component('g-button', GButton)
}

export function stories () {
  const req = require.context('./components', true, /\.stories\.js$/)
  req
    .keys()
    .forEach((filename) => req(filename))
}