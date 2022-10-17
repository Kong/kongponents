import { mount } from 'cypress/vue'
import KAlert, { appearances } from '@/components/KAlert/KAlert.vue'
import { h } from 'vue'

const rendersCorrectVariant = (variant) => {
  it(`Renders ${variant} variant`, () => {
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
  // Loop through appearances
  Object.keys(appearances).map(v => rendersCorrectVariant(v))

  it('renders info variant when no appearance prop', () => {
    mount(KAlert, {
      props: {
        alertMessage: 'I should be info!',
      },
    })

    cy.get('.k-alert').should('have.class', 'info')
  })

  it('does not render if isShowing set to false', () => {
    mount(KAlert, {
      props: {
        isShowing: false,
      },
    })

    cy.get('.k-alert').should('not.exist')
  })

  it('renders borders on the expected sides', () => {
    mount(KAlert, {
      props: {
        alertMessage: 'Hello world',
        hasLeftBorder: true,
      },
    })
    cy.get('.k-alert').should('have.class', 'has-left-border')

    mount(KAlert, {
      props: {
        alertMessage: 'Hello world',
        hasRightBorder: true,
      },
    })
    cy.get('.k-alert').should('have.class', 'has-right-border')

    mount(KAlert, {
      props: {
        alertMessage: 'Hello world',
        hasBottomBorder: true,
      },
    })
    cy.get('.k-alert').should('have.class', 'has-bottom-border')

    mount(KAlert, {
      props: {
        alertMessage: 'Hello world',
        hasTopBorder: true,
      },
    })
    cy.get('.k-alert').should('have.class', 'has-top-border')
  })

  it('renders large alert box', () => {
    mount(KAlert, {
      props: {
        alertMessage: 'Hello world',
        size: 'large',
      },
    })

    cy.get('.k-alert').should('have.class', 'large')
  })

  it('renders slots when passed', () => {
    const actionButtons = 'Action button'
    const alertMessage = 'Hello World'
    const description = 'I am an alert'

    mount(KAlert, {
      props: {
        dismissType: 'button',
        size: 'large',
        hasActionButtons: true,
        type: 'banner',
      },
      slots: {
        actionButtons: () => h('span', {}, actionButtons),
        alertMessage: () => h('span', {}, alertMessage),
        description: () => h('span', {}, description),
      },
    })

    cy.get('.k-alert-action').should('contain.html', actionButtons)
    cy.get('.k-alert-msg').should('contain.html', alertMessage)
    cy.get('.k-alert-description-text').should('contain.html', description)
  })
})
