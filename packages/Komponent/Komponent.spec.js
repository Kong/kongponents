import { mount } from '@vue/test-utils'
import Komponent from '@/Komponent/Komponent'
import KButton from '@/KButton/KButton'

describe('Komponent', () => {
  it('can update reactive data object', () => {
    const wrapper = mount(Komponent, {
      propsData: {
        data: {count: 0}
      },
      scopedSlots: {
        default: function (props) {
          return this.$createElement(KButton, {
            props: props,
            on: { click: () => (props.data.count = props.data.count + 1) }
          }, 'clicked me ' + props.data.count + ' times!')
        }
      }
    })

    const button = wrapper.find('button')

    expect(button.text()).toBe('clicked me 0 times!')
    button.trigger('click')
    expect(button.text()).toBe('clicked me 1 times!')
  })
})
