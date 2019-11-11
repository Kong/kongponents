import { mount } from '@vue/test-utils'
import KTest from '@/KTest/KTest'

describe('KTest', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KTest)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
