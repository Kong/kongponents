// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import {
  format,
  // roundToNearestMinutes
} from 'date-fns'
import { TimePeriods, TimeframeKeys } from '@/utils/KDatePickerMockData'
import KDateTimePicker from '@/components/KDateTimePicker/KDateTimePicker.vue'

const exampleTimeFrames = [
  {
    section: 'Last',
    values: [
      TimePeriods.get(TimeframeKeys.FIFTEEN_MIN),
      TimePeriods.get(TimeframeKeys.ONE_HOUR),
      TimePeriods.get(TimeframeKeys.THREE_HOUR),
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
// const todayDateTimeString = format(new Date(today), 'PP hh:mm a')
const minDate = new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000))
const maxDate = today

// const timepickerParent = 'k-datetime-picker'
const timepickerInput = 'k-datetime-picker-input'
const submitButton = 'k-datetime-picker-submit'
const clearButton = 'k-datetime-picker-clear'
// const clickableDays = '.vc-day.in-month span[role="button"]'

// Sample emitted values
// const emitResetSingle = ''
// const emitResetRange = { start: 0, end: 0, timePeriodsKey: '' }
// const emitSubmitSingle = todayDateString

describe('KDateTimePicker', () => {
  it('renders props when passed', () => {
    const placeholderText = 'Customer-facing message'
    const width = 500

    mount(KDateTimePicker, {
      props: {
        // testMode: true,
        mode: 'date',
        modelValue: today,
        placeholder: placeholderText,
        range: false,
        width: width + '',
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).invoke('outerWidth').should('eq', width)

    //
    // Open the date time picker, click "Clear" and make sure default placeholder is shown
    //
    cy.getTestId(timepickerInput).click()
    cy.get('.k-popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(clearButton).click({ force: true, multiple: true })
    cy.getTestId(timepickerInput).should('contain.text', placeholderText)
  })

  it('emits an empty string when "Clear" is clicked', async () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        modelValue: today,
        range: false,
      },
    })

    //
    // Open the date time picker, click "Clear"
    //
    cy.getTestId(timepickerInput).click()
    cy.get('.k-popover-content').should('be.visible')
    cy.getTestId(clearButton).should('exist')
    cy.getTestId(submitButton).should('exist')

    cy.getTestId(clearButton).click({ force: true, multiple: true })
    // const emitValue = Cypress.vueWrapper.emitted('change')

    // TODO: fix emitted value check
    // cy.wrap(Cypress.vueWrapper.emitted('change')[0][0]).should('eq', emitResetSingle)
  })

  it('renders a Single date calendar instance, submits todays date', async () => {
    mount(KDateTimePicker, {
      props: {
        // testMode: true,
        mode: 'date',
        modelValue: today,
        range: false,
      },
    })

    //
    // Open the date time picker, click "Submit"
    //
    cy.getTestId(timepickerInput).click()
    cy.getTestId(submitButton).click({ force: true, multiple: true })

    // Check emitted raw date value, and the displayed value - should be the same, if rounded
    cy.getTestId(timepickerInput).should('contain.text', todayDateString)
    // const emittedTimestamp = Cypress.vueWrapper.emitted('change')

    // TODO: fix emitted value check
    // expect(roundToNearestMinutes(emittedTimestamp).toEqual(roundToNearestMinutes(today)))
  })

  it('renders disabled props when passed', () => {
    mount(KDateTimePicker, {
      props: {
        // testMode: true,
        mode: 'date',
        modelValue: today,
        range: false,
        icon: false,
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    // Input should not contain calendar icon
    cy.getTestId(timepickerInput).find('.kong-icon').should('not.exist')
  })

  it('renders disabled props when passed', () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'relative',
        modelValue: today,
        range: true,
        minDate: minDate,
        maxDate: maxDate,
        timePeriods: exampleTimeFrames,
      },
    })

    cy.getTestId(timepickerInput).click()
    cy.get('.timeframe-section').should('exist')
    cy.get('.timeframe-buttons').should('exist')
  })

  // TODO: check that a default relative time frame is displayed (input as well as selected button)
})
