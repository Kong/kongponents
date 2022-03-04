import { mount } from '@vue/test-utils'
import KModalFullscreen from '@/KModalFullscreen/KModalFullscreen'

describe('KModalFullscreen', () => {
  it('renders proper content when using slots', () => {
    const headerIcon = 'This is some header icon text'
    const headerText = 'This is some header text'
    const bodyHeader = 'This is some body header text'
    const bodyHeaderDescription = 'This is some body header description text'
    const bodyText = 'This is some body text'
    const wrapper = mount(KModalFullscreen, {
      propsData: {
        isVisible: true,
        title: headerText
      },
      slots: {
        'header-icon': `<div>${headerIcon}</div>`,
        'header-content': `<div>${headerText}</div>`,
        'body-header': `<div>${bodyHeader}</div>`,
        'body-header-description': `<div>${bodyHeaderDescription}</div>`,
        'body-content': `<div>${bodyText}</div>`
      }
    })

    expect(wrapper.find('.k-modal-fullscreen-title .header-icon').html()).toEqual(expect.stringContaining(headerIcon))
    expect(wrapper.find('.k-modal-fullscreen-header').html()).toEqual(expect.stringContaining(headerText))
    expect(wrapper.find('.k-modal-fullscreen-body-header .body-header').html()).toEqual(expect.stringContaining(bodyHeader))
    expect(wrapper.find('.k-modal-fullscreen-body-header .body-header-description').html()).toEqual(expect.stringContaining(bodyHeaderDescription))
    expect(wrapper.find('.k-modal-fullscreen-body').html()).toEqual(expect.stringContaining(bodyText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using action-buttons slot', () => {
    const actionButtonsText = 'This is some action buttons text'
    const wrapper = mount(KModalFullscreen, {
      propsData: {
        isVisible: true,
        title: 'Test Me'
      },
      slots: {
        'action-buttons': `<div>${actionButtonsText}</div>`
      }
    })

    expect(wrapper.find('.k-modal-fullscreen-action').html()).toEqual(expect.stringContaining(actionButtonsText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const actionButtonText = 'Sweet prop actionButton'
    const cancelButtonText = 'Sweet prop cancelButton'
    const bodyHeader = 'Sweet prop bodyHeader'
    const bodyHeaderDescription = 'Sweet prop bodyHeaderDescription'
    const content = 'Sweet prop content'
    const wrapper = mount(KModalFullscreen, {
      propsData: {
        isVisible: true,
        title,
        actionButtonText,
        cancelButtonText,
        bodyHeader,
        bodyHeaderDescription,
        content,
        iconString: 'immunity'
      }
    })

    expect(wrapper.find('.k-modal-fullscreen-title .header-icon .kong-icon-immunity').exists()).toBeTruthy()
    expect(wrapper.find('.cancel-button').html()).toEqual(expect.stringContaining(cancelButtonText))
    expect(wrapper.find('.proceed-button').html()).toEqual(expect.stringContaining(actionButtonText))
    expect(wrapper.find('.k-modal-fullscreen-header').html()).toEqual(expect.stringContaining(title))
    expect(wrapper.find('.k-modal-fullscreen-body-header .body-header').html()).toEqual(expect.stringContaining(bodyHeader))
    expect(wrapper.find('.k-modal-fullscreen-body-header .body-header-description').html()).toEqual(expect.stringContaining(bodyHeaderDescription))
    expect(wrapper.find('.k-modal-fullscreen-body').html()).toEqual(expect.stringContaining(content))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits close when hitting escape', () => {
    const wrapper = mount(KModalFullscreen, {
      propsData: {
        title: 'Test Me',
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.find('.k-modal-fullscreen').trigger('keydown.esc')
    expect(wrapper.emitted().canceled).toHaveLength(1)
  })

  it('tears down event listeners', () => {
    const AEL = jest.fn()
    const REL = jest.fn()

    window.document.addEventListener = AEL
    window.document.removeEventListener = REL

    const wrapper = mount(KModalFullscreen, {
      propsData: {
        title: 'Test Me'
      },
      attachToDocument: true
    })

    wrapper.destroy()
    expect(AEL).toHaveBeenCalledTimes(1)
    expect(REL).toHaveBeenCalledTimes(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KModalFullscreen, {
      propsData: {
        title: 'Test Me'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
