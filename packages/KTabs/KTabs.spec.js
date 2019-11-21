import { mount } from '@vue/test-utils'
import KTabs from '@/KTabs/KTabs'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' }
]

describe('KTabs', () => {
  it('first tab is set if hash not found', () => {
    const wrapper = mount(KTabs, {
      propsData: {
        tabs: TABS
      }
    })

    expect(wrapper.find('.tab-item').classes()).toContain('active')
  })

  it('sets correct tab if default tab prop', () => {
    const wrapper = mount(KTabs, {
      propsData: {
        tabs: TABS,
        defaultTab: '#books'
      }
    })

    const tabs = wrapper.findAll('.tab-item')

    expect(tabs.at(2).classes()).toContain('active')
  })

  it('emits change event on click', () => {
    const wrapper = mount(KTabs, {
      propsData: {
        tabs: TABS
      }
    })

    wrapper.findAll('.tab-item').at(1).trigger('click')

    expect(wrapper.emitted().changed).toHaveLength(1)
    expect(wrapper.emitted().changed).toEqual([['#movies']])
  })

  it('matches snapshot', () => {
    const wrapper = mount(KTabs, {
      propsData: {
        tabs: TABS
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
