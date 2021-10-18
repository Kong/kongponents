import { mount } from '@vue/test-utils'
import KMenu from '@/KMenu/KMenu'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */

describe('KMenu', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KMenu, {
      propsData: {
        testMode: true,
        items: [{
          title: 'Updated',
          itemType: 'String',
          expandable: true
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
