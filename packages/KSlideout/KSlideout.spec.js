import { mount } from '@vue/test-utils'
import KSlideout from '@/KSlideout/KSlideout'

describe('KSlideout', () => {
  it('renders default slot', () => {
    const wrapper = mount(KSlideout, {
      propsData: {
        isVisible: true
      },
      slots: {
        default: `<div>
          <h1>Sup default</h1>
          <p>default slots are the best</p>
        </div>`
      }
    })

    const h1 = wrapper.find('h1')
    const p = wrapper.find('p')

    expect(h1.isVisible()).toBe(true)
    expect(p.isVisible()).toBe(true)
  })

  it('emits close when panel-background is clicked', () => {
    const wrapper = mount(KSlideout, {
      propsData: {
        isVisible: true
      }
    })

    const backdrop = wrapper.find('.panel-background')

    backdrop.trigger('click')
    expect(wrapper.emitted().close).toHaveLength(1)
  })

  it('emits close when esc key pressed', () => {
    const wrapper = mount(KSlideout, {
      propsData: {
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.trigger('keydown.esc')
    expect(wrapper.emitted().close).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KSlideout)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
