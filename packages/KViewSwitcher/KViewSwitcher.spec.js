import { mount } from '@vue/test-utils'
import KViewSwitcher from '@/KViewSwitcher/KViewSwitcher'

describe('KViewSwitcher', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KViewSwitcher)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
