import { mount } from 'cypress/vue'
import KBadge, { appearances } from '@/components/KBadge/KBadge.vue'

const rendersCorrectAppearance = (variant) => {
  it(`renders KBadge with the ${variant} appearance`, () => {
    mount(KBadge, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-badge').should('have.class', `k-badge-${variant}`)
  })
}

describe('KBadge', () => {
  // Loop through appearances
  Object.keys(appearances).map(a => rendersCorrectAppearance(a))

  it('defaults to default badge', () => {
    mount(KBadge, {
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.class', 'k-badge-default')
  })

  it('handles custom colors', () => {
    mount(KBadge, {
      props: {
        appearance: 'custom',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(255, 0, 0)',
      },
      slots: {
        default: () => 'Hello!',
      },
    })

    cy.get('.k-badge').should('have.css', 'color').and('eq', 'rgb(255, 255, 255)')
    cy.get('.k-badge').should('have.css', 'background-color').and('eq', 'rgb(255, 0, 0)')
  })
})
