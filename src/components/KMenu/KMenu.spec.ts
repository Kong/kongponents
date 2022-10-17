import { mount } from 'cypress/vue'
import KMenu from '@/components/KMenu/KMenu.vue'
import type { KMenuItemType } from '@/components/KMenu/KMenu.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */

const getItems = (count: number): KMenuItemType[] => {
  const myItems = []

  for (let i = 0; i < count; i++) {
    myItems.push({
      title: 'Item ' + i,
      type: Math.random() < 0.5 ? 'string' : 'number',
      expandable: Math.random() < 0.5,
      description: "The item's description for number " + i,
    })
  }

  return myItems
}

const customItem = {
  title: 'Item #',
  description: 'Cras aliquet auctor ex ut hendrerit. Donec sagittis est nec aliquet semper. Quisque feugiat metus orci, at ullamcorper odio molestie non. Nam dignissim sed ligula ut commodo.',
  expandable: true,
}

describe('KMenu', () => {
  it('renders proper menu when using props', () => {
    mount(KMenu, {
      props: {
        items: getItems(5),
        testMode: true,
      },
    })

    cy.get('.k-menu').should('be.visible')
    cy.get('.k-menu-item').should('have.length', 5)
  })

  it('shows chevron down icon', () => {
    mount(KMenu, {
      props: {
        items: [customItem],
        testMode: true,
      },
    })

    cy.get('.k-menu').should('be.visible')
    cy.get('.k-menu-item .k-button .span-icon-container').should('be.visible')
  })
})
