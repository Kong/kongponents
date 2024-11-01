import KSlideout from '@/components/KSlideout/KSlideout.vue'
import { h } from 'vue'

describe('KSlideout', () => {
  it('renders default slot', () => {
    const contentHeading = 'What\'s up default slot'
    const contentSentence = 'Default slots are the easiest'

    cy.mount(KSlideout, {
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

    cy.mount(KSlideout, {
      props: {
        visible: true,
        title: titleProp,
      },
    })

    cy.getTestId('slideout-title').should('be.visible').should('have.text', titleProp)
  })

  it('renders with correct default z-index', () => {

    cy.mount(KSlideout, {
      props: {
        visible: true,
      },
    })

    cy.get('.k-slideout .slideout-container').should('have.css', 'z-index', '9999')
    cy.get('.k-slideout .slideout-backdrop').should('have.css', 'z-index', '9999')
  })

  it('renders with custom z-index', () => {

    cy.mount(KSlideout, {
      props: {
        visible: true,
        zIndex: 92929,
      },
    })

    cy.get('.k-slideout .slideout-container').should('have.css', 'z-index', '92929')
    cy.get('.k-slideout .slideout-backdrop').should('have.css', 'z-index', '92929')
  })

  it('renders close icon on right', () => {
    cy.mount(KSlideout, {
      props: {
        visible: true,
      },
    })

    cy.getTestId('slideout-close-icon').should('be.visible')
  })

  it('emits close event when backdrop is clicked', () => {
    cy.mount(KSlideout, {
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
    cy.mount(KSlideout, {
      props: {
        visible: true,
      },
    })

    cy.get('body').type('{esc}').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'close')
    })
  })

  it('does not emit close event when closeOnBlur prop is false', () => {
    cy.mount(KSlideout, {
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
