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
  function getItems (count) {
    let myItems = []

    for (let i = 0; i < count; i++) {
      myItems.push({
        title: 'Item ' + i,
        type: Math.random() < 0.5 ? 'string' : 'number',
        expandable: Math.random() < 0.5,
        description: "The item's description for number " + i
      })
    }

    return myItems
  }

  const customItem = {
    title: 'Item #',
    description: 'Cras aliquet auctor ex ut hendrerit. Donec sagittis est nec aliquet semper. Quisque feugiat metus orci, at ullamcorper odio molestie non. Nam dignissim sed ligula ut commodo.'
  }

  describe('general', () => {
    it('renders proper menu when using props', () => {
      const wrapper = mount(KMenu, {
        propsData: {
          items: getItems(5),
          testMode: true
        }
      })

      expect(wrapper.find('.k-menu').exists()).toBeTruthy()
      expect(wrapper.findAll('.k-menu-item')).toHaveLength(5)
    })

    it('shows chevron down icon', () => {
      const wrapper = mount(KMenu, {
        propsData: {
          items: [customItem],
          expandable: true,
          testMode: true
        }
      })

      expect(wrapper.find('.k-menu').exists()).toBeTruthy()
      expect(wrapper.find('.k-menu-item .k-button > .span-icon-container').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
