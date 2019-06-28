import { mount } from '@vue/test-utils'
import KTable from '@/KTable/KTable'

const options = {
  headers: [
    { label: 'Name', key: 'name' },
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
})
