import { mount } from 'cypress/vue'
import { h } from 'vue'
import KDropdownMenu from '@/components/KDropdownMenu/KDropdownMenu.vue'

const defaultMenuItems = [
  { label: 'Props' },
  { label: 'Slots' },
  { label: 'Top' },
]

const selectionMenuItems = [{
  label: 'US (United States)',
  value: 'us',
},
{
  label: 'FR (France)',
  value: 'fr',
}]

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KDropdownMenu', () => {
  it('renders props when passed', () => {
    const labelProp = 'Drop it!'

    mount(KDropdownMenu, {
      props: {
        testMode: true,
        label: labelProp,
        items: defaultMenuItems,
      },
    })

    const triggerBtn = cy.getTestId('k-dropdown-trigger')

    triggerBtn.should('contain.text', labelProp)
    triggerBtn.click()

    cy.getTestId('k-dropdown-list').should('exist')
    cy.getTestId('k-dropdown-list').should('be.visible')
    cy.getTestId(`k-dropdown-item-${defaultMenuItems[0].label}`).should('exist')
    cy.getTestId(`k-dropdown-item-${defaultMenuItems[0].label}`).should('contain.text', defaultMenuItems[0].label)
    cy.getTestId(`k-dropdown-item-${defaultMenuItems[1].label}`).should('exist')
    cy.getTestId(`k-dropdown-item-${defaultMenuItems[1].label}`).should('contain.text', defaultMenuItems[1].label)
  })

  it('renders with correct px width', async () => {
    const width = 350

    mount(KDropdownMenu, {
      props: {
        testMode: true,
        width: width + '',
        items: defaultMenuItems,
      },
    })

    const triggerBtn = cy.getTestId('k-dropdown-trigger')
    triggerBtn.click()

    cy.get('.k-dropdown-popover').invoke('width').should('eq', width)
  })

  it('renders disabled props when passed', () => {
    const tooltipText = 'A sweet tooltip'

    mount(KDropdownMenu, {
      props: {
        testMode: true,
        label: 'Click me',
        disabled: true,
        disabledTooltip: tooltipText,
        items: defaultMenuItems,
      },
    })

    // button disabled
    const triggerBtn = cy.getTestId('k-dropdown-trigger')
    // hover
    triggerBtn.trigger('mouseenter')

    cy.get('.k-tooltip').should('contain.text', tooltipText)
  })

  it('renders with correct appearance - selectionMenu', () => {
    mount(KDropdownMenu, {
      props: {
        testMode: true,
        appearance: 'selectionMenu',
        items: selectionMenuItems,
      },
    })

    cy.get('.selection-dropdown-menu').should('exist')
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    mount(KDropdownMenu, {
      props: {
        testMode: true,
        label: 'Click me',
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          ...selectionMenuItems,
        ],
      },
    })

    const triggerBtn = cy.getTestId('k-dropdown-trigger')
    triggerBtn.click()
    cy.getTestId('k-dropdown-list').should('be.visible')

    cy.get('.k-dropdown-selected-option').should('exist')
    cy.get('.k-dropdown-selected-option').should('contain.text', selectedLabel)
  })

  it('allows slotting content', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const triggerSlotContent = 'Click Me!'

    mount(KDropdownMenu, {
      props: {
        testMode: true,
      },
      slots: {
        items: h('span', {}, itemSlotContent),
        default: h('button', {}, triggerSlotContent),
      },
    })

    const triggerBtn = cy.getTestId('k-dropdown-trigger')
    triggerBtn.click()
    cy.getTestId('k-dropdown-list').should('be.visible')

    triggerBtn.should('contain.html', triggerSlotContent)
    cy.get('.k-dropdown-popover').should('contain.html', itemSlotContent)
  })
})
