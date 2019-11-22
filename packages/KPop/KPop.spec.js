import { mount, shallowMount } from '@vue/test-utils'
import KPop from '@/KPop/KPop'

describe('KPop', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'width': '350',
        'title': 'Cool Beans!',
        'content': `I am a cool popover!`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct width', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'width': '350'
      }
    })
    const popper = wrapper.find('.k-popover')

    expect(popper.element.style['width']).toEqual('350px')
  })

  it('renders with correct title', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'title': 'Cool Beans!'
      }
    })
    const popperTitle = wrapper.find('.k-popover-title')

    expect(popperTitle.text()).toEqual('Cool Beans!')
  })

  it('has no title if no prop', () => {
    const wrapper = mount(KPop)

    expect(wrapper.findAll('.k-popover-title').exists()).toBe(false)
  })

  it('shows element on click', () => {
    const wrapper = shallowMount(KPop, {
      propsData: {
        title: 'Popover Title'
      },
      slots: {
        default: '<div class="slottedEl">Slotted element</div>'
      }
    })

    const slottedEl = wrapper.find('.slottedEl')

    expect(wrapper.vm.isShow).toBe(false)
    slottedEl.trigger('click')
    expect(wrapper.vm.isShow).toBe(true)
  })

  it('shows element on hover', () => {
    const wrapper = shallowMount(KPop, {
      propsData: {
        title: 'Popover Title',
        trigger: 'hover'
      },
      slots: {
        default: '<div class="slottedEl">Slotted element</div>'
      }
    })

    const slottedEl = wrapper.find('.slottedEl')

    expect(wrapper.vm.isShow).toBe(false)
    slottedEl.trigger('mouseenter')
    expect(wrapper.vm.isShow).toBe(true)

    wrapper.destroy()
  })
})
