import type { AnyElementOf } from '@/types/utils'
import type { TimePeriod } from '@kong-ui-public/analytics-utilities'
export interface TimeRange {
  start: Date | number,
  end: Date | number,
  timePeriodsKey?: string
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

export const ModeArray = ['date', 'time', 'dateTime', 'relative', 'relativeDate', 'relativeDateTime']
export type Mode = AnyElementOf<typeof ModeArray>
