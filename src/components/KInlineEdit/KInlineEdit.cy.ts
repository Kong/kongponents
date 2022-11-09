import { mount } from 'cypress/vue'
import { h } from 'vue'
import KInlineEdit from '@/components/KInlineEdit/KInlineEdit.vue'

describe('KInlineEdit', () => {
  it('copies element css to input on click', () => {
    mount(KInlineEdit, {
      slots: {
        default: () => h('p', { style: { padding: '10px' } }, 'text'),
      },
    })

    cy.get('p').click()
    cy.get('.k-input').should('have.css', 'padding').and('match', /10px/)
  })

  it('applies style overrides when prop passed', () => {
    mount(KInlineEdit, {
      props: {
        styleOverrides: { color: 'red' },
      },
      slots: {
        default: () => h('p', { style: { color: 'black' } }, 'text'),
      },
    })

    cy.get('p').click()
    cy.get('.k-input').should('have.attr', 'style').and('match', /color: red/)
  })

  it('does not pass in initial value when prop passed', () => {
    mount(KInlineEdit, {
      props: {
        ignoreValue: true,
      },
      slots: {
        default: () => h('p', {}, 'text'),
      },
    })

    cy.get('p').click()
    cy.get('.k-input').should('have.value', '')
  })

  it('emits updated text on blur', () => {
    const string1 = 'Hello'
    const string2 = ' world!'
    mount(KInlineEdit, {
      slots: {
        default: () => h('p', {}, string1),
      },
    })

    cy.get('p').click()
    cy.get('.k-input').type(string2)
    cy.get('.k-input').blur().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'changed')
      cy.wrap(Cypress.vueWrapper.emitted('changed')[0][0]).should('eq', string1 + string2)
    })
  })
})
