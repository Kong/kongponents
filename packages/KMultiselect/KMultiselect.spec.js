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

  it('emits proper updates on apply', async () => {
    const wrapper = mount(KMultiselect, {
      propsData: DEFAULT_PROPS
    })

    wrapper.find('.k-multiselect-trigger').trigger('click')
    wrapper.find('.k-multiselect-menu > li:last-child').trigger('click')
    wrapper.find('.k-multiselect-apply').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().changes).toBeTruthy()
    expect(wrapper.emitted().changes[0][0][1]).toEqual({ label: 'Item 2', selected: true })
  })

  it('matches snapshot', () => {
    const wrapper = mount(KMultiselect, {
      propsData: DEFAULT_PROPS
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
