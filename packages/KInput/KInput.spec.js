import { mount } from '@vue/test-utils'
import KInput from '@/KInput/KInput'

describe('KInput', () => {
  it('renders text when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        value: 'Hello' // e.g. v-model
      }
    })

    expect(wrapper.find('input').element.value).toBe('Hello')
  })

  it('renders label when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        label: 'A Label!'
      }
    })

    expect(wrapper.find('.text-on-input label').element.innerHTML).toContain('A Label!')
  })

  it('renders small when size is passed in', () => {
    const wrapper = mount(KInput, {
      propsData: {
        size: 'small'
      }
    })

    expect(wrapper.find('.k-input-wrapper .k-input-small').exists()).toBeTruthy()
  })

  it('renders large when size is passed in', () => {
    const wrapper = mount(KInput, {
      propsData: {
        size: 'large'
      }
    })

    expect(wrapper.find('.k-input-wrapper .k-input-large').exists()).toBeTruthy()
  })

  it('renders help when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        help: 'I am helpful'
      }
    })

    expect(wrapper.find('.k-input-wrapper .help').element.innerHTML).toContain('I am helpful')
  })

  it('reacts to text changes', () => {
    const wrapper = mount(KInput, {
      propsData: {
        value: 'hey'
      }
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('hey')
    input.setValue('hey, dude')

    expect(wrapper.emitted().input).toHaveLength(1)
    expect(wrapper.emitted().input[0]).toEqual(['hey, dude'])
    expect(input.element.value).toBe('hey, dude')
  })

  it('matches snapshot', () => {
    const wrapper = mount(KInput, {
      propsData: {
        value: 'Full Name',
        placeholder: 'I am a placeholder',
        name: 'custom-input-name',
        id: 'custom-input-id',
        'data-testid': 'custom-input'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
