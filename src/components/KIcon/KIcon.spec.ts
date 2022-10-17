import { mount } from 'cypress/vue'
import KIcon from './KIcon.vue'
import * as icons from './icons'

const iconNames = Object.keys(icons)

const rendersIcon = (icon) => {
  it(`renders ${icon} icon`, () => {
    mount(KIcon, {
      props: {
        icon,
        testMode: true,
      },
    })

    cy.get('.kong-icon').find('svg title').should('have.text', icon)
  })
}

describe('KIcon', () => {
  iconNames.map((icon: string) => {
    return rendersIcon(icon)
  })

  it('renders icon with red fill', () => {
    const color = 'red'
    mount(KIcon, {
      props: {
        icon: 'portal',
        color,
      },
    })

    cy.get('.kong-icon').find('svg path').invoke('attr', 'fill').should('eq', color)
  })

  it('renders icon with secondary color', () => {
    const color = 'black'
    const secondaryColor = 'yellow'
    mount(KIcon, {
      props: {
        icon: 'warning',
        color,
        secondaryColor,
      },
    })

    cy.get('.kong-icon').find('svg #Triangle').invoke('attr', 'fill').should('eq', color)
    cy.get('.kong-icon').find("path[type='secondary']").invoke('attr', 'fill').should('eq', secondaryColor)
  })

  it('renders 32x32 sized icon', () => {
    const size = '32'
    mount(KIcon, {
      props: {
        icon: 'portal',
        size,
      },
    })

    cy.get('.kong-icon').find('svg').invoke('attr', 'width').should('eq', size)
    cy.get('.kong-icon').find('svg').invoke('attr', 'height').should('eq', size)
  })

  it('default title is set from icon', () => {
    mount(KIcon, {
      props: {
        icon: 'portal',
      },
    })

    cy.get('.kong-icon').find('svg title').should('have.text', 'Dev Portal')
  })

  it('sets title from prop', () => {
    const title = 'My Title'
    mount(KIcon, {
      props: {
        icon: 'portal',
        title,
      },
    })

    cy.get('.kong-icon').find('svg title').should('have.text', title)
  })
})
