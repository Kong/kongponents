import { mount, createLocalVue } from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'
import KTable from '@/KTable/KTable'

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

const largeDataSet = [
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true'
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false'
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true'
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true'
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false'
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true'
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true'
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false'
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true'
  },
  {
    name: 'Basic Auth',
    id: '517526354743085',
    enabled: 'true'
  },
  {
    name: 'Website Desktop',
    id: '328027447731198',
    enabled: 'false'
  },
  {
    name: 'Android App',
    id: '405383051040955',
    enabled: 'true'
  }
]

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true, hideLabel: false },
    { label: 'ID', key: 'id', sortable: false, hideLabel: false },
    { label: 'Enabled', key: 'enabled', sortable: false, hideLabel: false },
    { label: '', key: 'actions', sortable: false, hideLabel: true }
  ],
  data: [
    {
      name: 'Basic Auth',
      id: '517526354743085',
      enabled: 'true'
    },
    {
      name: 'Website Desktop',
      id: '328027447731198',
      enabled: 'false'
    },
    {
      name: 'Android App',
      id: '405383051040955',
      enabled: 'true'
    }
  ]
}

/**
 * ALL TESTS MUST USE testMode
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: 'true' || 'loading'
 * }
 */

let localVue

// Use the Composition API
beforeEach(() => {
  localVue = createLocalVue()

  localVue.use(VueCompositionAPI)
})

describe('KTable', () => {
  describe('default', () => {
    it('renders link in action slot', async () => {
      const wrapper = await mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          disablePagination: true
        },
        scopedSlots: {
          actions: '<a href="#" slot-scope="actions">Link</a>'
        }
      })

      await tick(wrapper.vm, 2)

      const actions = wrapper.findAll('.k-table td:last-of-type > *')

      expect(actions.at(0).is('a')).toBe(true)
      expect(actions.at(1).is('a')).toBe(true)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('has hover class when passed', async () => {
      const wrapper = await mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          hasHover: true
        }
      })

      await tick(wrapper.vm, 2)

      expect(wrapper.find('.k-table').classes()).toContain('has-hover')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', async () => {
      const wrapper = await mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } }
        }
      })

      await tick(wrapper.vm, 2)

      const actions = wrapper.findAll('th')

      expect(actions.at(0).classes()).toContain('sortable')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should allow disabling sorting', async () => {
      const wrapper = await mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } },
          disableSorting: true
        }
      })

      await tick(wrapper.vm, 1)

      const actions = wrapper.findAll('th')

      expect(actions.at(0).classes()).not.toContain('sortable')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('@row:event', async () => {
      const evtTrigger = jest.fn()
      const wrapper = await mount(KTable, {
        localVue,
        attachToDocument: true,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } }
        },
        listeners: {
          [`row:mouseover`]: evtTrigger
        }
      })

      await tick(wrapper.vm, 1)

      const bodyRow = wrapper.find('.k-table tbody tr')

      bodyRow.trigger('mouseover')
      expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'mouseover' }), options.data[0], 'row')
    })

    it('@cell:event', async () => {
      const evtTrigger = jest.fn()
      const wrapper = await mount(KTable, {
        localVue,
        attachToDocument: true,
        propsData: {
          testMode: 'true',
          headers: options.headers,
          fetcher: () => { return { data: options.data } }
        },
        listeners: {
          [`cell:click`]: evtTrigger,
          [`cell:mouseover`]: evtTrigger,
          [`cell:mouseout`]: evtTrigger
        }
      })

      await tick(wrapper.vm, 1)

      const bodyCell1 = wrapper.find('.k-table tbody td')
      const bodyCell2 = wrapper.find('.k-table tbody td:nth-child(2)')

      bodyCell1.trigger('click')
      bodyCell1.trigger('mouseover')
      bodyCell2.trigger('mouseout')
      expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'click' }), 'Basic Auth', 'cell')
      expect(evtTrigger).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'mouseover' }), 'Basic Auth', 'cell')
      expect(evtTrigger).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'mouseout' }), '517526354743085', 'cell')
    })
  })

  describe('states', () => {
    it('displays an empty state when no data is available', async () => {
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          fetcher: fetcher,
          headers: options.headers,
          pageSize: 4
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.html()).toContain('empty-state-wrapper')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an empty state when no data is available (slot)', async () => {
      const emptySlotContent = 'Look mah! I am empty! (except testMode)'
      const fetcher = () => new Promise(resolve => resolve({ data: [] }))
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          fetcher: fetcher,
          headers: options.headers,
          pageSize: 4
        },
        scopedSlots: {
          'empty-state': `<span>${emptySlotContent}</span>`
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-table-empty-state"]').html()).toEqual(expect.stringContaining(emptySlotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', () => {
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'loading',
          isLoading: true
        }
      })

      expect(wrapper.html()).toContain('skeleton-table-wrapper')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an error state when the "hasError" prop is set to true"', () => {
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          hasError: true
        }
      })

      expect(wrapper.html()).toContain('empty-state-wrapper')
      expect(wrapper.html()).toContain('is-error')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an error state (slot)', async () => {
      const errorSlotContent = 'Look mah! I am erroneous! (except testMode)'
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          hasError: true
        },
        scopedSlots: {
          'error-state': `<span>${errorSlotContent}</span>`
        }
      })

      await tick(wrapper.vm, 1)
      console.log(wrapper.html())

      expect(wrapper.find('[data-testid="k-table-error-state"]').html()).toEqual(expect.stringContaining(errorSlotContent))
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading state and not an empty state when pending response', () => {
      const slowFetcher = () => {
        return setTimeout(() => {
          return new Promise(resolve => resolve({ data: options.data }))
        }, 1000)
      }

      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'loading',
          fetcher: slowFetcher,
          headers: options.headers,
          pageSize: 4
        }
      })

      expect(wrapper.find('.skeleton-table-wrapper').exists()).toBe(true)
      expect(wrapper.find('.empty-state-wrapper').exists()).toBe(false)
    })
  })

  describe('pagination', () => {
    it('displays pagination when fetcher provided', async () => {
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(true)
    })

    it('does not display pagination when pagination disabled', async () => {
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          fetcher: () => {
            return largeDataSet
          },
          isLoading: false,
          headers: options.headers,
          paginationPageSizes: [10, 20, 30, 40],
          disablePagination: true
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })

    it('does not display pagination when no fetcher', async () => {
      const wrapper = mount(KTable, {
        localVue,
        propsData: {
          testMode: 'true',
          options,
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })
  })
})
