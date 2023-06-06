import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
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
          component: () => import('./pages/SandboxAlert.vue'),
        },
        {
          path: 'button',
          name: 'button',
          meta: { title: 'Button Sandbox' },
          component: () => import('./pages/SandboxButton.vue'),
        },
        {
          path: 'catalog',
          name: 'catalog',
          meta: { title: 'Catalog Sandbox' },
          component: () => import('./pages/SandboxCatalog.vue'),
        },
        {
          path: 'tabs',
          name: 'tabs',
          meta: { title: 'Tabs Sandbox' },
          component: () => import('./pages/SandboxTabs.vue'),
        },
        {
          path: 'table',
          name: 'table',
          meta: { title: 'Table Sandbox' },
          component: () => import('./pages/SandboxTable.vue'),
        },
        {
          path: 'multiselect',
          name: 'multiselect',
          meta: { title: 'Multiselect Sandbox' },
          component: () => import('./pages/SandboxMultiselect.vue'),
        },
      ],
    },
  ],
})
