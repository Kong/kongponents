import { mount } from 'cypress/vue'
import KButton, { appearances } from '@/components/KButton/KButton.vue'

const rendersCorrectAppearance = (variant: string) => {
  it(`renders kbutton with the ${variant} appearance`, () => {
    mount(KButton, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-button').should('have.class', variant)
    cy.matchImage()
  })
}

describe('KButton', () => {
  // Loop through appearances
  Object.values(appearances).map(a => rendersCorrectAppearance(a))

  it('sets small class when size passed', () => {
    mount(KButton, {
      props: {
        size: 'small',
      },
      slots: {
        default: () => 'Small Button',
      },
    })

    cy.get('.k-button').should('have.class', 'small')
  })

  it('sets medium class when size passed', () => {
    mount(KButton, {
      props: {
        size: 'medium',
      },
      slots: {
        default: () => 'Medium Button',
      },
    })

    cy.get('.k-button').should('have.class', 'medium')
  })

  it('sets large class when size passed', () => {
    mount(KButton, {
      props: {
        size: 'large',
      },
      slots: {
        default: () => 'Large Button',
      },
    })

    cy.get('.k-button').should('have.class', 'large')
  })

  it('renders a native link with KButton styles', () => {
    mount(KButton, {
      props: {
        to: 'https://google.com',
        appearance: 'secondary',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    cy.get('a').should('have.class', 'k-button').and('have.class', 'secondary')
    cy.get('a').invoke('attr', 'href').should('eq', 'https://google.com')
  })

  it('renders an icon when using icon prop', () => {
    mount(KButton, {
      props: {
        icon: 'spinner',
      },
      slots: {
        default: () => 'Click me',
      },
    })

    cy.get('.k-button .k-button-icon').should('be.visible')
  })

  it('renders an icon when using icon slot', () => {
    const iconText = 'Pretend I am an icon'
    mount(KButton, {
      props: {
        icon: 'spinner',
      },
      slots: {
        default: () => 'Click me',
        icon: () => iconText,
      },
    })

    cy.get('.k-button').should('contain.text', iconText)
  })

  it('strips falsy disabled attribute on native link', () => {
    mount(KButton, {
      props: {
        to: 'https://google.com',
        disabled: false,
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    cy.get('.k-button').should('not.have.attr', 'disabled')
  })
})
