import { mount } from '@vue/test-utils'
import KDropdownMenu from '@/KDropdownMenu/KDropdownMenu'

const defaultMenuItems = [
  { label: 'Props' },
  { label: 'Slots' },
  { label: 'Top' }
]

const selectionMenuItems = [{
  label: 'US (United States)',
  value: 'us'
},
{
  label: 'FR (France)',
  value: 'fr'
}]

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KDropdownMenu', () => {
  it('renders props when passed', () => {
    const labelProp = 'Drop it!'

    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true,
        label: labelProp,
        items: defaultMenuItems
      }
    })

    const triggerBtn = wrapper.find('[data-testid="k-dropdown-trigger"]')

    expect(triggerBtn.text()).toEqual(labelProp)

    triggerBtn.trigger('click')

    expect(wrapper.find('[data-testid="k-dropdown-list"]').exists()).toBe(true)
    expect(wrapper.find(`[data-testid="k-dropdown-item-${defaultMenuItems[0].label}"]`).html()).toEqual(expect.stringContaining(defaultMenuItems[0].label))
    expect(wrapper.find(`[data-testid="k-dropdown-item-${defaultMenuItems[1].label}"]`).html()).toEqual(expect.stringContaining(defaultMenuItems[1].label))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct px width', async () => {
    const width = 350

    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true,
        width: width + '',
        items: defaultMenuItems
      }
    })
    const triggerBtn = wrapper.find('[data-testid="k-dropdown-trigger"]')
    const popover = wrapper.find('.k-dropdown-popover')

    triggerBtn.trigger('click')

    expect(popover.element.style['width']).toEqual(width + 'px')
  })

  it('renders disabled props when passed', () => {
    const tooltipText = 'A sweet tooltip'
    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true,
        label: 'Click me',
        disabled: true,
        disabledTooltip: tooltipText,
        items: defaultMenuItems
      }
    })
    // button disabled
    const triggerBtn = wrapper.find('.k-dropdown-btn[disabled="disabled"]')

    expect(triggerBtn.exists()).toBe(true)
    // hover
    triggerBtn.trigger('mouseenter')

    expect(wrapper.find(`.kooltip`).html()).toEqual(expect.stringContaining(tooltipText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct appearance - selectionMenu', () => {
    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true,
        appearance: 'selectionMenu',
        items: selectionMenuItems
      }
    })

    expect(wrapper.find('.selection-dropdown-menu').exists()).toBe(true)
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true,
        items: [
          { label: selectedLabel, value: 'label1', selected: true },
          ...selectionMenuItems
        ]
      }
    })

    const triggerBtn = wrapper.find('[data-testid="k-dropdown-trigger"]')

    triggerBtn.trigger('click')

    expect(wrapper.find('[data-testid="k-dropdown-list"]').exists()).toBe(true)

    expect(wrapper.find('.k-dropdown-selected-option').html()).toEqual(expect.stringContaining(selectedLabel))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('allows slotting content', async () => {
    const itemSlotContent = 'I am slotted baby!'
    const triggerSlotContent = 'Click Me!'
    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true
      },
      scopedSlots: {
        items: `<span>${itemSlotContent}</span>`,
        default: `<button>${triggerSlotContent}</button>`
      }
    })

    const triggerBtn = wrapper.find('[data-testid="k-dropdown-trigger"]')
    const popover = wrapper.find('.k-dropdown-popover')

    triggerBtn.trigger('click')

    expect(triggerBtn.html()).toEqual(expect.stringContaining(triggerSlotContent))
    expect(popover.html()).toEqual(expect.stringContaining(itemSlotContent))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
