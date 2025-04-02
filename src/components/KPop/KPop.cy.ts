import KPop from '@/components/KPop/KPop.vue'
import { h } from 'vue'

describe('KPop', () => {
  it('renders props when passed', () => {
    const popButtonText = 'Click Me!'
    const popTitle = 'Cool Beans!'

    cy.mount(KPop, {
      props: {
        buttonText: popButtonText,
        title: popTitle,
      },
    })

    cy.get('[data-testid="popover-button"]').should('contain.html', popButtonText)
    cy.get('.popover-title').should('contain.html', popTitle)
  })

  it('renders slots when passed', () => {
    const popTitle = 'Look Mah!'
    const popContent = 'Pop Content'
    const popFooter = 'Pop Footer'

    cy.mount(KPop, {
      props: {
      },
      slots: {
        title: () => h('span', {}, popTitle),
        content: h('span', {}, popContent),
        footer: h('span', {}, popFooter),
      },
    })

    cy.get('.popover-title').should('contain.html', popTitle)
    cy.get('.popover-content').should('contain.html', popContent)
    cy.get('.popover-footer').should('contain.html', popFooter)
  })

  it('renders with correct px width', () => {
    const width = 300
    cy.mount(KPop, {
      props: {
        width: width + '',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })
    cy.get('.slottedEl').click()
    cy.get('.popover .popover-container').invoke('width').should('eq', width)
  })

  it('renders with correct title', () => {
    const title = 'Cool Beans!'
    cy.mount(KPop, {
      props: {
        title,
      },
    })
    cy.get('.popover-title').should('have.text', title)
  })

  it('has no title if no prop', () => {
    cy.mount(KPop, {
      props: {
      },
    })
    cy.get('.popover-title').should('not.exist')
  })

  it('shows element on click', () => {
    cy.mount(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    cy.get('.popover').should('not.be.visible')
    cy.get('.slottedEl').click()
    cy.get('.popover').should('be.visible')
  })

  it('shows element on hover', () => {
    cy.mount(KPop, {
      props: {
        title: 'Popover Title',
        trigger: 'hover',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    cy.get('.popover').should('not.be.visible')
    cy.get('.slottedEl').trigger('mouseenter')
    cy.get('.popover').should('be.visible')
  })

  it('renders with correct default zIndex', () => {
    cy.mount(KPop)

    cy.get('.popover').should('have.css', 'z-index', '1000')
  })

  it('renders with custom zIndex', () => {
    cy.mount(KPop, {
      props: {
        zIndex: 2200,
      },
    })

    cy.get('.popover').should('have.css', 'z-index', '2200')
  })

  it('does not render close icon when prop is false', () => {
    cy.mount(KPop, {
      props: {
        hideCloseIcon: true,
      },
    })

    cy.get('.popover-close-button').should('not.exist')
  })

  it('closes popover when close button is clicked', () => {
    cy.mount(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    cy.get('.slottedEl').click()
    cy.get('.popover').should('be.visible')
    cy.get('.popover-close-button').click()
    cy.get('.popover').should('not.be.visible')
  })

  it('closes popover on escape key press', () => {
    cy.mount(KPop, {
      props: {
        title: 'Popover Title',
      },
      slots: {
        default: () => h('div', { class: ['slottedEl'] }, 'Slotted element'),
      },
    })

    cy.get('.slottedEl').click()
    cy.get('.popover').should('be.visible')
    cy.get('.popover').trigger('keydown', { key: 'Escape' })
    cy.get('.popover').should('not.be.visible')
  })
})
