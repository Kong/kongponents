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
      component: () => import('./pages/HomePage.vue'),
      children: [
        {
          path: 'alert',
          name: 'alert',
          component: () => import('./pages/components/KAlert.vue'),
        },
        {
          path: 'button',
          name: 'button',
          component: () => import('./pages/components/KButton.vue'),
        },
      ],
    },
  ],
})

app.use(router)

app.mount('#app')
