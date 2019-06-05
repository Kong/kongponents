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
    const popperTitle = wrapper.find('.popover-title')

    expect(popperTitle.text()).toEqual('Cool Beans!')
  })

  it('renders with correct content', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'content': `I have lots of content!`
      }
    })
    const popperContent = wrapper.find('.popover-content')

    expect(popperContent.text()).toEqual('I have lots of content!')
  })
})
