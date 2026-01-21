import type { PopPlacement } from './popover'

// v-calendar defines these types internally, but does not export them
export interface SimpleDateParts {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}
export type DatePickerDate = Date | Partial<SimpleDateParts> | null
export type DatePickerRangeObject = {
  start: Exclude<DatePickerDate, null>
  end: Exclude<DatePickerDate, null>
}
export type DatePickerModel = DatePickerDate | DatePickerRangeObject


export type TimeRange = {
  timePeriodsKey?: string
  start?: Date | null
  end?: Date | null
}

export interface TimePeriod {
  /** Unique identifier */
  key: string
  display: string
  timeframeText: string
  timeframeLength?: () => string
  start?: () => Date
  end?: () => Date
}

export interface TimeFrameSection {
  section: string
  values: TimePeriod[]
}

export interface DateTimePickerState {
  abbreviatedDisplay: string
  fullRangeDisplay?: string
  popoverOpen: boolean
  selectedRange: TimeRange
  previouslySelectedRange: TimeRange
  selectedTimeframe: TimePeriod | null
  previouslySelectedTimeframe: TimePeriod | null
  tabName: string
}

/**
 * @deprecated Use `import type { CSSProperties } from 'vue'` instead.
 */
export interface CSSProperties {
  [key: string]: string
}

export enum DateTimePickerModes {
  Date = 'date',
  Time = 'time',
  Datetime = 'dateTime',
  Relative = 'relative',
  RelativeDate = 'relativeDate',
  RelativeDateTime = 'relativeDateTime',
}

/**
 * @deprecated Use `DateTimePickerMode` instead.
 */
export type TimepickerMode = DateTimePickerModes
export const TimepickerMode = DateTimePickerModes

export const ModeArray: DateTimePickerMode[] = Object.values(DateTimePickerModes)

export const ModeArrayCustom: DateTimePickerMode[] = [
  DateTimePickerModes.Date,
  DateTimePickerModes.Time,
  DateTimePickerModes.Datetime,
]

export const ModeArrayRelative: DateTimePickerMode[] = [
  DateTimePickerModes.Relative,
  DateTimePickerModes.RelativeDate,
  DateTimePickerModes.RelativeDateTime,
]

export const ModeDateOnly: DateTimePickerMode[] = [
  DateTimePickerModes.Date,
  DateTimePickerModes.RelativeDate,
]

export type DateTimePickerMode = `${DateTimePickerModes}`

/**
 * @deprecated Use `DateTimePickerMode` instead.
 */
export type Mode = DateTimePickerMode

export interface DateTimePickerProps {
  /**
   * Whether to show the clear button.
   * @default false
   */
  clearButton?: boolean

  /**
   * Whether to show the calendar icon displayed within the display field.
   * @default true
   */
  icon?: boolean

  /**
   * A single date or time picker instance which can be seeded with a value as shown here,
   * where currentValue's start key contains a valid `Date` object, `new Date()` or a `null` value.
   * If `null`, the picker will display the placeholder message and allow the user to make a selection.
   * @default { start: null, end: null }
   */
  modelValue?: TimeRange

  /**
   * Upper bound for `v-calendar` dates, everything after this date will be disabled.
   * @default null
   */
  maxDate?: Date

  /**
   * Lower bound for `v-calendar` dates, everything preceding this date will be disabled.
   * @default null
   */
  minDate?: Date

  /**
   * Determines which `v-calendar` type to initialize.
   * One of ['date', 'time', 'datetime', 'relative', 'relativeDate', 'relativeDateTime'].
   * - `date`, `time` and `dateTime` are passed verbatim to `v-calendar`,
   * - `relative` denotes a component instance made up solely of time frames
   * - `relativeDate` relative time frames + date calendar
   * - `relativeDateTime` relative time frames + datetime calendar
   */
  mode: `${DateTimePickerMode}`

  /**
   * Help text displayed as the default mesage inside the input field.
   * When "Clear" is clicked, the input will revert to displaying this.
   * @default 'Select a time range'
   */
  placeholder?: string

  /**
   * Whether the `v-calendar` will allow a single date/time,
   * or a range of dates/times.
   * @default false
   */
  range?: boolean

  /**
   * A custom set of time frames to be displayed as selectable buttons.
   * The `timeframeLength`, `start`, and `end` values are passed in as functions,
   * allowing for on-the-fly date boundary creation.
   * @default []
   */
  timePeriods?: TimeFrameSection[]

  /**
   * Sets the input field to a fixed width.
   * @default '100%'
   */
  width?: number | string

  /**
   * Whether the input field is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the input field is read-only.
   * @default false
   */
  readonly?: boolean

  /**
   * Define which side the popover displays.
   * One of ['auto', 'top', 'top-start', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end'].
   * @default 'bottom-start'
   */
  popoverPlacement?: PopPlacement

  /**
   * String to be displayed as an error message.
   * If not provided, the default message is 'Start time cannot exceed end time.'
   * @default undefined
   */
  invalidTimeErrorMessage?: string

  /**
   * Time granularity for time inputs
   * @default 'minutely'
   */
  timeGranularity?: TimeGranularity

  /**
   * Automatically adjust times to create a full-day range (00:00 - 23:59:59)
   * @default false
   */
  sameDayFullRange?: boolean
}

export type TimeGranularity = 'minutely' | 'secondly'

export interface DateTimePickerEmits {
  change: [value: TimeRange | null]
  'update:modelValue': [value: TimeRange | null]
}
