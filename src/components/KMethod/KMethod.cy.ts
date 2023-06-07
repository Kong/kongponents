import { mount } from 'cypress/vue'
import KMethod, { methods } from '@/components/KMethod/KMethod.vue'

const rendersCorrectMethod = (method: string) => {
  it(`renders KMethod for ${method.toUpperCase()} method`, () => {
    mount(KMethod, {
      props: {
        method,
      },
    })

    cy.get('.k-method').should('have.class', `method-${method}`)
  })
}

describe('KMethod', () => {
  methods.map(method => rendersCorrectMethod(method))

  it('displays label prop correctly', () => {
    const labelText = 'METHOD'

    mount(KMethod, {
      props: {
        method: 'custom',
        label: labelText,
      },
    })

    cy.get('.k-method').should('contain', labelText)
  })

  it('displays input switch and allows toggling on/off when isToggle is true', () => {
    const toggleValue = false

    mount(KMethod, {
      props: {
        method: 'custom',
        isToggle: true,
        value: toggleValue,
        'onUpdate:modelValue': cy.spy().as('onModelValueUpdate'),
      },
    })

    cy.get('.k-method').should('be.visible').click()
    cy.get('@onModelValueUpdate').should('have.been.calledOnceWith', !toggleValue)
  })
})
