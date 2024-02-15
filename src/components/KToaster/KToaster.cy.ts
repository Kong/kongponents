import { mount } from 'cypress/vue'
import KToaster from '@/components/KToaster/KToaster.vue'
import ToastManager from '@/components/KToaster/ToastManager'

// Instance for all tests
const tm = new ToastManager()

// Close all existing toasts before each test, and delay to allow animation to complete
beforeEach(() => {
  tm.closeAll()
  cy.wait(500)
})

describe('KToaster', () => {
  describe('KToaster.vue', () => {
    it('renders toaster', () => {
      const toasts = []
      toasts.push({ title: 'I have a toast', message: 'hey toasty' })
      toasts.push({ title: 'I have a toast', appearance: 'success', message: 'hey toasty' })
      toasts.push({ title: 'I have a toast', appearance: 'danger', message: 'hey toasty' })
      toasts.push({ title: 'I have a toast', appearance: 'danger', message: 'hey toasty' })

      mount(KToaster, {
        props: {
          toasterState: toasts,
        },
      })

      cy.get('body').find('div[role="alert"].success').its('length').should('eq', 1)
      cy.get('body').find('div[role="alert"].danger').its('length').should('eq', 2)
      cy.get('body').find('.toast .toast-message').its('length').should('eq', 4)
    })

    it('renders all elements in toaster correctly - message passed', () => {
      const title = 'I have a toast'
      const message = 'hey toasty'

      mount(KToaster, {
        props: {
          toasterState: [{ title, message }],
        },
      })

      cy.get('.toast .toast-icon').should('be.visible')
      cy.get('.toast .toast-title').contains(title)
      cy.get('.toast .toast-message').contains(message)
      cy.get('.toast .toast-close-icon').should('be.visible')
    })

    it('renders all elements in toaster correctly - message not passed', () => {
      const title = 'I have a toast'

      mount(KToaster, {
        props: {
          toasterState: [{ title }],
        },
      })

      cy.get('.toast .toast-icon').should('be.visible')
      cy.get('.toast .toast-title').contains(title)
      cy.get('.toast .toast-message').should('not.exist')
      cy.get('.toast .toast-close-icon').should('be.visible')
    })
  })

  describe('ToastManager', () => {
    it('opens toasters', () => {
      tm.open('hey toasty')
      tm.open({ title: 'hey toasty', message: 'yo toasty' })
      tm.open({ title: 'hey toasty', key: 2, message: 'there has been an alert' })
      cy.get('body .toast').its('length').should('eq', 3)
    })

    it('handles invalid appearance', () => {
      tm.open({ title: 'hey toasty', message: 'invalid appearance', appearance: 'invalid' })
      cy.get('body .toast').its('length').should('eq', 1)

      cy.wrap(tm.toasters.value).its('length').should('eq', 1)
      cy.wrap(tm.toasters.value[0].appearance).should('eq', 'info')
    })

    it('dismisses toasters after default timeout', () => {
      tm.open('hey toasty')
      tm.open('hey toasty')

      cy.wrap(tm.toasters.value).its('length').should('eq', 2).then(() => {
        cy.wait(4900)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 2)
      }).then(() => {
        cy.wait(100)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 0)
      })
    })

    it('dismisses toasters after timeout per toast', () => {
      tm.open({ title: 'hey toasty', timeoutMilliseconds: 1000 })
      tm.open({ title: 'hey toasty', timeoutMilliseconds: 2000 })
      tm.open({ title: 'hey toasty', timeoutMilliseconds: 3000 })
      tm.open('hey toasty') // default 5000 milliseconds

      cy.wrap(tm.toasters.value).its('length').should('eq', 4).then(() => {
        cy.wait(1000)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 3)
      }).then(() => {
        cy.wait(1000)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 2)
      }).then(() => {
        cy.wait(1000)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 1)
      }).then(() => {
        cy.wait(1000)
        return cy.wrap(tm.toasters.value).its('length').should('eq', 0)
      })
    })

    it('closes toasters', () => {
      tm.open({ title: 'hey toasty', key: '#123', message: 'hey toasty' })
      tm.open({ title: 'hey toasty', key: '#345', message: 'another toasty message' })

      cy.wrap(tm.toasters.value).its('length').should('eq', 2).then(() => {
        tm.close('#345')

        cy.wrap(tm.toasters.value).its('length').should('eq', 1)
        cy.wrap(tm.toasters.value[0].key).should('eq', '#123')
      })
    })
  })
})
