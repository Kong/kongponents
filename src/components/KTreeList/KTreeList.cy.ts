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

  it('all items should be collapsed if `initialCollapseAll` prop set to `true`', () => {
    const patentIds = ['id1', 'id2']

    cy.mount(KTreeList, {
      props: {
        items: [
          {
            id: patentIds[0],
            name: 'Name 1',
            children: [
              {
                id: 'child-1-id1',
                name: 'Child 1',
              },
              {
                id: 'child-2-id1',
                name: 'Child 2',
              },
            ],
          },
          {
            id: patentIds[1],
            name: 'Name 2',
            children: [
              {
                id: 'child-3-id2',
                name: 'Child 3',
              },
              {
                id: 'child-4-id2',
                name: 'Child 4',
              },
            ],
          },
        ],
        collapsible: true,
        initialCollapseAll: true,
      },
    })

    patentIds.forEach((id: string) => {
      cy.getTestId(`tree-item-${id}`).should('be.visible')
      cy.getTestId(`tree-item-${id}`).should('have.class', 'collapsed')
      cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${id}"] + .tree-draggable`).should('not.be.visible')
    })
  })

  it('`initialCollapseAll` prop should be ignored if `collapsible` prop is not set to `true`', () => {
    const patentIds = ['id1', 'id2']

    cy.mount(KTreeList, {
      props: {
        items: [
          {
            id: patentIds[0],
            name: 'Name 1',
            children: [
              {
                id: 'child-1-id1',
                name: 'Child 1',
              },
              {
                id: 'child-2-id1',
                name: 'Child 2',
              },
            ],
          },
          {
            id: patentIds[1],
            name: 'Name 2',
            children: [
              {
                id: 'child-3-id2',
                name: 'Child 3',
              },
              {
                id: 'child-4-id2',
                name: 'Child 4',
              },
            ],
          },
        ],
        collapsible: false,
        initialCollapseAll: true,
      },
    })

    patentIds.forEach((id: string) => {
      cy.getTestId(`tree-item-${id}`).should('be.visible')
      cy.getTestId(`tree-item-${id}`).should('not.have.class', 'collapsed')
      cy.getTestId(`tree-item-${id}`).should('not.have.class', 'expanded')
      cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${id}"] + .tree-draggable`).should('be.visible')
    })
  })

  it('Children list should be collapsed onclick a caret item', () => {
    const patentIds = ['id1', 'id2']

    cy.mount(KTreeList, {
      props: {
        items: [
          {
            id: patentIds[0],
            name: 'Name 1',
            children: [
              {
                id: 'child-1-id1',
                name: 'Child 1',
              },
              {
                id: 'child-2-id1',
                name: 'Child 2',
              },
            ],
          },
          {
            id: patentIds[1],
            name: 'Name 2',
            children: [
              {
                id: 'child-3-id2',
                name: 'Child 3',
              },
              {
                id: 'child-4-id2',
                name: 'Child 4',
              },
            ],
          },
        ],
        collapsible: true,
      },
    })

    cy.getTestId(`tree-item-${patentIds[0]}`).should('be.visible')
    cy.getTestId(`tree-item-${patentIds[0]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[0]}"] + .tree-draggable`).should('be.visible')

    cy.getTestId(`tree-item-wrapper-${patentIds[0]}`).findTestId('tree-item-expanded-button').trigger('click')

    // Check collapsed item
    cy.getTestId(`tree-item-${patentIds[0]}`).should('have.class', 'collapsed')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[0]}"] + .tree-draggable`).should('not.be.visible')

    // Check expanded item
    cy.getTestId(`tree-item-${patentIds[1]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[1]}"] + .tree-draggable`).should('be.visible')
  })

  it('Next level list should not be affected of collapsing/expanding a parent', () => {
    const patentIds = ['id1', 'id2']
    const childIds = ['child-2-id1']

    cy.mount(KTreeList, {
      props: {
        items: [
          {
            id: patentIds[0],
            name: 'Name 1',
            children: [
              {
                id: 'child-1-id1',
                name: 'Child 1',
              },
              {
                id: childIds[0],
                name: 'Child 2',
                children: [
                  {
                    id: 'subchild-1-2-id1',
                    name: 'Subchild 1',
                  },
                  {
                    id: 'subchild-2-2-id1',
                    name: 'Subchild 2',
                  },
                ],
              },
            ],
          },
          {
            id: patentIds[1],
            name: 'Name 2',
            children: [
              {
                id: 'child-3-id2',
                name: 'Child 3',
              },
              {
                id: 'child-4-id2',
                name: 'Child 4',
              },
            ],
          },
        ],
        collapsible: true,
      },
    })

    cy.getTestId(`tree-item-${patentIds[0]}`).should('be.visible')
    cy.getTestId(`tree-item-${patentIds[0]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[0]}"] + .tree-draggable`).should('be.visible')

    cy.getTestId(`tree-item-${childIds[0]}`).should('be.visible')
    cy.getTestId(`tree-item-${childIds[0]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${childIds[0]}"] + .tree-draggable`).should('be.visible')

    cy.getTestId(`tree-item-wrapper-${patentIds[0]}`).findTestId('tree-item-expanded-button').trigger('click')

    // Check collapsed item
    cy.getTestId(`tree-item-${patentIds[0]}`).should('have.class', 'collapsed')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[0]}"] + .tree-draggable`).should('not.be.visible')

    cy.getTestId(`tree-item-wrapper-${patentIds[0]}`).findTestId('tree-item-expanded-button').trigger('click')

    // Check if parent and child items are expanded
    cy.getTestId(`tree-item-${patentIds[0]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${patentIds[0]}"] + .tree-draggable`).should('be.visible')

    cy.getTestId(`tree-item-${childIds[0]}`).should('have.class', 'expanded')
    cy.getTestId('k-tree-list').find(`[data-testid="tree-item-wrapper-${childIds[0]}"] + .tree-draggable`).should('be.visible')
  })

  it('Caret icon should not exist if `collapsible` prop is set to `false`', () => {
    cy.mount(KTreeList, {
      props: {
        items: [
          {
            id: 'id1',
            name: 'Name 1',
            children: [
              {
                id: 'child-1-id1',
                name: 'Child 1',
              },
              {
                id: 'child-2-id1',
                name: 'Child 2',
              },
            ],
          },
        ],
        collapsible: false,
      },
    })

    cy.getTestId('tree-item-id1').findTestId('tree-item-expanded-button').should('not.exist')
  })
})
