import { mount } from '@vue/test-utils'
import KState from '@/KState/KState'

describe('KState', () => {
  it('toggles content', () => {
    const wrapper = mount(KState, {
      propsData: {
        initialValue: 0
      },
      scopedSlots: {
        default: function (props) {
          return this.$createElement('button', {
            props: props,
            on: { click: props.update }
          }, 'clicked me ' + props.state + ' times!')
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
})
