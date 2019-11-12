import { mount } from '@vue/test-utils'
import KInputCheckbox from '@/KCheckbox/KCheckbox'

describe('KCheckbox', () => {
  it('shows as checked when prop passed', () => {
    const wrapper = mount(KInputCheckbox, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('emits checked value on click', () => {
    const wrapper = mount(KInputCheckbox, {
      propsData: {
        value: true
      }
    })
    const toggle = wrapper.find('input')

    toggle.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KInputCheckbox, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
