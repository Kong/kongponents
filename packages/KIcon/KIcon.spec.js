import { mount } from '@vue/test-utils'
import KIcon from '@/KIcon/KIcon'
import icons from './icons'
const iconNames = Object.keys(icons)

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

let rendersIcon = (icon) => {
  it(`renders ${icon} icon`, async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': `${icon}`,
        testMode: true
      }
    })

    await tick(wrapper.vm, 1)

    expect(wrapper.find('svg title').text()).toEqual(expect.stringContaining(`${icon}`))
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KIcon', () => {
  iconNames.map(icon => {
    rendersIcon(icon)
  })

  it('renders icon with red fill', async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'color': 'red'
      }
    })

    await tick(wrapper.vm, 1)

    const path = wrapper.find('svg path').attributes()

    expect(path.fill).toEqual('red')
  })

  it('renders icon with secondary color', async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': 'warning',
        'color': 'black',
        'secondaryColor': 'yellow'
      }
    })

    await tick(wrapper.vm, 1)

    const path = wrapper.find('svg #Triangle').attributes()
    const secondaryPath = wrapper.find("path[type='secondary']").attributes()

    expect(path.fill).toEqual('black')
    expect(secondaryPath.fill).toEqual('yellow')
  })

  it('renders 32x32 sized icon', async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'size': '32'
      }
    })

    await tick(wrapper.vm, 1)

    expect(wrapper.find('svg').attributes().width).toEqual('32')
    expect(wrapper.find('svg').attributes().height).toEqual('32')
  })

  it('default title is set from icon', async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': 'portal'
      }
    })

    await tick(wrapper.vm, 1)

    const title = wrapper.find('svg title').text()

    expect(title).toEqual('Dev Portal')
  })

  it('sets title from prop', async () => {
    const wrapper = await mount(KIcon, {
      propsData: {
        'icon': 'portal',
        'title': 'My Title'
      }
    })

    await tick(wrapper.vm, 1)

    const title = wrapper.find('svg title').text()

    expect(title).toEqual('My Title')
  })
})
