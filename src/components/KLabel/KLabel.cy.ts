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

    // access element's before pseudo element
    cy.get('.k-label.required').then($els => {
      // get Window reference from element
      const win = $els[0].ownerDocument.defaultView
      // use getComputedStyle to read the pseudo selector
      const before = win?.getComputedStyle($els[0], 'before')
      // read the value of the `content` CSS property
      const contentValue = before?.getPropertyValue('content')
      // the returned value will be an empty string with double quotes around it
      expect(contentValue).to.eq('""')
    })
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
