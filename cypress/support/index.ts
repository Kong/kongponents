import { mount } from 'cypress/vue'
import { App, ComputedOptions } from 'vue'
import Chainable = Cypress.Chainable
import 'cypress-fail-fast'
// Import Kongponent styles
import '@/styles/styles.scss'

Cypress.Commands.add('getTestId', (dataTestId: string): Chainable => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('findTestId', (dataTestId: string): Chainable => {
  return cy.find(`[data-testid=${dataTestId}]`)
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
  })

  return mount(component, options)
})
