import { mount } from '@vue/test-utils'
import { default as KMultiselect } from './KMultiselect.vue'

jest.useFakeTimers()

const DEFAULT_PROPS = {
  items: [
    { label: 'Item 1', selected: true },
    { label: 'Item 2', selected: false }
  ]
}

describe('KMultiselect', () => {
  it('correctly adds active class', () => {
    const wrapper = mount(KMultiselect, {
      propsData: DEFAULT_PROPS
    })

    expect(wrapper.find('.k-multiselect-menu > li:first-child').classes('is-selected')).toBe(true)
  })

  it('emits proper updates on apply', async () => {
    const wrapper = mount(KMultiselect, {
      propsData: {
        items: [
          { label: 'Item 1', selected: false },
          { label: 'Item 2', selected: false }
        ]
      }
    })

    const trigger = wrapper.find('.k-multiselect-trigger')
    const items = wrapper.findAll('.k-multiselect-menu li')
    const applyBtn = wrapper.find('.k-multiselect-apply')

    // Open multiselect
    trigger.trigger('click')
    expect(wrapper.vm.applyDisabled).toBeTruthy()

    // Click first item & confirm apply can be clicked
    items.at(0).trigger('click')
    expect(wrapper.vm.applyDisabled).toBeFalsy()
    expect(wrapper.vm.internalItems[0].selected).toBeTruthy()

    applyBtn.trigger('click')
    expect(wrapper.emitted().changes).toBeTruthy()
    expect(wrapper.emitted().changes[0][0][0]).toEqual({ label: 'Item 1', selected: true })

    // Open multiselect & deselect
    trigger.trigger('click')
    items.at(0).trigger('click')
    expect(wrapper.vm.internalItems[0].selected).toBeFalsy()
    expect(wrapper.vm.applyDisabled).toBeTruthy()
  })

  it('filters list items', () => {
    const wrapper = mount(KMultiselect, {
      propsData: {
        ...DEFAULT_PROPS,
        hasFilter: true
      }
    })

    wrapper.find('.k-multiselect-trigger').trigger('click')
    wrapper.find('.k-multiselect-filter input').setValue('2')

    expect(wrapper.findAll('.k-multiselect-menu li')).toHaveLength(1)
    expect(wrapper.findAll('.k-multiselect-menu li').at(0).text()).toEqual('Item 2')
  })

  it('matches snapshot', () => {
    const wrapper = mount(KMultiselect, {
      propsData: DEFAULT_PROPS
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
