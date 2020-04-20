import { mount } from '@vue/test-utils'
import KState from '@/KState/KState'
import KButton from '@/KButton/KButton'

describe('KState', () => {
  it('has content', () => {
    const wrapper = mount(KState, {
      propsData: {
        initialState: {count: 0}
      },
      scopedSlots: {
        default: function (props) {
          return this.$createElement(KButton, {
            props: props
          }, 'clicked me ' + props.state.count + ' times!')
        }
      }
    })

    const button = wrapper.find('button')

    expect(wrapper.vm.state.count).toBe(0)
    expect(button.text()).toBe('clicked me 0 times!')
  })
})
