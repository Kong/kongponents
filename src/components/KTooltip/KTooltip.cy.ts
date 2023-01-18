import { mount } from 'cypress/vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

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
    mount(KTooltip, {
      props: {
        testMode: true,
        placement: variant,
        label: `I'm on the ${variant} side!`,
      },
    })

    cy.get('.k-tooltip').should('have.text', `I'm on the ${variant} side!`)
  })
}

describe('KTooltip', () => {
  // Loop through varients
  positions.map(p => rendersCorrectPosition(p))
})
