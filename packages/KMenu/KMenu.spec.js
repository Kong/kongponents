import { mount } from '@vue/test-utils'
import KMenu from '@/KMenu/KMenu'

describe('KMenu', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KMenu)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
