import { mount } from '@vue/test-utils'
import KDropdownMenu from '@/KDropdownMenu/KDropdownMenu'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KDropdownMenu', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KDropdownMenu, {
      propsData: {
        testMode: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
