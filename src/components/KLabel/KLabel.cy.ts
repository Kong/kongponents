import { mount } from 'cypress/vue'
import KLabel from '@/components/KLabel/KLabel.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KLabel', () => {
  it('renders a plain label by default', () => {
    const text = 'Full Name'
    mount(KLabel, {
      props: {
        testMode: true,
      },
      slots: {
        default: () => text,
      },
    })

    cy.get('.k-input-label').should('have.text', text)
  })

  it('renders a tooltip when `help` is provided', () => {
    mount(KLabel, {
      props: {
        help: 'This is a tooltip',
        testMode: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-input-label .label-tooltip').should('not.be.empty')
  })

  it('renders an asterisk when `required` is true', () => {
    mount(KLabel, {
      props: {
        testMode: true,
        required: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-input-label .is-required').should('exist')
  })

  it('renders a tooltip when `info` is provided', () => {
    mount(KLabel, {
      props: {
        info: 'This is a tooltip',
        testMode: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-input-label .label-tooltip').should('not.be.empty')
  })

  it('passes the `for` attribute to label when `for` is provided', () => {
    const id = 'test-id'
    mount(KLabel, {
      props: {
        for: id,
        testMode: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-input-label').invoke('attr', 'for').should('eq', id)
  })
})
