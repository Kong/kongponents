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

  it('renders full screen loader with progress bar', () => {
    jest.useFakeTimers()
    const wrapper = mount(KSkeleton, {
      propsData: {
        type: 'fullscreen-kong',
        delayMilliseconds: 0
      }
    })

    expect(wrapper.find('[data-testid="full-screen-loader"]').exists()).toBe(true)

    const progressBar = wrapper.find('[role="progressbar"]')

    expect(progressBar.exists()).toBe(true)
    const getProgressValue = () => parseInt(progressBar.element.style.width.split('%')[0])

    expect(getProgressValue()).toEqual(0)

    jest.advanceTimersByTime(300)
    expect(getProgressValue()).toBeGreaterThan(0)
    expect(getProgressValue()).toBeLessThan(100)

    jest.advanceTimersByTime(3000)
    expect(getProgressValue()).toEqual(100)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSkeleton, {
      propsData: {
        delayMilliseconds: 0
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
