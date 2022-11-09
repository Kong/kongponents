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
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    mount(KSelect, {
      props: {
        testMode: true,
        items: [{ label: selectedLabel, value: 'label1', selected: true }],
      },
    })

    cy.get('.selected-item-label').should('contain.text', selectedLabel)
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
    cy.get('.selected-item-label').should('contain.text', labels[0])
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
})
