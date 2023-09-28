import { mount } from 'cypress/vue'
import KButton from '@/components/KButton/KButton.vue'
import { ButtonAppearances, ButtonSizes } from '@/types'

const rendersCorrectAppearance = (variant: string) => {
  it(`renders KButton with the ${variant} appearance`, () => {
    mount(KButton, {
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

const rendersCorrectSize = (size: string) => {
  it(`sets ${size} class when size passed`, () => {
    mount(KButton, {
      props: {
        size,
      },
      slots: {
        default: () => size.charAt(0).toUpperCase() + size.substr(1).toLowerCase(),
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

  // TODO: [beta] update this when we change icon prop
  it('sets icon-button class when size passed', () => {
    mount(KButton, {
      slots: {
        icon: () => 'Pretend I am an icon',
      },
    })

    cy.get('.k-button').should('have.class', 'icon-button')
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

  // TODO: [beta] remove this when we change icon prop
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

  // TODO: [beta] remove this when we remove icon slot
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
