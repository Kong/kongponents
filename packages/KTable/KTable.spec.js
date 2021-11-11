import { mount } from '@vue/test-utils'
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

describe('KTable', () => {
  describe('default', () => {
    it('renders link in action slot', async () => {
      const wrapper = await mount(KTable, {
        propsData: {
          options
        },
        scopedSlots: {
          actions: '<a href="#" slot-scope="actions">Link</a>'
        }
      })

      const actions = wrapper.findAll('.k-table td:last-of-type > *')

      expect(actions.at(0).is('a')).toBe(true)
      expect(actions.at(1).is('a')).toBe(true)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('has hover class when passed', async () => {
      const wrapper = await mount(KTable, {
        propsData: {
          options,
          hasHover: true
        }
      })

      expect(wrapper.find('.k-table').classes()).toContain('has-hover')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('has small class when passed', async () => {
      const wrapper = await mount(KTable, {
        propsData: {
          options,
          isSmall: true
        }
      })

      expect(wrapper.find('.k-table').classes()).toContain('is-small')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', async () => {
      const wrapper = await mount(KTable, {
        propsData: {
          options
        }
      })

      const actions = wrapper.findAll('th')

      expect(actions.at(0).classes()).toContain('sortable')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('@row:event', async () => {
      const evtTrigger = jest.fn()
      const wrapper = await mount(KTable, {
        attachToDocument: true,
        propsData: {
          options
        },
        listeners: {
          [`row:mouseover`]: evtTrigger
        }
      })

      const bodyRow = wrapper.find('.k-table tbody tr')

      bodyRow.trigger('mouseover')
      expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'mouseover' }), options.data[0], 'row')
    })

    it('@cell:event', async () => {
      const evtTrigger = jest.fn()
      const wrapper = await mount(KTable, {
        attachToDocument: true,
        propsData: { options },
        listeners: {
          [`cell:click`]: evtTrigger,
          [`cell:mouseover`]: evtTrigger,
          [`cell:mouseout`]: evtTrigger
        }
      })

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
        propsData: {
          fetcher: fetcher,
          headers: options.headers,
          pageSize: 4
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.html()).toContain('empty-state-wrapper')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading skeletion when the "isLoading" prop is set to true"', () => {
      const wrapper = mount(KTable, {
        propsData: { isLoading: true }
      })

      expect(wrapper.html()).toContain('skeleton-table-wrapper')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays an error state when the "hasError" prop is set to true"', () => {
      const wrapper = mount(KTable, {
        propsData: { hasError: true }
      })

      expect(wrapper.html()).toContain('empty-state-wrapper')
      expect(wrapper.html()).toContain('is-error')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays a loading state and not an empty state when pending response', () => {
      const slowFetcher = () => {
        return setTimeout(() => {
          return new Promise(resolve => resolve({ data: options.data }))
        }, 1000)
      }
      const wrapper = mount(KTable, {
        propsData: {
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
    it('displays pagination when total results are greater than page size', async () => {
      const wrapper = mount(KTable, {
        propsData: {
          options: {
            data: largeDataSet,
            headers: options.headers
          },
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(true)
    })

    it('does not display pagination when total results are less than page size', async () => {
      const wrapper = mount(KTable, {
        propsData: {
          options: {
            data: options.data,
            headers: options.headers
          },
          paginationPageSizes: [10, 20, 30, 40]
        }
      })

      await tick(wrapper.vm, 1)

      expect(wrapper.find('[data-testid="k-pagination-container"]').exists()).toBe(false)
    })
  })
})
