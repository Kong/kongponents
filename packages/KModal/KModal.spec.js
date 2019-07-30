import { mount } from '@vue/test-utils'
import KModal from '@/KModal/KModal'

describe('KModal', () => {
  it('renders header slots are passed', () => {
    const headerText = 'This is some header text'
    const bodyText = 'This is some body text'
    const footerText = 'This is some footer text'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      },
      slots: {
        'header-content': `<div>${headerText}</div>`,
        'body-content': `<div>${bodyText}</div>`,
        'footer-content': `<div>${footerText}</div>`
      }
    })

    expect(wrapper.find('.modal-header').html()).toEqual(expect.stringContaining(headerText))
    expect(wrapper.find('.modal-body').html()).toEqual(expect.stringContaining(bodyText))
    expect(wrapper.find('.modal-footer').html()).toEqual(expect.stringContaining(footerText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders custom button text & appearance', () => {
    const confirmText = 'click to continue'
    const cancelText = 'click to cancel'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        actionButtonAppearance: 'outline-primary',
        actionButtonText: confirmText,
        cancelButtonAppearance: 'outline-danger',
        cancelButtonText: cancelText
      }
    })

    const buttons = wrapper.findAll('button')

    expect(buttons.at(0).text()).toBe(confirmText)
    expect(buttons.at(0).classes()).toContain('outline-primary')
    expect(buttons.at(1).text()).toBe(cancelText)
    expect(buttons.at(1).classes()).toContain('outline-danger')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
