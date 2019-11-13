import { mount } from '@vue/test-utils'
import KTabs from '@/KTabs/KTabs'

describe('KTabs', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KTabs)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
