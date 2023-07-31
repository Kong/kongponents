import { mount } from 'cypress/vue'
import KSlideout from '@/components/KSlideout/KSlideout.vue'
import { h } from 'vue'

describe('KSlideout', () => {
  it('renders default slot', () => {
    mount(KSlideout, {
      props: {
        isVisible: true,
      },
      slots: {
        default: () => h('div', {}, [
          h('h1', {}, 'What\'s up default slot'),
          h('p', {}, 'Default slots are the easiest'),
        ]),
      },
    })

    cy.get('h1').should('be.visible')
    cy.get('p').should('be.visible')
  })

  it('renders props when passed', () => {
    const titleProp = 'Hello!'
    const closeButtonAlignmentProp = 'end'

    mount(KSlideout, {
      props: {
        isVisible: true,
        title: titleProp,
        closeButtonAlignment: closeButtonAlignmentProp,
      },
    })

    cy.getTestId('k-slideout-title').should('exist')
    cy.getTestId('k-slideout-title').should('be.visible')
  })

  it('renders cancel button on right when prop is used', () => {
    const closeButtonAlignmentProp = 'end'

    mount(KSlideout, {
      props: {
        isVisible: true,
        closeButtonAlignment: closeButtonAlignmentProp,
      },
    })

    cy.getTestId('close-button-end').should('exist')
    cy.getTestId('close-button-end').should('be.visible')
  })

  it('emits close when esc key pressed', () => {
    mount(KSlideout, {
      props: {
        isVisible: true,
      },
    })

    cy.get('body').type('{esc}').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'close')
    })
  })
})
