import { mount } from '@vue/test-utils'
import KoolTip from '@/KoolTip/KoolTip'

const positions = ['top', 'right', 'bottom', 'left']
const alignments = ['left', 'center', 'right']

const rendersCorrectPosition = (variant) => {
  it(`renders tooltip to the ${variant} side`, () => {
    const wrapper = mount(KoolTip, {
      propsData: {
        'position': variant,
        'message': `I'm on the ${variant} side!`
      }
    })

    expect(wrapper.find('.k-tooltip').classes()).toContain(`k-tooltip-${variant}`)
  })
}

let rendersCorrectAlignment = (variant) => {
  it(`renders tooltip text aligned to the ${variant}`, () => {
    const wrapper = mount(KoolTip, {
      propsData: {
        'alignment': variant,
        'message': `I'm aligned to the ${variant}!`
      }
    })

    expect(wrapper.element.style['text-align']).toEqual(variant)
  })
}

describe('KoolTip', () => {
  positions.map(p => rendersCorrectPosition(p))
  alignments.map(a => rendersCorrectAlignment(a))

  it('matches snapshot', () => {
    const wrapper = mount(KoolTip, {
      propsData: {
        'message': `I'm inside the tooltip!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})