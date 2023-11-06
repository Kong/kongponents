import { createRouter, createWebHashHistory } from 'vue-router'
import componentRoutes from './sandbox-routes'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/:pathMatch(.*)*',
      meta: { title: 'Kongponents Sandbox' },
      component: () => import('../pages/HomePage.vue'),
      children: componentRoutes,
    },
  ],
})
