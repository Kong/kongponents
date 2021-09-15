import { mount } from '@vue/test-utils'
import KEmptyState from '@/KEmptyState/KEmptyState'

describe('KEmptyState', () => {
  it('renders slots when passed', () => {
    const emptyTitle = 'No Entities Yet'
    const emptyMessage = 'To Add an Entity, Press the Button'
    const ctaText = 'Click Me!'

    const wrapper = mount(KEmptyState, {
      propsData: {
        ctaText
      },
      slots: {
        'title': `<span>${emptyTitle}</span>`,
        'message': `<div>${emptyMessage}</div>`
      }
    })

    expect(wrapper.find('.empty-state-title').html()).toEqual(expect.stringContaining(emptyTitle))
    expect(wrapper.find('.empty-state-content').html()).toEqual(expect.stringContaining(emptyMessage))
    expect(wrapper.find('button.outline').text()).toEqual(expect.stringContaining(ctaText))
  })

  it('renders icon when error flag passed', () => {
    const spy = jest.spyOn(console, 'error')
    const errorMessage = 'I got a bad feeling about this'
    const wrapper = mount(KEmptyState, {
      propsData: {
        isError: true,
        ctaIsHidden: true
      },
      slots: {
        'message': `<div>${errorMessage}</div>`
      }
    })

    expect(wrapper.find('.warning-icon').exists()).toBe(true)
    expect(spy).not.toHaveBeenCalledWith(expect.stringContaining('[Vue warn]')) // uses correct kicon
    expect(wrapper.find('.empty-state-content').html()).toEqual(expect.stringContaining(errorMessage))
  })

  it('remains empty when no slots are passed', () => {
    const emptyTitle = ''
    const emptyMessage = ''
    const wrapper = mount(KEmptyState, {
      slots: {}
    })

    expect(wrapper.find('.empty-state-title').html()).toEqual(expect.stringContaining(emptyTitle))
    expect(wrapper.find('.empty-state-content').html()).toEqual(expect.stringContaining(emptyMessage))
  })

  it('does not render KButton when ctaIsHidden', () => {
    const wrapper = mount(KEmptyState, {
      propsData: {
        ctaIsHidden: true
      }
    })

    expect(wrapper.find('button.outline').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KEmptyState)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
