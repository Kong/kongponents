import { mount } from '@vue/test-utils'
import KLabel from '@/KLabel/KLabel'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KLabel', () => {
  it('renders a plain label by default', () => {
    const wrapper = mount(KLabel, {
      propsData: {
        testMode: true
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.find('label').text()).toBe('Full Name')
  })

  it('renders a tooltip when `help` is provided', () => {
    const wrapper = mount(KLabel, {
      propsData: {
        help: 'This is a tooltip',
        testMode: true
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
        info: 'This is a tooltip',
        testMode: true
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
        for: 'test-id',
        testMode: true
      },
      slots: {
        default: 'Full Name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
