import { mount } from '@vue/test-utils'
import KPop from '@/KPop/KPop'

const positions = ['top', 'right', 'bottom', 'left']
const alignments = ['left', 'center', 'right']

const rendersCorrectPosition = (variant) => {
  it(`renders popover to the ${variant} side`, () => {
    const wrapper = mount(KPop, {
      propsData: {
        'position': variant,
        'message': `I'm on the ${variant} side!`
      }
    })

    expect(wrapper.find('.k-popover').classes()).toContain(`k-popover-${variant}`)
  })
}

let rendersCorrectAlignment = (variant) => {
  it(`renders popover text aligned to the ${variant}`, () => {
    const wrapper = mount(KPop, {
      propsData: {
        'alignment': variant,
        'message': `I'm aligned to the ${variant}!`
      }
    })

    expect(wrapper.element.style['text-align']).toEqual(variant)
  })
}

describe('KPop', () => {
  positions.map(p => rendersCorrectPosition(p))
  alignments.map(a => rendersCorrectAlignment(a))

  it('matches snapshot', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'message': `I'm inside the popover!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
