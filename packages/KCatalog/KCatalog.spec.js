import { mount, createLocalVue } from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'
import KCatalog from '@/KCatalog/KCatalog'
// import KCatalogItem from '@/KCatalog/KCatalogItem'

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

let localVue

// Use the Composition API
beforeEach(() => {
  localVue = createLocalVue()

  localVue.use(VueCompositionAPI)
})

describe('KCatalog', () => {
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
    it('renders proper cards when using props', async () => {
      const title = 'Cool beans!'
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          title,
          fetcher: () => {
            return { data: getItems(5), total: 5 }
          },
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('.k-card-catalog-title').html()).toEqual(expect.stringContaining(title))
      expect(wrapper.find('.k-catalog-page').exists()).toBeTruthy()
      // expect(wrapper.findAll('.k-card-catalog-item')).toHaveLength(5)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed', () => {
      const slotContent = 'Look mah! No props (except testMode)'

      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          testMode: true,
          fetcher: () => { return { data: [], total: 0 } }
        },
        scopedSlots: {
          'body': `<span>${slotContent}</span>`
        }
      })

      expect(wrapper.find('.k-catalog-page').html()).toEqual(expect.stringContaining(slotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slotted cards when passed', async () => {
      const slotHeader = 'Look mah!'
      const slotBody = 'My body'

      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          testMode: true,
          fetcher: () => {
            return { data: getItems(1), total: 1 }
          }
        },
        scopedSlots: {
          'cardTitle': `<span>${slotHeader}</span>`,
          'cardBody': `<span>${slotBody}</span>`
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('.k-card-title').html()).toEqual(expect.stringContaining(slotHeader))
      expect(wrapper.find('.k-card-body').html()).toEqual(expect.stringContaining(slotBody))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed (with empty)', async () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'

      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          testMode: true,
          isLoading: false,
          fetcher: () => { return { data: [], total: 0 } }
        },
        scopedSlots: {
          'empty-state': `<span>${emptySlotContent}</span>`
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-card-catalog-empty-state"]').html()).toEqual(expect.stringContaining(emptySlotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slots when passed (with error)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'

      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          testMode: true,
          hasError: true,
          fetcher: () => { return { data: [], total: 0 } }
        },
        scopedSlots: {
          'error-state': `<span>${errorSlotContent}</span>`
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-card-catalog-error-state"]').html()).toEqual(expect.stringContaining(errorSlotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can change card sizes - small', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: getItems(5), total: 5 }
          },
          cardSize: 'small',
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.props('cardSize')).toBe('small')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can change card sizes - large', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: getItems(5), total: 5 }
          },
          cardSize: 'large',
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.props('cardSize')).toBe('large')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('handles truncation', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.props('noTruncation')).toBe(false)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can disable truncation', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: [longItem], total: 1 }
          },
          noTruncation: true,
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.props('noTruncation')).toBe(true)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot', () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          testMode: true,
          fetcher: () => { return { data: [], total: 0 } }
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: fetcher,
          pageSize: 4
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.html()).toContain('empty-state-wrapper')
      // expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => { return { data: [], total: 0 } },
          isLoading: true,
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.props('isLoading')).toBe(true)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an error state when the "hasError" prop is set to true"', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => { return { data: [], total: 0 } },
          hasError: true,
          testMode: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('.empty-state-wrapper.is-error').exists()).toBeTruthy()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher is provided', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
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
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { data: largeDataSet, total: 10 }
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
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => { return { data: [], total: 0 } },
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is less than pageSize', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => { return { total: 10 } },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })

    it('does not display pagination when hidePaginationWhenOptional is true and total is equal to pageSize', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { total: 15 }
          },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })

    it('does display pagination when total is greater than pageSize', async () => {
      const wrapper = mount(KCatalog, {
        localVue,
        propsData: {
          fetcher: () => {
            return { total: 25 }
          },
          isLoading: false,
          pageSize: 15,
          hidePaginationWhenOptional: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(true)
    })
  })
})
