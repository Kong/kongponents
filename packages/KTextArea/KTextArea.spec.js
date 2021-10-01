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

  it('reacts to text changes', () => {
    const wrapper = mount(KTextArea, {
      propsData: {
        testMode: true,
        value: 'hey'
      }
    })
    const textArea = wrapper.find('textarea')

    expect(textArea.element.value).toBe('hey')
    textArea.setValue('hey, dude')

    expect(wrapper.emitted().textArea).toHaveLength(1)
    expect(wrapper.emitted().textArea[0]).toEqual(['hey, dude'])
    expect(textArea.element.value).toBe('hey, dude')
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
