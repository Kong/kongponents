import { mount } from '@vue/test-utils'
import KInputRadio from '@/KInputRadio/KInputRadio'

describe('KInputRadio', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KInputRadio)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
