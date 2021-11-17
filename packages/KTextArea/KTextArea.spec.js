import { mount } from '@vue/test-utils'
import KTextArea from '@/KTextArea/KTextArea'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Debug mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */

describe('KTextArea', () => {
  it('renders text when value is passed', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        value: 'Hello' // e.g. v-model
      }
    })

    expect(wrapper.find('textarea').element.value).toBe('Hello')
  })

  it('renders label when value is passed', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        label: 'A Label!'
      }
    })

    expect(wrapper.find('.text-on-input label').element.innerHTML).toContain('A Label!')
  })

  it('renders textarea when rows and cols are passed in', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        rows: 2,
        cols: 15
      }
    })

    expect(wrapper.find('textarea').exists()).toBeTruthy()
  })

  it('reacts to text changes', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        value: 'hey'
      }
    })
    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toBe('hey')
    textarea.setValue('hey, dude')

    expect(wrapper.emitted().textarea).toHaveLength(1)
    expect(wrapper.emitted().textarea[0]).toEqual(['hey, dude'])
    expect(textarea.element.value).toBe('hey, dude')
  })

  it('can configure character limit', () => {
    const charLimit = 500
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        characterLimit: charLimit
      }
    })

    expect(wrapper.find('.char-limit').html()).toContain(charLimit)
  })

  it('should have style when value exceeds the character limit', () => {
    const value = 'abc'.repeat(683)
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        value
      }
    })
    const textarea = wrapper.find('textarea')

    textarea.setValue(value)
    expect(wrapper.find('textarea').element.value).toBe(value)
    expect(wrapper.find('div.over-char-limit').exists()).toBe(true)
  })

  it('should allow disabling character limit', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        disableCharacterLimit: true
      }
    })

    expect(wrapper.find('.char-limit').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        value: 'Full Name',
        placeholder: 'I am a placeholder',
        name: 'custom-textArea-name',
        id: 'custom-textArea-id',
        'data-testid': 'custom-textArea'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
