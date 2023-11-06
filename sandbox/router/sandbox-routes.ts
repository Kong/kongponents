import type { RouteRecordRaw } from 'vue-router'

const componentRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    alias: '/:pathMatch(.*)*',
    meta: { title: 'Kongponents Sandbox' },
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/alert',
    name: 'alert',
    meta: { title: 'Alert Sandbox' },
    component: () => import('../pages/SandboxAlert.vue'),
  },
  {
    path: '/button',
    name: 'button',
    meta: { title: 'Button Sandbox' },
    component: () => import('../pages/SandboxButton.vue'),
  },
  {
    path: 'card',
    name: 'card',
    meta: { title: 'Card Sandbox' },
    component: () => import('../pages/SandboxCard.vue'),
  },
  {
    path: '/catalog',
    name: 'catalog',
    meta: { title: 'Catalog Sandbox' },
    component: () => import('../pages/SandboxCatalog.vue'),
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    meta: { title: 'Checkbox Sandbox' },
    component: () => import('../pages/SandboxCheckbox.vue'),
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    meta: { title: 'Dropdown Sandbox' },
    component: () => import('../pages/SandboxDropdown.vue'),
  },
  {
    path: '/input',
    name: 'input',
    meta: { title: 'Input Sandbox' },
    component: () => import('../pages/SandboxInput.vue'),
  },
  {
    path: '/label',
    name: 'label',
    meta: { title: 'Label Sandbox' },
    component: () => import('../pages/SandboxLabel.vue'),
  },
  {
    path: '/multiselect',
    name: 'multiselect',
    meta: { title: 'Multiselect Sandbox' },
    component: () => import('../pages/SandboxMultiselect.vue'),
  },
  {
    path: '/radio',
    name: 'radio',
    meta: { title: 'Radio Sandbox' },
    component: () => import('../pages/SandboxRadio.vue'),
  },
  {
    path: '/table',
    name: 'table',
    meta: { title: 'Table Sandbox' },
    component: () => import('../pages/SandboxTable.vue'),
  },
  {
    path: '/tabs',
    name: 'tabs',
    meta: { title: 'Tabs Sandbox' },
    component: () => import('../pages/SandboxTabs.vue'),
  },
  {
    path: '/textarea',
    name: 'textarea',
    meta: { title: 'Textarea Sandbox' },
    component: () => import('../pages/SandboxTextarea.vue'),
  },
]

export default componentRoutes
