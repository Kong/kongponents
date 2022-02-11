import { mount, createLocalVue } from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'
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

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

const largeDataSet = [
  {
    title: 'Item 1',
    description: "The item's description for number"
  },
  {
    title: 'Item 2',
    description: "The item's description for number 2"
  },
  {
    title: 'Item 3',
    description: "The item's description for number 3"
  },
  {
    title: 'Item 4',
    description: "The item's description for number 4"
  },
  {
    title: 'Item 5',
    description: "The item's description for number 5"
  },
  {
    title: 'Item 6',
    description: "The item's description for number 6"
  },
  {
    title: 'Item 7',
    description: "The item's description for number 7"
  },
  {
    title: 'Item 8',
    description: "The item's description for number 8"
  },
  {
    title: 'Item 9',
    description: "The item's description for number 9"
  },
  {
    title: 'Item 10',
    description: "The item's description for number 10"
  }
]

// Use the Composition API
beforeEach(() => {
  const localVue = createLocalVue()

  localVue.use(VueCompositionAPI)
})

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
      // expect(wrapper.findAll('.k-card-catalog-item')).toHaveLength(5)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed', () => {
      const slotContent = 'Look mah! No props (except testMode)'

      const wrapper = mount(KCardCatalog, {
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

    it('renders slots when passed (with empty)', async () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'

      const wrapper = mount(KCardCatalog, {
        propsData: {
          testMode: true,
          isLoading: false,
          fetcher: () => { return { data: [] } }
        },
        scopedSlots: {
          'empty-state': `<span>${emptySlotContent}</span>`
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-card-catalog-empty-state"]').html()).toEqual(expect.stringContaining(emptySlotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed (with error)', () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'

      const wrapper = mount(KCardCatalog, {
        propsData: {
          testMode: true,
          hasError: true
        },
        scopedSlots: {
          'error-state': `<span>${errorSlotContent}</span>`
        }
      })

      expect(wrapper.find('[data-testid="k-card-catalog-error-state"]').html()).toEqual(expect.stringContaining(errorSlotContent))
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

      expect(wrapper.props('cardSize')).toBe('small')
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

      expect(wrapper.props('cardSize')).toBe('large')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('handles truncation', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [longItem],
          testMode: true
        }
      })

      expect(wrapper.props('noTruncation')).toBe(false)
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

      expect(wrapper.props('noTruncation')).toBe(true)
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
    it('displays an empty state when no data is available', async () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      const wrapper = mount(KCardCatalog, {
        propsData: {
          fetcher: fetcher,
          pageSize: 4
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.html()).toContain('empty-state-wrapper')
      // expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [],
          isLoading: true,
          testMode: true
        }
      })

      expect(wrapper.props('isLoading')).toBe(true)
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

  describe('pagination', () => {
    it('displays pagination when fetcher is provided', async () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          testMode: true,
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(true)
    })

    it('allows disabling pagination', async () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          testMode: true,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })

    it('does not display pagination when no fetcher', async () => {
      const wrapper = mount(KCardCatalog, {
        propsData: {
          items: [],
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })
  })
})
