import { mount, shallowMount } from '@vue/test-utils'
import { default as KDropdown, alignments } from './KDropdown.vue'
import KIcon from '../KIcon/KIcon.vue'

const Alignments = Object.keys(alignments)

let rendersAlignments = (position) => {
  it(`renders with ${position} class`, () => {
    const wrapper = mount(KDropdown, {
      propsData: {
        'position': position
      }
    })

    expect(wrapper.find('.k-dropdown-menu').html()).toEqual(expect.stringContaining(`k-dropdown-menu-${position}`))
  })
}

describe('KDropdown', () => {
  Alignments.map(position => {
    rendersAlignments(position)
  })

  it('renders icon with correct viewbox', () => {
    const icon = {
      render (h) {
        return h(KIcon, { props: { icon: 'gear' } })
      }
    }
    const wrapper = mount(KDropdown, {
      slots: {
        'icon': icon
      }
    })

    expect(wrapper.find('.k-dropdown-toggle svg').attributes().viewBox).toBe('0 0 16 16')
    expect(wrapper.find('.k-dropdown').classes('has-icon')).toBe(true)
  })

  it('correctly adds active class', () => {
    const wrapper = mount(KDropdown, {
      propsData: {
        items: [
          { name: 'Item 1', selected: true },
          { name: 'Item 2', selected: false }
        ]
      }
    })

    expect(wrapper.find('.k-dropdown-menu > li:first-child').classes('is-selected')).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KDropdown)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
