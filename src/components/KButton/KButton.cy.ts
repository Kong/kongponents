import KButton from '@/components/KButton/KButton.vue'
import { ButtonAppearances, ButtonSizes } from '@/types'
import type { ButtonAppearance, ButtonSize } from '@/types'

const rendersCorrectAppearance = (variant: ButtonAppearance) => {
  it(`renders KButton with the ${variant} appearance`, () => {
    cy.mount(KButton, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    cy.get('.k-button').should('have.class', variant)
  })
}

const rendersCorrectSize = (size: ButtonSize) => {
  it(`sets ${size} class when size passed`, () => {
    cy.mount(KButton, {
      props: {
        size,
      },
      slots: {
        default: () => size.charAt(0).toUpperCase() + size.substring(1).toLowerCase(),
      },
    })

    cy.get('.k-button').should('have.class', size)
  })
}

describe('KButton', () => {
  // Loop through ButtonAppearances
  Object.values(ButtonAppearances).map(a => rendersCorrectAppearance(a))

  // Loop through ButtonSizes
  Object.values(ButtonSizes).map(s => rendersCorrectSize(s))

  it('sets icon-button class when icon prop is `true` passed', () => {
    cy.mount(KButton, {
      props: {
        icon: true,
      },
      slots: {
        default: () => 'Pretend I am an icon',
      },
    })

    cy.get('.k-button').should('have.class', 'icon-button')
  })

  it('renders a native link with KButton styles', () => {
    cy.mount(KButton, {
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

  // TODO: remove this when we remove icon slot
  it('renders an icon when using icon slot', () => {
    const iconText = 'Pretend I am an icon'
    cy.mount(KButton, {
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
    cy.mount(KButton, {
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

  it('should not throw error when `to` prop is an object and disabled is true', () => {
    expect(() => cy.mountWithProdRouter(
      KButton,
      {
        props: {
          to: { name: 'home' },
          disabled: true,
        },
        slots: {
          default: () => 'Click me',
        },
      },
    )).to.not.throw()
  })
})
