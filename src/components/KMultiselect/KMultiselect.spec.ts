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
    cy.getTestId(`k-multiselect-item-${vals[1]}`).should('not.be.visible')

    cy.getTestId(`k-multiselect-item-${vals[0]}`).eq(1).click()
    cy.getTestId('k-multiselect-selections').should('contain.text', labels[0])
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

  it('always shows selections when slimDisplay is false', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    mount(KMultiselect, {
      props: {
        testMode: true,
        slimDisplay: false,
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

    cy.get('.k-multiselect-input').click()

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
})
