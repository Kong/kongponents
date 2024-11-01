import { mount } from 'cypress/vue'
// vue-router only throws uncaught errors in production mode
import { createMemoryHistory, createRouter } from 'vue-router/dist/vue-router.prod.cjs'
import type { RouteRecordRaw } from 'vue-router'
import type { App, ComputedOptions } from 'vue'
import { BindOncePlugin } from 'vue-bind-once'
import Chainable = Cypress.Chainable
import 'cypress-fail-fast'
// Import Kongponent styles
import '@/styles/styles.scss'

const testRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    alias: '/:pathMatch(.*)*',
    meta: { title: 'Kongponents Sandbox' },
    component: () => import('../../sandbox/pages/HomePage.vue'),
  },
]

Cypress.Commands.add('getTestId', (dataTestId: string): Chainable => {
  return cy.get(`[data-testid="${dataTestId}"]`)
})

Cypress.Commands.add('findTestId', { prevSubject: 'element' }, (subject, dataTestId: string): any => {
  return cy.wrap(subject).find(`[data-testid="${dataTestId}"]`)
})

Cypress.Commands.add('mount', (component: ComputedOptions, options = {}): Chainable => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []
  options.global.components = options.global.components || {}

  options.global.plugins.push({
    install(app: App<Element>) {
      if (options.router) {
        app.use(options.router)
      }
    },
  }, BindOncePlugin)

  return mount(component, options)
})

Cypress.Commands.add('mountWithProdRouter', (component: ComputedOptions, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      routes: testRoutes,
      history: createMemoryHistory(),
    })
  }

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      app.use(options.router)
    },
  })

  return mount(component, options)
})
