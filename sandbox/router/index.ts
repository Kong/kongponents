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
  document.body.scrollTop = 0
})

export default router
