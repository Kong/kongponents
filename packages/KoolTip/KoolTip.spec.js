import { mount } from '@vue/test-utils'
import KoolTip from '@/KoolTip/KoolTip'

const positions = ['top', 'right', 'bottom', 'left']

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
const rendersCorrectPosition = (variant) => {
  it(`renders tooltip to the ${variant} side`, () => {
    const wrapper = mount(KoolTip, {
      propsData: {
        testMode: true,
        'placement': variant,
        'label': `I'm on the ${variant} side!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KoolTip', () => {
  positions.map(p => rendersCorrectPosition(p))

  it('matches snapshot', () => {
    const wrapper = mount(KoolTip, {
      propsData: {
        testMode: true,
        'label': `I'm inside the tooltip!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('allow class to be passed through', async () => {
    const Component = {
      template: `
        <KoolTip :class="theClass" label="hey">
          <button>click</button>
        </Kooltip>
      `,
      props: {
        testMode: true,
        theClass: {
          type: String
        }
      }
    }
    const wrapper = mount(Component, {
      components: {KoolTip},
      propsData: {
        testMode: true,
        theClass: 'color-blue'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.kooltip').classes()).toContain('color-blue')
  })
})
