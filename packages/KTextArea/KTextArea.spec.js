import { mount } from '@vue/test-utils'
import KTextArea from '@/KTextArea/KTextArea'

describe('KTextArea', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KTextArea)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
