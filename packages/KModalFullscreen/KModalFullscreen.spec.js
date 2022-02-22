import { mount } from '@vue/test-utils'
import KModalFullscreen from '@/KModalFullscreen/KModalFullscreen'

describe('KModalFullscreen', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KModalFullscreen)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
