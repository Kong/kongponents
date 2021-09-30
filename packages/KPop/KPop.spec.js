import { mount, shallowMount } from '@vue/test-utils'
import KPop from '@/KPop/KPop'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Debug mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KPop', () => {
  it('renders props when passed', () => {
    const popButtonText = 'Click Me!'
    const popTitle = 'Cool Beans!'

    const wrapper = mount(KPop, {
      propsData: {
        testMode: true,
        buttonText: popButtonText,
        title: popTitle
      }
    })

    expect(wrapper.find('[data-testid="kpop-button"]').html()).toEqual(expect.stringContaining(popButtonText))
    expect(wrapper.find('.k-popover-title').html()).toEqual(expect.stringContaining(popTitle))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders slots when passed', () => {
    const popTitle = 'Look Mah!'
    const popActions = 'Pop Actions'
    const popContent = 'Pop Content'
    const popFooter = 'Pop Footer'

    const wrapper = mount(KPop, {
      propsData: {
        testMode: true
      },
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
        testMode: true,
        'width': 'auto'
      }
    })
    const popper = wrapper.find('.k-popover')

    expect(popper.element.style['width']).toEqual('auto')
  })

  it('renders with correct px width', () => {
    const wrapper = mount(KPop, {
      propsData: {
        testMode: true,
        'width': '350'
      }
    })
    const popper = wrapper.find('.k-popover')

    expect(popper.element.style['width']).toEqual('350px')
  })

  it('renders with correct title', () => {
    const wrapper = mount(KPop, {
      propsData: {
        testMode: true,
        'title': 'Cool Beans!'
      }
    })
    const popperTitle = wrapper.find('.k-popover-title')

    expect(popperTitle.text()).toEqual('Cool Beans!')
  })

  it('has no title if no prop', () => {
    const wrapper = mount(KPop, {
      propsData: {
        testMode: true
      }
    })

    expect(wrapper.findAll('.k-popover-title').exists()).toBe(false)
  })

  it('shows element on click', () => {
    const wrapper = shallowMount(KPop, {
      propsData: {
        testMode: true,
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
        testMode: true,
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
