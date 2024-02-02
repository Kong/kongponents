import { mount } from 'cypress/vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { h } from 'vue'

const positions = ['top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd', 'right', 'rightStart', 'rightEnd', 'bottom', 'bottomStart', 'bottomEnd']

const rendersCorrectPosition = (variant: string) => {
  it(`renders tooltip to the ${variant} side`, () => {
    const text = 'Button text'

    mount(KTooltip, {
      props: {
        placement: variant,
        label: `I'm on the ${variant} side!`,
        trigger: 'click',
      },
      slots: {
        default: () => h('button', {}, text),
      },
    })

    cy.get('button').click()

    cy.get('.k-tooltip').should('be.visible').and('not.have.class', 'k-tooltip-hidden').and('have.text', `I'm on the ${variant} side!`)
  })
}

describe('KTooltip', () => {
  // Loop through varients
  positions.map(p => rendersCorrectPosition(p))

  it('renders the default slot content but not the tooltip if the `label` prop is empty', () => {
    const text = 'Button text'

    mount(KTooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: () => h('button', { 'data-testid': 'my-button' }, text),
      },
    })

    cy.getTestId('my-button').should('be.visible').click()

    cy.get('.k-tooltip').should('not.exist')
  })
})
