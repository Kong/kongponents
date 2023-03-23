import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/styles.scss'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  // @ts-ignore
  document.title = to.meta.title
  next()
})

app.use(router)

app.mount('#app')
