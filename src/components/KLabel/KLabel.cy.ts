import { mount } from 'cypress/vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import { h } from 'vue'

describe('KLabel', () => {
  it('renders a plain label by default', () => {
    const text = 'Full Name'
    mount(KLabel, {
      props: {
      },
      slots: {
        default: () => text,
      },
    })

    cy.get('.k-label').should('have.text', text)
  })

  it('renders a red dot when `required` is true', () => {
    mount(KLabel, {
      props: {
        required: true,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-label.required').should('exist')
  })

  it('renders a tooltip when `info` prop is provided', () => {
    mount(KLabel, {
      props: {
        info: 'This is a tooltip',
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-label .label-tooltip').should('not.be.empty')
  })

  it('renders a tooltip when `tooltip` slot is used', () => {
    mount(KLabel, {
      props: {
      },
      slots: {
        default: () => 'Full Name',
        tooltip: () => h('div', {}, 'This is a tooltip'),
      },
    })

    cy.get('.k-label .label-tooltip').should('not.be.empty')
  })

  it('passes the `for` attribute to label when `for` is provided', () => {
    const id = 'test-id'
    mount(KLabel, {
      props: {
        for: id,
      },
      slots: {
        default: () => 'Full Name',
      },
    })

    cy.get('.k-label').invoke('attr', 'for').should('eq', id)
  })
})
