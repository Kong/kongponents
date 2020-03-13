import { mount } from '@vue/test-utils'
import KTable, {sortField} from '@/KTable/KTable'

const options = {
  headers: [
    { label: 'Name', key: 'name', isSortable: true },
    { label: 'ID', key: 'id' },
    { label: 'Enabled', key: 'enabled' },
    { key: 'actions', hideLabel: true }
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
  it('renders link in action slot', () => {
    const wrapper = mount(KTable, {
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

  it('has hover class when passed', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options,
        hasHover: true
      }
    })

    expect(wrapper.classes()).toContain('has-hover')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has small class when passed', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options,
        isSmall: true
      }
    })

    expect(wrapper.classes()).toContain('is-small')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have sortable class when passed', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options
      }
    })

    const actions = wrapper.findAll('.k-table th')

    expect(actions.at(0).classes()).toContain('sortable')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sortField(): sorts the items as expected', () => {
    const items = [
      {
        custom_id: '1234',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        username: 'henry'
      }, {
        custom_id: '1345',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        username: 'bobby'
      }, {
        custom_id: '13445',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        username: 'zach'
      }
    ]

    expect(items[0].username).toEqual('henry')

    let {sortKey: sortKey1, sortOrder: sortOrder1} = sortField('username', '', 'ascending', items)

    expect(items[0].username).toEqual('bobby')
    expect(sortKey1).toEqual('username')
    expect(sortOrder1).toEqual('ascending')

    let {sortKey: sortKey2, sortOrder: sortOrder2} = sortField('username', 'username', sortOrder1, items)

    expect(items[0].username).toEqual('zach')
    expect(sortKey2).toEqual('username')
    expect(sortOrder2).toEqual('descending')
  })
})
