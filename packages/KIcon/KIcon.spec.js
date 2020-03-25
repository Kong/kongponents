import { mount } from '@vue/test-utils'
import KIcon from '@/KIcon/KIcon'
import icons from './icons'
const iconNames = Object.keys(icons)

let rendersIcon = (icon) => {
  it(`renders ${icon} icon`, () => {
    const wrapper = mount(KIcon, {
      propsData: {
        'icon': `${icon}`
      }
    })

    expect(wrapper.find('title').text()).toEqual(expect.stringContaining(`${icon}`))
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KIcon', () => {
  iconNames.map(icon => {
    rendersIcon(icon)
  })

  it('renders icon with red fill', () => {
    const wrapper = mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'color': 'red'
      }
    })

    const path = wrapper.find('path').attributes()

    expect(path.fill).toEqual('red')
  })

  it('renders 32x32 sized icon', () => {
    const wrapper = mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'size': '32'
      }
    })

    expect(wrapper.attributes().width).toEqual('32')
    expect(wrapper.attributes().height).toEqual('32')
  })

  it('sets title from prop', () => {
    const wrapper = mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'title': 'My Title'
      }
    })

    const title = wrapper.find('title').text()

    expect(title).toEqual('My Title')
  })
})
