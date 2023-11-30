import type { AnyElementOf } from '@/types/utils'

export interface TimeRange {
  start: Date | number | null,
  end: Date | number | null,
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
  D = 'date',
  T = 'time',
  DT = 'dateTime',
  R = 'relative',
  RD = 'relativeDate',
  RDT = 'relativeDateTime'
}

export const ModeArray: string[] = Object.values(TimepickerMode)

export const ModeArrayCustom: string[] = [
  TimepickerMode.D,
  TimepickerMode.T,
  TimepickerMode.DT,
]

export const ModeArrayRelative: string[] = [
  TimepickerMode.R,
  TimepickerMode.RD,
  TimepickerMode.RDT,
]

export type Mode = AnyElementOf<typeof ModeArray>
