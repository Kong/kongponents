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
    path: '/badge',
    name: 'badge',
    meta: { title: 'Badge Sandbox' },
    component: () => import('../pages/SandboxBadge.vue'),
  },
  {
    path: '/button',
    name: 'button',
    meta: { title: 'Button Sandbox' },
    component: () => import('../pages/SandboxButton.vue'),
  },
  {
    path: '/card',
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
    path: '/copy',
    name: 'copy',
    meta: { title: 'Copy Sandbox' },
    component: () => import('../pages/SandboxCopy.vue'),
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    meta: { title: 'Dropdown Sandbox' },
    component: () => import('../pages/SandboxDropdown.vue'),
  },
  {
    path: '/fileupload',
    name: 'fileupload',
    meta: { title: 'File Upload Sandbox' },
    component: () => import('../pages/SandboxFileUpload.vue'),
  },
  {
    path: '/input',
    name: 'input',
    meta: { title: 'Input Sandbox' },
    component: () => import('../pages/SandboxInput.vue'),
  },
  {
    path: '/inputswitch',
    name: 'inputswitch',
    meta: { title: 'InputSwitch Sandbox' },
    component: () => import('../pages/SandboxInputSwitch.vue'),
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
    path: '/pagination',
    name: 'pagination',
    meta: { title: 'Pagination Sandbox' },
    component: () => import('../pages/SandboxPagination.vue'),
  },
  {
    path: '/radio',
    name: 'radio',
    meta: { title: 'Radio Sandbox' },
    component: () => import('../pages/SandboxRadio.vue'),
  },
  {
    path: '/select',
    name: 'select',
    meta: { title: 'Select Sandbox' },
    component: () => import('../pages/SandboxSelect.vue'),
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
