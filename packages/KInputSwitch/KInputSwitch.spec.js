import { mount } from '@vue/test-utils'
import KInputSwitch from '@/KInputSwitch/KInputSwitch'

describe('KInputSwitch', () => {
  it('shows as checked when prop passed', () => {
    const wrapper = mount(KInputSwitch, {
      propsData: {
        isChecked: true
      }
    })

    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('emits checked value on click', () => {
    const wrapper = mount(KInputSwitch, {
      propsData: {
        isChecked: true
      }
    })
    const toggle = wrapper.find('input')

    toggle.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KInputSwitch, {
      propsData: {
        isChecked: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
