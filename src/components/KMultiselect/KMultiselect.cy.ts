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
    cy.get('.multiselect-item').eq(0).should('contain.text', items[0].label)
    cy.get('.multiselect-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.multiselect-group-title').eq(1).should('contain.text', group2Title)
    cy.get('.multiselect-item').eq(1).should('contain.text', items[1].label)
    cy.get('.multiselect-item').eq(2).should('contain.text', items[3].label)
    cy.get('.multiselect-item').eq(3).should('contain.text', items[2].label)
    cy.get('.multiselect-item').eq(4).should('contain.text', items[4].label)
  })

  it('renders groups in custom order when groupComparator is provided', () => {
    const group1Title = 'Series 2'
    const group2Title = 'Series 1'
    const items = [
      { label: 'Service A1', value: 'a1', group: group2Title },
      { label: 'Service A2', value: 'a2', group: group1Title },
      { label: 'Service B1', value: 'b1', group: group2Title },
      { label: 'Service B2', value: 'b2', group: group1Title },
    ]

    // Custom comparator to reverse alphabetical order (Series 2 should come before Series 1)
    const customComparator = (a: string, b: string) => {
      const order = ['Series 2', 'Series 1']
      return order.indexOf(a) - order.indexOf(b)
    }

    cy.mount(KMultiselect, {
      props: {
        items,
        groupComparator: customComparator,
      },
    })

    cy.getTestId('multiselect-trigger').trigger('click')
    // Series 2 group should appear first (instead of Series 1 alphabetically)
    cy.get('.multiselect-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.multiselect-group-title').eq(1).should('contain.text', group2Title)
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
      cy.getTestId('selection-badges-container').children().should('have.length', 2).then(() => {

        // Remove 'label1'
        wrapper.setProps({
          modelValue: ['label2'],
        }).then(() => {

          cy.getTestId('selection-badges-container').children().should('have.length', 1).then(() => {

            // Change the items; 'label2' is no longer in the list.
            wrapper.setProps({
              items: allItems.slice(2),
            }).then(() => {

              cy.getTestId('selection-badges-container').children().should('have.length', 1).then(() => {

                // Select an additional item.
                wrapper.setProps({
                  modelValue: ['label2', 'label3'],
                }).then(() => {
                  cy.getTestId('selection-badges-container').children().should('have.length', 2).then(() => {

                    // Remove 'label2' from the selection.
                    wrapper.setProps({
                      modelValue: ['label3'],
                    }).then(() => {
                      cy.getTestId('selection-badges-container').children().should('have.length', 1)
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
