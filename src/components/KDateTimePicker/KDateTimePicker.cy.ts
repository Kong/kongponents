import { format } from 'date-fns'
import { TimePeriods, TimeframeKeys } from '@mocks/KDateTimePickerMockData'
import KDateTimePicker from '@/components/KDateTimePicker/KDateTimePicker.vue'
import { ref } from 'vue'
import type { TimeRange } from '@/types'

// test utilities.
// please use cy.clock() when necessary : https://docs.cypress.io/api/commands/clock
// please do not use non-deterministic Dates to test/assert on
// please do not introduce state to the utilities
// examples:
//
// cy.clock(today())
// today()
// today(- (5 * DAYS))
// today(5 * DAYS)
// today(- 10 * YEARS)


const HOURS = 60 * 60 * 1000
const DAYS = 24 * HOURS
const YEARS = 365 * DAYS
const today = (num = 0) => new Date(new Date('Sun May 31 2026 00:00:00 UTC+0000').getTime() + num)

// end test utilities


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


const todayDateString = format(today(), 'PP')
const todayDateTimeString = format(today(), 'PP hh:mm a')
const twoDaysAgo = today(- (2 * DAYS))
const minDate = today(- (1 * YEARS))
const maxDate = today()
const singleDate = {
  start: today(),
  end: null,
}
const defaultTimeRange = {
  start: twoDaysAgo,
  end: today(),
  timePeriodsKey: TimeframeKeys.ONE_DAY,
}
const emptyTimeRange = {
  start: null,
  end: null,
  timePeriodKey: null,
}

const timepickerInput = 'datetime-picker-trigger'
const timepickerDisplay = 'datetime-picker-display'
const submitButton = 'datetime-picker-submit'
const clearButton = 'datetime-picker-clear'
const segmentedToggle = 'datetime-picker-toggle'

describe('KDateTimePicker', () => {
  it('renders without calendar icon', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        icon: false,
        range: false,
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).find('.calendar-icon').should('not.exist')
    cy.getTestId(submitButton).should('exist')
    cy.getTestId(clearButton).should('not.exist')
  })

  it('renders with clear button', () => {
    cy.mount(KDateTimePicker, {
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
    cy.getTestId(timepickerDisplay).should('contain.text', todayDateTimeString)
  })

  it('renders a date picker with placeholder message and correct width', () => {
    const placeholderText = 'Customer-facing message'
    const width = 500

    cy.mount(KDateTimePicker, {
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
    cy.get('.popover-content').should('be.visible')
    cy.getTestId(submitButton).should('exist')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(clearButton).eq(0).click()
    cy.getTestId(timepickerDisplay).should('contain.text', placeholderText)
  })

  it('renders a date picker', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        range: false,
      },
    })
    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).click()
    cy.get('.vc-pane-container').should('exist')
    cy.getTestId(submitButton).should('exist')
    cy.get('.time-input').should('not.exist')
  })

  it('renders a single date and time picker', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: singleDate,
        range: false,
      },
    })

    cy.getTestId(submitButton).should('exist')
    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).click()
    cy.get('.vc-pane-container').should('exist')
    cy.getTestId('time-input-start').should('exist')
    cy.getTestId(timepickerDisplay).should('contain.text', todayDateTimeString)
  })

  it('renders a range date and time picker', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        minDate,
        maxDate,
        range: true,
      },
    })

    cy.get('.k-datetime-picker').should('exist')
    cy.getTestId(submitButton).should('exist')

    cy.get('.k-datetime-picker').getTestId(timepickerInput).should('exist')
    cy.get('.k-datetime-picker').getTestId(timepickerInput).click()
    cy.getTestId('time-input-start').should('exist')
    cy.getTestId('time-input-end').should('exist')
  })

  it('displays a valid date when "Submit" is clicked', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'date',
        clearButton: true,
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Submit"
    cy.getTestId(timepickerInput).click()
    cy.get('.popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(submitButton).should('exist')
  })

  it('disables "Apply" button when "Clear" is clicked', () => {
    cy.mount(KDateTimePicker, {
      props: {
        clearButton: true,
        mode: 'date',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Clear"
    cy.getTestId(timepickerInput).click()
    cy.get('.popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(submitButton).should('exist')

    // "Apply" button is disabled after selection is cleared
    cy.getTestId(clearButton).eq(0).click()
    cy.getTestId(submitButton).invoke('attr', 'disabled').should('eq', 'disabled')
  })

  it('displays todays date after clicking "Apply', () => {
    cy.mount(KDateTimePicker, {
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
    cy.getTestId(timepickerDisplay).should('contain.text', todayDateString)
  })

  it('renders relative time frames, and makes a selection', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(submitButton).should('not.exist')

    cy.getTestId(timepickerInput).click()
    cy.get('.timeframe-section').should('exist')
    cy.get('.timeframe-buttons').should('exist')

    // Click on "6 hours", check whether selected class is applied
    cy.getTestId('select-timeframe-6h').click()
    cy.get('.popover-content').find('.timeframe-button.primary').should('contain.text', '6 hours')
  })

  it('renders custom calendar and relative time frames', { includeShadowDom: false }, () => {
    cy.mount(KDateTimePicker, {
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
    cy.getTestId(submitButton).should('exist')

    // Check that time frames render
    cy.getTestId(segmentedToggle).find('button[data-testid="relative-option"]').eq(0).click()
    cy.getTestId(submitButton).should('not.exist')
    cy.get('.timeframe-section').should('exist')
    cy.get('.timeframe-buttons').should('exist')

    // Check that calendar month and 2 x time selection inputs show up
    cy.getTestId(segmentedToggle).find('button[data-testid="custom-option"]').eq(0).click()
    cy.getTestId(submitButton).should('exist')
    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
  })

  it('renders calendar with only the day (month) selection, but not time', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId(segmentedToggle).find('button[data-testid="custom-option"]').eq(0).click()
    // On the calendar side, we should see the month view, but not the time picker
    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
    cy.get('.time-input').should('not.exist')
  })

  it('renders date only calendar and displays time range in `PP` format', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'date',
        range: true,
        modelValue: defaultTimeRange,
      },
    })

    cy.getTestId(timepickerDisplay).should('contain.text', todayDateString)
  })

  it('renders relativeDateTime calendar and displays time range in `PP hh:mm a` format', () => {
    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    cy.getTestId(timepickerDisplay).should('contain.text', todayDateTimeString)
  })

  it('renders calendar, even if seeded with an invalid date range', () => {
    const placeholderText = 'Please choose valid start and end dates'

    cy.mount(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: emptyTimeRange,
        placeholder: placeholderText,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId(segmentedToggle).find('button[data-testid="custom-option"]').eq(0).click()

    cy.get('.k-datetime-picker .vc-pane-container .vc-weeks').should('exist')
    cy.get('.time-input').should('not.exist')

    cy.getTestId(timepickerDisplay).should('contain.text', placeholderText)

    // "Apply" button should be disabled
    cy.getTestId(submitButton).should('be.disabled')

    // If a timeframe is selected, "Apply" should be re-enabled
    cy.getTestId(segmentedToggle).find('button[data-testid="relative-option"]').eq(0).click()
    cy.getTestId('select-timeframe-24h').click()
    cy.getTestId(timepickerDisplay).should('contain.text', 'Last 24 hours')
  })

  it('reacts to changes in the modelValue', () => {
    const modelValue = ref<TimeRange>({
      start: today(),
      end: today(),
    })

    const newDate = {
      start: today(1 * HOURS),
      end: today(1 * HOURS),
    }

    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: modelValue,
        range: true,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId('time-input-start').should('have.value', '00:00').then(() => {
      cy.getTestId(timepickerInput).click().then(() => {
        modelValue.value = newDate
        cy.getTestId(timepickerInput).click()
        cy.getTestId('time-input-start').should('have.value', '01:00')
      })
    })
  })

  it('resets time to original values when popover is closed without applying changes', () => {
    const modelValue = ref({
      start: today(),
      end: today(),
    })

    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: modelValue,
        range: true,
      },
    })

    // Open the picker, change the time values, then close the popover without applying
    cy.getTestId(timepickerInput).click()
    cy.getTestId('time-input-start').should('have.value', '00:00')
    cy.getTestId('time-input-end').should('have.value', '00:00')

    cy.getTestId('time-input-end').type('01:00', { force: true })

    cy.getTestId('time-input-end').should('have.value', '01:00')

    // Close the popover without applying
    cy.getTestId(timepickerInput).click()

    // Reopen the popover, and check that time values are reset to original
    cy.getTestId(timepickerInput).click()
    cy.getTestId('time-input-start').should('have.value', '00:00')
    cy.getTestId('time-input-end').should('have.value', '00:00')
  })

  it('gracefully handles clearing time inputs', () => {
    const modelValue = ref({
      start: today(),
      end: today(),
    })

    cy.mount(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: modelValue,
        range: true,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.getTestId('time-input-start').should('have.value', '00:00')
    cy.getTestId('time-input-end').should('have.value', '00:00')

    cy.getTestId('time-input-start').clear({ force: true })
    cy.getTestId('time-input-end').clear({ force: true })

    cy.getTestId('time-input-start').should('have.value', '')
    cy.getTestId('time-input-end').should('have.value', '')
  })

  it('anchors calendar initial page to current month if modelValue is null and no min/max dates are set', () => {
    cy.clock(today())
    const modelValue = ref<TimeRange>({ start: null, end: null })

    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue,
        mode: 'date',
      },
    })

    cy.getTestId('datetime-picker-trigger').click()
    cy.get('.vc-title > span').should('have.text', format(today(), 'MMMM yyyy'))
  })

  it('anchors calendar initial page to maxDate month if modelValue is null and maxDate is set', () => {
    const modelValue = ref<TimeRange>({ start: null, end: null })
    const maxDate = today()

    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue,
        mode: 'date',
        maxDate,
      },
    })

    cy.getTestId('datetime-picker-trigger').click()
    cy.get('.vc-title > span').should('have.text', format(maxDate, 'MMMM yyyy'))
  })

  it('anchors calendar initial page to maxDate month if maxDate is earlier than current month and modelValue is null', () => {
    const modelValue = ref<TimeRange>({ start: null, end: null })
    const maxDate = today()

    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue,
        mode: 'date',
        maxDate,
      },
    })

    cy.getTestId('datetime-picker-trigger').click()
    cy.get('.vc-title > span').should('have.text', format(maxDate, 'MMMM yyyy'))
  })

  it('anchors calendar initial page to modelValue start', () => {
    const modelValue = ref({
      start: today(),
      end: today(),
    })

    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue,
        mode: 'date',
        range: true,
      },
    })

    cy.getTestId('datetime-picker-trigger').click()
    cy.get('.vc-title > span').should('have.text', format(modelValue.value.start, 'MMMM yyyy'))
  })

  it('time granularity: minutely', () => {
    const todayDateTimeStringMinutely = format(today(), 'PP hh:mm a')
    const range = `${todayDateTimeStringMinutely} - ${todayDateTimeStringMinutely}`
    const modelValue = ref({
      start: today(),
      end: today(),
    })
    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue.value,
        mode: 'dateTime',
        range: true,
        timeGranularity: 'minutely',
      },
    }).then(() => {
      cy.getTestId(timepickerDisplay).invoke('text').then((text) => {
        expect(text.replace(/\s+/g, ' ').trim()).to.include(range)
      })
      cy.getTestId('datetime-picker-trigger').click()
      cy.getTestId('time-input-start').should('have.value', format(today(), 'HH:mm'))
      cy.getTestId('time-input-end').should('have.value', format(today(), 'HH:mm'))
    })
  })

  it('time granularity: secondly', () => {
    const todayDateTimeStringSecondly = format(today(), 'PP hh:mm:ss a')
    const range = `${todayDateTimeStringSecondly} - ${todayDateTimeStringSecondly}`
    const modelValue = ref({
      start: today(),
      end: today(),
    })
    cy.mount(KDateTimePicker, {
      props: {
        modelValue: modelValue.value,
        mode: 'dateTime',
        range: true,
        timeGranularity: 'secondly',
      },
    }).then(() => {
      cy.getTestId(timepickerDisplay).invoke('text').then((text) => {
        expect(text.replace(/\s+/g, ' ').trim()).to.include(range)
      })
      cy.getTestId('datetime-picker-trigger').click()
      cy.getTestId('time-input-start').should('have.value', format(today(), 'HH:mm:ss'))
      cy.getTestId('time-input-end').should('have.value', format(today(), 'HH:mm:ss'))
    })
  })

  it('shows timezone for relative time', () => {
    const modelValue = ref({
      start: today(),
      end: today(),
      timePeriodsKey: TimeframeKeys.ONE_HOUR,
    })

    // Set mock timezone to UTC for consistent testing
    const OriginalDateTimeFormat = Intl.DateTimeFormat
    Intl.DateTimeFormat = function(locale?: string | string[], options?: Intl.DateTimeFormatOptions) {
      return new OriginalDateTimeFormat(locale, { ...options, timeZone: 'UTC' })
    } as Intl.DateTimeFormatConstructor

    cy.mount(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue: modelValue.value,
        range: true,
        showTimezone: true,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerDisplay).should('contain.text', 'Last hour (UTC)')
  })

  describe('sameDayFullRange', () => {
    it('applies full-day range when same day selected with sameDayFullRange enabled', () => {
      cy.clock(today())
      const calendarTargetDateString = format(today(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      cy.getTestId(timepickerInput).click()

      // Select the same day twice for start and end
      cy.get(calendarSelector).click()
      cy.get(calendarSelector).click()

      cy.getTestId('time-input-start').should('have.value', '00:00')
      cy.getTestId('time-input-end').should('have.value', '23:59')
      cy.getTestId(submitButton).should('not.be.disabled')
    })

    it('does not apply full-day range when sameDayFullRange is false (default)', () => {
      cy.clock(today())
      const calendarTargetDateString = format(today(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: false,
        },
      })

      cy.getTestId(timepickerInput).click()
      cy.get(calendarSelector).click()
      cy.get(calendarSelector).click()

      // both should show current time
      cy.getTestId('time-input-start').invoke('val').then((startVal) => {
        cy.getTestId('time-input-end').invoke('val').then((endVal) => {
          expect(startVal).to.equal(endVal)
        })
      })
    })

    it('does not apply full-day range for different days even with sameDayFullRange enabled', () => {
      cy.clock(today(1 * HOURS))

      const startDate = today(- (10 * DAYS))
      const endDate = today(- (5 * DAYS))

      const startDateString = format(startDate, 'yyyy-MM-dd')
      const endDateString = format(endDate, 'yyyy-MM-dd')

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      cy.getTestId(timepickerInput).click()
      cy.get(`.id-${startDateString}`).click()
      cy.get(`.id-${endDateString}`).click()

      cy.getTestId('time-input-start').should('not.have.value', '00:00')
      cy.getTestId('time-input-end').should('not.have.value', '23:59')
      cy.getTestId(submitButton).should('not.be.disabled')
    })
  })

  describe('customRangeValidation', () => {
    it('disables Apply button when customRangeValidation returns true', () => {
      cy.clock(today())
      const calendarTargetDateString = format(today(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      const customValidation = (start: Date, end: Date) => start.getTime() === end.getTime()

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
          customRangeValidation: customValidation,
        },
      })

      cy.getTestId(timepickerInput).click()

      // Select the same day twice
      cy.get(calendarSelector).click()
      cy.get(calendarSelector).click()

      // 00:00 !== 23:59
      cy.getTestId(submitButton).should('not.be.disabled')

      // Manually set end time to equal start time 00:00
      cy.getTestId('time-input-end').clear()
      cy.getTestId('time-input-end').type('00:00')

      cy.getTestId(submitButton).should('be.disabled')
    })

    it('does not affect validation when customRangeValidation is not provided', () => {
      cy.clock(today())
      const calendarTargetDateString = format(today(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
        },
      })

      cy.getTestId(timepickerInput).click()
      cy.get(calendarSelector).click()
      cy.get(calendarSelector).click()

      cy.getTestId(submitButton).should('not.be.disabled')
    })

    it('combines with built-in validation (start > end still invalid)', () => {
      cy.clock(today())
      const customValidation = () => false

      cy.mount(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          customRangeValidation: customValidation,
        },
      })

      cy.getTestId(timepickerInput).click()

      const calendarTargetDateString = format(today(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`
      cy.get(calendarSelector).click()
      cy.get(calendarSelector).click()

      cy.getTestId('time-input-start').clear()
      cy.getTestId('time-input-start').type('23:00')
      cy.getTestId('time-input-end').clear()
      cy.getTestId('time-input-end').type('01:00')

      cy.getTestId(submitButton).should('be.disabled')
    })
  })
})
