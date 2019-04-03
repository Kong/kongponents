import { mount } from '@vue/test-utils'
import { default as KDropdown, alignments } from './KDropdown.vue'

const Alignments = Object.keys(alignments)

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

  it('matches snapshot', () => {
    const wrapper = mount(KDropdown)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
