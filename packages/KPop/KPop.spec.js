import { mount } from '@vue/test-utils'
import KPop from '@/KPop/KPop'

describe('KPop', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'width': '350',
        'title': 'Cool Beans!',
        'content': `I am a cool popover!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct width', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'width': '350'
      }
    })
    const popper = wrapper.find('.k-popover')

    expect(popper.element.style['width']).toEqual('350px')
  })

  it('renders with correct title', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'title': 'Cool Beans!'
      }
    })
    const popperTitle = wrapper.find('.k-popover-title')

    expect(popperTitle.text()).toEqual('Cool Beans!')
  })
})
