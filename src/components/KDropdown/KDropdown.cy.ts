import { h } from 'vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KDropdownItem from '@/components/KDropdown/KDropdownItem.vue'

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

describe('KDropdown', () => {
  it('renders props when passed', () => {
    const triggerTextProp = 'Drop it!'

    cy.mount(KDropdown, {
      props: {
        triggerText: triggerTextProp,
        items: defaultMenuItems,
      },
    })

    cy.getTestId('dropdown-trigger-button').should('contain.text', triggerTextProp)
    cy.getTestId('dropdown-trigger-button').click()

    cy.getTestId('dropdown-list').should('exist')
    cy.getTestId('dropdown-list').should('be.visible')
    cy.getTestId('dropdown-item').eq(0).should('exist').should('contain.text', defaultMenuItems[0].label)
    cy.getTestId('dropdown-item').eq(1).should('exist').should('contain.text', defaultMenuItems[1].label)
  })

  it('renders with correct px width', () => {
    const width = 350

    cy.mount(KDropdown, {
      props: {
        width: width + '',
        items: defaultMenuItems,
      },
    })

    cy.getTestId('dropdown-trigger').click({ force: true })

    cy.get('.dropdown-popover .popover-container').invoke('width').should('eq', width)
  })

  it('renders disabled props when passed', () => {
    const tooltipText = 'A sweet tooltip'

    cy.mount(KDropdown, {
      props: {
        triggerText: 'Click me',
        disabled: true,
        disabledTooltip: tooltipText,
        items: defaultMenuItems,
      },
    })

    // button disabled
    // hover
    cy.getTestId('dropdown-trigger').trigger('mouseenter')

    cy.get('.k-tooltip').should('contain.text', tooltipText)
  })

  it('renders correctly when selectionMenu', () => {
    cy.mount(KDropdown, {
      props: {
        selectionMenu: true,
        items: selectionMenuItems,
      },
    })

    cy.get('.selection-dropdown-menu').should('exist')
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    cy.mount(KDropdown, {
      props: {
        triggerText: 'Click me',
        selectionMenu: true,
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          ...selectionMenuItems,
        ],
      },
    })

    cy.getTestId('dropdown-trigger').click()
    cy.getTestId('dropdown-list').should('be.visible')

    cy.get('.dropdown-selected-option').should('exist')
    cy.get('.dropdown-selected-option').should('contain.text', selectedLabel)
  })

  it('allows slotting content', () => {
    const itemSlotContent = 'I am slotted baby!'
    const triggerSlotContent = 'Click Me!'

    cy.mount(KDropdown, {
      slots: {
        items: h('span', {}, itemSlotContent),
        default: h('button', {}, triggerSlotContent),
      },
    })

    cy.getTestId('dropdown-trigger').click()
    cy.getTestId('dropdown-list').should('be.visible')

    cy.getTestId('dropdown-trigger').should('contain.html', triggerSlotContent)
    cy.get('.dropdown-popover').should('contain.html', itemSlotContent)
  })

  it('correctly renders all item types and dividers', () => {
    const itemSlotContent = `
    <KDropdownItem
      @click="() => {}"
      data-testid="button"
      danger
    >
      A button
    </KDropdownItem>
    <KDropdownItem
      disabled
      @click="() => {}"
      data-testid="disabled-button"
    >
      Disabled button
    </KDropdownItem>
    <KDropdownItem
      :item="{ label: 'You are here 2', to: { path: '/' } }"
      has-divider
      @click="() => {}"
      data-testid="router-link"
    >
      Router link
    </KDropdownItem>
    <KDropdownItem
      :item="{ label: 'You are here 2', to: { path: '/' } }"
      disabled
      @click="() => {}"
      data-testid="disabled-router-link"
    >
      Disabled router link
    </KDropdownItem>
    <KDropdownItem
      has-divider
      :item="{ label: 'You are here 3', to: 'https://kongponents.konghq.com/' }"
      rel="noopener"
      target="_blank"
      data-testid="external-link"
    >
      External link
    </KDropdownItem>
    <KDropdownItem
      :item="{ label: 'You are here 3', to: 'https://kongponents.konghq.com/' }"
      rel="noopener"
      target="_blank"
      disabled
      data-testid="disabled-external-link"
    >
      Disabled external link
    </KDropdownItem>`

    cy.mount(KDropdown, {
      props: {
        triggerText: 'Click me',
        class: 'test-dropdown',
      },
      slots: {
        items: itemSlotContent,
        default: h('button', {}, 'hello'),
      },
      global: {
        components: {
          KDropdownItem,
        },
      },
    })

    cy.getTestId('dropdown-trigger').click()
    cy.getTestId('dropdown-list').should('be.visible')

    cy.getTestId('dropdown-list').eq(0).find('.k-dropdown-item').should('have.length', 6)
    cy.getTestId('dropdown-list').eq(0).find('.has-divider').should('have.length', 2)
    cy.getTestId('dropdown-list').eq(0).find('.danger').should('have.length', 1)

    cy.get('button[data-testid="button"]').should('be.visible')
    cy.get('button[data-testid="disabled-button"]').should('be.visible')

    cy.get('router-link[data-testid="router-link"]').should('be.visible')
    cy.get('router-link[data-testid="disabled-router-link"]').should('be.visible')

    cy.get('a[data-testid="external-link"]').should('be.visible')
    cy.get('a[data-testid="disabled-external-link"]').should('be.visible')
  })

  it('opens and closes dropdown pragmatically', () => {
    cy.mount(KDropdown, {
      props: {
        triggerText: 'Click me',
        items: defaultMenuItems,
        ref: 'dropdownRef',
      },
    }).its('component.$.exposed')
      .as('exposed')

    cy.getTestId('dropdown-list').should('not.be.visible')

    // open dropdown pragmatically
    cy.get('@exposed').invoke('openDropdown')
    cy.getTestId('dropdown-list').should('be.visible')

    // close dropdown pragmatically
    cy.get('@exposed').invoke('closeDropdown')
    cy.getTestId('dropdown-list').should('not.be.visible')
  })
})

describe('KDropdownItem', () => {
  // TODO: add more KDropdownItem tests

  it('correctly binds attributes to wrapper and trigger elements', () => {
    const testIdAttr = 'dropdown-item-test'
    const boundClass = 'some-random-class'

    cy.mount(KDropdownItem, {
      props: {
        item: {
          label: 'You are here',
          to: { path: '/' },
        },
      },
      attrs: {
        target: '_blank',
        'data-testid': testIdAttr,
        class: boundClass,
      },
    })

    cy.get(`li[data-testid="dropdown-item"].${boundClass}`).should('be.visible')
    cy.get(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`).should('be.visible')
    cy.get(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`).should('have.attr', 'target', '_blank')
    // making sure classes don't leak to trigger element
    cy.get(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`).not(`.${boundClass}`).should('have.length', 1)
  })

  it('correctly handles disabled state on links', () => {
    cy.mount(KDropdownItem, {
      props: {
        item: {
          label: 'You are here',
          to: { path: '/' },
        },
        disabled: true,
      },
    })

    cy.getTestId('dropdown-item').should('be.visible').should('have.class', 'disabled')
    cy.get('router-link[data-testid="dropdown-item-trigger"]').should('not.have.attr', 'disabled')
    // ensure trigger element has disabled class
    cy.getTestId('dropdown-item-trigger').should('have.attr', 'class', 'dropdown-item-trigger disabled')
  })

  it('correctly handles disabled state on button', () => {
    cy.mount(KDropdownItem, {
      props: {
        item: {
          label: 'You are here',
        },
        disabled: true,
      },
      attrs: {
        onClick: () => { },
      },
    })

    cy.getTestId('dropdown-item').should('be.visible').should('have.class', 'disabled')
    cy.get('button[data-testid="dropdown-item-trigger"]').should('have.attr', 'disabled')
    // ensure disabled class doesn't leak to trigger element
    cy.getTestId('dropdown-item-trigger').should('have.attr', 'class', 'dropdown-item-trigger')
  })
})
