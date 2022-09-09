import { mount } from '@vue/test-utils'
import KDateTimePicker from '@/KDateTimePicker/KDateTimePicker'

const tick = async (vm, times) => {
  for (let i = 0; i < times; ++i) {
    await vm.$nextTick()
  }
}

const parentDiv = document.createElement('div')

const todaysDate = new Date() // 'Thu Sep 08 2022 13:03:28 GMT-0700 (Pacific Daylight Time)'
const todaysDateString = todaysDate.toString()

// const clearButton = 'k-datetimepicker-clear'
const submitButton = 'k-datetimepicker-submit'
// const clickableDays = '.vc-day.in-month span[role="button"]'

describe('KDateTimePicker', () => {
  it('renders a calendar instance with a Single date and default value', async () => {
    const wrapper = await mount(KDateTimePicker, {
      propsData: {
        placeholder: 'Please select a date',
        mode: 'date',
        defaultCustom: todaysDate,
        range: false
      },
      attachTo: parentDiv
    })

    const pickerToggle = wrapper.find('button')

    //
    // Opens the date time picker, click "Apply"
    //
    pickerToggle.trigger('click')
    expect(wrapper.find('.k-popover-content').exists()).toBe(true)
    await tick(wrapper.vm, 1)

    // click "Apply" button
    wrapper.find(`[data-testid="${submitButton}"]`).trigger('click')

    expect(wrapper.emitted().change[0][0]).toEqual(todaysDateString)
  })

  /*
  it('emits an empty value when "Clear" is clicked', async () => {
    const wrapper = await mount(KDateTimePicker, {
      propsData: {
        placeholder: 'Please select a date',
        mode: 'date',
        defaultCustom: todaysDate,
        range: false
      },
      attachTo: parentDiv
    })
    const pickerToggle = wrapper.find('button')

    //
    // Open the date time picker, click "Clear"
    //
    pickerToggle.trigger('click')
    expect(wrapper.find('.k-popover-content').exists()).toBe(true)
    await tick(wrapper.vm, 1)
    expect(wrapper.find(`[data-testid="${clearButton}"]`).exists()).toBe(true)
    wrapper.find(`[data-testid="${clearButton}"]`).trigger('click')
    await tick(wrapper.vm, 1)
    expect(wrapper.emitted().change[0][0]).toEqual('')
  })
  */
})
