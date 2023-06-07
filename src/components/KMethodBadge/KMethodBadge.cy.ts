import { mount } from 'cypress/vue'
import KMethodBadge from '@/components/KMethodBadge/KMethodBadge.vue'
import { MethodsArray } from '@/types'

const rendersCorrectMethod = (method: string) => {
  it(`renders KMethodBadge for ${method.toUpperCase()} method`, () => {
    mount(KMethodBadge, {
      props: {
        method,
      },
    })

    cy.get('.k-method-badge').should('have.class', `method-${method}`)
  })
}

describe('KMethodBadge', () => {
  MethodsArray.map(method => rendersCorrectMethod(method))

  it('displays label prop correctly', () => {
    const labelText = 'METHOD'

    mount(KMethodBadge, {
      props: {
        method: 'custom',
        label: labelText,
      },
    })

    cy.get('.k-method-badge').should('contain', labelText)
  })

  it('displays input switch and allows toggling on/off when isToggle is true', () => {
    const toggleValue = false

    mount(KMethodBadge, {
      props: {
        method: 'custom',
        isToggle: true,
        value: toggleValue,
        'onUpdate:modelValue': cy.spy().as('onModelValueUpdate'),
      },
    })

    cy.get('.k-method-badge').should('be.visible').click()
    cy.get('@onModelValueUpdate').should('have.been.calledOnceWith', !toggleValue)
  })
})
