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

  it('renders title slot when providing both title prop and slot', () => {
    mount(KSlideout, {
      props: {
        isVisible: true,
        title: 'Title prop',
      },
      slots: {
        title: () => h('div', {}, [
          h('span', {}, 'Title slot'),
        ]),
      },
    })

    cy.getTestId('k-slideout-title').contains('Title slot')
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

  it('emits close when panel-background is clicked', () => {
    mount(KSlideout, {
      props: {
        isVisible: true,
        onClose: cy.spy().as('onCloseSpy'),
      },
    }).then(({ wrapper }) => wrapper)
      .as('vueWrapper')

    cy.get('@vueWrapper').then((wrapper: any) => wrapper.findComponent(KSlideout)
      .vm.$emit('close', true))

    cy.get('@onCloseSpy').should('have.been.called')

    cy.get('.panel-background').click({ force: true })
      .then(() => {
        cy.get('@onCloseSpy').should('have.been.called')
      })
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

  it('does not emit close event when persist prop is true', () => {
    mount(KSlideout, {
      props: {
        isVisible: true,
        preventCloseOnBlur: true,
      },
    }).then(({ wrapper }) => wrapper)
      .as('vueWrapper')

    cy.get('html').click(0, 0).then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'close')
    })
  })
})
