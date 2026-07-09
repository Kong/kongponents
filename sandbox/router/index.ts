import { createRouter, createWebHashHistory } from 'vue-router'
import componentRoutes from './sandbox-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: componentRoutes,
})

router.beforeEach((to, _from, next) => {
  // @ts-ignore - property exists
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
})

export default router
