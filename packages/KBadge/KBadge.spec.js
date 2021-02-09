import { mount } from '@vue/test-utils'
import { default as KBadge, appearances } from '@/KBadge/KBadge'

const rendersCorrectAppearance = (variant) => {
  it(`renders KBadge with the ${variant} appearance`, () => {
    const wrapper = mount(KBadge, {
      propsData: {
        'appearance': variant
      },
      slots: {
        default: variant
      }
    })

    expect(wrapper.find('.k-badge').classes()).toContain(`kbadge-${variant}`)
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KBadge', () => {
  Object.keys(appearances).map(a => rendersCorrectAppearance(a))

  it('matches snapshot', () => {
    const wrapper = mount(KBadge)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('defaults to default badge', () => {
    const wrapper = mount(KBadge, {
      slots: {
        default: 'Hello!'
      }
    })

    expect(wrapper.find('.k-badge-default')).toBeDefined()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('handles custom colors', () => {
    const wrapper = mount(KBadge, {
      propsData: {
        appearance: 'custom',
        color: 'white',
        backgroundColor: 'red'
      },
      slots: {
        default: 'Hello!'
      }
    })

    expect(wrapper.find('.k-badge').element.style.color).toEqual('white')
    expect(wrapper.find('.k-badge').element.style.backgroundColor).toEqual('red')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
