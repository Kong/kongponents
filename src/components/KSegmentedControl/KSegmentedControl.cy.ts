import { mount } from 'cypress/vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'

describe('KSegmentedControl', () => {
  it('renders custom button text & appearance', () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    mount(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
    })

    cy.get('.k-segmented-control button').eq(0).should('contain.text', items[0].label)

    cy.get('.k-segmented-control button').eq(1).should('contain.text', items[1].label)
    cy.get('.k-segmented-control button').eq(1).should('have.class', 'selected')
  })

  it('renders slotted button text & appearance', () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    mount(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
      slots: {
        'option-label': `<template #option-label="{ option }">
            Hello {{ option.label }}
            </template>
          `,
      },
    })

    cy.get('.k-segmented-control button').eq(0).should('contain.text', 'Hello ' + items[0].label)

    cy.get('.k-segmented-control button').eq(1).should('contain.text', 'Hello ' + items[1].label)
    cy.get('.k-segmented-control button').eq(1).should('have.class', 'selected')
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

    cy.get('.k-segmented-control button').eq(0).invoke('attr', 'disabled').should('not.exist')
    cy.get('.k-segmented-control button').eq(1).invoke('attr', 'disabled').should('eq', 'disabled')
    cy.get('.k-segmented-control button').eq(2).invoke('attr', 'disabled').should('not.exist')
  })

  it('renders all items disabled when disabled prop is true', () => {
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
          },
          {
            label: 'Three',
            value: 3,
          },
        ],
        modelValue: 1,
        disabled: true,
      },
    })

    cy.get('.k-segmented-control button').eq(0).invoke('attr', 'disabled').should('eq', 'disabled')
    cy.get('.k-segmented-control button').eq(1).invoke('attr', 'disabled').should('eq', 'disabled')
    cy.get('.k-segmented-control button').eq(2).invoke('attr', 'disabled').should('eq', 'disabled')
  })

  it('emits update:modelValue event when an item is clicked', () => {
    const items = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ]

    mount(KSegmentedControl, {
      props: {
        options: items,
        modelValue: items[1].value,
      },
    })

    cy.get('.k-segmented-control button').eq(0).click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'update:modelValue')
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', items[0].value)
    })
  })
})
