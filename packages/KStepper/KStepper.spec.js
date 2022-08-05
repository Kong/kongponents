import { mount } from '@vue/test-utils'
import KStepper from '@/KStepper/KStepper'

describe('KStepper', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KStepper)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
