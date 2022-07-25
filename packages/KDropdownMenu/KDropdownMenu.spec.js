import { mount } from '@vue/test-utils'
import KDropdownMenu from '@/KDropdownMenu/KDropdownMenu'

describe('KDropdownMenu', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KDropdownMenu)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
