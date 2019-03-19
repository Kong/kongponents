import { mount, config } from '@vue/test-utils'
import KToaster from '@/KToaster/KToaster'
config.silent = true

const variants = ['success', 'danger', 'warning', 'info']

let rendersCorrectVariant = (variant) => {
  it(`renders ${variant} variant`, () => {
    const wrapper = mount(KToaster, {
      propsData: {
        'appearance': `${variant}`,
        'isVisible': true,
        'message': 'cool test'
      }
    })

    expect(wrapper.find('.k-toast').classes()).toContain(`${variant}`)
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KToaster', () => {
  variants.map(v => rendersCorrectVariant(v))

  it('renders info variant when no appearance prop', () => {
    const wrapper = mount(KToaster, {
      propsData: {
        'message': 'no variant',
        'isVisible': true
      }
    })

    expect(wrapper.find('.k-toast').classes()).toContain('info')
  })
})
