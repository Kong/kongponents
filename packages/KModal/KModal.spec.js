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

  it('close when hitting escape', () => {
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      },
      attachToDocument: true
    })

    const mockFn = jest.fn()

    wrapper.setMethods({ close: mockFn })

    wrapper.find('.k-modal').trigger('keydown.esc')
    expect(mockFn).toBeCalledTimes(1)
  })

  it('proceeds when clicking action button', () => {
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      },
      attachToDocument: true
    })

    const mockFn = jest.fn()

    wrapper.setMethods({ proceed: mockFn })

    wrapper.find('.modal-footer button').trigger('click')
    expect(mockFn).toBeCalledTimes(1)
  })

  it('emits close when backdrop is clicked', () => {
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true
      }
    })

    const backdrop = wrapper.find('.modal-backdrop')

    backdrop.trigger('click')
    expect(wrapper.emitted().canceled).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KModal)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
