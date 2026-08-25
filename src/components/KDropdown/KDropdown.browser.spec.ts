import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KDropdownItem from '@/components/KDropdown/KDropdownItem.vue'
import { resetPointer } from '@test/utils'

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
  it('renders props when passed', async () => {
    const triggerTextProp = 'Drop it!'

    await render(KDropdown, {
      props: {
        triggerText: triggerTextProp,
        items: defaultMenuItems,
      },
    })

    await expect.element(page.getByTestId('dropdown-trigger-button')).toHaveTextContent(triggerTextProp)
    await page.getByTestId('dropdown-trigger-button').click()

    await expect.element(page.getByTestId('dropdown-list')).toBeInTheDocument()
    await expect.element(page.getByTestId('dropdown-list')).toBeVisible()
    await expect.element(page.getByTestId('dropdown-item').nth(0)).toBeInTheDocument()
    await expect.element(page.getByTestId('dropdown-item').nth(0)).toHaveTextContent(defaultMenuItems[0].label)
    await expect.element(page.getByTestId('dropdown-item').nth(1)).toBeInTheDocument()
    await expect.element(page.getByTestId('dropdown-item').nth(1)).toHaveTextContent(defaultMenuItems[1].label)
  })

  it('renders with correct px width', async () => {
    const width = 350

    await render(KDropdown, {
      props: {
        width: width + '',
        items: defaultMenuItems,
      },
    })

    // No `triggerText` here, so the default trigger button never renders and the trigger wrapper
    // collapses to 0x0 — Playwright refuses to click it even with `force`. The Cypress spec papered
    // over the same problem with `click({ force: true })`; dispatch the event directly instead.
    page.getByTestId('dropdown-trigger').element().dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await expect.element(page.getByCSS('.dropdown-popover .popover-container')).toHaveStyle({ width: `${width}px` })
  })

  it('renders disabled props when passed', async () => {
    const tooltipText = 'A sweet tooltip'

    await resetPointer()

    await render(KDropdown, {
      props: {
        triggerText: 'Click me',
        disabled: true,
        disabledTooltip: tooltipText,
        items: defaultMenuItems,
      },
    })

    // button disabled
    // hover
    await page.getByTestId('dropdown-trigger').hover()

    // `.k-tooltip` is `v-show`-toggled and so always in the document — assert visibility, not existence.
    await expect.element(page.getByCSS('.k-tooltip')).toBeVisible()
    await expect.element(page.getByCSS('.k-tooltip')).toHaveTextContent(tooltipText)
  })

  it('renders correctly when selectionMenu', async () => {
    await render(KDropdown, {
      props: {
        selectionMenu: true,
        items: selectionMenuItems,
      },
    })

    await expect.element(page.getByCSS('.selection-dropdown-menu')).toBeInTheDocument()
  })

  it('renders with selected item', async () => {
    const selectedLabel = 'Label 1'

    await render(KDropdown, {
      props: {
        triggerText: 'Click me',
        selectionMenu: true,
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          ...selectionMenuItems,
        ],
      },
    })

    await page.getByTestId('dropdown-trigger').click()
    await expect.element(page.getByTestId('dropdown-list')).toBeVisible()

    await expect.element(page.getByCSS('.dropdown-selected-option')).toBeInTheDocument()
    await expect.element(page.getByCSS('.dropdown-selected-option')).toHaveTextContent(selectedLabel)
  })

  it('allows slotting content', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const triggerSlotContent = 'Click Me!'

    await render(KDropdown, {
      slots: {
        items: h('span', {}, itemSlotContent),
        default: h('button', {}, triggerSlotContent),
      },
    })

    await page.getByTestId('dropdown-trigger').click()
    await expect.element(page.getByTestId('dropdown-list')).toBeVisible()

    await expect.poll(() => page.getByTestId('dropdown-trigger').element().innerHTML).toContain(triggerSlotContent)
    await expect.poll(() => page.getByCSS('.dropdown-popover').element().innerHTML).toContain(itemSlotContent)
  })

  it('correctly renders all item types and dividers', async () => {
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

    await render(KDropdown, {
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

    await page.getByTestId('dropdown-trigger').click()
    await expect.element(page.getByTestId('dropdown-list')).toBeVisible()

    const dropdownList = page.getByTestId('dropdown-list')

    await expect.poll(() => dropdownList.getByCSS('.k-dropdown-item').all().length).toBe(6)
    await expect.poll(() => dropdownList.getByCSS('.has-divider').all().length).toBe(2)
    await expect.poll(() => dropdownList.getByCSS('.danger').all().length).toBe(1)

    await expect.element(page.getByCSS('button[data-testid="button"]')).toBeVisible()
    await expect.element(page.getByCSS('button[data-testid="disabled-button"]')).toBeVisible()

    await expect.element(page.getByCSS('router-link[data-testid="router-link"]')).toBeVisible()
    await expect.element(page.getByCSS('router-link[data-testid="disabled-router-link"]')).toBeVisible()

    await expect.element(page.getByCSS('a[data-testid="external-link"]')).toBeVisible()
    await expect.element(page.getByCSS('a[data-testid="disabled-external-link"]')).toBeVisible()
  })

  it('opens and closes dropdown pragmatically', async () => {
    // `render()` deliberately exposes no `vm`, so hold the instance through a template ref
    // on a thin wrapper instead of reaching into `component.$.exposed`.
    const dropdown = ref<{ openDropdown: () => void, closeDropdown: () => void } | null>(null)

    await render(defineComponent({
      setup: () => () => h(KDropdown, {
        ref: dropdown,
        triggerText: 'Click me',
        items: defaultMenuItems,
      }),
    }))

    await expect.element(page.getByTestId('dropdown-list')).not.toBeVisible()

    // open dropdown pragmatically
    dropdown.value?.openDropdown()
    await expect.element(page.getByTestId('dropdown-list')).toBeVisible()

    // close dropdown pragmatically
    dropdown.value?.closeDropdown()
    await expect.element(page.getByTestId('dropdown-list')).not.toBeVisible()
  })
})

describe('KDropdownItem', () => {
  // TODO: add more KDropdownItem tests

  it('correctly binds attributes to wrapper and trigger elements', async () => {
    const testIdAttr = 'dropdown-item-test'
    const boundClass = 'some-random-class'

    await render(KDropdownItem, {
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

    await expect.element(page.getByCSS(`li[data-testid="dropdown-item"].${boundClass}`)).toBeVisible()
    await expect.element(page.getByCSS(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`)).toBeVisible()
    await expect.element(page.getByCSS(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`)).toHaveAttribute('target', '_blank')
    // making sure classes don't leak to trigger element
    await expect.element(page.getByCSS(`li[data-testid="dropdown-item"] [data-testid="${testIdAttr}"]`)).not.toHaveClass(boundClass)
  })

  it('correctly handles disabled state on links', async () => {
    await render(KDropdownItem, {
      props: {
        item: {
          label: 'You are here',
          to: { path: '/' },
        },
        disabled: true,
      },
    })

    await expect.element(page.getByTestId('dropdown-item')).toBeVisible()
    await expect.element(page.getByTestId('dropdown-item')).toHaveClass('disabled')
    await expect.element(page.getByCSS('router-link[data-testid="dropdown-item-trigger"]')).not.toHaveAttribute('disabled')
    // ensure trigger element has disabled class
    await expect.element(page.getByTestId('dropdown-item-trigger')).toHaveAttribute('class', 'dropdown-item-trigger disabled')
  })

  it('correctly handles disabled state on button', async () => {
    await render(KDropdownItem, {
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

    await expect.element(page.getByTestId('dropdown-item')).toBeVisible()
    await expect.element(page.getByTestId('dropdown-item')).toHaveClass('disabled')
    await expect.element(page.getByCSS('button[data-testid="dropdown-item-trigger"]')).toHaveAttribute('disabled')
    // ensure disabled class doesn't leak to trigger element
    await expect.element(page.getByTestId('dropdown-item-trigger')).toHaveAttribute('class', 'dropdown-item-trigger')
  })
})
