import { mount } from '@vue/test-utils'
import KCard from '@/KCard/KCard'

describe('KCard', () => {
  it('renders header slot when passed', () => {
    const cardTitle = 'Card Title'
    const wrapper = mount(KCard, {
      propsData: {
        hasBorder: true
      },
      slots: {
        'title': `<span>${cardTitle}</span>`
      }
    })

    expect(wrapper.find('.card-title').html()).toEqual(expect.stringContaining(cardTitle))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KCard, {
      propsData: {
        hasBorder: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
