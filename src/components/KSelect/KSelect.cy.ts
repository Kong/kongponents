import { mount } from 'cypress/vue'
import { h } from 'vue'
import KSelect from '@/components/KSelect/KSelect.vue'

describe('KSelect', () => {
  it('renders props when passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    mount(KSelect, {
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

    cy.getTestId('select-input').trigger('click')

    cy.get('.select-popover').should('be.visible')
    cy.getTestId(`select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`select-item-${vals[1]}`).should('contain.text', labels[1])
    cy.getTestId(`select-item-${vals[2]}`).should('contain.text', labels[2])
    cy.get('.dropdown-footer').should('not.exist')
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    mount(KSelect, {
      props: {
        items: [{ label: selectedLabel, value: 'label1', selected: true }],
      },
    })

    cy.getTestId('select-input').should('have.value', selectedLabel)
  })

  it('renders with disabled item', () => {
    mount(KSelect, {
      props: {
        items: [{ label: 'Label 1', value: 'label1', disabled: true }],
      },
    })

    cy.get('.select-item button').should('have.attr', 'disabled')
  })

  it('renders with correct px width', () => {
    const width = 350

    mount(KSelect, {
      props: {
        width: width + '',
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true,
        }],
      },
    })

    cy.get('.k-select').invoke('outerWidth').should('eq', width)
  })

  it('renders with correct label', () => {
    const labelText = 'Cool Beans!'

    mount(KSelect, {
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
    mount(KSelect, {
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

  it('handles the `required` state correctly', () => {
    mount(KSelect, {
      props: {
        label: 'A Label',
        required: true,
      },
    })

    cy.get('.k-label').should('have.class', 'required')
  })

  it('reacts to text change and select', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
      props: {
        enableFiltering: true,
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
      },
    })

    cy.getTestId('select-input').click()

    cy.getTestId(`select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`select-item-${vals[1]}`).should('contain.text', labels[1])

    cy.get('input').type(labels[0])

    cy.getTestId(`select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`select-item-${vals[1]}`).should('not.exist')

    cy.getTestId(`select-item-${vals[0]}`).eq(0).click({ force: true })
    cy.getTestId('select-input').should('have.value', labels[0])
  })

  it('ignores clicks on disabled item', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
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

    cy.getTestId('select-input').click()

    cy.getTestId(`select-item-${vals[0]}`).click({ force: true })
    cy.getTestId('select-input').should('not.have.value')
  })

  it('allows slotting content into the items', async () => {
    const itemSlotContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
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

    cy.getTestId(`select-item-${itemValue}`).should('contain.text', itemSlotContent)
  })

  it('reuses item template slot for selected item element when prop is true', async () => {
    const itemSlotContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
        reuseItemTemplate: true,
      },
      slots: {
        'item-template': `<span data-testid="item-slot-content">${itemSlotContent}</span>`,
      },
    })

    cy.getTestId('item-slot-content').should('be.visible').should('contain.text', itemSlotContent)
  })

  it('handles all states correctly when `enableFiltering` is `true`', () => {
    const onQueryChange = cy.spy().as('onQueryChange')
    mount(KSelect, {
      props: {
        enableFiltering: true,
        loading: false,
        items: [],
        onQueryChange,
      },
    })

    cy.get('input').type('a').then(() => {
      cy.get('@onQueryChange').should('have.been.calledWith', { query: '', items: [] })
      cy.get('@onQueryChange').should('have.been.calledWith', { query: 'a', items: [] })
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: true })).getTestId('select-loading').should('exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: false })).getTestId('select-loading').should('not.exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ items: [{ label: 'Label 1', value: 'label1' }] })).getTestId('select-item-label1').should('contain.text', 'Label 1')
    }).then(() => {
      cy.getTestId('select-item-label1').trigger('click')
      cy.get('input').should('have.value', 'Label 1')
      cy.getTestId('select-input').trigger('click')
      cy.get('[data-testid="select-item-label1"] button').should('have.class', 'selected')
      cy.get('@onQueryChange').should('have.been.calledWith', { query: '', items: [] })
    })
  })

  it('can clear selection when clearable is true', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
        }],
        clearable: true,
      },
    })

    cy.get('input').should('have.value', labels[0])
    cy.getTestId('clear-selection-icon').trigger('click')
    cy.get('input').should('have.value', '')
  })

  it('renders dropdown footer text when prop is passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KSelect, {
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

    cy.getTestId('select-input').trigger('click')

    cy.get('.dropdown-footer').should('be.visible').should('contain.text', dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KSelect, {
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

    cy.getTestId('select-input').trigger('click')

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

    mount(KSelect, {
      props: {
        items,
      },
    })

    cy.getTestId('select-input').trigger('click')
    cy.get('.select-item').eq(0).should('contain.text', items[0].label)
    cy.get('.select-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.select-group-title').eq(1).should('contain.text', group2Title)
    cy.get('.select-item').eq(1).should('contain.text', items[1].label)
    cy.get('.select-item').eq(2).should('contain.text', items[3].label)
    cy.get('.select-item').eq(3).should('contain.text', items[2].label)
    cy.get('.select-item').eq(4).should('contain.text', items[4].label)
  })

  it('allows slotting selected item content', async () => {
    const selectedItemContent = 'I am slotted!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
      },
      slots: {
        'selected-item-template': `<span data-testid="selected-item-slot-content">${selectedItemContent}</span>`,
      },
    })

    cy.getTestId('selected-item-slot-content').should('be.visible').should('contain.text', selectedItemContent)
  })

  it('displays placeholder correctly when selected item slot is present', async () => {
    const selectedItemContent = 'I am slotted!'
    const placeholderText = 'Placeholder text'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        placeholder: placeholderText,
        enableFiltering: true,
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
      },
      slots: {
        'selected-item-template': `<span data-testid="selected-item-slot-content">${selectedItemContent}</span>`,
      },
    })

    cy.getTestId('selected-item-slot-content').should('be.visible').should('contain.text', selectedItemContent)
    cy.getTestId('select-input').trigger('click')
    cy.getTestId('selected-item-slot-content').should('not.exist')
    cy.get('input').invoke('attr', 'placeholder').should('contain', placeholderText)
  })

  it('allows adding an item with enableItemCreation', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']
    const newItem = 'Rock me'

    mount(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
        }, {
          label: labels[1],
          value: vals[1],
        }],
        enableItemCreation: true,
        enableFiltering: true,
        clearable: true,
      },
    })

    cy.get('.select-input').click()
    cy.getTestId(`select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`select-item-${vals[1]}`).should('contain.text', labels[1])
    // no adding a label that already exists
    cy.get('input').type(labels[0])
    cy.getTestId('select-add-item').should('not.exist')
    cy.get('input').clear()
    // add new item
    cy.get('input').type(newItem)
    cy.getTestId('select-add-item').should('contain.text', newItem).click()
    // search is cleared
    cy.get('input').should('not.contain.text', newItem)
    // displays selected item correctly
    cy.getTestId('select-input').should('have.value', newItem)
    // item displays when searching
    cy.get('input').type(newItem)
    cy.get('.select-item .select-item-label').should('contain.text', newItem)
    // no adding a label that already exists
    cy.getTestId('select-add-item').should('not.exist')
    // item gone when deselected
    cy.getTestId('clear-selection-icon').trigger('click')
    cy.getTestId('select-input').should('not.have.value')
    // gone when searching
    cy.get('input').clear()
    cy.get('input').type(newItem)
    cy.getTestId('select-add-item').should('be.visible').should('contain.text', newItem)
  })

  it('updates selected status after items are mutated', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
      props: {
        items: [{
          label: labels[0],
          value: vals[0],
          selected: true,
        }, {
          label: labels[1],
          value: vals[1],
          selected: false,
        }],
      },
    })

    cy.get('.select-input input').click()
    cy.get(`[data-testid="select-item-${vals[0]}"] button`).should('have.class', 'selected')
    cy.get(`[data-testid="select-item-${vals[1]}"] button`).should('not.have.class', 'selected')
      .then(() => {
        // mutate items
        cy.wrap(Cypress.vueWrapper.setProps({
          items: [{
            label: labels[0],
            value: vals[0],
            selected: false,
          }, {
            label: labels[1],
            value: vals[1],
            selected: true,
          }],
        }))
      })
      .then(() => {
        cy.get(`[data-testid="select-item-${vals[0]}"] button`).should('not.have.class', 'selected')
        cy.get(`[data-testid="select-item-${vals[1]}"] button`).should('have.class', 'selected')
      })
  })
})
