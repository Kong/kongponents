import type { AnyElementOf } from '@/types/utils'

export interface TimeRange {
  start: Date | null,
  end: Date | null,
  timePeriodsKey?: string
}

export interface TimePeriod {
  key: string // unique identifier
  display: string
  timeframeText: string
  timeframeLength: () => string
  start: () => Date
  end: () => Date
}

export interface TimeFrameSection {
  section: string
  values: TimePeriod[]
}

export interface DateTimePickerState {
  abbreviatedDisplay: string
  fullRangeDisplay?: string
  hidePopover: boolean
  selectedRange: TimeRange | null
  previouslySelectedRange: TimeRange,
  selectedTimeframe: TimePeriod
  previouslySelectedTimeframe: TimePeriod
  tabName: string
}

export interface CSSProperties {
  [key: string]: string
}

export enum TimepickerMode {
  Date = 'date',
  Time = 'time',
  Datetime = 'dateTime',
  Relative = 'relative',
  RelativeDate = 'relativeDate',
  RelativeDateTime = 'relativeDateTime'
}

export const ModeArray: string[] = Object.values(TimepickerMode)

export const ModeArrayCustom: string[] = [
  TimepickerMode.Date,
  TimepickerMode.Time,
  TimepickerMode.Datetime,
]

export const ModeArrayRelative: string[] = [
  TimepickerMode.Relative,
  TimepickerMode.RelativeDate,
  TimepickerMode.RelativeDateTime,
]

export const ModeDateOnly: string[] = [
  TimepickerMode.Date,
  TimepickerMode.RelativeDate,
]

export type Mode = AnyElementOf<typeof ModeArray>
