import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { format } from 'date-fns'
import KDateTimePicker from '@/components/KDateTimePicker/KDateTimePicker.vue'
import type { TimeFrameSection } from '@/types'

// Inline timeframe data matching what KDateTimePickerMockData would produce.
// The mocks file is not included in typecheck (see tsconfig.json), so we inline
// the data here with proper types rather than importing from @mocks.
// display  = long name shown in the trigger display area (e.g. "Last 6 hours")
// timeframeText = short label used inside the timeframe buttons (e.g. "6 hours")
const exampleTimeFrames: TimeFrameSection[] = [
  {
    section: 'Last',
    values: [
      { key: '15m', display: 'Last 15 minutes', timeframeText: '15 minutes' },
      { key: '1h', display: 'Last hour', timeframeText: '1 hour' },
      { key: '6h', display: 'Last 6 hours', timeframeText: '6 hours' },
      { key: '12h', display: 'Last 12 hours', timeframeText: '12 hours' },
      { key: '24h', display: 'Last 24 hours', timeframeText: '24 hours' },
      { key: '7d', display: 'Last 7 days', timeframeText: '7 days' },
      { key: '30d', display: 'Last 30 days', timeframeText: '30 days' },
    ],
  },
  {
    section: 'Current',
    values: [
      { key: 'current_week', display: 'This week', timeframeText: 'week' },
      { key: 'current_month', display: 'This month', timeframeText: 'month' },
    ],
  },
  {
    section: 'Previous',
    values: [
      { key: 'previous_week', display: 'Previous week', timeframeText: 'week' },
      { key: 'previous_month', display: 'Previous month', timeframeText: 'month' },
    ],
  },
]

const today = new Date()
const todayDateString = format(new Date(today), 'PP')
const todayDateTimeString = format(new Date(today), 'PP hh:mm a')
const twoDaysAgo = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000))
const minDate = new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000))
const maxDate = today
const singleDate = {
  start: today,
  end: null,
}
const defaultTimeRange = {
  start: twoDaysAgo,
  end: today,
  timePeriodsKey: '24h',
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
  it('renders without calendar icon', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        icon: false,
        range: false,
      },
    })

    await expect.element(page.getByTestId(timepickerInput)).toBeInTheDocument()
    await expect.element(page.getByTestId(timepickerInput).getByCSS('.calendar-icon')).not.toBeInTheDocument()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(clearButton)).not.toBeInTheDocument()
  })

  it('renders with clear button', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: singleDate,
        clearButton: true,
        icon: false,
        range: false,
      },
    })

    await expect.element(page.getByTestId(timepickerInput)).toBeInTheDocument()
    await expect.element(page.getByTestId(clearButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(todayDateTimeString)
  })

  it('renders a date picker with placeholder message and correct width', async () => {
    const placeholderText = 'Customer-facing message'
    const width = 500

    await render(KDateTimePicker, {
      props: {
        clearButton: true,
        mode: 'date',
        modelValue: singleDate,
        placeholder: placeholderText,
        range: false,
        width: width + '',
      },
    })

    await expect.element(page.getByTestId(timepickerInput)).toBeInTheDocument()
    await expect.poll(() => page.getByTestId(timepickerInput).element().getBoundingClientRect().width).toBe(width)

    // Open the date time picker, click "Clear" and make sure default placeholder is shown
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.popover-content')).toBeVisible()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(clearButton)).toBeInTheDocument()
    await page.getByTestId(clearButton).nth(0).click()
    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(placeholderText)
  })

  it('renders a date picker', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        range: false,
      },
    })

    await expect.element(page.getByTestId(timepickerInput)).toBeInTheDocument()
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.vc-pane-container')).toBeInTheDocument()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()
    await expect.element(page.getByCSS('.time-input')).not.toBeInTheDocument()
  })

  it('renders a single date and time picker', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: singleDate,
        range: false,
      },
    })

    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(timepickerInput)).toBeInTheDocument()
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.vc-pane-container')).toBeInTheDocument()
    await expect.element(page.getByTestId('time-input-start')).toBeInTheDocument()
    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(todayDateTimeString)
  })

  it('renders a range date and time picker', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        minDate,
        maxDate,
        range: true,
      },
    })

    await expect.element(page.getByCSS('.k-datetime-picker')).toBeInTheDocument()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()

    await expect.element(page.getByCSS('.k-datetime-picker').getByTestId(timepickerInput)).toBeInTheDocument()
    await page.getByCSS('.k-datetime-picker').getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toBeInTheDocument()
    await expect.element(page.getByTestId('time-input-end')).toBeInTheDocument()
  })

  it('displays a valid date when "Submit" is clicked', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'date',
        clearButton: true,
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Submit"
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.popover-content')).toBeVisible()
    await expect.element(page.getByTestId(clearButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()
  })

  it('disables "Apply" button when "Clear" is clicked', async () => {
    await render(KDateTimePicker, {
      props: {
        clearButton: true,
        mode: 'date',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    // Open the date time picker, click "Clear"
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.popover-content')).toBeVisible()
    await expect.element(page.getByTestId(clearButton)).toBeInTheDocument()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()

    // "Apply" button is disabled after selection is cleared
    await page.getByTestId(clearButton).nth(0).click()
    await expect.element(page.getByTestId(submitButton)).toBeDisabled()
  })

  it('displays todays date after clicking "Apply"', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: singleDate,
        range: false,
      },
    })

    // Open the date time picker, click "Submit"
    await page.getByTestId(timepickerInput).click()
    await page.getByTestId(submitButton).nth(0).click()

    // Check emitted raw date value, and the displayed value - should be the same, if rounded
    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(todayDateString)
  })

  it('renders relative time frames, and makes a selection', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    await expect.element(page.getByTestId(submitButton)).not.toBeInTheDocument()

    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByCSS('.timeframe-section').first()).toBeInTheDocument()
    await expect.element(page.getByCSS('.timeframe-buttons').first()).toBeInTheDocument()

    // Click on "6 hours", check whether selected class is applied
    await page.getByTestId('select-timeframe-6h').click()
    await expect.element(page.getByCSS('.popover-content').getByCSS('.timeframe-button.primary')).toHaveTextContent('6 hours')
  })

  it('renders custom calendar and relative time frames', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        minDate,
        maxDate,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()

    // Check that time frames render
    await page.getByTestId(segmentedToggle).getByTestId('relative-option').nth(0).click()
    await expect.element(page.getByTestId(submitButton)).not.toBeInTheDocument()
    const timeframeSection = page.getByCSS('.timeframe-section').first()
    const timeframeButtons = page.getByCSS('.timeframe-buttons').first()

    await expect.element(timeframeSection).toBeInTheDocument()
    await expect.element(timeframeButtons).toBeInTheDocument()

    // Assert these elements are NOT inside a shadow root — getRootNode() must resolve to
    // document directly, not a ShadowRoot.
    expect(timeframeSection.element().getRootNode()).toBe(document)
    expect(timeframeButtons.element().getRootNode()).toBe(document)

    // Check that calendar month and 2 x time selection inputs show up
    await page.getByTestId(segmentedToggle).getByTestId('custom-option').nth(0).click()
    await expect.element(page.getByTestId(submitButton)).toBeInTheDocument()

    const calendarWeeks = page.getByCSS('.k-datetime-picker .vc-pane-container .vc-weeks')

    await expect.element(calendarWeeks).toBeInTheDocument()
    expect(calendarWeeks.element().getRootNode()).toBe(document)
  })

  it('renders calendar with only the day (month) selection, but not time', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: defaultTimeRange,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    await page.getByTestId(timepickerInput).click()
    await page.getByTestId(segmentedToggle).getByTestId('custom-option').nth(0).click()
    // On the calendar side, we should see the month view, but not the time picker
    await expect.element(page.getByCSS('.k-datetime-picker .vc-pane-container .vc-weeks')).toBeInTheDocument()
    await expect.element(page.getByCSS('.time-input')).not.toBeInTheDocument()
  })

  it('renders date only calendar and displays time range in `PP` format', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'date',
        range: true,
        modelValue: defaultTimeRange,
      },
    })

    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(todayDateString)
  })

  it('renders relativeDateTime calendar and displays time range in `PP hh:mm a` format', async () => {
    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: defaultTimeRange,
        range: true,
      },
    })

    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(todayDateTimeString)
  })

  it('renders calendar, even if seeded with an invalid date range', async () => {
    const placeholderText = 'Please choose valid start and end dates'

    await render(KDateTimePicker, {
      props: {
        mode: 'relativeDate',
        modelValue: emptyTimeRange,
        placeholder: placeholderText,
        range: true,
        timePeriods: exampleTimeFrames,
      },
    })

    await page.getByTestId(timepickerInput).click()
    await page.getByTestId(segmentedToggle).getByTestId('custom-option').nth(0).click()

    await expect.element(page.getByCSS('.k-datetime-picker .vc-pane-container .vc-weeks')).toBeInTheDocument()
    await expect.element(page.getByCSS('.time-input')).not.toBeInTheDocument()

    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent(placeholderText)

    // "Apply" button should be disabled
    await expect.element(page.getByTestId(submitButton)).toBeDisabled()

    // If a timeframe is selected, "Apply" should be re-enabled
    await page.getByTestId(segmentedToggle).getByTestId('relative-option').nth(0).click()
    await page.getByTestId('select-timeframe-24h').click()
    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent('Last 24 hours')
  })

  it('reacts to changes in the modelValue', async () => {
    const initialValue = {
      start: new Date('2025-01-01T00:00:00'),
      end: new Date('2025-01-01T00:00:00'),
    }
    const newDate = {
      start: new Date('2025-01-01T01:00:00'),
      end: new Date('2025-01-01T01:00:00'),
    }

    const screen = await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: initialValue,
        range: true,
      },
    })

    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')

    await page.getByTestId(timepickerInput).click()

    await screen.rerender({ modelValue: newDate })
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue('01:00')
  })

  it('resets time to original values when popover is closed without applying changes', async () => {
    const initialValue = {
      start: new Date('2025-01-01T00:00:00'),
      end: new Date('2025-01-01T00:00:00'),
    }

    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: initialValue,
        range: true,
      },
    })

    // Open the picker, change the time values, then close the popover without applying
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')
    await expect.element(page.getByTestId('time-input-end')).toHaveValue('00:00')

    await page.getByTestId('time-input-end').fill('01:00')

    await expect.element(page.getByTestId('time-input-end')).toHaveValue('01:00')

    // Close the popover without applying
    await page.getByTestId(timepickerInput).click()

    // Reopen the popover, and check that time values are reset to original
    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')
    await expect.element(page.getByTestId('time-input-end')).toHaveValue('00:00')
  })

  it('gracefully handles clearing time inputs', async () => {
    const initialValue = {
      start: new Date('2025-01-01T00:00:00'),
      end: new Date('2025-01-01T00:00:00'),
    }

    await render(KDateTimePicker, {
      props: {
        mode: 'dateTime',
        modelValue: initialValue,
        range: true,
      },
    })

    await page.getByTestId(timepickerInput).click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')
    await expect.element(page.getByTestId('time-input-end')).toHaveValue('00:00')

    await page.getByTestId('time-input-start').clear()
    await page.getByTestId('time-input-end').clear()

    await expect.element(page.getByTestId('time-input-start')).toHaveValue('')
    await expect.element(page.getByTestId('time-input-end')).toHaveValue('')
  })

  it('anchors calendar initial page to current month if modelValue is null and no min/max dates are set', async () => {
    await render(KDateTimePicker, {
      props: {
        modelValue: { start: null, end: null },
        mode: 'date',
      },
    })

    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByCSS('.vc-title > span')).toHaveTextContent(new RegExp(`^${format(new Date(), 'MMMM yyyy')}$`))
  })

  it('anchors calendar initial page to maxDate month if modelValue is null and maxDate is set', async () => {
    const localMaxDate = new Date('2025-08-15T00:00:00')

    await render(KDateTimePicker, {
      props: {
        modelValue: { start: null, end: null },
        mode: 'date',
        maxDate: localMaxDate,
      },
    })

    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByCSS('.vc-title > span')).toHaveTextContent(new RegExp(`^${format(localMaxDate, 'MMMM yyyy')}$`))
  })

  it('anchors calendar initial page to maxDate month if maxDate is earlier than current month and modelValue is null', async () => {
    const localMaxDate = new Date('2022-08-15T00:00:00')

    await render(KDateTimePicker, {
      props: {
        modelValue: { start: null, end: null },
        mode: 'date',
        maxDate: localMaxDate,
      },
    })

    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByCSS('.vc-title > span')).toHaveTextContent(new RegExp(`^${format(localMaxDate, 'MMMM yyyy')}$`))
  })

  it('anchors calendar initial page to modelValue start', async () => {
    const modelValue = {
      start: new Date('2024-03-15T00:00:00'),
      end: new Date('2024-03-20T00:00:00'),
    }

    await render(KDateTimePicker, {
      props: {
        modelValue,
        mode: 'date',
        range: true,
      },
    })

    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByCSS('.vc-title > span')).toHaveTextContent(new RegExp(`^${format(modelValue.start, 'MMMM yyyy')}$`))
  })

  it('time granularity: minutely', async () => {
    const now = new Date()
    const todayDateTimeStringMinutely = format(new Date(now), 'PP hh:mm a')
    const range = `${todayDateTimeStringMinutely} - ${todayDateTimeStringMinutely}`
    const modelValue = {
      start: now,
      end: now,
    }

    await render(KDateTimePicker, {
      props: {
        modelValue,
        mode: 'dateTime',
        range: true,
        timeGranularity: 'minutely',
      },
    })

    await expect.poll(() => (page.getByTestId(timepickerDisplay).element() as HTMLElement).textContent?.replace(/\s+/g, ' ').trim()).toContain(range)
    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue(format(now, 'HH:mm'))
    await expect.element(page.getByTestId('time-input-end')).toHaveValue(format(now, 'HH:mm'))
  })

  it('time granularity: secondly', async () => {
    const now = new Date()
    const todayDateTimeStringSecondly = format(now, 'PP hh:mm:ss a')
    const range = `${todayDateTimeStringSecondly} - ${todayDateTimeStringSecondly}`
    const modelValue = {
      start: now,
      end: now,
    }

    await render(KDateTimePicker, {
      props: {
        modelValue,
        mode: 'dateTime',
        range: true,
        timeGranularity: 'secondly',
      },
    })

    await expect.poll(() => (page.getByTestId(timepickerDisplay).element() as HTMLElement).textContent?.replace(/\s+/g, ' ').trim()).toContain(range)
    await page.getByTestId('datetime-picker-trigger').click()
    await expect.element(page.getByTestId('time-input-start')).toHaveValue(format(now, 'HH:mm:ss'))
    await expect.element(page.getByTestId('time-input-end')).toHaveValue(format(now, 'HH:mm:ss'))
  })

  it('shows timezone for relative time', async () => {
    const modelValue = {
      start: new Date('2025-01-01T00:00:00'),
      end: new Date('2025-01-01T00:00:00'),
      timePeriodsKey: '1h',
    }

    // Mock timezone to UTC for consistent testing across environments.
    const OriginalDateTimeFormat = Intl.DateTimeFormat
    vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(function(locales?, options?) {
      return new OriginalDateTimeFormat(locales, { ...options, timeZone: 'UTC' })
    })

    await render(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue,
        range: true,
        showTimezone: true,
        timePeriods: exampleTimeFrames,
      },
    })

    await expect.element(page.getByTestId(timepickerDisplay)).toHaveTextContent('Last hour (UTC)')
  })

  describe('sameDayFullRange', () => {
    it('applies full-day range when exact same day selected with sameDayFullRange enabled', async () => {
      const calendarTargetDateString = format(new Date(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      await page.getByTestId(timepickerInput).click()

      // Select the same day twice for start and end.
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')
      await expect.element(page.getByTestId('time-input-end')).toHaveValue('23:59')
      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()
    })

    it('applies full-day range when the end time is less than the start time on the same day selected with sameDayFullRange enabled', async () => {
      const startDay = 1
      const endDay = 2
      const targetDay = 3

      const calendarTargetDateString = format(new Date(today.getFullYear(), today.getMonth(), targetDay), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      // the dates are different, but the start hour is after the end hour, so it will reset
      const start = new Date(today.getFullYear(), today.getMonth(), startDay, 4)
      const end = new Date(today.getFullYear(), today.getMonth(), endDay, 1)

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start, end, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      await page.getByTestId(timepickerInput).click()

      // Select the same day twice for start and end.
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      await expect.element(page.getByTestId('time-input-start')).toHaveValue('00:00')
      await expect.element(page.getByTestId('time-input-end')).toHaveValue('23:59')
      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()
    })

    it('does NOT apply full-day range when the end time is greater than the start time on the same day selected with sameDayFullRange enabled', async () => {
      const startDay = 1
      const endDay = 2
      const targetDay = 3

      const calendarTargetDateString = format(new Date(today.getFullYear(), today.getMonth(), targetDay), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      // the dates are different, but the end hour is after the start hour, so it won't reset
      const start = new Date(today.getFullYear(), today.getMonth(), startDay, 1)
      const end = new Date(today.getFullYear(), today.getMonth(), endDay, 4)

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start, end, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      await page.getByTestId(timepickerInput).click()

      // Select the same day twice for start and end.
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      await expect.element(page.getByTestId('time-input-start')).toHaveValue('01:00')
      await expect.element(page.getByTestId('time-input-end')).toHaveValue('04:00')
      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()
    })

    it('does not apply full-day range when sameDayFullRange is false (default)', async () => {
      const calendarTargetDateString = format(new Date(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: false,
        },
      })

      await page.getByTestId(timepickerInput).click()
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      // both should show current time (and be equal to each other)
      await expect.poll(() => {
        const start = (page.getByTestId('time-input-start').element() as HTMLInputElement).value
        const end = (page.getByTestId('time-input-end').element() as HTMLInputElement).value
        return start !== '' && start === end
      }).toBe(true)
    })

    it('does not apply full-day range for different days even with sameDayFullRange enabled', async () => {
      const now = new Date()
      // Ensure both dates are in the current month's calendar view — if today is the 1st,
      // yesterday would be in the previous month and not rendered by the calendar.
      const isFirstOfMonth = now.getDate() === 1
      const startDate = isFirstOfMonth
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      const endDate = isFirstOfMonth
        ? new Date(now.getFullYear(), now.getMonth(), 2)
        : new Date(now.getFullYear(), now.getMonth(), now.getDate())

      // force both dates to have a time set that doesn't match what we're trying to detect
      startDate.setHours(1)
      endDate.setHours(2)

      const startDateString = format(startDate, 'yyyy-MM-dd')
      const endDateString = format(endDate, 'yyyy-MM-dd')

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: startDate, end: endDate, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
        },
      })

      await page.getByTestId(timepickerInput).click()
      await page.getByCSS(`.id-${startDateString}`).first().click()
      await page.getByCSS(`.id-${endDateString}`).first().click()

      await expect.element(page.getByTestId('time-input-start')).toHaveValue('01:00')
      await expect.element(page.getByTestId('time-input-end')).toHaveValue('02:00')
      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()
    })
  })

  describe('customRangeValidation', () => {
    it('disables Apply button when customRangeValidation returns true', async () => {
      const calendarTargetDateString = format(new Date(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      const customValidation = (start: Date, end: Date) => start.getTime() === end.getTime()

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          sameDayFullRange: true,
          customRangeValidation: customValidation,
        },
      })

      await page.getByTestId(timepickerInput).click()

      // Select the same day twice.
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      // 00:00 !== 23:59
      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()

      // Manually set end time to equal start time 00:00
      await page.getByTestId('time-input-end').clear()
      await page.getByTestId('time-input-end').fill('00:00')

      await expect.element(page.getByTestId(submitButton)).toBeDisabled()
    })

    it('does not affect validation when customRangeValidation is not provided', async () => {
      const calendarTargetDateString = format(new Date(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
        },
      })

      await page.getByTestId(timepickerInput).click()
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      await expect.element(page.getByTestId(submitButton)).not.toBeDisabled()
    })

    it('combines with built-in validation (start > end still invalid)', async () => {
      const customValidation = () => false

      await render(KDateTimePicker, {
        props: {
          mode: 'dateTime',
          modelValue: { start: null, end: null, timePeriodsKey: '' },
          range: true,
          customRangeValidation: customValidation,
        },
      })

      await page.getByTestId(timepickerInput).click()

      const calendarTargetDateString = format(new Date(), 'yyyy-MM-dd')
      const calendarSelector = `.id-${calendarTargetDateString}`
      await page.getByCSS(calendarSelector).first().click()
      await page.getByCSS(calendarSelector).first().click()

      await page.getByTestId('time-input-start').clear()
      await page.getByTestId('time-input-start').fill('23:00')
      await page.getByTestId('time-input-end').clear()
      await page.getByTestId('time-input-end').fill('01:00')

      await expect.element(page.getByTestId(submitButton)).toBeDisabled()
    })
  })
})
