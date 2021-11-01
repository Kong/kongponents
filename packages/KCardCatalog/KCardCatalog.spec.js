import { mount } from '@vue/test-utils'
import KCardCatalog from '@/KCardCatalog/KCardCatalog'
// import KCatalogItem from '@/KCardCatalog/KCatalogItem'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KCardCatalog', () => {
  function getItems (count) {
    let myItems = []

    for (let i = 0; i < count; i++) {
      myItems.push({
        title: 'Item ' + i,
        description: "The item's description for number " + i
      })
    }

    return myItems
  }

  const longItem = {
    title: 'A very long item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat.'
  }

  describe('general', () => {
    it('renders proper cards when using props', () => {
      const title = 'Cool beans!'
      const wrapper = mount(KCardCatalog, {
        propsData: {
          title,
          items: getItems(5),
          testMode: true
        }
      })

      expect(wrapper.find('.k-card-catalog-title').html()).toEqual(expect.stringContaining(title))
      expect(wrapper.find('.k-catalog-page').exists()).toBeTruthy()
      expect(wrapper.findAll('.k-card-catalog-item')).toHaveLength(5)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed', async () => {
      const slotContent = 'Look mah! No props (except testMode)'

      const wrapper = await mount(KCardCatalog, {
        propsData: {
          testMode: true
        },
        scopedSlots: {
          'body': `<span>${slotContent}</span>`
        }
      })

      expect(wrapper.find('.k-catalog-page').html()).toEqual(expect.stringContaining(slotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can change card sizes - small', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: getItems(5),
          cardSize: 'small',
          testMode: true
        }
      })

      expect(wrapper.find('.k-catalog-page.k-card-small').exists()).toBeTruthy()
      expect(wrapper.findAll('.k-card-catalog-item')).toHaveLength(5)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can change card sizes - large', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: getItems(5),
          cardSize: 'large',
          testMode: true
        }
      })

      expect(wrapper.find('.k-catalog-page.k-card-large').exists()).toBeTruthy()
      expect(wrapper.findAll('.k-card-catalog-item')).toHaveLength(5)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('handles truncation', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [longItem],
          testMode: true
        }
      })

      expect(wrapper.find('.k-catalog-page').exists()).toBeTruthy()
      expect(wrapper.find('.k-card-catalog-item .k-card-body .multi-line-truncate').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can disable truncation', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [longItem],
          noTruncation: true,
          testMode: true
        }
      })

      expect(wrapper.find('.k-catalog-page').exists()).toBeTruthy()
      expect(wrapper.find('.k-card-catalog-item .k-card-body .multi-line-truncate').exists()).toBeFalsy()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          testMode: true
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is passed to the table', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [],
          testMode: true
        }
      })

      expect(wrapper.find('.empty-state-wrapper').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [],
          isLoading: true,
          testMode: true
        }
      })

      expect(wrapper.find('.skeleton-card-wrapper').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an error state when the "hasError" prop is set to true"', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          options: [],
          hasError: true,
          testMode: true
        }
      })

      expect(wrapper.find('.empty-state-wrapper.is-error').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
