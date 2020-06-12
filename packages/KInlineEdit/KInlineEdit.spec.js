import { mount } from '@vue/test-utils'
import KInlineEdit from '@/KInlineEdit/KInlineEdit'

describe('KInlineEdit', () => {
  it('copies element css to input on click', () => {
    const wrapper = mount(KInlineEdit, {
      slots: { default: '<p style="padding:10px">text</p>' }
    })

    wrapper.find('p').trigger('click')

    expect(wrapper.find('.k-input').attributes().style).toBe('padding: 10px;')
  })

  it('console warns when html tag not passed in slot', () => {
    console.warn = jest.fn()
    mount(KInlineEdit, {
      slots: { default: 'text' }
    })

    expect(console.warn).toBeTruthy()
  })

  it('emits updated text on blur', async () => {
    const inputText = 'test'
    const wrapper = mount(KInlineEdit, {
      slots: { default: '<p>text</p>' }
    })

    wrapper.find('p').trigger('click')

    await wrapper.vm.$nextTick()

    const input = wrapper.find('.k-input')

    input.setValue(inputText)
    input.trigger('blur')
    expect(wrapper.emitted().changed).toBeTruthy()
    expect(wrapper.emitted().changed[0][0]).toEqual(inputText)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KInlineEdit, {
      slots: { default: '<p>text</p>' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
