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

    expect(wrapper.find(`.k-select-item button[value="${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`.k-select-item button[value="${vals[1]}"]`).html()).toEqual(expect.stringContaining(labels[1]))
    expect(wrapper.find(`.k-select-item button[value="${vals[2]}"]`).html()).toEqual(expect.stringContaining(labels[2]))
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
    const wrapper = mount(KSelect, {
      propsData: {
        testMode: true,
        'width': '350',
        items: [{
          label: 'Label 1',
          value: 'label1'
        }]
      }
    })
    const selectedItem = wrapper.find('.k-select .k-select-item-selection')
    const input = wrapper.find('.k-input-wrapper .k-select-input')
    const popover = wrapper.find('.k-popover .k-select-popover')

    expect(selectedItem.element.style['width']).toEqual('350px')
    expect(input.element.style['width']).toEqual('350px')
    expect(popover.element.style['width']).toEqual('340px') // 10 pixels less with spacing
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

  it('reacts to text change', () => {
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
    const input = wrapper.find('input')

    expect(wrapper.find(`.k-select-item button[value="${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`.k-select-item button[value="${vals[1]}"]`).html()).toEqual(expect.stringContaining(labels[1]))

    input.setValue(labels[0])

    expect(wrapper.find(`.k-select-item button[value="${vals[0]}"]`).html()).toEqual(expect.stringContaining(labels[0]))
    expect(wrapper.find(`.k-select-item button[value="${vals[1]}"]`).html()).toBeFalsy()

    wrapper.find(`.k-select-item button[value="${vals[0]}"]`).simulate('click')
    expect(wrapper.find('.selected-item-label').html()).toEqual(expect.stringContaining(labels[0]))
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSelect)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
