import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import '../src/styles/styles.scss'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Kongponents Sandbox' },
      component: () => import('./pages/HomePage.vue'),
      children: [
        {
          path: 'alert',
          name: 'alert',
          meta: { title: 'Alert Sandbox' },
          component: () => import('./pages/components/SandboxAlert.vue'),
        },
        {
          path: 'button',
          name: 'button',
          meta: { title: 'Button Sandbox' },
          component: () => import('./pages/components/SandboxButton.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  // @ts-ignore
  document.title = to.meta.title
  next()
})

app.use(router)

app.mount('#app')
