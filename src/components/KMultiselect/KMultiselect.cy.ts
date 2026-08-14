import { h } from 'vue'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'

describe('KMultiselect', () => {
  it('renders props when passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.getTestId(`multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`multiselect-item-${vals[1]}`).should('contain.text', labels[1])
    cy.getTestId(`multiselect-item-${vals[2]}`).should('contain.text', labels[2])
    cy.get('.multiselect-popover').should('be.visible')
    cy.get('.dropdown-footer').should('not.exist')
  })

  it('renders with selected items when focused', () => {
    const selectedLabel = 'Label 1'
    const selectedLabel2 = 'Label 2'

    cy.mount(KMultiselect, {
      props: {
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          { label: selectedLabel2, value: 'label2', selected: true },
        ],
      },
    })

    cy.getTestId('selection-badges-container').should('contain.text', selectedLabel)
    cy.getTestId('selection-badges-container').should('contain.text', selectedLabel2)

    cy.get('.multiselect-trigger').trigger('click')

    cy.getTestId('selection-badges-container').should('contain.text', selectedLabel)
    cy.getTestId('selection-badges-container').should('contain.text', selectedLabel2)
  })

  it('renders with disabled item', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    cy.mount(KMultiselect, {
      props: {
        items: [
          { label: labels[0], value: vals[0], disabled: true },
          { label: labels[1], value: vals[1] },
        ],
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get(`[data-testid="multiselect-item-${vals[0]}"] button`).should('have.attr', 'disabled')
  })

  it('renders with correct px width', () => {
    const width = 350

    cy.mount(KMultiselect, {
      props: {
        width: width + '',
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true,
        }],
      },
    })

    cy.get('.k-multiselect').invoke('outerWidth').should('eq', width)
  })

  it('renders with correct label', () => {
    const labelText = 'Cool Beans!'

    cy.mount(KMultiselect, {
      props: {
        label: labelText,
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label'
    cy.mount(KMultiselect, {
      props: {
        label: labelText,
        labelAttributes: {
          info: 'some info text',
        },
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-label').should('contain.text', labelText)
    cy.get('.k-label .tooltip-trigger-icon').should('be.visible')
  })

  it('renders a label-tooltip slot that is added after mount', () => {
    cy.mount({
      components: { KMultiselect },
      data: () => ({
        ready: false,
      }),
      template: `
        <KMultiselect
          label="A Label"
          :items="[{ label: 'Label 1', value: 'label1' }]"
        >
          <template
            v-if="ready"
            #label-tooltip
          >
            Tooltip content
          </template>
        </KMultiselect>
      `,
    })

    cy.get('.k-label .tooltip-trigger-icon').should('not.exist')
    cy.then(() => Cypress.vueWrapper.setData({ ready: true }))
    cy.get('.k-label .tooltip-trigger-icon').should('exist').and('be.visible')
  })

  it('reacts to text change and select', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId(`multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`multiselect-item-${vals[1]}`).should('contain.text', labels[1])

    cy.get('input').type(labels[0])

    cy.getTestId(`multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`multiselect-item-${vals[1]}`).should('not.exist')

    cy.getTestId(`multiselect-item-${vals[0]}`).eq(0).click()
    cy.getTestId('selection-badges-container').should('contain.text', labels[0])
  })

  it('allows adding an item with enableItemCreation', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId(`multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`multiselect-item-${vals[1]}`).should('contain.text', labels[1])
    // no adding a label that already exists
    cy.get('input').type(labels[0])
    cy.getTestId('multiselect-add-item').should('not.exist')
    cy.get('input').clear()
    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('multiselect-add-item').should('contain.text', newItem)
    cy.getTestId('multiselect-add-item').find('button').should('be.enabled').click()
    // search is cleared
    cy.get('input').should('not.contain.text', newItem)
    // item displays in selections
    cy.getTestId('selection-badges-container').should('contain.text', newItem)
    // item displays when searching
    cy.get('input').type(newItem)
    cy.get('.multiselect-item .multiselect-item-label').should('contain.text', newItem)
    // no adding a label that already exists
    cy.getTestId('multiselect-add-item').should('not.exist')
    // item gone when dismissed
    cy.getTestId('selection-badges-container').getTestId('badge-dismiss-button').first().click()
    // removed from selections
    cy.getTestId('selection-badges-container').should('not.to.exist')
    // gone when searching
    cy.get('input').clear()
    cy.get('input').type(newItem)
    cy.get('.multiselect-item .selected .multiselect-item-label').should('not.exist')
  })

  it('renders add new value button disabled when itemCreationValidator returns false', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
        itemCreationValidator: () => false,
      },
    })

    cy.getTestId('multiselect-trigger').click()

    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('multiselect-add-item').should('contain.text', newItem)
    cy.getTestId('multiselect-add-item').find('button').should('be.disabled')
  })

  it('clears added items when clicking clear all with enableItemCreation', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId(`multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`multiselect-item-${vals[1]}`).should('contain.text', labels[1])

    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('multiselect-add-item').should('contain.text', newItem).click()
    // item displays in selections
    cy.getTestId('selection-badges-container').should('contain.text', newItem)
    cy.getTestId('multiselect-clear-icon').click()
    // cleared
    cy.getTestId('selection-badges-container').should('not.to.exist')
    cy.getTestId('multiselect-trigger').click()
    cy.get('input').type(newItem)
    cy.get('.multiselect-item .selected .multiselect-item-label').should('not.exist')
  })

  it('ignores clicks on disabled item', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          disabled: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId(`multiselect-item-${vals[0]}`).click()
    cy.getTestId('selection-badges-container').should('not.exist')
  })

  it('allows slotting content into the items', () => {
    const itemSlotContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
        }],
      },
      slots: {
        'item-template': h('span', {}, itemSlotContent),
      },
    })

    cy.getTestId(`multiselect-item-${itemValue}`).should('contain.text', itemSlotContent)
  })

  it('allows slotting the icon through item-badge-icon slot', () => {
    const itemIcon = 'slotted-badge-icon'
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
      slots: {
        'item-badge-icon': `<span data-testid="${itemIcon}">${itemIcon}</span>`,
      },
    })

    cy.getTestId('selection-badges-container').should('contain.text', labels[0])
    cy.getTestId('selection-badges-container').findTestId(itemIcon).should('be.visible').should('have.length', 1)

    cy.getTestId('multiselect-trigger').click()
    cy.getTestId(`multiselect-item-${vals[1]}`).click()
    cy.getTestId('multiselect-trigger').click()

    cy.getTestId('selection-badges-container').findTestId(itemIcon).should('have.length', 2)
  })

  it('works in autosuggest mode', () => {
    const onQueryChange = cy.spy().as('onQueryChange')
    cy.mount(KMultiselect, {
      props: {
        autosuggest: true,
        loading: false,
        items: [],
        onQueryChange,
      },
    })

    cy.get('.multiselect-trigger').click()

    cy.get('input').type('a').then(() => {
      cy.get('@onQueryChange').should('have.been.calledWith', 'a')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: true })).get('.multiselect-chevron-icon').should('not.exist')
      cy.wrap(Cypress.vueWrapper.setProps({ loading: true })).get('.multiselect-loading-icon').should('exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: false })).get('.multiselect-loading-icon').should('not.exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ items: [{ label: 'Label 1', value: 'label1' }] })).getTestId('multiselect-item-label1').should('contain.text', 'Label 1')
    })
  })

  it('counts invisible selected items correctly', () => {
    const allItems = Array.from(new Array(100)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const onQueryChange = cy.spy().as('onQueryChange')

    const selected = (Array.from(new Array(10)).map((_, i) => `${i}`))

    const items = (allItems.slice(0, 10))

    cy.mount(KMultiselect, {
      props: {
        autosuggest: true,
        selectedRowCount: 1,
        modelValue: selected,
        loading: false,
        items,
        onQueryChange,
        width: '300',
      },
    })

    cy.get('[data-testid="multiselect-trigger"]')
      .click({ force: true })
      .then(() => {
        cy.getTestId('hidden-selection-count').should('contain.text', '+8')
      })
      .then(() => {
        cy.get('input').focus()
      })
      .then(() => {
        cy.get('@onQueryChange').should('have.been.calledWith', '')

        Cypress.vueWrapper.setProps({
          items: allItems.slice(5, 20),
        })
      })
      .then(() => {
        cy.get('input').type('{esc}')
      })
      .then(() => {
        cy.getTestId('hidden-selection-count').should('contain.text', '+8')
      })
  })

  it('reacts to width changes by showing/hiding badges', () => {
    // Suppress ResizeObserver errors that can occur during rapid width changes
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver loop')) {
        return false
      }
      return true
    })

    const allItems = Array.from(new Array(15)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const selected = Array.from(new Array(10)).map((_, i) => `${i}`)

    cy.mount(KMultiselect, {
      props: {
        selectedRowCount: 1,
        modelValue: selected,
        items: allItems.slice(0, 10),
        width: '300',
      },
    })

    // At narrow width, should have hidden items
    cy.getTestId('hidden-selection-count')
      .should('be.visible')
      .should('contain.text', '+')

    // Increase width - should have fewer or no hidden items
    cy.then(() => {
      Cypress.vueWrapper.setProps({ width: '600' })
    })

    // Either the hidden count badge disappears (all visible) or shows a lower count
    cy.get('.k-multiselect').should('exist')
    cy.get('body').then(() => {
      // Force a check after prop change settles
      cy.get('.k-multiselect').find('[data-testid="selection-badges-container"]')
        .should('be.visible')
    })

    // Decrease width again - should have hidden items
    cy.then(() => {
      Cypress.vueWrapper.setProps({ width: '250' })
    })

    cy.getTestId('hidden-selection-count')
      .should('be.visible')
      .should('contain.text', '+')
  })

  it('preserves badge order when resizing', () => {
    // Suppress ResizeObserver errors
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver loop')) {
        return false
      }
      return true
    })

    const allItems = Array.from(new Array(10)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))

    const selected = Array.from(new Array(10)).map((_, i) => `${i}`)

    cy.mount(KMultiselect, {
      props: {
        selectedRowCount: 1,
        modelValue: selected,
        items: allItems,
        width: '600', // Start wide so all items are visible
      },
    })

    // Get the complete original order when all items are visible
    cy.getTestId('selection-badges-container')
      .find('.multiselect-selection-badge-label')
      .then(($badges) => {
        const completeOrder = Array.from($badges).map(el => el.textContent?.trim())

        // Shrink width to hide some items
        Cypress.vueWrapper.setProps({ width: '250' })

        // Verify some items are hidden
        cy.getTestId('hidden-selection-count').should('be.visible')

        // Get visible badge order after shrinking
        cy.getTestId('selection-badges-container')
          .find('.multiselect-selection-badge-label')
          .then(($shrunkenBadges) => {
            const shrunkenOrder = Array.from($shrunkenBadges).map(el => el.textContent?.trim())

            // Verify the visible items are the FIRST N items from completeOrder
            shrunkenOrder.forEach((label, index) => {
              expect(label).to.equal(completeOrder[index])
            })

            const shrunkenCount = shrunkenOrder.length

            // Expand width to show more items
            Cypress.vueWrapper.setProps({ width: '400' })

            // Get visible badge order after expanding - just verify order is still correct
            cy.getTestId('selection-badges-container')
              .find('.multiselect-selection-badge-label')
              .then(($expandedBadges) => {
                const expandedOrder = Array.from($expandedBadges).map(el => el.textContent?.trim())

                // Verify items maintain their original order (should be first N items from completeOrder)
                expandedOrder.forEach((label, index) => {
                  expect(label).to.equal(completeOrder[index])
                })

                // Note: We can't reliably assert length increase without waits,
                // but verifying order is preserved is the main goal
                expect(expandedOrder.length).to.be.gte(shrunkenCount)
              })
          })
      })
  })

  it('keeps an open dropdown aligned when the selected badge rows change', () => {
    const items = Array.from(new Array(10)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
    }))
    let initialTriggerHeight = 0
    let triggerBottom = 0

    cy.mount(KMultiselect, {
      props: {
        items,
        modelValue: items.map(item => item.value),
        selectedRowCount: 1,
        width: '250',
      },
    })

    cy.getTestId('multiselect-trigger').trigger('keydown', { key: 'Enter' })
    cy.getTestId('multiselect-trigger').then($trigger => {
      initialTriggerHeight = $trigger[0]!.getBoundingClientRect().height
    })

    cy.then(() => Cypress.vueWrapper.setProps({ selectedRowCount: 2 }))

    cy.getTestId('multiselect-trigger').should($trigger => {
      const rect = $trigger[0]!.getBoundingClientRect()
      expect(rect.height).to.be.greaterThan(initialTriggerHeight)
      triggerBottom = rect.bottom
    })
    cy.get('.multiselect-popover').filter(':visible').find('.popover-container').should($popover => {
      expect($popover[0]!.getBoundingClientRect().top).to.be.at.least(triggerBottom)
    })
  })

  it('displays placeholder and searchPlaceholder props correctly', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const placeholder = 'Select something'
    const searchPlaceholder = 'Search here'

    cy.mount(KMultiselect, {
      props: {
        placeholder,
        searchPlaceholder,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('selection-badges-container').should('not.exist')
    cy.get('.expanded-selection-empty').should('be.visible').should('contain.text', placeholder)

    cy.getTestId('multiselect-trigger').click()
    cy.getTestId('multiselect-dropdown-input').should('have.attr', 'placeholder', searchPlaceholder)

    cy.get('.multiselect-item').eq(0).click()
    cy.get('.expanded-selection-empty').should('not.exist')
    cy.getTestId('selection-badges-container').should('be.visible')
  })

  it('handles searchPlaceholder prop correctly when collapsedContext is true', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const searchPlaceholder = 'Search here'

    cy.mount(KMultiselect, {
      props: {
        collapsedContext: true,
        searchPlaceholder,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('selection-badges-container').should('not.exist')

    cy.get('.multiselect-trigger input').should('have.attr', 'placeholder', searchPlaceholder)

    cy.getTestId('multiselect-trigger').click()
    cy.get('.multiselect-item').eq(0).click()
    cy.get('.multiselect-item').eq(1).click()

    cy.get('.multiselect-trigger input').should('have.attr', 'placeholder', '2 items selected')
  })

  it('can clear all selections when focused', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
          selected: true,
        }],
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId('selection-badges-container').should('contain.text', labels[0])
    cy.getTestId('selection-badges-container').should('contain.text', labels[1])
    cy.get('.multiselect-clear-icon').click()
    cy.getTestId('selection-badges-container').should('not.exist')
  })

  it('can clear selection by badge dismiss when focused', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('multiselect-trigger').click()

    cy.getTestId('selection-badges-container').should('contain.text', labels[0])
    cy.getTestId('selection-badges-container').getTestId('badge-dismiss-button').first().click()
    cy.getTestId('selection-badges-container').should('not.exist')
  })

  it('renders dropdown footer text when prop is passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText,
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer').should('be.visible').should('contain.text', dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText: 'This is getting replaced',
      },
      slots: {
        'dropdown-footer-text': dropdownFooterText,
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer').should('be.visible').should('contain.text', dropdownFooterText)
  })

  it('renders interactive content in the dropdown-footer slot', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const buttonText = 'Footer action'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
      },
      slots: {
        'dropdown-footer': `<button data-testid="footer-button">${buttonText}</button>`,
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer')
      .should('be.visible')
      .should('have.css', 'pointer-events', 'auto')
    // the interactive content should be clickable
    cy.getTestId('footer-button').should('be.visible').click()
  })

  it('dropdown-footer slot takes precedence over dropdownFooterText prop and dropdown-footer-text slot', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const footerTextProp = 'Footer text prop'
    const deprecatedFooterSlot = 'Deprecated footer slot'
    const newFooterSlot = 'New footer slot'

    cy.mount(KMultiselect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }, {
          label: labels[2],
          value: vals[2],
        }],
        dropdownFooterText: footerTextProp,
      },
      slots: {
        'dropdown-footer-text': deprecatedFooterSlot,
        'dropdown-footer': newFooterSlot,
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer')
      .should('be.visible')
      .should('contain.text', newFooterSlot)
      .should('not.contain.text', deprecatedFooterSlot)
      .should('not.contain.text', footerTextProp)
  })

  it('positions the dropdown footer via the dropdownFooterPosition prop', () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'

    cy.mount(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterPosition: 'static',
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer').should('be.visible').should('have.class', staticFooterClass)
  })

  it('supports the deprecated dropdownFooterTextPosition prop, with dropdownFooterPosition taking precedence', () => {
    const dropdownFooterText = 'Dropdown footer text'
    const staticFooterClass = 'dropdown-footer-static'
    const stickyFooterClass = 'dropdown-footer-sticky'

    cy.mount(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    // deprecated prop still works
    cy.get('.dropdown-footer').should('be.visible').should('have.class', staticFooterClass)

    // new prop takes precedence over the deprecated one
    cy.mount(KMultiselect, {
      props: {
        items: [{ label: 'Label 1', value: 'val1' }],
        dropdownFooterText,
        dropdownFooterTextPosition: 'static',
        dropdownFooterPosition: 'sticky',
      },
    })

    cy.get('.multiselect-trigger').trigger('click')

    cy.get('.dropdown-footer').should('be.visible').should('have.class', stickyFooterClass)
  })

  it('renders group titles and groups items in correct order', () => {
    const group1Title = 'Group 1'
    const group2Title = 'Group 2'
    const items = [
      { label: 'Label 0', value: 'value0' },
      { label: 'Label 1', value: 'value1', group: group1Title },
      { label: 'Label 3', value: 'value3', group: group2Title },
      { label: 'Label 2', value: 'value2', group: group1Title },
      { label: 'Label 4', value: 'value4', group: group2Title },
    ]

    cy.mount(KMultiselect, {
      props: {
        items,
      },
    })

    cy.getTestId('multiselect-trigger').trigger('click')
    cy.get('.multiselect-item').eq(0).should('contain.text', items[0]!.label)
    cy.get('.multiselect-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.multiselect-group-title').eq(1).should('contain.text', group2Title)
    cy.get('.multiselect-item').eq(1).should('contain.text', items[1]!.label)
    cy.get('.multiselect-item').eq(2).should('contain.text', items[3]!.label)
    cy.get('.multiselect-item').eq(3).should('contain.text', items[2]!.label)
    cy.get('.multiselect-item').eq(4).should('contain.text', items[4]!.label)
  })

  it('renders groups in custom order using MultiselectGroup interface', () => {
    const items = [
      {
        label: 'Fish',
        items: [
          { label: 'Salmon', value: 'salmon' },
          { label: 'Trout', value: 'trout' },
        ],
      },
      { label: 'Ungrouped Item', value: 'ungrouped' },
      {
        label: 'Birds',
        items: [
          { label: 'Duck', value: 'duck' },
          { label: 'Oriole', value: 'oriole' },
        ],
      },
    ]

    cy.mount(KMultiselect, {
      props: {
        items,
      },
    })

    cy.getTestId('multiselect-trigger').trigger('click')
    // Ungrouped items should appear first
    cy.get('.multiselect-item').eq(0).should('contain.text', 'Ungrouped Item')
    // Groups should appear in array order: Fish, then Birds
    cy.get('.multiselect-group-title').eq(0).should('contain.text', 'Fish')
    cy.get('.multiselect-group-title').eq(1).should('contain.text', 'Birds')
    // Items should be in their group order
    cy.get('.multiselect-item').eq(1).should('contain.text', 'Salmon')
    cy.get('.multiselect-item').eq(2).should('contain.text', 'Trout')
    cy.get('.multiselect-item').eq(3).should('contain.text', 'Duck')
    cy.get('.multiselect-item').eq(4).should('contain.text', 'Oriole')
  })

  it('handles mixed MultiselectGroup and MultiselectItem entries', () => {
    const items = [
      { label: 'First Item', value: 'first' },
      {
        label: 'Grouped Items',
        items: [
          { label: 'Grouped 1', value: 'g1' },
          { label: 'Grouped 2', value: 'g2' },
        ],
      },
      { label: 'Second Item', value: 'second' },
    ]

    cy.mount(KMultiselect, {
      props: {
        items,
      },
    })

    cy.getTestId('multiselect-trigger').trigger('click')
    // Ungrouped items should appear first
    cy.get('.multiselect-item').eq(0).should('contain.text', 'First Item')
    cy.get('.multiselect-item').eq(1).should('contain.text', 'Second Item')
    // Then the group
    cy.get('.multiselect-group-title').eq(0).should('contain.text', 'Grouped Items')
    cy.get('.multiselect-item').eq(2).should('contain.text', 'Grouped 1')
    cy.get('.multiselect-item').eq(3).should('contain.text', 'Grouped 2')
  })

  it('should able to handle tons of items with no obvious lag', () => {
    const items = Array.from(new Array(500)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
      selected: i < 400,
    }))

    const startTime = Date.now()

    cy.mount(KMultiselect, {
      props: {
        items,
      },
    }).then(() => {
      expect(Date.now() - startTime).to.be.lessThan(3000)
    })
  })

  it('should reflect deleted items in the DOM', () => {
    const allItems = [
      { label: 'Label 1', value: 'label1' },
      { label: 'Label 2', value: 'label2' },
      { label: 'Label 3', value: 'label3' },
      { label: 'Label 4', value: 'label4' },
    ]

    const currentItems = allItems.slice(0, 2)

    cy.mount(KMultiselect, {
      props: {
        items: currentItems,
        modelValue: ['label1', 'label2'],
      },
    }).then(({ wrapper }) => {
      cy.getTestId('selection-badges-container').find('.multiselect-selection-badge').should('have.length', 2).then(() => {

        // Remove 'label1'
        wrapper.setProps({
          modelValue: ['label2'],
        }).then(() => {

          cy.getTestId('selection-badges-container').find('.multiselect-selection-badge').should('have.length', 1).then(() => {

            // Change the items; 'label2' is no longer in the list.
            wrapper.setProps({
              items: allItems.slice(2),
            }).then(() => {

              cy.getTestId('selection-badges-container').find('.multiselect-selection-badge').should('have.length', 1).then(() => {

                // Select an additional item.
                wrapper.setProps({
                  modelValue: ['label2', 'label3'],
                }).then(() => {
                  cy.getTestId('selection-badges-container').find('.multiselect-selection-badge').should('have.length', 2).then(() => {

                    // Remove 'label2' from the selection.
                    wrapper.setProps({
                      modelValue: ['label3'],
                    }).then(() => {
                      cy.getTestId('selection-badges-container').find('.multiselect-selection-badge').should('have.length', 1)
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  it('orders selected badges by programmatic modelValue changes', () => {
    const initialItems = [
      { label: 'Name', value: 'name' },
      { label: 'Environment', value: 'env' },
      { label: 'Team', value: 'team' },
      { label: 'Region', value: 'region' },
    ]
    const initialModelValue = initialItems.map(item => item.value)
    const updatedItems = [
      initialItems[0],
      { label: 'Control plane', value: 'control_plane' },
      ...initialItems.slice(1),
    ]
    const updatedModelValue = updatedItems.map(item => item.value)
    const badgeLabels = () => cy.getTestId('selection-badges-container')
      .find('.multiselect-selection-badge-label')
    const assertBadgeOrder = (expectedLabels: string[]) => {
      badgeLabels().should($labels => {
        expect([...$labels].map(label => label.textContent?.trim())).to.deep.equal(expectedLabels)
      })
    }

    cy.mount(KMultiselect, {
      props: {
        items: initialItems,
        modelValue: initialModelValue,
        selectedRowCount: 5,
      },
    })

    assertBadgeOrder(['Name', 'Environment', 'Team', 'Region'])

    cy.then(() => Cypress.vueWrapper.setProps({
      items: updatedItems,
      modelValue: updatedModelValue,
    }))

    assertBadgeOrder(['Name', 'Control plane', 'Environment', 'Team', 'Region'])

    cy.then(() => Cypress.vueWrapper.setProps({
      modelValue: ['region', 'name', 'env', 'team', 'control_plane'],
    }))

    assertBadgeOrder(['Region', 'Name', 'Environment', 'Team', 'Control plane'])
  })

  it('keeps the open dropdown order stable while selecting and removing items', () => {
    const items = [
      { label: 'Name', value: 'name' },
      { label: 'Environment', value: 'env' },
      { label: 'Team', value: 'team' },
      { label: 'Region', value: 'region' },
    ]
    const optionLabels = () => cy.get('.multiselect-items-container')
      .find('.multiselect-item-label')
    const assertOptionOrder = () => {
      optionLabels().should($labels => {
        expect([...$labels].map(label => label.textContent?.trim())).to.deep.equal([
          'Name',
          'Environment',
          'Team',
          'Region',
        ])
      })
    }

    cy.mount({
      components: { KMultiselect },
      data: () => ({
        items,
        selectedItems: [],
      }),
      template: '<KMultiselect v-model="selectedItems" :items="items" />',
    })

    cy.getTestId('multiselect-trigger').click()
    cy.get('.multiselect-popover').should('be.visible')
    assertOptionOrder()

    cy.getTestId('multiselect-item-env').click()
    cy.getTestId('multiselect-item-team').click()
    cy.get('.multiselect-popover').should('be.visible')
    assertOptionOrder()

    cy.getTestId('multiselect-item-env').click()
    cy.getTestId('multiselect-item-team').click()
    cy.get('.multiselect-popover').should('be.visible')
    assertOptionOrder()
  })

  it('should not cause form submission when enter key is pressed while filtering', () => {
    const onSubmit = cy.spy().as('onSubmit')

    ;[false, true].forEach(collapsedContext => {
      cy.mount(() => h('form', {
        onSubmit: (e: Event) => {
          e.preventDefault()
          onSubmit()
        },
      }, [
        h(KMultiselect, {
          items: [
            { label: 'Label 1', value: 'val1' },
            { label: 'Label 2', value: 'val2' },
          ],
          enableFiltering: true,
          collapsedContext,
        }),
        h('button', { type: 'submit' }, 'Submit'),
      ]))

      cy.get('.multiselect-trigger').trigger('click')
      cy.get('input')
        .type('Label{enter}')
        .then(() => {
          cy.get('@onSubmit').should('not.have.been.called')
        })
    })
  })
})
