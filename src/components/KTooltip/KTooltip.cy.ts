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
        text: `I'm on the ${variant} side!`,
        trigger: 'click',
      },
      slots: {
        default: () => h('button', {}, text),
      },
    })

    cy.get('button').click()

    cy.get('.k-tooltip').should('be.visible').and('have.text', `I'm on the ${variant} side!`)
  })
}

describe('KTooltip', () => {
  // Loop through varients
  positions.map(p => rendersCorrectPosition(p))

  it('renders the default slot content but not the tooltip if the text prop is empty', () => {
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

  it('renders with correct default zIndex', () => {
    mount(KTooltip, {
      props: {
        text: 'sample text',
      },
    })

    cy.get('.k-tooltip.popover').should('have.css', 'z-index', '9999')
  })

  it('renders with custom zIndex', () => {
    mount(KTooltip, {
      props: {
        text: 'sample text',
        zIndex: 92929,
      },
    })

    cy.get('.k-tooltip.popover').should('have.css', 'z-index', '92929')
  })
})
