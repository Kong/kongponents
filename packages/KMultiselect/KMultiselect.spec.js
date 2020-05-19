import { mount } from '@vue/test-utils'
import { default as KMultiselect } from './KMultiselect.vue'

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

  it('emits proper updates on apply', () => {
    const wrapper = mount(KMultiselect, {
      propsData: DEFAULT_PROPS
    })

    wrapper.find('.k-multiselect-trigger').trigger('click')
    wrapper.find('.k-multiselect-menu > li:last-child').trigger('click')
    wrapper.find('.k-multiselect-apply').trigger('click')

    expect(wrapper.emitted().changes).toBeTruthy()
    expect(wrapper.emitted().changes[0][0][1]).toEqual({ label: 'Item 2', selected: true })
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
