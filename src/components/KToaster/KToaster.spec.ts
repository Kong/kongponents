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
      toasts.push({ message: 'hey toasty' })
      toasts.push({ appearance: 'success', message: 'hey toasty' })
      toasts.push({ appearance: 'danger', message: 'hey toasty' })
      toasts.push({ appearance: 'danger', message: 'hey toasty' })

      mount(KToaster, {
        props: {
          toasterState: toasts,
        },
      })

      cy.get('body').find('div[role="alert"].success').its('length').should('eq', 1)
      cy.get('body').find('div[role="alert"].danger').its('length').should('eq', 2)
      cy.get('body').find('.toaster-item div.k-alert-msg').its('length').should('eq', 4)
    })
  })

  describe('ToastManager', () => {
    it('opens toasters', () => {
      tm.open('hey toasty')
      tm.open({ message: 'yo toasty' })
      tm.open({ key: 2, message: 'there has been an alert' })
      cy.get('body .toaster-item').its('length').should('eq', 3)
    })

    it('opens toasters - invalid appearance', () => {
      tm.open({ message: 'invalid appearance', appearance: 'info' })
      cy.get('body .toaster-item').its('length').should('eq', 1)

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
      tm.open({ message: 'hey toasty', timeoutMilliseconds: 1000 })
      tm.open({ message: 'hey toasty', timeoutMilliseconds: 2000 })
      tm.open({ message: 'hey toasty', timeoutMilliseconds: 3000 })
      tm.open({ message: 'hey toasty' }) // default 5000 milliseconds

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
      tm.open({ key: '#123', message: 'hey toasty' })
      tm.open({ key: '#345', message: 'another toasty message' })

      cy.wrap(tm.toasters.value).its('length').should('eq', 2).then(() => {
        tm.close('#345')

        cy.wrap(tm.toasters.value).its('length').should('eq', 1)
        cy.wrap(tm.toasters.value[0].key).should('eq', '#123')
      })
    })
  })
})
