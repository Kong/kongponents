import { mount } from '@vue/test-utils'
import { default as KAlert, appearances } from './KAlert.vue'

let rendersCorrectVariant = (variant) => {
  it(`Renders ${variant} variant`, () => {
    const wrapper = mount(KAlert, {
      propsData: {
        'isShowing': true,
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
        'isShowing': true,
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
        'isShowing': true,
        message: 'Hello world',
        hasLeftBorder: true
      }
    })
    const wrapperBorderRight = mount(KAlert, {
      propsData: {
        'isShowing': true,
        message: 'Hello world',
        hasRightBorder: true
      }
    })
    const wrapperBorderBottom = mount(KAlert, {
      propsData: {
        'isShowing': true,
        message: 'Hello world',
        hasBottomBorder: true
      }
    })
    const wrapperBorderTop = mount(KAlert, {
      propsData: {
        'isShowing': true,
        message: 'Hello world',
        hasTopBorder: true
      }
    })

    expect(wrapperBorderLeft.attributes('class')).toContain('hasLeftBorder')
    expect(wrapperBorderRight.attributes('class')).toContain('hasRightBorder')
    expect(wrapperBorderBottom.attributes('class')).toContain('hasBottomBorder')
    expect(wrapperBorderTop.attributes('class')).toContain('hasTopBorder')
  })
})
