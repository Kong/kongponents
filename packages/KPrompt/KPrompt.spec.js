import { mount } from '@vue/test-utils'
import KPrompt from '@/KPrompt/KPrompt'

describe('KPrompt', () => {
  it('renders proper content when using slots', () => {
    const headerText = 'This is some header text'
    const bodyText = 'This is some body text'
    const actionButtonsText = 'This is some footer text'

    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true,
        title: headerText
      },
      slots: {
        'header-content': `<div>${headerText}</div>`,
        'body-content': `<div>${bodyText}</div>`,
        'action-buttons': `<div>${actionButtonsText}</div>`
      }
    })

    expect(wrapper.find('.k-prompt-header').html()).toEqual(expect.stringContaining(headerText))
    expect(wrapper.find('.k-prompt-body').html()).toEqual(expect.stringContaining(bodyText))
    expect(wrapper.find('.k-prompt-action-buttons').html()).toEqual(expect.stringContaining(actionButtonsText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const message = 'Sweet prop content'

    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true,
        title,
        message
      }
    })

    expect(wrapper.find('.k-prompt-header').html()).toEqual(expect.stringContaining(title))
    expect(wrapper.find('.k-prompt-body').html()).toEqual(expect.stringContaining(message))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders custom button text', () => {
    const actionButtonText = 'Sweet prop action button'
    const cancelButtonText = 'Sweet prop cancel button'

    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true,
        actionButtonText,
        cancelButtonText
      }
    })

    const buttons = wrapper.findAll('button')

    // button at 0 is close button in top right corner
    expect(buttons.at(1).text()).toBe(cancelButtonText)
    expect(buttons.at(2).text()).toBe(actionButtonText)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has a pending state', () => {
    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true,
        actionPending: true
      }
    })

    expect(wrapper.find('.k-prompt-proceed .kong-icon-spinner').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('enables correctly with confirmationText', () => {
    const confirmationText = 'I Agree'

    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true,
        confirmationText
      },
      attachToDocument: true
    })

    // disabled
    expect(wrapper.find('.k-prompt-action-buttons .k-prompt-proceed[disabled="disabled"]').exists()).toBe(true)

    const input = wrapper.find('[data-testid="confirmation-input"]')

    // bad input, still disabled
    input.setValue(confirmationText + 'x')
    // enable
    input.setValue(confirmationText)
    expect(wrapper.find('.k-prompt-action-buttons .k-prompt-proceed[disabled="disabled"]').exists()).toBe(false)
    wrapper.find('.k-prompt-action-buttons .k-prompt-proceed').trigger('click')

    expect(wrapper.emitted().proceed).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('proceeds when clicking action button', () => {
    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.find('.k-prompt-action-buttons .k-prompt-proceed').trigger('click')

    expect(wrapper.emitted().proceed).toHaveLength(1)
  })

  it('proceeds when clicking cancel buttons', () => {
    const wrapper = mount(KPrompt, {
      propsData: {
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.find('.k-prompt-header .close-button button').trigger('click')

    expect(wrapper.emitted().canceled).toHaveLength(1)

    wrapper.find('.k-prompt-action-buttons .k-prompt-cancel').trigger('click')

    expect(wrapper.emitted().canceled).toHaveLength(2)
  })

  it('tears down event listeners', () => {
    const AEL = jest.fn()
    const REL = jest.fn()

    window.document.addEventListener = AEL
    window.document.removeEventListener = REL

    const wrapper = mount(KPrompt, {
      propsData: {
      },
      attachToDocument: true
    })

    wrapper.destroy()
    expect(AEL).toHaveBeenCalled()
    expect(REL).toHaveBeenCalled()
  })
})
