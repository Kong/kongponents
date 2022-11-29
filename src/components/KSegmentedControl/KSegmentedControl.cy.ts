import { mount } from 'cypress/vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'

describe('KSegmentedControl', () => {
  it('renders custom button text & appearance', () => {
    mount(KSegmentedControl, {
      props: {
        options: ['I am segment', 'So am I'],
        modelValue: 'So am I',
      },
    })

    cy.get('.segmented-control button').eq(0).should('contain.text', 'I am segment')
    cy.get('.segmented-control button').eq(0).should('have.class', 'outline')

    cy.get('.segmented-control button').eq(1).should('contain.text', 'So am I')
    cy.get('.segmented-control button').eq(1).should('have.class', 'primary')
  })

  it('renders slotted button text & appearance', () => {
    const options = ['I am segment', 'So am I']
    mount(KSegmentedControl, {
      props: {
        options,
        modelValue: options[1],
      },
      slots: {
        'option-label': `<template #item-label="params">
            Hello {{ params.option }}
            </template>
          `,
      },
    })

    cy.get('.segmented-control button').eq(0).should('contain.text', 'Hello ' + options[0])
    cy.get('.segmented-control button').eq(0).should('have.class', 'outline')

    cy.get('.segmented-control button').eq(1).should('contain.text', 'Hello ' + options[1])
    cy.get('.segmented-control button').eq(1).should('have.class', 'primary')
  })

  it('disables an item if option is set to disabled', () => {
    mount(KSegmentedControl, {
      props: {
        options: [
          {
            label: 'One',
            value: 1,
          },
          {
            label: 'Two',
            value: 2,
            disabled: true,
          },
          {
            label: 'Three',
            value: 3,
          },
        ],
        modelValue: 1,
      },
    })

    cy.get('.segmented-control button').eq(0).invoke('attr', 'disabled').should('not.exist')
    cy.get('.segmented-control button').eq(1).invoke('attr', 'disabled').should('eq', 'disabled')
    cy.get('.segmented-control button').eq(2).invoke('attr', 'disabled').should('not.exist')
  })
})
