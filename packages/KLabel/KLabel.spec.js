import { mount } from '@vue/test-utils'
import KLabel from '@/KLabel/KLabel'

describe('KLabel', () => {
  it('renders a plain label by default', () => {
    const wrapper = mount(KLabel, {
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.find('label').text()).toBe('Full Name')
  })

  it('renders a tooltip when `help` is provided', () => {
    const wrapper = mount(KLabel, {
      propsData: {
        help: 'This is a tooltip'
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a tooltip when `info` is provided', () => {
    const wrapper = mount(KLabel, {
      propsData: {
        info: 'This is a tooltip'
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('passes the `for` attribute to label when `for` is provided', () => {
    const wrapper = mount(KLabel, {
      propsData: {
        for: 'test-id'
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
