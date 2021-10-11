import { mount } from '@vue/test-utils'
import KSelect from '@/KSelect/KSelect'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KSelect', () => {
  it('renders props when passed', () => {
    const labels = ['Label 1', 'Label 2', 'Label 3']
    const vals = ['label1', 'label2', 'label3']

    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        items: [{
          label: labels[0],
          value: vals[0]
        }, {
          label: labels[1],
          value: vals[1]
        }, {
          label: labels[2],
          value: vals[2]
        }]
      }
    })

    const input = wrapper.find('[data-testid="k-select-input"]')

    input.trigger('click')

    expect(wrapper.find(`[data-testid="k-select-item-${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`[data-testid="k-select-item-${vals[1]}"]`).html()).toEqual(expect.stringContaining(labels[1]))
    expect(wrapper.find(`[data-testid="k-select-item-${vals[2]}"]`).html()).toEqual(expect.stringContaining(labels[2]))
    expect(wrapper.find('.k-select-pop-dropdown').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with selected item', () => {
    const selectedLabel = 'Label 1'

    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        items: [{ label: selectedLabel, value: 'label1', selected: true }]
      }
    })

    expect(wrapper.find('.selected-item-label').html()).toEqual(expect.stringContaining(selectedLabel))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct px width', () => {
    const width = 350

    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        'width': width + '',
        items: [{
          label: 'Label 1',
          value: 'label1',
          selected: true
        }]
      }
    })
    const selectedItem = wrapper.find('.k-select-item-selection')
    const input = wrapper.find('.k-input-wrapper.k-select-input')
    const popover = wrapper.find('.k-select-popover')

    expect(selectedItem.element.style['width']).toEqual((width - 24) + 'px')
    expect(input.element.style['width']).toEqual('350px')
    expect(popover.element.style['width']).toEqual((width - 10) + 'px') // 10 pixels less with spacing
  })

  it('renders with correct label', () => {
    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        'label': 'Cool Beans!',
        items: [{
          label: 'Label 1',
          value: 'label1'
        }]
      }
    })
    const selectLabel = wrapper.find('.k-input-label')

    expect(selectLabel.text()).toEqual('Cool Beans!')
  })

  it('renders with correct appearance', () => {
    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        appearance: 'select',
        items: [{
          label: 'Label 1',
          value: 'label1'
        }]
      }
    })

    expect(wrapper.find('.k-select-pop-select').exists()).toBe(true)
  })

  it('reacts to text change and select', () => {
    const labels = ['Label 1', 'Label 2']
    const vals = ['label1', 'label2']

    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        items: [{
          label: labels[0],
          value: vals[0]
        }, {
          label: labels[1],
          value: vals[1]
        }]
      }
    })
    const input = wrapper.find('[data-testid="k-select-input"]')

    input.trigger('click')

    expect(wrapper.find(`[data-testid="k-select-item-${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`[data-testid="k-select-item-${vals[1]}"]`).html()).toEqual(expect.stringContaining(labels[1]))

    const input2 = wrapper.find('input')

    input2.setValue(labels[0])

    expect(wrapper.find(`[data-testid="k-select-item-${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`[data-testid="k-select-item-${vals[1]}"]`).exists()).toBeFalsy()

    wrapper.find(`[data-testid="k-select-item-${vals[0]}"]`).trigger('click')
    expect(wrapper.find('.selected-item-label').html()).toEqual(expect.stringContaining(labels[0]))
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        items: [{
          label: 'Label 1',
          value: 'label1'
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
