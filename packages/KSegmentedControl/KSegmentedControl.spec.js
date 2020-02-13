import { mount } from '@vue/test-utils'
import KSegmentedControl from '@/KSegmentedControl/KSegmentedControl'

describe('KSegmentedControl', () => {
  it('renders custom button text & appearance', () => {
    const wrapper = mount(KSegmentedControl, {
      propsData: {
        options: ["I'm a segment", 'So am I'],
        selected: 'So am I'
      }
    })
    const buttons = wrapper.find('.segmented-control').findAll('button')

    expect(buttons.at(0).text()).toBe("I'm a segment")
    expect(buttons.at(0).classes()).toContain('outline-primary')
    expect(buttons.at(1).text()).toBe('So am I')
    expect(buttons.at(1).classes()).toContain('primary')
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSegmentedControl, {propsData: {options: ['1', '2']}})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
