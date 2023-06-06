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
        label: labelText,
      },
    })

    cy.get('.k-method').should('contain', labelText)
  })
})
