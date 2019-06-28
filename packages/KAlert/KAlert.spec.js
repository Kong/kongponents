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
})
