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

  it('renders slots when passed', () => {
    const popTitle = 'Card Status Hat'
    const popActions = 'Card Title'
    const popContent = 'Card Actions'
    const popFooter = 'Card Body'

    const wrapper = mount(KPop, {
      slots: {
        'title': `<span>${popTitle}</span>`,
        'actions': `<span>${popActions}</span>`,
        'content': `<div>${popContent}</div>`,
        'footer': `<span>${popFooter}</span>`
      }
    })

    expect(wrapper.find('.k-popover-title').html()).toEqual(expect.stringContaining(popTitle))
    expect(wrapper.find('.k-popover-actions').html()).toEqual(expect.stringContaining(popActions))
    expect(wrapper.find('.k-popover-content').html()).toEqual(expect.stringContaining(popContent))
    expect(wrapper.find('.k-popover-footer').html()).toEqual(expect.stringContaining(popFooter))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct auto width', () => {
    const wrapper = mount(KPop, {
      propsData: {
        'width': 'auto'
      }
    })
    const popper = wrapper.find('.k-popover')

    expect(popper.element.style['width']).toEqual('auto')
  })

  it('renders with correct px width', () => {
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

    expect(wrapper.vm.isOpen).toBe(false)
    slottedEl.trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)
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

    expect(wrapper.vm.isOpen).toBe(false)
    slottedEl.trigger('mouseenter')
    expect(wrapper.vm.isOpen).toBe(true)

    wrapper.destroy()
  })
})
