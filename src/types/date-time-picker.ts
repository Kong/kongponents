export interface TimeRange {
  start: Date | number,
  end: Date | number,
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
  selectedRange: TimeRange
  previouslySelectedRange: TimeRange,
  selectedTimeframe: TimePeriod
  previouslySelectedTimeframe: TimePeriod
  tabName: string
}

export interface CSSProperties {
  [key: string]: string
}

export type Mode = 'date'| 'time' | 'dateTime' | 'relative' | 'relativeDate'| 'relativeDateTime'
export type ModeRecord = Record<Mode, Mode>
