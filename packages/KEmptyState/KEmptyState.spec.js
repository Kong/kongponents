import { mount } from '@vue/test-utils'
import KEmptyState from '@/KEmptyState/KEmptyState'

describe('KEmptyState', () => {
  it('renders slots when passed', () => {
    const emptyTitle = 'No Entities Yet'
    const emptyMessage = 'To Add an Entity, Press the Button'
    const wrapper = mount(KEmptyState, {
      slots: {
        'title': `<span>${emptyTitle}</span>`,
        'message': `<div>${emptyMessage}</div>`
      }
    })

    expect(wrapper.find('.empty-state-title').html()).toEqual(expect.stringContaining(emptyTitle))
    expect(wrapper.find('.empty-state-content').html()).toEqual(expect.stringContaining(emptyMessage))
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
})
