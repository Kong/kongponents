import { mount } from '@vue/test-utils'
import KInputRadio from '@/KRadio/KRadio'

describe('KInputRadio', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KInputRadio)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
