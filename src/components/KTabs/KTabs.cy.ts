import { mount } from 'cypress/vue'
import { h } from 'vue'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

describe('KTabs', () => {
  it('first tab is set if hash not found', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
      },
    })

    cy.get('.tab-item').eq(0).should('have.class', 'active')
  })

  it('sets correct tab if default tab prop', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
        modelValue: '#books',
      },
    })

    cy.get('.tab-item').eq(2).should('have.class', 'active')
  })

  it('emits change event on click', () => {
    mount(KTabs, {
      props: {
        tabs: TABS,
      },
    })

    cy.get('.tab-item').eq(1).click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
      cy.wrap(Cypress.vueWrapper.emitted('change')[0][0]).should('eq', '#movies')
    })
  })

  it('hides the panel content when `hidePanels` is true', () => {
    const picturesSlot = 'I love pictures'
    const moviesSlot = 'I love pictures'
    const booksSlot = 'I love pictures'

    mount(KTabs, {
      props: {
        tabs: TABS,
        hidePanels: true,
      },
      slots: {
        pictures: h('div', {}, picturesSlot),
        movies: h('div', {}, moviesSlot),
        books: h('div', {}, booksSlot),
      },
    })

    cy.get('.tab-item').eq(0).click().then(() => {
      cy.get('#panel-0').should('not.exist')
      cy.get('.tab-container').should('not.exist')
    })
    cy.get('.tab-item').eq(1).click().then(() => {
      cy.get('#panel-1').should('not.exist')
      cy.get('.tab-container').should('not.exist')
    })
    cy.get('.tab-item').eq(2).click().then(() => {
      cy.get('#panel-2').should('not.exist')
      cy.get('.tab-container').should('not.exist')
    })
  })

  describe('slots', () => {
    it('provides the #hash slot content', () => {
      const picturesSlot = 'I love pictures'
      const moviesSlot = 'I love pictures'
      const booksSlot = 'I love pictures'

      mount(KTabs, {
        props: {
          tabs: TABS,
        },
        slots: {
          pictures: h('div', {}, picturesSlot),
          movies: h('div', {}, moviesSlot),
          books: h('div', {}, booksSlot),
        },
      })

      cy.get('.tab-item').eq(0).click().then(() => {
        cy.get('#panel-0').should('contain.text', picturesSlot)
      })
      cy.get('.tab-item').eq(1).click().then(() => {
        cy.get('#panel-1').should('contain.text', moviesSlot)
      })
      cy.get('.tab-item').eq(2).click().then(() => {
        cy.get('#panel-2').should('contain.text', booksSlot)
      })
    })

    it('provides the anchor slot content', () => {
      const picturesSlot = 'I love pictures'
      const moviesSlot = 'I love pictures'
      const booksSlot = 'I love pictures'

      mount(KTabs, {
        props: {
          tabs: TABS,
        },
        slots: {
          'pictures-anchor': h('div', {}, picturesSlot),
          'movies-anchor': h('div', {}, moviesSlot),
          'books-anchor': h('div', {}, booksSlot),
        },
      })

      cy.get('#pictures-tab .tab-link').should('contain.text', picturesSlot)
      cy.get('#movies-tab .tab-link').should('contain.text', moviesSlot)
      cy.get('#books-tab .tab-link').should('contain.text', booksSlot)
    })
  })
})
