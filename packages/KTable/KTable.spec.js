import { mount } from '@vue/test-utils'
import KTable from '@/KTable/KTable'

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
    { label: 'Credentials', key: 'credentials' },
    { key: 'actions', hideLabel: true }
  ],
  data: [
    {
      name: 'iOS App',
      type: 'Key',
      credentials: 'xyz'
    },
    {
      name: 'Website Desktop',
      type: 'Basic',
      credentials: '123xyz'
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
  })

  it('has hover class when passed', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options,
        hasHover: true
      }
    })

    expect(wrapper.classes()).toContain('hover')
  })

  it('has small class when passed', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options,
        isSmall: true
      }
    })

    expect(wrapper.classes()).toContain('small')
  })

  it('matches snapshot', () => {
    const wrapper = mount(KTable, {
      propsData: {
        options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
