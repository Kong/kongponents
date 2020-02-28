import { mount } from '@vue/test-utils'
import KSkeleton from '@/KSkeleton/KSkeleton'

describe('KSkeleton', () => {
  it('renders generic skeleton state by default', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('.skeleton-loader').exists()).toBe(true)
  })

  it('renders form skeleton state with 4 rows by default', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        type: 'form',
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('.skeleton-form-wrapper').exists()).toBe(true)
    expect(wrapper.findAll('.skeleton-form-row')).toHaveLength(4)
  })

  it('renders card skeleton state with 2 cards', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        type: 'card',
        cardCount: 2,
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('.skeleton-card-wrapper').exists()).toBe(true)
    expect(wrapper.findAll('.skeleton-card')).toHaveLength(2)
  })

  it('renders table skeleton state with 6 rows by default', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        type: 'table',
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('.skeleton-table-wrapper').exists()).toBe(true)
    expect(wrapper.findAll('.skeleton-table-row')).toHaveLength(6)
  })

  it('renders spinner skeleton state', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        type: 'spinner',
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('.kong-icon').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSkeleton)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
