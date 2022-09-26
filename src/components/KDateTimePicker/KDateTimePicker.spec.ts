// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import { format, roundToNearestMinutes } from 'date-fns'
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
const todayDateTimeString = format(new Date(today), 'PP hh:mm a')

const timepickerParent = 'k-datetime-picker'
const timepickerInput = 'k-datetime-picker-display'
const submitButton = 'k-datetime-picker-submit'
const clearButton = 'k-datetime-picker-clear'
const clickableDays = '.vc-day.in-month span[role="button"]'

describe('KDateTimePicker', () => {
  it('renders props when passed', () => {
    const labelProp = 'Drop it!'
    const placeholderText = 'Customer-facing message'

    mount(KDateTimePicker, {
      props: {
        // testMode: true,
        placeholder: placeholderText,
        mode: 'date',
        defaultCustom: today,
        range: false,
      },
    })

    cy.getTestId(timepickerInput).should('exist')
    cy.getTestId(timepickerInput).should('contain.text', placeholderText)
  })

  it('emits an empty string when "Clear" is clicked', async () => {
    mount(KDateTimePicker, {
      props: {
        mode: 'date',
        defaultCustom: today,
        range: false,
      },
    })

    //
    // Open the date time picker, click "Clear"
    //
    cy.getTestId(timepickerInput).click()
    cy.getTestId(timepickerParent).find('.k-popover-content').should('be.visible')

    cy.getTestId(submitButton).should('exist')
    cy.getTestId(clearButton).should('exist')

    cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
    cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')

    console.log(Cypress.vueWrapper.emitted('change:modelValue'))
    console.log(Cypress.vueWrapper.emitted('input:modelValue'))

    // cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')[0][0]).should('eq', true)

    // expect(wrapper.find('.k-popover-content').exists()).toBe(true)
    // await tick(wrapper.vm, 1)
    // expect(wrapper.find(`[data-testid="${clearButton}"]`).exists()).toBe(true)
    // wrapper.find(`[data-testid="${clearButton}"]`).trigger('click')
    // await tick(wrapper.vm, 1)
    // expect(wrapper.emitted().input[0][0]).toEqual('')
  })

  // it('renders a calendar instance with a Single date and default value, submits todays date', async () => {
  //   mount(KDateTimePicker, {
  //     props: {
  //       // testMode: true,
  //       mode: 'date',
  //       defaultCustom: today,
  //       range: false
  //     },
  //   })
  //    // const triggerBtn = cy.getTestId('k-dropdown-trigger')
  //   // triggerBtn.should('contain.text', labelProp)
  //   // triggerBtn.click()
  //   const pickerToggle = cy.find('button')

  //   // Opens the date time picker, click "Apply"
  //   pickerToggle.trigger('click')
  //   expect(wrapper.find('.k-popover-content').exists()).toBe(true)
  //   await tick(wrapper.vm, 1)
  //   wrapper.find(`[data-testid="${submitButton}"]`).trigger('click')
  //   await tick(wrapper.vm, 1)

  //   // Check emitted raw date value, and the displayed value
  //   expect(wrapper.find(`[data-testid="${timepickerInput}"]`).element.innerHTML).toContain(todayDateString)
  //   expect(roundToNearestMinutes(wrapper.emitted().input[0][0])).toEqual(roundToNearestMinutes(today))
  // })

  // it('renders with correct px width', async () => {
  //   // const width = 350

  //   // mount(KDateTimePicker, {
  //   //   props: {
  //   //     testMode: true,
  //   //     width: width + '',
  //   //     items: defaultMenuItems,
  //   //   },
  //   // })

  //   // const triggerBtn = cy.getTestId('k-dropdown-trigger')
  //   // triggerBtn.click()

  //   // cy.get('.k-dropdown-popover').invoke('width').should('eq', width)
  // })

  // it('renders disabled props when passed', () => {
  // })

  // it('renders with correct appearance - custom/relative should exist', () => {
  //   // cy.get('.selection-dropdown-menu').should('exist')
  // })

  // it('renders with selected item', () => {
  //   const selectedLabel = 'Label 1'
  //   // mount(KDateTimePicker, {
  //   //   props: {
  //   //     testMode: true,
  //   //     label: 'Click me',
  //   //     items: [
  //   //       { label: selectedLabel, value: 'label1', selected: true },
  //   //       ...selectionMenuItems,
  //   //     ],
  //   //   },
  //   // })

  //   // const triggerBtn = cy.getTestId('k-dropdown-trigger')
  //   // triggerBtn.click()
  //   // cy.getTestId('k-dropdown-list').should('be.visible')

  //   // cy.get('.k-dropdown-selected-option').should('exist')
  //   // cy.get('.k-dropdown-selected-option').should('contain.text', selectedLabel)
  // })
})
