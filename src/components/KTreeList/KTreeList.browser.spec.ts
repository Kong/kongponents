import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { render } from 'vitest-browser-vue'
import KTreeList from '@/components/KTreeList/KTreeList.vue'

// SortableJS listens to pointer events, except in Safari-family browsers where it listens to mouse events,
// so dispatch both to make sure a drag starts everywhere
const dispatchPointer = (target: Element | Document, type: 'down' | 'move', x: number, y: number): void => {
  const init = { bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, button: 0, buttons: 1 }
  target.dispatchEvent(new PointerEvent(`pointer${type}`, { ...init, pointerId: 1, pointerType: 'mouse', isPrimary: true }))
  target.dispatchEvent(new MouseEvent(`mouse${type}`, init))
}

describe('KTreeList', () => {
  it('renders items when passed as prop', async () => {
    const names = ['Name 1', 'Name 2', 'Name 3']
    const ids = ['name-id1', 'name-id2', 'name-id3']

    await render(KTreeList, {
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

    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[1])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[2]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[2])
  })

  it('renders with correct px maxWidth', async () => {
    const width = 350

    await render(KTreeList, {
      props: {
        width: width + '',
        items: [{
          name: 'Name 1',
          id: 'name-id1',
          selected: true,
        }],
      },
    })

    await expect.poll(() => page.getByCSS('.k-tree-list').element().getBoundingClientRect().width).toBe(width)
  })

  it('renders with selected item', async () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    await render(KTreeList, {
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

    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[1])

    await page.getByTestId(`tree-item-${ids[0]}`).click()
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
  })

  it('correctly renders with disableDrag', async () => {
    await render(KTreeList, {
      props: {
        items: [{ name: 'Name 1', id: 'name-id1' }],
        disableDrag: true,
      },
    })

    await expect.element(page.getByCSS('.k-tree-list > .tree-draggable')).toHaveAttribute('disabled')
    await expect.element(page.getByCSS('.tree-item')).toHaveClass('not-draggable')
  })

  it('allows selecting an item with disableDrag', async () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    await render(KTreeList, {
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

    await expect.element(page.getByCSS('.k-tree-list > .tree-draggable')).toHaveAttribute('disabled')
    await expect.element(page.getByCSS('.tree-item').first()).toHaveClass('not-draggable')

    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[1])

    await page.getByTestId(`tree-item-${ids[0]}`).click()
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
  })

  it('reacts to selecting an item and deselects previous selection', async () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    await render(KTreeList, {
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

    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[1]}"] [data-testid="tree-item-label"]`)).toHaveTextContent(names[1])
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"].selected [data-testid="tree-item-label"]`)).toHaveTextContent(names[0])

    await page.getByTestId(`tree-item-${ids[1]}`).click()
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[0]}"].selected`)).not.toBeInTheDocument()
    await expect.element(page.getByCSS(`[data-testid="tree-item-${ids[1]}"].selected [data-testid="tree-item-label"]`)).toHaveTextContent(names[1])
  })

  it('allows slotting content into the items', async () => {
    const itemName = 'Name 1'
    const itemId = 'name-id1'
    const itemIconSlot = '🐰'

    await render(KTreeList, {
      props: {
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

    await expect.element(page.getByCSS(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-icon"]`)).toHaveTextContent(itemIconSlot)
    await expect.element(page.getByCSS(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-label"]`)).toHaveTextContent('Hello ' + itemName)
  })

  it('renders an item-icon slot that is added after mount when hideIcons is true', async () => {
    const itemName = 'Name 1'
    const itemId = 'name-id1'

    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KTreeList,
        {
          hideIcons: true,
          items: [{ name: itemName, id: itemId }],
        },
        ready.value ? { 'item-icon': () => h('span', { 'data-testid': 'slotted-icon' }, '🐰') } : {},
      ),
    }))

    await expect.element(page.getByCSS(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-icon"]`)).not.toBeInTheDocument()
    ready.value = true
    await expect.element(page.getByCSS(`[data-testid="tree-item-${itemId}"] [data-testid="tree-item-icon"]`)).toBeInTheDocument()
    await expect.element(page.getByTestId('slotted-icon')).toBeVisible()
  })

  it('handles group prop correctly when not provided', async () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']

    await render(KTreeList, {
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

    await expect.element(page.getByTestId('k-tree-list').getByTestId('k-tree-list-k-tree-list')).toBeVisible()
  })

  it('handles group prop correctly when provided', async () => {
    const names = ['Name 1', 'Name 2']
    const ids = ['name-id1', 'name-id2']
    const group = 'i-stand-alone'

    await render(KTreeList, {
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

    await expect.element(page.getByTestId('k-tree-list').getByTestId(`k-tree-list-${group}`)).toBeVisible()
  })

  it('all items should be collapsed if `initialCollapseAll` prop set to `true`', async () => {
    const parentIds = ['id1', 'id2']

    await render(KTreeList, {
      props: {
        items: [
          {
            id: parentIds[0],
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
            id: parentIds[1],
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

    for (const id of parentIds) {
      await expect.element(page.getByTestId(`tree-item-${id}`)).toBeVisible()
      await expect.element(page.getByTestId(`tree-item-${id}`)).toHaveClass('collapsed')
      await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${id}"] + .tree-draggable`)).not.toBeVisible()
    }
  })

  it('`initialCollapseAll` prop should be ignored if `collapsible` prop is not set to `true`', async () => {
    const parentIds = ['id1', 'id2']

    await render(KTreeList, {
      props: {
        items: [
          {
            id: parentIds[0],
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
            id: parentIds[1],
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

    for (const id of parentIds) {
      await expect.element(page.getByTestId(`tree-item-${id}`)).toBeVisible()
      await expect.element(page.getByTestId(`tree-item-${id}`)).not.toHaveClass('collapsed')
      await expect.element(page.getByTestId(`tree-item-${id}`)).not.toHaveClass('expanded')
      await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${id}"] + .tree-draggable`)).toBeVisible()
    }
  })

  it('Children list should be collapsed onclick a caret item', async () => {
    const parentIds = ['id1', 'id2']

    await render(KTreeList, {
      props: {
        items: [
          {
            id: parentIds[0],
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
            id: parentIds[1],
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

    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toBeVisible()
    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[0]}"] + .tree-draggable`)).toBeVisible()

    await page.getByTestId(`tree-item-wrapper-${parentIds[0]}`).getByTestId('tree-item-expanded-button').click()

    // Check collapsed item
    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toHaveClass('collapsed')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[0]}"] + .tree-draggable`)).not.toBeVisible()

    // Check expanded item
    await expect.element(page.getByTestId(`tree-item-${parentIds[1]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[1]}"] + .tree-draggable`)).toBeVisible()
  })

  it('Next level list should not be affected of collapsing/expanding a parent', async () => {
    const parentIds = ['id1', 'id2']
    const childIds = ['child-2-id1']

    await render(KTreeList, {
      props: {
        items: [
          {
            id: parentIds[0],
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
            id: parentIds[1],
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

    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toBeVisible()
    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[0]}"] + .tree-draggable`)).toBeVisible()

    await expect.element(page.getByTestId(`tree-item-${childIds[0]}`)).toBeVisible()
    await expect.element(page.getByTestId(`tree-item-${childIds[0]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${childIds[0]}"] + .tree-draggable`)).toBeVisible()

    await page.getByTestId(`tree-item-wrapper-${parentIds[0]}`).getByTestId('tree-item-expanded-button').click()

    // Check collapsed item
    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toHaveClass('collapsed')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[0]}"] + .tree-draggable`)).not.toBeVisible()

    await page.getByTestId(`tree-item-wrapper-${parentIds[0]}`).getByTestId('tree-item-expanded-button').click()

    // Check if parent and child items are expanded
    await expect.element(page.getByTestId(`tree-item-${parentIds[0]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${parentIds[0]}"] + .tree-draggable`)).toBeVisible()

    await expect.element(page.getByTestId(`tree-item-${childIds[0]}`)).toHaveClass('expanded')
    await expect.element(page.getByTestId('k-tree-list').getByCSS(`[data-testid="tree-item-wrapper-${childIds[0]}"] + .tree-draggable`)).toBeVisible()
  })

  it('Caret icon should not exist if `collapsible` prop is set to `false`', async () => {
    await render(KTreeList, {
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

    await expect.element(page.getByTestId('tree-item-id1').getByTestId('tree-item-expanded-button')).not.toBeInTheDocument()
  })

  it('does not flip-flop the dragged item when it is dragged across items of different heights', async () => {
    const folder = (id: string, childIds: string[]) => ({
      id,
      name: id,
      children: childIds.map(childId => ({ id: childId, name: childId })),
    })

    await render(KTreeList, {
      props: {
        items: [
          folder('components', ['profile-card']),
          folder('pages', ['home', 'user']),
          folder('user', ['user-list', 'user-detail']),
          folder('settings', ['settings-general']),
          { id: 'symbols', name: 'symbols' },
        ],
      },
    })

    const labelOrder = (): string => Array.from(document.querySelectorAll('.k-tree-list .tree-item-label'))
      .filter(label => !label.closest('.sortable-fallback'))
      .map(label => label.textContent?.trim())
      .join(',')

    const source = page.getByTestId('tree-item-components').element()
    const rect = source.getBoundingClientRect()
    const x = rect.left + 70
    const startY = rect.top + rect.height / 2

    // Move the pointer down monotonically; the order may only ever progress, never return to a previous state
    const seen: string[] = []
    dispatchPointer(source, 'down', x, startY)
    for (let i = 1; i <= 200; i++) {
      dispatchPointer(document, 'move', x, startY + i * 2)
      await new Promise(resolve => setTimeout(resolve, 16))
      const order = labelOrder()
      if (order !== seen[seen.length - 1]) {
        seen.push(order)
      }
    }
    // SortableJS ends a fallback drag on mouseup
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, clientX: x, clientY: startY + 400 }))

    const reversals = seen.filter((order, index) => index >= 2 && order === seen[index - 2]).length
    expect(reversals).toBe(0)

    // make sure the drag really happened, otherwise the check above passes without testing anything
    expect(seen.length).toBeGreaterThan(1)
    expect(seen[seen.length - 1].split(',')[0]).not.toBe('components')
    // the pointer is moved with real timers, which takes a few seconds and is slower on busy CI machines
  }, 20000)

  it('keeps every item after being dragged many times, including between nested lists', async () => {
    await render(KTreeList, {
      props: {
        items: [
          { id: 'components', name: 'components', children: [{ id: 'profile-card', name: 'profile-card' }] },
          {
            id: 'pages',
            name: 'pages',
            children: [
              { id: 'home', name: 'home' },
              {
                id: 'user',
                name: 'user',
                children: [{ id: 'user-list', name: 'user-list' }, { id: 'user-detail', name: 'user-detail' }, { id: 'settings', name: 'settings' }],
              },
            ],
          },
          { id: 'types', name: 'types', children: [{ id: 'user-types', name: 'user-types' }] },
        ],
      },
    })

    const labels = (): string[] => Array.from(document.querySelectorAll('.k-tree-list .tree-item-label'))
      .filter(label => !label.closest('.sortable-fallback'))
      .map(label => label.textContent?.trim() || '')
      .sort()
    const expected = labels()
    expect(expected).toHaveLength(10)

    // deterministic pseudo random numbers, so the sequence of drags is the same on every run
    let seed = 42
    const random = (): number => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }

    // Every drag only reorders or moves items, so the same items must still be rendered after each one
    // (without a stable key, items were dropped after a handful of drags)
    for (let drag = 1; drag <= 16; drag++) {
      const items = Array.from(document.querySelectorAll('.k-tree-list .tree-item'))
      const source = items[Math.floor(random() * items.length)]
      const rect = source.getBoundingClientRect()
      const x = rect.left + 60
      const startY = rect.top + rect.height / 2
      const direction = random() < 0.5 ? 1 : -1

      dispatchPointer(source, 'down', x, startY)
      for (let step = 1; step <= 70; step++) {
        // wander sideways a bit so the item also moves in and out of the nested lists
        dispatchPointer(document, 'move', x + Math.sin(step / 9) * 15, startY + direction * step * 2)
        await new Promise(resolve => setTimeout(resolve, 16))
      }
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, clientX: x, clientY: startY + direction * 140 }))
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(labels(), `items after drag ${drag}`).toEqual(expected)
    }
    // 16 drags with real timers take about 20 seconds
  }, 60000)
})
