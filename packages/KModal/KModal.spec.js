import { mount } from '@vue/test-utils'
import KModal from '@/KModal/KModal'

describe('KModal', () => {
  it('renders header slot when passed', () => {
    const headerText = 'This is some header text'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      },
      slots: {
        'header-content': `<div>${headerText}</div>`
      }
    })

    expect(wrapper.find('.modal-header').html())
      .toEqual(expect.stringContaining(headerText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
