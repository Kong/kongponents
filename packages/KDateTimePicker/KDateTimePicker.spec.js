import { mount } from '@vue/test-utils'
import KDateTimePicker from '@/KDateTimePicker/KDateTimePicker'

const jsDateString = 'Thu Sep 08 2022 13:03:28 GMT-0700 (Pacific Daylight Time)'
// const clearButton = 'k-datetimepicker-clear'
const submitButton = 'k-datetimepicker-submit'

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

describe('KDateTimePicker', () => {
  it('renders a calendar instance with a Single date and default value', async () => {
    const wrapper = await mount(KDateTimePicker, {
      propsData: {
        placeholder: 'Please select a date',
        mode: 'date',
        defaultCustom: jsDateString,
        range: false
      }
    })

    // opens the date time picker
    const toggle = wrapper.find('button')

    toggle.trigger('click')

    await tick(wrapper.vm, 1)

    // clicks "Apply" button
    wrapper.find(`[data-testid="${submitButton}"]`).trigger('click')
    expect(wrapper.emitted().change).toEqual(jsDateString)

    // clicks "Cancel" button
    // wrapper.find(`[data-testid="${clearButton}"]`).trigger('click')
    // expect(wrapper.emitted().change).toHaveLength(1)
  })
})
