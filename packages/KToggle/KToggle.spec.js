import { mount, shallowMount } from '@vue/test-utils'
import KToggle from '@/KToggle/KToggle'

describe('KToggle', () => {
  it('toggles content', () => {
    const wrapper = mount(KToggle, {
      scopedSlots: {
        default: function (props) {
          return this.$createElement('button', {
            props: props,
            on: { click: props.toggle }
          }, 'click me ' + (props.isToggled ? 'yes' : 'no'))
        }
      }
    })

    const button = wrapper.find('button')

    expect(wrapper.vm.isToggled).toBe(false)
    expect(button.text()).toBe('click me no')

    button.trigger('click')

    expect(wrapper.vm.isToggled).toBe(true)
    expect(button.text()).toBe('click me yes')
  })

  it('console errors when no slot passed', () => {
    console.error = jest.fn()
    console.warn = jest.fn()

    shallowMount(KToggle)
  })
  expect(console.error).toBeTruthy()
  expect(console.warn).toBeTruthy()
})
