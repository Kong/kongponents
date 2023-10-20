import { mount } from 'cypress/vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { h } from 'vue'

const positions = ['top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd', 'right', 'rightStart', 'rightEnd', 'bottom', 'bottomStart', 'bottomEnd']

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
const rendersCorrectPosition = (variant: string) => {
  it(`renders tooltip to the ${variant} side`, () => {
    const text = 'Button text'

    mount(KTooltip, {
      props: {
        testMode: true,
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

  it('does not render the tooltip if the `label` prop is empty', () => {
    const text = 'Button text'

    mount(KTooltip, {
      props: {
        testMode: true,
        trigger: 'click',
      },
      slots: {
        default: () => h('button', {}, 'text'),
      },
    })

    cy.get('button').click()

    cy.get('.k-tooltip').should('have.class', 'k-tooltip-hidden').and('not.be.visible')
  })
})
