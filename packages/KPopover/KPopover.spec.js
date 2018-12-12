import { mount } from '@vue/test-utils'
import KPopover from '@/KPopover/KPopover'

const positions = ['top', 'right', 'bottom', 'right']
const alignments = ['left', 'center', 'right']

const rendersCorrectPosition = (variant) => {
  it(`renders popover to the ${variant} side`, () => {
    const wrapper = mount(KPopover, {
      propsData: {
        'position': `${variant}`,
        'message': `Im on the ${variant} side!`
      }
    })

    expect(wrapper.find('.k-popover').classes()).toContain(`k-popover-${variant}`)
  })
}

let rendersCorrectAlignment = (variant) => {
  it(`renders popover text aligned to the ${variant}`, () => {
    const wrapper = mount(KPopover, {
      propsData: {
        'alignment': `${variant}`,
        'message': `Im aligned to the ${variant}!`
      }
    })

    expect(wrapper.find('.k-popover').classes()).toContain(`text-${variant}`)
  })
}

describe('KPopover', () => {
  positions.map(p => rendersCorrectPosition(p))
  alignments.map(a => rendersCorrectAlignment(a))

  it('matches snapshot', () => {
    const wrapper = mount(KPopover, {
      propsData: {
        'message': 'Im inside the popover!'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
