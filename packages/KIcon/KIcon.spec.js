import { mount } from '@vue/test-utils'
import KCard from '@/KIcon/KIcon'

describe('KIcon', () => {
  it('renders vitals icon', () => {
    const wrapper = mount(KCard, {
      propsData: {
        'icon': 'vitals',
        'size': '32'
      }
    })

    const title = wrapper.find('title').text()

    expect(wrapper.attributes().width).toEqual('32')
    expect(title).toEqual(expect.stringContaining(title))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders icon with red fill', () => {
    const wrapper = mount(KCard, {
      propsData: {
        'icon': 'portal',
        'color': 'red'
      }
    })

    const path = wrapper.find('path').attributes()

    expect(path.fill).toEqual('red')
  })
})
