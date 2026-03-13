import KToaster from '@/components/KToaster/KToaster.vue'

const toastersContainerId = 'kongponents-toaster-container'

describe('KToaster', () => {
  it('renders toaster', () => {
    const toasts = []
    toasts.push({ title: 'I have a toast', message: 'hey toasty' })
    toasts.push({ title: 'I have a toast', appearance: 'success', message: 'hey toasty' })
    toasts.push({ title: 'I have a toast', appearance: 'danger', message: 'hey toasty' })
    toasts.push({ title: 'I have a toast', appearance: 'danger', message: 'hey toasty' })

    cy.mount(KToaster, {
      props: {
        toasterState: toasts,
      },
    })

    cy.get('.k-toaster').should('exist')
    cy.get('.k-toaster').find('div[role="alert"].danger').its('length').should('eq', 2)
    cy.get('.k-toaster').find('.toaster .toaster-message').its('length').should('eq', 4)
  })

  it('renders all elements in toaster correctly - message passed', () => {
    const title = 'I have a toast'
    const message = 'hey toasty'

    cy.mount(KToaster, {
      props: {
        toasterState: [{ title, message }],
      },
    })

    cy.get('.toaster .toaster-icon').should('be.visible')
    cy.get('.toaster .toaster-title').contains(title)
    cy.get('.toaster .toaster-message').contains(message)
    cy.get('.toaster .toaster-close-icon').should('be.visible')
  })

  it('renders all elements in toaster correctly - message not passed', () => {
    const title = 'I have a toast'

    cy.mount(KToaster, {
      props: {
        toasterState: [{ title }],
      },
    })

    cy.get('.toaster .toaster-icon').should('be.visible')
    cy.get('.toaster .toaster-title').contains(title)
    cy.get('.toaster .toaster-message').should('not.exist')
    cy.get('.toaster .toaster-close-icon').should('be.visible')
  })

  it('shows close button even if content is long', () => {
    const longTitle = 'title'.repeat(20)
    const longMessage = 'message'.repeat(20)
    cy.mount(KToaster, {
      props: {
        toasterState: [{ title: longTitle, message: longMessage }],
      },
    })
    cy.get('.toaster .toaster-close-icon').should('be.visible')
  })
})
