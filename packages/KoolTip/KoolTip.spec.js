import { mount } from '@vue/test-utils'
import KoolTip from '@/KoolTip/KoolTip'

const positions = ['top', 'right', 'bottom', 'left']

const rendersCorrectPosition = (variant) => {
  it(`renders tooltip to the ${variant} side`, () => {
    const wrapper = mount(KoolTip, {
      propsData: {
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
        theClass: {
          type: String
        }
      }
    }
    const wrapper = mount(Component, {
      components: {KoolTip},
      propsData: {
        theClass: 'color-blue'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.kooltip').classes()).toContain('color-blue')
  })
})
