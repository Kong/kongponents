import { createRouter, createWebHashHistory } from 'vue-router'
import componentRoutes from './sandbox-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: componentRoutes,
})

router.beforeEach((to, from, next) => {
  // @ts-ignore - property exists
  document.title = to.meta.title
  next()
})

export default router
