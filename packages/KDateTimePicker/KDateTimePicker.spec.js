import { mount } from '@vue/test-utils'
import { format, roundToNearestMinutes } from 'date-fns'
import KDateTimePicker from '@/KDateTimePicker/KDateTimePicker'

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

const today = new Date() // eg: 'Thu Sep 08 2022 13:03:28 GMT-0700 (Pacific Daylight Time)'
const todayDateString = format(new Date(today), 'PP')
// const todayDateTimeString = format(new Date(today), 'PP hh:mm a')

const timepickerDisplay = 'k-datetimepicker-display'
const submitButton = 'k-datetimepicker-submit'
// const clearButton = 'k-datetimepicker-clear'
// const clickableDays = '.vc-day.in-month span[role="button"]'

describe('KDateTimePicker', () => {
  it('renders a calendar instance with a Single date and default value, submits todays date', async () => {
    const wrapper = await mount(KDateTimePicker, {
      propsData: {
        placeholder: 'Please select a date',
        mode: 'date',
        defaultCustom: today,
        range: false
      }
    })

    const pickerToggle = wrapper.find('button')

    // Opens the date time picker, click "Apply"
    pickerToggle.trigger('click')
    expect(wrapper.find('.k-popover-content').exists()).toBe(true)
    await tick(wrapper.vm, 1)
    wrapper.find(`[data-testid="${submitButton}"]`).trigger('click')
    await tick(wrapper.vm, 1)

    // Check emitted raw date value, and the displayed value
    expect(wrapper.find(`[data-testid="${timepickerDisplay}"]`).element.innerHTML).toContain(todayDateString)
    expect(roundToNearestMinutes(wrapper.emitted().input[0][0])).toEqual(roundToNearestMinutes(today))
  })

  // it('emits an empty string when "Clear" is clicked', async () => {
  //   const wrapper = await mount(KDateTimePicker, {
  //     propsData: {
  //       placeholder: 'Please select a date',
  //       mode: 'date',
  //       defaultCustom: today,
  //       range: false
  //     }
  //   })
  //   const pickerToggle = wrapper.find('button')

  //   //
  //   // Open the date time picker, click "Clear"
  //   //
  //   pickerToggle.trigger('click')
  //   expect(wrapper.find('.k-popover-content').exists()).toBe(true)
  //   await tick(wrapper.vm, 1)
  //   expect(wrapper.find(`[data-testid="${clearButton}"]`).exists()).toBe(true)
  //   wrapper.find(`[data-testid="${clearButton}"]`).trigger('click')
  //   await tick(wrapper.vm, 1)
  //   expect(wrapper.emitted().input[0][0]).toEqual('')
  // })
})
