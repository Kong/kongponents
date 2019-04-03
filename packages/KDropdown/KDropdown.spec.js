import { mount } from '@vue/test-utils'
import { default as KDropdown, alignments } from './KDropdown.vue'

const Alignments = Object.keys(alignments)
const items = ['workspaces', 'vitals']

let rendersAlignments = (position) => {
  it(`renders with ${position} class`, () => {
    const wrapper = mount(KDropdown, {
      propsData: {
        'position': position
      }
    })

    expect(wrapper.find('.k-dropdown-menu').html()).toEqual(expect.stringContaining(`k-dropdown-menu-${position}`))
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KDropdown', () => {
  Alignments.map(position => {
    rendersAlignments(position)
  })

  it('title updates when item clicked', () => {
    const wrapper = mount(KDropdown, {
      propsData: {
        items,
        showActive: true
      }
    })

    wrapper.find('.k-dropdown').trigger('click')
    wrapper.find('.k-dropdown-item:nth-of-type(2)').trigger('click')

    expect(wrapper.find('.k-dropdown-toggle').text()).toEqual(items[1])
  })

  it('matches snapshot', () => {
    const wrapper = mount(KDropdown)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
