import KTreeList from '@/components/KTreeList/KTreeList.vue'
import { h } from 'vue'

describe('KTreeList', () => {
  it('renders items when passed as prop', () => {
    const names = ['Name 1', 'Name 2', 'Name 3']
    const ids = ['name-id1', 'name-id2', 'name-id3']

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
        }, {
          name: names[1],
          id: ids[1],
        }, {
          name: names[2],
          id: ids[2],
        }],
      },
    })

    cy.get(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`).should('contain.text', names[0])
    cy.get(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`).should('contain.text', names[1])
    cy.get(`[data-testid="tree-item-${ids[2]}"] [data-testid="tree-item-label"]`).should('contain.text', names[2])
  })

  it('renders with correct px maxWidth', () => {
    const width = 350

    cy.mount(KTreeList, {
      props: {
        width: width + '',
        items: [{
          name: 'Name 1',
          id: 'name-id1',
          selected: true,
        }],
      },
    })

    cy.get('.k-tree-list').invoke('outerWidth').should('eq', width)
  })

  it('renders with selected item', () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
        }, {
          name: names[1],
          id: ids[1],
        }],
      },
    })

    cy.get(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`).should('contain.text', names[0])
    cy.get(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`).should('contain.text', names[1])

    cy.getTestId(`tree-item-${ids[0]}`).click()
    cy.get(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`).should('contain.text', names[0])
  })

  it('correctly renders with disableDrag', () => {
    cy.mount(KTreeList, {
      props: {
        items: [{ name: 'Name 1', id: 'name-id1' }],
        disableDrag: true,
      },
    })

    cy.get('.tree-draggable').should('have.attr', 'disabled')
    cy.get('.tree-item').should('have.class', 'not-draggable')
  })

  it('allows selecting an item with disableDrag', () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
        }, {
          name: names[1],
          id: ids[1],
        }],
        disableDrag: true,
      },
    })

    cy.get('.tree-draggable').should('have.attr', 'disabled')
    cy.get('.tree-item').should('have.class', 'not-draggable')

    cy.get(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`).should('contain.text', names[0])
    cy.get(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`).should('contain.text', names[1])

    cy.getTestId(`tree-item-${ids[0]}`).click()
    cy.get(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`).should('contain.text', names[0])
  })

  it('reacts to selecting an item and deselects previous selection', () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
          selected: true,
        }, {
          name: names[1],
          id: ids[1],
        }],
      },
    })

    cy.get(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`).should('contain.text', names[0])
    cy.get(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`).should('contain.text', names[1])
    cy.get(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`).should('contain.text', names[0])

    cy.getTestId(`tree-item-${ids[1]}`).click()
    cy.get(`[data-testid="tree-item-${ids[0]}"].selected`).should('not.exist')
    cy.get(`[data-testid="tree-item-${ids[1]}"].selected [data-testid="tree-item-label"]`).should('contain.text', names[1])
  })

  it('allows slotting content into the items', () => {
    const itemName = 'Name 1'
    const itemId = 'name-id1'
    const itemIconSlot = '🐰'

    cy.mount(KTreeList, {
      props: {
        appearance: 'button',
        items: [{
          name: itemName,
          id: itemId,
        }],
      },
      slots: {
        'item-icon': h('span', {}, itemIconSlot),
        'item-label': `<template #item-label="params">
            Hello {{ params.item.name }}
            </template>
          `,
      },
    })

    cy.get(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-icon"]`).should('contain.text', itemIconSlot)
    cy.get(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-label"]`).should('contain.text', 'Hello ' + itemName)
  })

  it('handles group prop correctly when not provided', () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
        }, {
          name: names[1],
          id: ids[1],
        }],
      },
    })

    cy.getTestId('k-tree-list').findTestId('k-tree-list-k-tree-list').should('be.visible')
  })

  it('handles group prop correctly when provided', () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']
    const group = 'i-stand-alone'

    cy.mount(KTreeList, {
      props: {
        items: [{
          name: names[0],
          id: ids[0],
        }, {
          name: names[1],
          id: ids[1],
        }],
        group,
      },
    })

    cy.getTestId('k-tree-list').findTestId(`k-tree-list-${group}`).should('be.visible')
  })
})
