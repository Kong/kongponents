import { mount } from 'cypress/vue'
import { h } from 'vue'
import KSelect from '@/components/KSelect/KSelect.vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */

describe('KSelect', () => {
  it('renders props when passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    mount(KSelect, {
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

    cy.getTestId('k-select-input').trigger('click')

    cy.getTestId(`k-select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-select-item-${vals[1]}`).should('contain.text', labels[1])
    cy.getTestId(`k-select-item-${vals[2]}`).should('contain.text', labels[2])
    cy.get('.k-select-pop-dropdown').should('be.visible')
    cy.get('.k-select-dropdown-footer-text').should('not.exist')
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    mount(KSelect, {
      props: {
        testMode: true,
        items: [{ label: selectedLabel, value: 'label1', selected: true }],
      },
    })

    cy.get('.k-select-selected-item-label').should('contain.text', selectedLabel)
  })

  it('renders with disabled item', () => {
    mount(KSelect, {
      props: {
        testMode: true,
        items: [{ label: 'Label 1', value: 'label1', disabled: true }],
      },
    })

    cy.get('.k-select-item button').should('have.attr', 'disabled')
  })

  it('renders with correct px width', () => {
    const width = 350

    mount(KSelect, {
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

    cy.get('.k-select').invoke('outerWidth').should('eq', width)
  })

  it('renders with correct label', () => {
    const labelText = 'Cool Beans!'

    mount(KSelect, {
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
    mount(KSelect, {
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

  it('renders with correct appearance - select', () => {
    mount(KSelect, {
      props: {
        testMode: true,
        appearance: 'select',
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-select-pop-select').should('exist')
  })

  it('renders with correct appearance - button', () => {
    mount(KSelect, {
      props: {
        testMode: true,
        appearance: 'button',
        items: [{
          label: 'Label 1',
          value: 'label1',
        }],
      },
    })

    cy.get('.k-select-button').should('exist')
  })

  it('reacts to text change and select', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
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

    cy.getTestId('k-select-input').click()

    cy.getTestId(`k-select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-select-item-${vals[1]}`).should('contain.text', labels[1])

    cy.get('input').type(labels[0])

    cy.getTestId(`k-select-item-${vals[0]}`).should('contain.text', labels[0])
    cy.getTestId(`k-select-item-${vals[1]}`).should('not.be.visible')

    cy.getTestId(`k-select-item-${vals[0]}`).eq(1).click({ force: true })
    cy.get('.k-select-selected-item-label').should('contain.text', labels[0])
  })

  it('ignores clicks on disabled item', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
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

    cy.getTestId('k-select-input').click()

    cy.getTestId(`k-select-item-${vals[0]}`).eq(1).click({ force: true })
    cy.get('.k-select-selected-item-label').should('not.exist')
  })

  it('allows slotting content into the items', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        testMode: true,
        appearance: 'button',
        items: [{
          label: itemLabel,
          value: itemValue,
        }],
      },
      slots: {
        'item-template': h('span', {}, itemSlotContent),
      },
    })

    cy.getTestId(`k-select-item-${itemValue}`).should('contain.text', itemSlotContent)
  })

  it('reuses item template slot for selected item element when prop is true', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        testMode: true,
        appearance: 'select',
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
        reuseItemTemplate: true,
      },
      slots: {
        'item-template': h('span', {}, itemSlotContent),
      },
    })

    cy.get('.k-select-input').should('contain.text', itemSlotContent)
  })

  it('works in autosuggest mode', () => {
    const onQueryChange = cy.spy().as('onQueryChange')
    mount(KSelect, {
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
      cy.wrap(Cypress.vueWrapper.setProps({ loading: true })).getTestId('k-select-loading').should('exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ loading: false })).getTestId('k-select-loading').should('not.exist')
    }).then(() => {
      cy.wrap(Cypress.vueWrapper.setProps({ items: [{ label: 'Label 1', value: 'label1' }] })).getTestId('k-select-item-label1').should('contain.text', 'Label 1')
    })
  })

  it('can clear selection when clearable is true', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KSelect, {
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
        appearance: 'select',
        clearable: true,
      },
    })

    cy.get('input').should('have.value', labels[0])
    cy.get('.k-select-input .clear-selection-icon').trigger('click')
    cy.get('input').should('have.value', '')
  })

  it('renders dropdown footer text when prop is passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KSelect, {
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

    cy.getTestId('k-select-input').trigger('click')

    cy.get('.k-select-dropdown-footer-text').should('be.visible').should('contain.text', dropdownFooterText)
  })

  it('should allow slotting dropdown footer text', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']
    const dropdownFooterText = 'Dropdown footer text'

    mount(KSelect, {
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

    cy.getTestId('k-select-input').trigger('click')

    cy.get('.k-select-dropdown-footer-text').should('be.visible').should('contain.text', dropdownFooterText)
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
        testMode: true,
        items,
      },
    })

    cy.getTestId('k-select-input').trigger('click')
    cy.get('.k-select-item').eq(0).should('contain.text', items[0].label)
    cy.get('.k-select-group-title').eq(0).should('contain.text', group1Title)
    cy.get('.k-select-group-title').eq(1).should('contain.text', group2Title)
    cy.get('.k-select-item').eq(1).should('contain.text', items[1].label)
    cy.get('.k-select-item').eq(2).should('contain.text', items[3].label)
    cy.get('.k-select-item').eq(3).should('contain.text', items[2].label)
    cy.get('.k-select-item').eq(4).should('contain.text', items[4].label)
  })

  it('allows slotting selected item content', async () => {
    const selectedItemContent = 'I am slotted baby!'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'

    mount(KSelect, {
      props: {
        testMode: true,
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
      },
      slots: {
        'selected-item-template': selectedItemContent,
      },
    })

    cy.get('.k-select-item-selection').should('contain.text', selectedItemContent)
  })

  it('displays placeholder correctly when selected item slot is present', async () => {
    const selectedItemContent = 'I am slotted baby!'
    const placeholderText = 'Placeholder text'
    const itemLabel = 'Label 1'
    const itemValue = 'label1'
    const itemSlotContent = 'I am overwritten by selected-item slot'

    mount(KSelect, {
      props: {
        testMode: true,
        placeholder: placeholderText,
        appearance: 'select',
        autosuggest: true,
        items: [{
          label: itemLabel,
          value: itemValue,
          selected: true,
        }],
        reuseItemTemplate: true,
      },
      slots: {
        'selected-item-template': selectedItemContent,
        'item-template': itemSlotContent,
      },
    })

    cy.get('.k-select-input').should('contain.text', selectedItemContent)
    cy.getTestId('k-select-input').trigger('click')
    cy.get('.custom-selected-item').should('not.exist')
    cy.get('input').invoke('attr', 'placeholder').should('contain', placeholderText)
  })
})
