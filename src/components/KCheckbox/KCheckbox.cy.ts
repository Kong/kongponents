import { mount } from 'cypress/vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'

describe('KCheckbox', () => {
  it('shows as checked when prop passed', () => {
    const model = true
    mount(KCheckbox, {
      props: {
        modelValue: model,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    const model = false

    mount(KCheckbox, {
      props: {
        modelValue: model,
      },
    })

    cy.get('input').check().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')

      cy.wrap(Cypress.vueWrapper.emitted('input')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('change')?.[0][0]).should('eq', true)
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', true)
    })
  })

  it('renders `label` and `description` props', () => {
    const label = 'Some label'
    const description = 'Some description'

    mount(KCheckbox, {
      props: {
        modelValue: false,
        label,
        description,
      },
    })

    cy.get('.checkbox-label').should('have.text', label)
    cy.get('.checkbox-description').should('have.text', description)
  })

  it('renders `label` and `description` when passed through slot', () => {
    const label = 'Some label'
    const description = 'Some description'
    const defaultSlot = 'default-slot'
    const descriptionSlot = 'description-slot'

    mount(KCheckbox, {
      props: {
        modelValue: false,
        label,
        description,
      },
      slots: {
        default: `<span data-testid="${defaultSlot}">${defaultSlot}</span>`,
        description: `<span data-testid="${descriptionSlot}">${descriptionSlot}</span>`,
      },
    })

    cy.get('.k-checkbox').find(`[data-testid="${defaultSlot}"]`).should('be.visible')
    cy.get('.checkbox-label').should('have.text', defaultSlot)
    cy.get('.k-checkbox').find(`[data-testid="${descriptionSlot}"]`).should('be.visible')
    cy.get('.checkbox-description').should('have.text', descriptionSlot)
  })
})
