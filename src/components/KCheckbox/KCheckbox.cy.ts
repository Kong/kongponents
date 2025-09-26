import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'

describe('KCheckbox', () => {
  it('shows as checked when prop passed', () => {
    const model = true
    cy.mount(KCheckbox, {
      props: {
        modelValue: model,
      },
    })

    cy.get('input').should('be.checked')
  })

  it('emits checked value on click', () => {
    const model = false

    cy.mount(KCheckbox, {
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

    cy.mount(KCheckbox, {
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

    cy.mount(KCheckbox, {
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

  it('renders correctly in indeterminate state', () => {
    cy.mount(KCheckbox, {
      props: {
        modelValue: false,
        label: 'Indeterminate label',
        indeterminate: true,
      },
    })

    cy.get('.k-checkbox').find('[data-testid="indeterminate-icon"]').should('be.visible')
    cy.get('.k-checkbox').find('[data-testid="check-icon"]').should('not.exist')
  })

  it('renders KLabel tooltip when `labelAttributes.info` is passed', () => {
    const tooltipText = 'This is a tooltip'

    cy.mount(KCheckbox, {
      props: {
        modelValue: false,
        label: 'Label with tooltip',
        labelAttributes: {
          info: tooltipText,
        },
      },
    })

    cy.get('.k-label .label-tooltip').trigger('mouseenter')
    cy.get('.k-tooltip').should('be.visible').and('have.text', tooltipText)

    // Clicking the tooltip content should not toggle the checkbox
    cy.get('.k-label .popover').click()
    cy.get('input').should('not.be.checked')

    // Clicking the tooltip icon content should not toggle the checkbox
    cy.get('.k-label .label-tooltip').click()
    cy.get('input').should('not.be.checked')
  })
})
