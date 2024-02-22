import { mount } from 'cypress/vue'
import KAlert from '@/components/KAlert/KAlert.vue'
import { AlertAppearances } from '@/types'

const rendersCorrectVariant = (variant) => {
  it(`renders ${variant} variant`, () => {
    mount(KAlert, {
      props: {
        appearance: `${variant}`,
        alertMessage: `I am ${variant}`,
      },
    })

    cy.get('.k-alert').should('have.class', variant)
  })
}

describe('KAlert', () => {
  // Loop through AlertAppearances
  Object.keys(AlertAppearances).map(v => rendersCorrectVariant(v))

  it('renders info variant when no appearance prop', () => {
    mount(KAlert, {
      props: {
        alertMessage: 'I should be info!',
      },
    })

    cy.get('.k-alert').should('have.class', 'info')
  })

  it('renders all elements correctly when props are not passed', () => {
    mount(KAlert)

    cy.get('.k-alert').should('exist')
    cy.get('.alert-icon-container').should('not.exist')
    cy.get('.alert-content').should('exist')
    cy.get('.alert-title').should('not.exist')
    cy.get('.alert-message').should('not.exist')
    cy.get('.alert-dismiss-icon').should('not.exist')
  })

  it('renders title when passed as a prop', () => {
    const title = 'I am a title'

    mount(KAlert, {
      props: {
        title,
      },
    })

    cy.get('.alert-title').should('be.visible').and('have.text', title)
  })

  it('renders message when passed as a prop', () => {
    const message = 'I am a message'

    mount(KAlert, {
      props: {
        message,
      },
    })

    cy.get('.alert-message').should('be.visible').and('have.text', message)
  })

  it('renders icon and dismiss button when props are passed', () => {
    mount(KAlert, {
      props: {
        hideIcon: false,
        dismissible: true,
      },
    })

    cy.get('.alert-icon-container').should('exist')
    cy.get('.alert-dismiss-icon').should('exist')
  })

  it('renders default slot correctly', () => {
    const message = 'I am a message'
    const defaultSlotContent = 'Default'

    mount(KAlert, {
      props: {
        message,
      },
      slots: {
        default: `<span data-testid="default-slot-content">${defaultSlotContent}</span>`,
      },
    })

    cy.get('.alert-message').should('be.visible').and('have.text', defaultSlotContent)
  })

  it('emits dismiss event when dismiss button is clicked', () => {
    mount(KAlert, {
      props: {
        dismissible: true,
      },
    })

    cy.get('.alert-dismiss-icon').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'dismiss')
    })
  })
})
