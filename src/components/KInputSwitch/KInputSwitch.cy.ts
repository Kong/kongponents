import KInputSwitch from '@/components/KInputSwitch/KInputSwitch.vue'

describe('KInputSwitch', () => {
  it('shows as checked when prop passed', () => {
    cy.mount(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    cy.mount(KInputSwitch, {
      props: {
        modelValue: true,
      },
    })

    cy.getTestId('switch-control').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
    })
  })

  it('does not emit checked value on click when disabled', () => {
    cy.mount(KInputSwitch, {
      props: {
        modelValue: true,
        disabled: true,
      },
    })

    cy.getTestId('switch-control').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'update:modelValue')
    })
  })
})
