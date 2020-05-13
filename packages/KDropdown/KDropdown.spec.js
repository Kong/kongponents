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
  })
}

describe('KDropdown', () => {
  Alignments.map(position => {
    rendersAlignments(position)
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

  it('emits proper item and index on click', async () => {
    const wrapper = mount(KDropdown, {
      propsData: {
        items: [
          { name: 'Item 1', selected: true },
          { name: 'Item 2', selected: false }
        ]
      }
    })

    wrapper.find('.k-dropdown > .k-button').trigger('click')
    wrapper.find('.k-dropdown-menu > li:last-child').trigger('click')

    expect(wrapper.emitted().selected).toBeTruthy()
    expect(wrapper.emitted().selected[0][0]).toEqual({ name: 'Item 2', selected: true })
    expect(wrapper.emitted().selected[0][1]).toEqual(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KDropdown)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
