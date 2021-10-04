import { mount } from '@vue/test-utils'
import KSelect from '@/KSelect/KSelect'

describe('KSelect', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KSelect)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
