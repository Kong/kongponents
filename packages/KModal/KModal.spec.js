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

  it('renders custom close button', () => {
    const buttonText = 'I should render in dismiss slot'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      },
      slots: {
        'footer-dismiss': `<button>${buttonText}</button>`
      }
    })

    const buttons = wrapper.findAll('button')

    expect(buttons.at(1).text()).toBe(buttonText)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders custom proceed button text & appearance', () => {
    const buttonText = 'click to continue'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        actionButtonAppearance: 'outline-primary',
        actionButtonText: buttonText
      }
    })

    const buttons = wrapper.findAll('button')

    expect(buttons.at(0).text()).toBe(buttonText)
    expect(buttons.at(0).classes()).toContain('outline-primary')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
