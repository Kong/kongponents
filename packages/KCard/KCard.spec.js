import { mount } from '@vue/test-utils'
import KCard from '@/KCard/KCard'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Debug mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KCard', () => {
  it('renders slots when passed', () => {
    const cardStatusHat = 'Card Status Hat'
    const cardTitle = 'Card Title'
    const cardActions = 'Card Actions'
    const cardBody = 'Card Body'
    const cardNotifications = 'Card Notifications'
    const wrapper = mount(KCard, {
      propsData: {
        testMode: true
      },
      slots: {
        'statusHat': `<span>${cardStatusHat}</span>`,
        'title': `<span>${cardTitle}</span>`,
        'actions': `<span>${cardActions}</span>`,
        'body': `<div>${cardBody}</div>`,
        'notifications': `<span>${cardNotifications}</span>`
      }
    })

    expect(wrapper.find('.k-card-status-hat').html()).toEqual(expect.stringContaining(cardStatusHat))
    expect(wrapper.find('.k-card-title').html()).toEqual(expect.stringContaining(cardTitle))
    expect(wrapper.find('.k-card-actions').html()).toEqual(expect.stringContaining(cardActions))
    expect(wrapper.find('.k-card-body').html()).toEqual(expect.stringContaining(cardBody))
    expect(wrapper.find('.k-card-notifications').html()).toEqual(expect.stringContaining(cardNotifications))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using props', () => {
    const cardStatus = 'Card Status'
    const cardTitle = 'Card Title'
    const cardBody = 'Card Body'

    const wrapper = mount(KCard, {
      propsData: {
        testMode: true,
        status: cardStatus,
        title: cardTitle,
        body: cardBody
      }
    })

    expect(wrapper.find('.k-card-status-hat').html()).toEqual(expect.stringContaining(cardStatus))
    expect(wrapper.find('.k-card-title').html()).toEqual(expect.stringContaining(cardTitle))
    expect(wrapper.find('.k-card-body').html()).toEqual(expect.stringContaining(cardBody))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has border class when passed', () => {
    const wrapper = mount(KCard, {
      propsData: {
        testMode: true,
        hasBorder: true
      }
    })

    expect(wrapper.classes()).toContain('border')
  })

  it('has hover class when passed', () => {
    const wrapper = mount(KCard, {
      propsData: {
        testMode: true,
        hasHover: true
      }
    })

    expect(wrapper.classes()).toContain('hover')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has shadow class when passed', () => {
    const wrapper = mount(KCard, {
      propsData: {
        testMode: true,
        hasShadow: true
      }
    })

    expect(wrapper.classes()).toContain('kcard-shadow')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KCard, {
      propsData: {
        testMode: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
