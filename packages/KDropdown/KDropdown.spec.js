import { mount } from '@vue/test-utils'
import KDropdown from '@/KDropdown/KDropdown'

describe('KDropdown', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KDropdown)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
