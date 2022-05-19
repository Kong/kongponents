import { mount } from '@vue/test-utils'
import KInput from '@/KInput/KInput'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KInput', () => {
  it('renders text when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        value: 'Hello' // e.g. v-model
      }
    })

    expect(wrapper.find('input').element.value).toBe('Hello')
  })

  it('renders label when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        label: 'A Label!'
      }
    })

    expect(wrapper.find('.k-input-label').element.innerHTML).toContain('A Label!')
  })

  it('renders label with labelAttributes applied', () => {
    const labelText = 'A Label'
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        label: labelText,
        labelAttributes: {
          help: 'some help text'
        }
      }
    })

    expect(wrapper.find('.k-input-label').element.innerHTML).toContain(labelText)
    expect(wrapper.find('.k-input-label .kong-icon-help').exists()).toBeTruthy()
  })

  it('renders overlayed label when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        label: 'A Label!',
        overlayLabel: true
      }
    })

    expect(wrapper.find('.text-on-input label').element.innerHTML).toContain('A Label!')
  })

  it('renders small when size is passed in', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        size: 'small'
      }
    })

    expect(wrapper.find('.k-input-wrapper .k-input-small').exists()).toBeTruthy()
  })

  it('renders large when size is passed in', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        size: 'large'
      }
    })

    expect(wrapper.find('.k-input-wrapper .k-input-large').exists()).toBeTruthy()
  })

  it('renders help when value is passed', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        help: 'I am helpful'
      }
    })

    expect(wrapper.find('.k-input-wrapper .help').element.innerHTML).toContain('I am helpful')
  })

  it('shows a character count if the characterLimit prop is set and exceeded', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
        characterLimit: 5
      }
    })

    expect(wrapper.find('.k-input-wrapper .over-char-limit').exists()).toBeFalsy()

    wrapper.find('input.k-input').setValue('This input has too many characters')

    expect(wrapper.find('.k-input-wrapper .over-char-limit').exists()).toBeTruthy()
  })

  it('reacts to text changes', () => {
    const wrapper = mount(KInput, {
      propsData: {
        testMode: true,
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
        testMode: true,
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
