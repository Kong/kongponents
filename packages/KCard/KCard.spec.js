import { mount } from '@vue/test-utils'
import KCard from '@/KCard/KCard'

describe('KCard', () => {
  it('renders slots when passed', () => {
    const cardTitle = 'Card Title'
    const cardBody = 'Card Body'
    const wrapper = mount(KCard, {
      slots: {
        'title': `<span>${cardTitle}</span>`,
        'body': `<div>${cardBody}</div>`
      }
    })

    expect(wrapper.find('.k-card-title').html()).toEqual(expect.stringContaining(cardTitle))
    expect(wrapper.find('.k-card-body').html()).toEqual(expect.stringContaining(cardBody))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has border class when passed', () => {
    const wrapper = mount(KCard, {
      propsData: {
        hasBorder: true
      }
    })

    expect(wrapper.classes()).toContain('border')
  })

  it('has hover class when passed', () => {
    const wrapper = mount(KCard, {
      propsData: {
        hasHover: true
      }
    })

    expect(wrapper.classes()).toContain('hover')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KCard)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
