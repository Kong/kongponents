import { mount } from 'cypress/vue'
import { format } from 'date-fns'
import { TimePeriods, TimeframeKeys } from '@mocks/KDateTimePickerMockData'
import KDateTimePicker from '@/components/KDateTimePicker/KDateTimePicker.vue'

const exampleTimeFrames = [
  {
    section: 'Last',
    values: [
      TimePeriods.get(TimeframeKeys.FIFTEEN_MIN),
      TimePeriods.get(TimeframeKeys.ONE_HOUR),
      TimePeriods.get(TimeframeKeys.SIX_HOUR),
      TimePeriods.get(TimeframeKeys.TWELVE_HOUR),
      TimePeriods.get(TimeframeKeys.ONE_DAY),
      TimePeriods.get(TimeframeKeys.SEVEN_DAY),
      TimePeriods.get(TimeframeKeys.THIRTY_DAY),
    ],
  },
  {
    section: 'Current',
    values: [
      TimePeriods.get(TimeframeKeys.CURRENT_WEEK),
      TimePeriods.get(TimeframeKeys.CURRENT_MONTH),
    ],
  },
  {
    section: 'Previous',
    values: [
      TimePeriods.get(TimeframeKeys.PREVIOUS_WEEK),
      TimePeriods.get(TimeframeKeys.PREVIOUS_MONTH),
    ],
  },
]

const today = new Date() // eg: 'Thu Sep 08 2022 13:03:28 GMT-0700 (Pacific Daylight Time)'
const todayDateString = format(new Date(today), 'PP')
const todayDateTimeString = format(new Date(today), 'PP hh:mm a')
const twoDaysAgo = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000))
const minDate = new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000))
const maxDate = today
const singleDate = {
  start: today,
  end: null,
  timePeriodsKey: '',
}
const defaultTimeRange = {
  start: twoDaysAgo,
  end: today,
  timePeriodsKey: TimeframeKeys.ONE_DAY,
}
const emptyTimeRange = {
  start: null,
  end: null,
  timePeriodKey: null,
}

const timepickerInput = 'k-datetime-picker-input'
const submitButton = 'k-datetime-picker-submit'
const clearButton = 'k-datetime-picker-clear'
const segmentedToggle = 'k-datetime-picker-toggle'

describe('KDateTimePicker', () => {
  it('renders without calendar icon', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        icon: false,
        range: false,
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).find('.kong-icon').should('not.exist')
    cy.getTestId(clearButton).should('not.exist')
  })

  it('renders with clear button', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: singleDate,
        clearButton: true,
        icon: false,
        range: false,
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(timepickerInput).should('contain.text', todayDateTimeString)
  })

  it('renders a date picker with placeholder message and correct width', () => {
    const placeholderText = 'Customer-facing message'
    const width = 500

    mount(KDateTimePicker, {
      props: {
        clearButton: true,
        mode: 'date',
        modelValue: singleDate,
        placeholder: placeholderText,
        range: false,
        width: width + '',
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).invoke('outerWidth').should('eq', width)

    // Open the date time picker, click "Clear" and make sure default placeholder is shown
    cy.getTestId(timepickerInput).click()
    const wrapper = cy.get('.k-popover-content')
    wrapper.should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(clearButton).eq(0).click()
    cy.getTestId(timepickerInput).should('contain.text', placeholderText)
  })

  it('renders a date picker', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        range: false,
      },
    })
    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).click()
    cy.get('.vc-pane-container').should('exist')
    cy.get('.vc-pane-container').find('.vc-time-picker').should('not.exist')
  })

  it('renders a single date and time picker', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: singleDate,
        range: false,
      },
    })
    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).click()
    cy.get('.vc-pane-container').should('exist')
    cy.get('.vc-pane-container').find('.vc-time-picker').should('exist')
    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', todayDateTimeString)
  })

  it('renders a range date and time picker', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        minDate,
        maxDate,
        range: true,
      },
    })

    const wrapper = cy.get('.k-datetime-picker')
    wrapper.should('exist')
    wrapper.getTestId(timepickerInput).should('exist')
    wrapper.getTestId(timepickerInput).click()
    wrapper.get('.vc-pane-container .vc-time-picker').should('exist')
  })

  it('displays a valid date when "Submit" is clicked', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        clearButton: true,
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Submit"
    cy.getTestId(timepickerInput).click()
    cy.get('.k-popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(submitButton).should('exist')
  })

  it('disables "Apply" button when "Clear" is clicked', () => {
    mount(KDateTimePicker, {
      props: {
        clearButton: true,
        mode: 'date',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Clear"
    cy.getTestId(timepickerInput).click()
    cy.get('.k-popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(submitButton).should('exist')

    // "Apply" button is disabled after selection is cleared
    cy.getTestId(clearButton).eq(0).click()
    cy.getTestId(submitButton).invoke('attr', 'disabled').should('eq', 'disabled')
  })

  it('displays todays date after clicking "Apply', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        range: false,
      },
    })

    // Open the date time picker, click "Submit"
    cy.getTestId(timepickerInput).click()
    cy.getTestId(submitButton).eq(0).click()

    // Check emitted raw date value, and the displayed value - should be the same, if rounded
    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', todayDateString)
  })

  it('renders relative time frames, and makes a selection', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.get('.timeframe-section').should('exist')
    cy.get('.timeframe-buttons').should('exist')

    // Click on "6 hours", check whether selected class is applied
    cy.getTestId('select-timeframe-21600000').click()
    cy.get('.k-popover-content').find('.timeframe-btn.selected-option').should('contain.text', '6 hours')
  })

  it('renders custom calendar and relative time frames', { includeShadowDom: false }, () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        minDate,
        maxDate,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })
    cy.getTestId(timepickerInput).click()

    // Check that time frames render
    cy.getTestId(segmentedToggle).find('button[name="relative"]').eq(0).click()
    cy.get('.timeframe-section').should('exist')
    cy.get('.timeframe-buttons').should('exist')

    // Check that calendar month and 2 x time selection inputs show up
    cy.getTestId(segmentedToggle).find('button[name="custom"]').eq(0).click()
    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
  })

  it('renders calendar with only the day (month) selection, but not time', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId(segmentedToggle).find('button[name="custom"]').eq(0).click()
    // On the calendar side, we should see the month view, but not the time picker
    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
    cy.get('.k-datetime-picker .vc-pane-container .vc-time-picker').should('not.exist')
  })

  it('renders date only calendar and displays time range in `PP` format', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        range: true,
        modelValue: defaultTimeRange,
      },
    })

    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', todayDateString)
  })

  it('renders relativeDateTime calendar and displays time range in `PP hh:mm a` format', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', todayDateTimeString)
  })

  it('renders calendar, even if seeded with an invalid date range', () => {
    const placeholderText = 'Please choose valid start and end dates'

    mount(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: emptyTimeRange,
        placeholder: placeholderText,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId(segmentedToggle).find('button[name="custom"]').eq(0).click()

    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
    cy.get('.k-datetime-picker .vc-pane-container .vc-time-picker').should('not.exist')

    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', placeholderText)

    // "Apply" button should be disabled
    cy.getTestId(submitButton).should('be.disabled')

    // If a timeframe is selected, "Apply" should be re-enabled
    cy.getTestId(segmentedToggle).find('button[name="relative"]').eq(0).click()
    cy.getTestId('select-timeframe-86400000').click()
    cy.getTestId(submitButton).eq(0).click()
    cy.getTestId(timepickerInput).find('.timepicker-display').should('contain.text', 'Last 24 hours')
  })
})
