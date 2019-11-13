import { mount } from '@vue/test-utils'
import KRadio from '@/KRadio/KRadio'

describe('KRadio', () => {
  it('shows as checked when value true', () => {
    const wrapper = mount(KRadio, {
      propsData: {
        model: true,
        value: true
      }
    })

    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('emits checked value on click', () => {
    const wrapper = mount(KRadio, {
      propsData: {
        model: false
      }
    })
    const toggle = wrapper.find('input')

    toggle.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KRadio, {
      propsData: {
        model: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
