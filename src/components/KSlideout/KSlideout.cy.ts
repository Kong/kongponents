import { mount } from 'cypress/vue'
import KSlideout from '@/components/KSlideout/KSlideout.vue'
import { h } from 'vue'

describe('KSlideout', () => {
  it('renders default slot', () => {
    const contentHeading = 'What\'s up default slot'
    const contentSentence = 'Default slots are the easiest'

    mount(KSlideout, {
      props: {
        visible: true,
      },
      slots: {
        default: () => h('div', {}, [
          h('h1', {}, contentHeading),
          h('p', {}, contentSentence),
        ]),
      },
    })

    cy.get('h1').should('be.visible').should('have.text', contentHeading)
    cy.get('p').should('be.visible').should('have.text', contentSentence)
  })

  it('renders props when passed', () => {
    const titleProp = 'Hello!'

    mount(KSlideout, {
      props: {
        visible: true,
        title: titleProp,
      },
    })

    cy.getTestId('slideout-title').should('be.visible').should('have.text', titleProp)
  })

  it('renders close icon on right', () => {
    mount(KSlideout, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('slideout-close-icon').should('be.visible')
  })

  it('emits close event when backdrop is clicked', () => {
    mount(KSlideout, {
      props: {
        visible: true,
        onClose: cy.spy().as('onCloseSpy'),
      },
    }).then(({ wrapper }) => wrapper)
      .as('vueWrapper')

    cy.get('@vueWrapper').then((wrapper: any) => wrapper.findComponent(KSlideout)
      .vm.$emit('close', true))

    cy.get('@onCloseSpy').should('have.been.called')

    cy.get('.slideout-backdrop').click()
      .then(() => {
        cy.get('@onCloseSpy').should('have.been.called')
      })
  })

  it('emits close event when esc key pressed', () => {
    mount(KSlideout, {
      props: {
        visible: true,
      },
    })

    cy.get('body').type('{esc}').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'close')
    })
  })

  it('does not emit close event when closeOnBlur prop is false', () => {
    mount(KSlideout, {
      props: {
        visible: true,
        preventCloseOnBlur: true,
      },
    }).then(({ wrapper }) => wrapper)
      .as('vueWrapper')

    cy.get('html').click(0, 0).then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'close')
    })
  })
})
