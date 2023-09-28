import { mount } from 'cypress/vue'
import { h } from 'vue'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */

describe('KMultiselect', () => {
  it('renders props when passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').trigger('click')

    cy.getTestId(`k-multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('contain.text', labels[1])
    cy.getTestId(`k-multiselect-item-${vals[2]}`).should('contain.text', labels[2])
    cy.get('.k-multiselect-popover').should('be.visible')
    cy.get('.k-multiselect-dropdown-footer-text').should('not.exist')
  })

  it('renders with selected items when focused', () => {
    const selectedLabel = 'Label 1'
    const selectedLabel2 = 'Label 2'

    mount(KMultiselect, {
      props: {
        testMode: true,
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          { label: selectedLabel2, value: 'label2', selected: true },
        ],
      },
    })

    cy.get('.k-multiselect-input input').should('have.attr', 'placeholder', '2 items selected')

    cy.get('.k-multiselect-input').trigger('click')

    cy.getTestId('k-multiselect-selections').should('contain.text', selectedLabel)
    cy.getTestId('k-multiselect-selections').should('contain.text', selectedLabel2)
  })

  it('renders with disabled item', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    mount(KMultiselect, {
      props: {
        testMode: true,
        items: [
          { label: labels[0], value: vals[0], disabled: true },
          { label: labels[1], value: vals[1] },
        ],
      },
    })

    cy.get('.k-multiselect-input').trigger('click')

    cy.get(`[data-testid="k-multiselect-item-${vals[0]}"] button`).should('have.attr', 'disabled')
  })

  it('renders with correct px width', () => {
    const width = 350

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    mount(KMultiselect, {
      props: {
        testMode: true,
        label: labelText,
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-input-label').should('contain.text', labelText)
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label'
    mount(KMultiselect, {
      props: {
        testMode: true,
        label: labelText,
        labelAttributes: {
          help: 'some help text',
        },
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-input-label').should('contain.text', labelText)
    cy.get('.k-input-label .kong-icon-help').should('be.visible')
  })

  it('reacts to text change and select', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.get('.k-multiselect-input').click()

    cy.getTestId(`k-multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('contain.text', labels[1])

    cy.get('input').type(labels[0])

    cy.getTestId(`k-multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('not.exist')

    cy.getTestId(`k-multiselect-item-${vals[0]}`).eq(0).click()
    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
  })

  it('allows adding an item with enableItemCreation', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').click()

    cy.getTestId(`k-multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('contain.text', labels[1])
    // no adding a label that already exists
    cy.get('input').type(labels[0])
    cy.getTestId('k-multiselect-add-item').should('not.exist')
    cy.get('input').clear()
    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('k-multiselect-add-item').should('contain.text', newItem).click()
    // search is cleared
    cy.get('input').should('not.contain.text', newItem)
    // item displays in selections
    cy.getTestId('k-multiselect-selections').should('contain.text', newItem)
    // item displays when searching
    cy.get('input').type(newItem)
    cy.get('.k-multiselect-item .k-multiselect-item-label').should('contain.text', newItem)
    // no adding a label that already exists
    cy.getTestId('k-multiselect-add-item').should('not.exist')
    // item gone when dismissed
    cy.getTestId('k-multiselect-selections').get('.k-badge-dismiss-button').first().click()
    // removed from selections
    cy.getTestId('k-multiselect-selections').should('not.to.exist')
    // gone when searching
    cy.get('input').clear()
    cy.get('input').type(newItem)
    cy.get('.k-multiselect-item .selected .k-multiselect-item-label').should('not.exist')
  })

  it('clears added items when clicking clear all with enableItemCreation', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').click()

    cy.getTestId(`k-multiselect-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('contain.text', labels[1])

    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('k-multiselect-add-item').should('contain.text', newItem).click()
    // item displays in selections
    cy.getTestId('k-multiselect-selections').should('contain.text', newItem)
    cy.getTestId('k-multiselect-clear-icon').click()
    // cleared
    cy.getTestId('k-multiselect-selections').should('not.to.exist')
    cy.get('input').type(newItem)
    cy.get('.k-multiselect-item .selected .k-multiselect-item-label').should('not.exist')
  })

  it('ignores clicks on disabled item', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').click()

    cy.getTestId(`k-multiselect-item-${vals[0]}`).click()
    cy.getTestId('k-multiselect-selections').should('not.exist')
  })

  it('allows slotting content into the items', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KMultiselect, {
      props: {
        testMode: true,
        items: [{
          label: itemLabel,
          value: itemValue,
        }],
      },
      slots: {
        'item-template': h('span', {}, itemSlotContent),
      },
    })

    cy.getTestId(`k-multiselect-item-${itemValue}`).should('contain.text', itemSlotContent)
  })

  it('works in autosuggest mode', () => {
    const onQueryChange = cy.spy().as('onQueryChange')
    mount(KMultiselect, {
      props: {
        testMode: true,
        autosuggest: true,
        loading: false,
        items: [],
        onQueryChange,
      },
    })

    cy.get('input').type('a').then(() => {
      cy.get('@onQueryChange').should('have.been.calledWith', 'a')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: true })).get('.k-multiselect-chevron-icon.kong-icon-spinner').should('exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: false })).get('.k-multiselect-chevron-icon.kong-icon-spinner').should('not.exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ items: [{ label: 'Label 1', value: 'label1' }] })).getTestId('k-multiselect-item-label1').should('contain.text', 'Label 1')
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

    mount(KMultiselect, {
      props: {
        testMode: true,
        autosuggest: true,
        collapsedContext: true,
        selectedRowCount: 2,
        modelValue: selected,
        loading: false,
        items,
        onQueryChange,
      },
    })

    cy.get('[data-testid="k-multiselect-trigger"]')
      .click('topRight')
      .then(() => {
        cy.get('[data-testid="k-multiselect-selections"] > div .k-badge-text')
          .last()
          .should(($el) => {
            const text = $el.text()

            expect(text.trim()).to.equal('+7')
          })
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
        cy.get('[data-testid="k-multiselect-selections"] > div .k-badge-text')
          .last()
          .should(($el) => {
            const text = $el.text()

            expect(text.trim()).to.equal('+7')
          })
      })
  })

  it('always shows selections when expandSelected is true', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
        expandSelected: true,
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

    cy.getTestId('k-multiselect-selections').should('exist')

    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
    cy.getTestId('k-multiselect-selections').should('contain.text', labels[1])

    cy.get('.k-multiselect-chevron-icon').click()

    cy.getTestId('k-multiselect-selections').should('exist')
  })

  it('always shows selections when collapsedContext is true', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
        collapsedContext: true,
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

    cy.getTestId('k-multiselect-selections').should('exist')

    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
    cy.getTestId('k-multiselect-selections').should('contain.text', labels[1])

    cy.get('.k-multiselect-chevron-icon').click()

    cy.getTestId('k-multiselect-selections').should('exist')
  })

  it('can clear all selections when focused', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').click()

    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
    cy.getTestId('k-multiselect-selections').should('contain.text', labels[1])
    cy.get('.k-multiselect-clear-icon').trigger('click')
    cy.getTestId('k-multiselect-selections').should('not.exist')
  })

  it('can clear selection by badge dismiss when focused', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').click()

    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
    cy.getTestId('k-multiselect-selections').get('.k-badge-dismiss-button').first().click()
    cy.getTestId('k-multiselect-selections').should('not.exist')
  })

  it('renders dropdown footer text when prop is passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').trigger('click')

    cy.get('.k-multiselect-dropdown-footer-text').should('be.visible').should('contain.text', dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KMultiselect, {
      props: {
        testMode: true,
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

    cy.get('.k-multiselect-input').trigger('click')

    cy.get('.k-multiselect-dropdown-footer-text').should('be.visible').should('contain.text', dropdownFooterText)
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

    mount(KMultiselect, {
      props: {
        testMode: true,
        items,
      },
    })

    cy.getTestId('k-multiselect-input').trigger('click')
    cy.get('.k-multiselect-item').eq(0).should('contain.text', items[0].label)
    cy.get('.k-multiselect-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.k-multiselect-group-title').eq(1).should('contain.text', group2Title)
    cy.get('.k-multiselect-item').eq(1).should('contain.text', items[1].label)
    cy.get('.k-multiselect-item').eq(2).should('contain.text', items[3].label)
    cy.get('.k-multiselect-item').eq(3).should('contain.text', items[2].label)
    cy.get('.k-multiselect-item').eq(4).should('contain.text', items[4].label)
  })

  it('should able to handle tons of items with no obvious lag', () => {
    const items = Array.from(new Array(500)).map((_, i) => ({
      label: `Item ${i}`,
      value: `${i}`,
      selected: i < 400,
    }))

    const startTime = Date.now()

    mount(KMultiselect, {
      props: {
        testMode: true,
        items,
      },
    }).then(() => {
      expect(Date.now() - startTime).to.be.lessThan(3000)
    })
  })
})
