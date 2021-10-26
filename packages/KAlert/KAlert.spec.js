import { mount } from '@vue/test-utils'
import { default as KAlert, appearances } from './KAlert.vue'

let rendersCorrectVariant = (variant) => {
  it(`Renders ${variant} variant`, () => {
    const wrapper = mount(KAlert, {
      propsData: {
        'appearance': `${variant}`,
        'message': `I am ${variant}`
      }
    })

    expect(wrapper.find('.k-alert').classes()).toContain(`${variant}`)
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KAlert', () => {
  Object.keys(appearances).map(v => rendersCorrectVariant(v))

  it('renders info variant when no appearance prop', () => {
    const wrapper = mount(KAlert, {
      propsData: {
        'message': 'I should be info!'
      }
    })

    expect(wrapper.find('.k-alert').classes()).toContain('info')
  })

  it('does not render if isShowing set to false', () => {
    const wrapper = mount(KAlert, {
      propsData: {
        'isShowing': false
      }
    })

    expect(wrapper.isEmpty()).toBe(true)
  })

  it('renders borders on the expected sides', () => {
    const wrapperBorderLeft = mount(KAlert, {
      propsData: {
        message: 'Hello world',
        hasLeftBorder: true
      }
    })
    const wrapperBorderRight = mount(KAlert, {
      propsData: {
        message: 'Hello world',
        hasRightBorder: true
      }
    })
    const wrapperBorderBottom = mount(KAlert, {
      propsData: {
        message: 'Hello world',
        hasBottomBorder: true
      }
    })
    const wrapperBorderTop = mount(KAlert, {
      propsData: {
        message: 'Hello world',
        hasTopBorder: true
      }
    })

    expect(wrapperBorderLeft.attributes('class')).toContain('hasLeftBorder')
    expect(wrapperBorderRight.attributes('class')).toContain('hasRightBorder')
    expect(wrapperBorderBottom.attributes('class')).toContain('hasBottomBorder')
    expect(wrapperBorderTop.attributes('class')).toContain('hasTopBorder')
  })

  it('renders large alert box', () => {
    const wrapperLargeAlert = mount(KAlert, {
      propsData: {
        message: 'Hello world',
        isLarge: true
      }
    })

    expect(wrapperLargeAlert.attributes('class')).toContain('isLarge')
  })

  // it('renders slots when passed', () => {
  //   const alertButtons = 'Extra button'
  //   const alertMessage = 'Hello World'
  //   const additionalAlertMessage = 'I am an alert'
  //   const wrapper = mount(KAlert, {
  //     propsData: {
  //       dismissType: 'button',
  //       isLarge: true,
  //       hasExtraButtons:
  //     },
  //     slots: {
  //       'alertButtons': `<span>${alertButtons}</span>`,
  //       'alertMessage': `<span>${alertMessage}</span>`,
  //       'additionalAlertMessage': `<span>${additionalAlertMessage}</span>`
  //     }
  //   })

  //   expect(wrapper.find('.k-alert div.alert-action').html()).toEqual(expect.stringContaining(alertButtons))
  //   expect(wrapper.find('.alert-msg').html()).toEqual(expect.stringContaining(alertMessage))
  //   expect(wrapper.find('.additionalAlertMessage').html()).toEqual(expect.stringContaining(additionalAlertMessage))
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
