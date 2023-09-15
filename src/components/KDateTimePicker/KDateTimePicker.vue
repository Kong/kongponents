<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="k-datetime-picker"
    :class="{ 'set-min-width': hasTimePeriods }"
    :style="widthStyle"
  >
    <KPop
      hide-caret
      :hide-popover="state.hidePopover"
      placement="bottomStart"
      position-fixed
      width="auto"
      @opened="state.hidePopover = false"
    >
      <KButton
        aria-role="input"
        class="timepicker-input"
        :class="{ 'set-min-width': hasTimePeriods }"
        data-testid="k-datetime-picker-input"
        :is-rounded="false"
        size="large"
        :style="widthStyle"
      >
        <KIcon
          v-if="icon"
          class="calendar-icon"
          :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
          icon="calendar"
          :size="KUI_ICON_SIZE_30"
        />
        <div
          class="timepicker-display"
          data-testid="k-datetime-picker-display"
          v-html="state.abbreviatedDisplay"
        />
      </KButton>
      <template
        v-if="!state.hidePopover"
        #content
      >
        <!-- Custom | Relative toggle -->
        <KSegmentedControl
          v-if="hasTimePeriods && hasCalendar"
          v-model="state.tabName"
          class="datetime-picker-toggle"
          data-testid="k-datetime-picker-toggle"
          :options="[
            { label: 'Relative', value: 'relative' },
            { label: 'Custom', value: 'custom' }
          ]"
          @click="(selected: string) => state.tabName = selected"
        />
        <!-- Single date / time or range readout -->
        <p
          v-if="!showCalendar"
          class="range-display"
        >
          {{ state.fullRangeDisplay }}
        </p>
        <DatePicker
          v-if="hasCalendar && showCalendar"
          v-model="selectedCalendarRange"
          :drag-attribute="calendarDragAttributes"
          is-expanded
          :is-range="range"
          :max-date="maxDate"
          :min-date="minDate"
          :minute-increment="minuteIncrement"
          :mode="impliedMode"
          :model-config="modelConfig"
          :select-attribute="calendarSelectAttributes"
        />
        <div
          v-else-if="hasTimePeriods"
          class="relative-periods-container"
        >
          <div
            v-for="(item, index) in timePeriods"
            :key="`section-${String(item.section || index)}`"
            class="timeframe-section"
          >
            <div class="timeframe-section-title">
              {{ item.section }}
            </div>
            <div class="timeframe-buttons">
              <KButton
                v-for="(timeFrame, itemIdx) in item.values"
                :key="`time-${itemIdx}`"
                appearance="outline"
                class="timeframe-btn"
                :class="{ 'selected-option': timeFrame.key === state.selectedTimeframe.key }"
                :data-testid="'select-timeframe-' + timeFrame.timeframeLength()"
                :is-rounded="false"
                size="medium"
                @click="changeRelativeTimeframe(timeFrame)"
              >
                {{ ucWord(timeFrame.timeframeText) }}
              </KButton>
            </div>
          </div>
        </div>
      </template>
      <template
        v-if="!state.hidePopover"
        #footer
      >
        <div class="datetime-picker-footer-container">
          <KButton
            v-if="clearButton"
            appearance="btn-link"
            class="action-btn"
            data-testid="k-datetime-picker-clear"
            :is-rounded="false"
            size="medium"
            @click="clearSelection()"
          >
            Clear
          </KButton>
          <KButton
            appearance="btn-link"
            class="action-btn"
            data-testid="k-datetime-picker-submit"
            :disabled="submitDisabled"
            :is-rounded="false"
            size="medium"
            @click="submitTimeFrame()"
          >
            Apply
          </KButton>
        </div>
      </template>
    </KPop>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { DatePicker } from 'v-calendar'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KPop from '@/components/KPop/KPop.vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'
import 'v-calendar/dist/style.css'
import type { DateTimePickerState, TimeFrameSection, TimePeriod, TimeRange, Mode, CSSProperties } from '@/types'
import { ModeArray } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30 } from '@kong/design-tokens'

const props = defineProps({
  clearButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: Boolean,
    required: false,
    default: true,
  },
  modelValue: {
    type: [Object, Date, String] as PropType<TimeRange | Date | string>,
    required: false,
    default: '',
    validator: (value: TimeRange | string): boolean => {
      return typeof value === 'string'
        ? value === ''
        : value instanceof Date || (value.start !== undefined && value.end !== undefined)
    },
  },
  /**
   * Upper bound for `v-calendar` dates, everything after this date will be disabled
   */
  maxDate: {
    type: Date,
    required: false,
    default: null,
  },
  /**
   * Lower bound for `v-calendar` dates, everything preceding this date will be disabled
   */
  minDate: {
    type: Date,
    required: false,
    default: null,
  },
  /**
   * Sets a custom interval for the minute select dropdown
   */
  minuteIncrement: {
    type: Number,
    required: false,
    default: 5,
  },
  /**
   * Determines which `v-calendar` type to initialize.
   * - { `date`, `time`, `dateTime` } are passed verbatim to `v-calendar`,
   * - `relative` denotes a component instance made up solely of time frames
   * - `relativeDate` relative time frames + date calendar
   * - `relativeDateTime` relative time frames + datetime calendar
   */
  mode: {
    type: String as PropType<Mode>,
    required: true,
    validator: (value: Mode): boolean => {
      return Object.values(ModeArray).includes(value)
    },
  },
  /**
   * Help text displayed as the default mesage inside the input field.
   * When "Clear" is clicked, the input will revert to displaying this.
   */
  placeholder: {
    type: String,
    required: false,
    default: 'Select a time range',
  },
  /**
   * Determines whether the `v-calendar` will allow a single date/time,
   * or a range of dates/times.
   */
  range: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * A custom set of time frames to be displayed as selectable buttons.
   * The `timeframeLength`, `start`, and `end` values are passed in as functions,
   * allowing for on-the-fly date boundary creation.
   */
  timePeriods: {
    type: Array as PropType<TimeFrameSection[]>,
    required: false,
    default: () => [],
    validator: (sectionsArray: TimeFrameSection[]): boolean => {
      return sectionsArray.every((item: TimeFrameSection) => {
        return Array.isArray(item.values) && item.values.every((timeframe: TimePeriod) => {
          // Check validity of each timeframe
          return typeof timeframe.timeframeText === 'string' &&
            timeframe.timeframeLength !== undefined &&
            typeof timeframe.key === 'string' &&
            timeframe.key !== undefined &&
            typeof timeframe.display === 'string' &&
            timeframe.display !== undefined &&
            timeframe.start !== undefined &&
            timeframe.end !== undefined
        })
      })
    },
  },
  /**
   * Sets the input field to a fixed width
   */
  width: {
    type: String,
    required: false,
    default: 'auto',
  },
})

const emit = defineEmits<{
  (e: 'change', value: TimeRange | string | Date): void
  (e: 'update:modelValue', value: TimeRange | string | Date): void
}>()

// https://vcalendar.io/datepicker.html#model-config
const modelConfig = { type: 'number' }

// TODO: Resolve type issues in a cleaner fashion
const calendarSelectAttributes = {
  key: 'select-calendar',
  highlight: {
    start: { contentClass: 'vcal-day-start' },
    base: { contentClass: 'vcal-day-base' },
    end: { contentClass: 'vcal-day-end' },
  },
} as any

// TODO: Resolve type issues in a cleaner fashion
const calendarDragAttributes = {
  key: 'select-drag',
  highlight: {
    start: { contentClass: 'vcal-day-drag-start' },
    base: { contentClass: 'vcal-day-drag-base' },
    end: { contentClass: 'vcal-day-drag-end' },
  },
} as any

const selectedCalendarRange = ref<TimeRange | Date | string>(props.modelValue)

const hasCalendar = computed((): boolean => props.mode !== 'relative')
const hasTimePeriods = computed((): boolean => props?.timePeriods?.length > 0)
const showCalendar = computed((): boolean => state.tabName === 'custom' || !hasTimePeriods.value)
const submitDisabled = computed((): boolean => {
  // If either the calendar is in range selection mode, or relative time frames
  // are present, check whether both `start` and `end` are set;
  // Otherwise, it's a single date or time, so only check `start`
  return props.range || hasTimePeriods.value
    ? !state.selectedRange.start || !state.selectedRange.end
    : !state.selectedRange.start
})

const widthStyle = computed((): CSSProperties => {
  return {
    width: props.width === 'auto' || props.width.endsWith('%') || props.width.endsWith('px') ? props.width : props.width + 'px',
  }
})

const impliedMode = computed((): string => {
  if (props.mode === 'relativeDateTime') {
    return 'dateTime'
  } else if (props.mode === 'relativeDate') {
    return 'date'
  } else {
    // Values that are safe to be passed verbatim to v-calendar
    return props.mode
  }
})

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

const state = reactive<DateTimePickerState>({
  abbreviatedDisplay: props.placeholder,
  fullRangeDisplay: '',
  hidePopover: false,
  selectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
  previouslySelectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
  selectedTimeframe: props.timePeriods[0]?.values[0],
  previouslySelectedTimeframe: props.timePeriods[0]?.values[0],
  tabName: 'custom',
})

/**
     * Updates our internal (read: separate) state of currently selected `v-calendar` value(s)
     * @param {object | string | null} vCalValue Object containing a pair of `start` and `end` timestamps,
     * or a single timestamp. Can be `null` if current selection is cleared.
     */
const changeCalendarRange = (vCalValue: TimeRange | Date | number | string): void => {
  let start: Date | number, end: Date | number

  if (vCalValue) {
    // If value is an object, this is a time range. Else, a single date or time value.
    if ((vCalValue as TimeRange).start && (vCalValue as TimeRange).end) {
      start = new Date((vCalValue as TimeRange).start)
      end = new Date((vCalValue as TimeRange).end)
    } else {
      start = new Date(Number(vCalValue))
      end = 0
    }

    // Set emitted value when v-calendar selection is made. In the case of a single date / time
    // picker, only the `start` value will be provided.
    // The `timePeriodsKey` param only applies to relative timeframes,
    // not `v-calendar` selections; however, this keeps the object "shape" consistent.
    state.selectedRange = state.previouslySelectedRange = {
      start,
      end,
      timePeriodsKey: '',
    }
  }
}

/**
     * Updates both the input field value, and the full time frame readout
     * when a relative time frame button is clicked
     * @param {*} timeframe
     */
const changeRelativeTimeframe = (timeframe: TimePeriod): void => {
  state.selectedTimeframe = state.previouslySelectedTimeframe = timeframe

  // Format the start/end values as human readable date
  const start: Date = state.selectedTimeframe.start()
  const end: Date = state.selectedTimeframe.end()

  // Set value to be emitted when relative time frame clicked
  state.selectedRange = {
    start: new Date(start),
    end: new Date(end),
    timePeriodsKey: state.selectedTimeframe.key,
  }

  state.fullRangeDisplay = formatDisplayDate(state.selectedRange, false)
}

/**
     * Clears any previously made choices, and emits the result of this action
     * back to the parent.
     */
const clearSelection = (): void => {
  selectedCalendarRange.value = ''
  state.abbreviatedDisplay = props.placeholder
  state.fullRangeDisplay = ''
  state.selectedRange = { start: 0, end: 0, timePeriodsKey: '' }

  if (hasTimePeriods.value) {
    state.selectedTimeframe = props.timePeriods[0]?.values[0]
  }

  // If a range, emit an object with empty `start`, `end`, `timePeriods`;
  // Else, emit empty string for single date/time picker
  if (props.range || props.mode === 'relative') {
    emit('change', state.selectedRange)
    emit('update:modelValue', state.selectedRange)
  } else {
    emit('change', '')
    emit('update:modelValue', '')
  }
}

/**
     * Displays selected date/time/range as a human readable string.
     * The date formatting string is dynamically determined based on
     * the current mode of the instance (Custom vs Relative)
     * @param {*} range A set of `start` and `end` Unix timestamps∂
     */
const formatDisplayDate = (range: TimeRange, htmlFormat: boolean): string => {
  const { start, end } = range
  let fmtStr = 'PP hh:mm a'
  const tzAbbrev = formatInTimeZone(start, localTz, '(z)')

  // Determines the human timestamp readout format string; subject to change
  if (!hasCalendar.value && hasTimePeriods.value) {
    fmtStr = 'PP hh:mm a'
  } else if (props.mode === 'date') {
    fmtStr = 'PP'
  }
  // Determine whether to display a formatting time range, or a single value in input field
  if (props.range) {
    return htmlFormat
      ? `<div>${format(start, fmtStr)} -&nbsp;</div><div>${formatInTimeZone(end, localTz, fmtStr)} ${tzAbbrev}</div>`
      : `${format(start, fmtStr)} - ${formatInTimeZone(end, localTz, fmtStr)} ${tzAbbrev}`
  } else if (start) {
    return `${format(start, fmtStr)} ${tzAbbrev}`
  } else {
    return ''
  }
}

/**
     * Once a selection is made, emit value back to parent.
     * If a range date picker, send the full range (start and end); else, a single `start` Date.
     */
const submitTimeFrame = async (): Promise<void> => {
  if (props.range || hasTimePeriods.value) {
    emit('change', state.selectedRange)
    emit('update:modelValue', state.selectedRange)
  } else {
    const singleDate: Date = new Date(state.selectedRange.start)
    emit('change', singleDate)
    emit('update:modelValue', singleDate)
  }

  state.hidePopover = true
  updateDisplay()
}

/**
     * Updates the input field value as a visual confirmation after a choice is made
     *
     * If a time range (custom or relative) determine which tab has focus,
     * then update input field text.
     * Else, update input field text for single date / time instance
     */
const updateDisplay = (): void => {
  if (props.range && hasTimePeriods.value && !showCalendar.value) {
    state.abbreviatedDisplay = state.selectedTimeframe.display
  } else {
    state.abbreviatedDisplay = formatDisplayDate(state.selectedRange, true)
  }
}

const ucWord = (val: string): string => {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

/**
     * Saves the internal state (range or single value) whenever
     * the `v-calendar` instance is interacted with.
     */
watch(selectedCalendarRange, (newValue, oldValue) => {
  if (newValue !== undefined && newValue !== oldValue) {
    changeCalendarRange(newValue)
  }
}, { immediate: true })

/**
     * Reinstate previous selection whenever user toggles between Relative and Custom tabs
     */
watch(() => state.tabName, (newValue, oldValue) => {
  if (oldValue !== undefined && newValue === 'relative') {
    changeRelativeTimeframe(state.previouslySelectedTimeframe)
  } else if (oldValue !== undefined && newValue === 'custom') {
    changeCalendarRange(state.previouslySelectedRange)
  }
})

onMounted(() => {
  // Select the tab based on incoming defaults; save the default value to our internal
  // state and update the input field to display the human-readable date/time.
  if (props.modelValue) {
    if ('timePeriodsKey' in (props.modelValue as TimeRange)) {
      state.tabName = 'relative'
      for (const section of props.timePeriods) {
        const selectedTimeframe = section.values.find(e => e.key === (props.modelValue as TimeRange).timePeriodsKey)
        if (selectedTimeframe) {
          changeRelativeTimeframe(selectedTimeframe)
          updateDisplay()
          break
        }
      }
    } else {
      state.tabName = 'custom'
      changeCalendarRange(props.modelValue)
      updateDisplay()
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/mixins';

$timepicker-min-width: 360px;
$grid-spacing: var(--kui-space-20, $kui-space-20);

.k-datetime-picker {
  max-width: 100%; // Prevent overflowing the container

  // For aesthetic purposes when relative time frames are present
  &.set-min-width {
    .k-popover {
      min-width: $timepicker-min-width;
    }
  }

  .timepicker-input {
    border: none;
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular); // token value change
    // Prevent overflowing the container
    max-width: 100%;
    padding: var(--kui-space-50, $kui-space-50) !important;
    // Styling button as input via mixin
    @include input-default;

    .calendar-icon {
      margin-right: var(--kui-space-20, $kui-space-20) !important;
    }

    &.set-min-width {
      min-width: $timepicker-min-width;
    }
    &:hover {
      // Styling button as input via mixin
      @include input-hover;
    }
    &:focus,
    &:active {
      // Styling button as input via mixin
      @include input-focus;
    }
    .timepicker-display {
      color: var(--kui-color-text, $kui-color-text);
      display: flex !important;
      flex-wrap: wrap;
      font-size: var(--kui-font-size-40, $kui-font-size-40) !important;

      div {
        font-size: var(--kui-font-size-40, $kui-font-size-40);
        line-height: var(--kui-line-height-30, $kui-line-height-30);
        margin: var(--kui-space-0, $kui-space-0);
        padding: var(--kui-space-0, $kui-space-0);
        text-align: left;
        white-space: nowrap;
        width: auto;
      }
    }
  }

  .k-popover {
    max-height: 90vh;
    max-width: 350px;
    overflow: hidden;
    padding: var(--kui-space-50, $kui-space-50);

    &[x-placement^=bottom] {
      margin-top: var(--kui-space-10, $kui-space-10);
    }

    &[x-placement^=top] {
      margin-bottom: var(--kui-space-10, $kui-space-10);
    }

    .k-popover-content {
      .datetime-picker-toggle {
        margin-bottom: var(--kui-space-60, $kui-space-60) !important;
        width: 100% !important;
      }

      .range-display {
        line-height: $kui-line-height-30;
        margin: var(--kui-space-0, $kui-space-0) auto var(--kui-space-0, $kui-space-0);
      }

      .relative-periods-container {
        display: flex !important;
        flex-direction: column !important;
      }

      .timeframe-section {
        display: flex !important;
        flex-direction: column !important;

        .timeframe-section-title {
          color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
          font-size: var(--kui-font-size-30, $kui-font-size-30) !important;
          font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
          margin-bottom: var(--kui-space-20, $kui-space-20) !important;
          margin-top: var(--kui-space-40, $kui-space-40) !important;
        }
        .timeframe-buttons {
          column-gap: $grid-spacing;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          row-gap: $grid-spacing;

          .timeframe-btn {
            font-size: var(--kui-font-size-30, $kui-font-size-30);
            font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
            justify-content: center;
            padding: var(--kui-space-50, $kui-space-50) var(--kui-space-60, $kui-space-60);

            &.selected-option {
              background-color: var(--kui-color-background-primary, $kui-color-background-primary);
              color: var(--kui-color-text-inverse, $kui-color-text-inverse);
              font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular); // token value change
            }
            &:nth-child(3n) {
              margin-right: var(--kui-space-0, $kui-space-0);
            }
            // TODO this override should be applied to Kongponents button
            &:focus {
              box-shadow: none;
            }
          }
        }
      }
    }

    .k-popover-footer {
      margin: var(--kui-space-20, $kui-space-20) auto var(--kui-space-0, $kui-space-0);

      .datetime-picker-footer-container {
        display: flex !important;
        justify-content: flex-end !important;

        // Apply / Clear buttons
        // TODO these overrides should be applied to Kongponents button
        .action-btn {
          padding: var(--kui-space-40, $kui-space-40) var(--kui-space-60, $kui-space-60);
          &:focus {
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';

// v-calendar overrides
.k-datetime-picker {
  $highlight-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
  $selected-color: var(--kui-color-background-primary, $kui-color-background-primary);
  $text-color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  $text-color-darker: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);

  .vc-container {
    border: var(--kui-border-width-0, $kui-border-width-0);
    width: 100%;

    .vc-bordered {
      border: var(--kui-border-width-0, $kui-border-width-0);
    }

    // disabled day
    .vc-day-content.is-disabled {
      pointer-events: none;
    }

    // Day text within hover selection or post-selection
    .vc-highlights + .vc-day-content {
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);

      &:focus {
        background-color: $selected-color;
      }
    }

    .vc-highlights:has(.vcal-day-start, .vcal-day-end, .vcal-day-drag-start, .vcal-day-drag-end) + .vc-day-content {
      color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    }

    .vc-nav-popover-container {
      background-color: var(--kui-color-background, $kui-color-background);
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      color: $text-color;

      .vc-nav-container {
        .vc-nav-arrow {
          background-color: var(--kui-color-background, $kui-color-background);

          &:active,
          &:focus {
            border: var(--kui-border-width-20, $kui-border-width-20) solid $tmp-color-white; // token needed
          }
        }
        // Calendar year
        .vc-nav-header .vc-nav-title {
          color: $text-color;

          &:hover {
            background-color: var(--kui-color-background, $kui-color-background);
            color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
          }
          &:active,
          &:focus {
            border: var(--kui-border-width-20, $kui-border-width-20) solid $tmp-color-white; // token needed
          }
        }

        // Calendar months in mini-popover
        .vc-nav-items {
          .vc-nav-item {
            color: $text-color;

            &:hover {
              background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
              box-shadow: none;
              color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
            }
            // Currently selected month
            &.is-current {
              border-color: var(--kui-color-border-transparent, $kui-color-border-transparent);
            }
            // Month that has focus (tab navigation supported)
            &.is-active {
              background-color: $selected-color;
              box-shadow: none;
              color: var(--kui-color-text-inverse, $kui-color-text-inverse);
              font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
            }
            // Disabled month
            &.is-disabled {
              color: var(--kui-color-text-disabled, $kui-color-text-disabled);
              cursor: not-allowed;
              opacity: 1;
            }
          }
        }
      }
    }

    .vc-time-picker {
      // Hide grey top border above each Time input group
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--white, $tmp-color-white) !important; // token needed

      // Force Date display and Time inputs to expand to full width
      .vc-time-header, .vc-time-select-group {
        background-color: white;
        border: none;
        text-align: left;
        width: 100%;

        .vc-base-select {
          &:last-child {
            margin-left: 2px;
          }
          select {
            border: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-gray-weaker;
            color: $text-color-darker;
            margin: 0 3px;

            &:hover {
              background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
            }
          }
        }
      }
      .vc-date .vc-weekday,
      .vc-date .vc-month,
      .vc-date .vc-year {
        color: $text-color !important;
      }
    }

    // Hide clock icon preceeding Time inputs
    .vc-time-select-group .vc-base-icon {
      display: none;
    }

    .vc-pane-container {
      .vc-header {
        // Minimize top padding
        margin: 0 !important;
        padding: var(--kui-space-10, $kui-space-10) var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0);

        // Month + Year
        .vc-title {
          background-color: white;
          color: $text-color;
          font-size: var(--kui-font-size-40, $kui-font-size-40);

          &:hover,
          &:active {
            color: $text-color-darker;
          }
        }

        // Previous / Next arrows
        .vc-arrow {
          background-color: white;
        }
      }
      // Calendar content (weekday headings and full month)
      .vc-weeks {
        margin-top: var(--kui-space-50, $kui-space-50);

        .vc-weekday {
          color: $text-color;
        }
      }
    }
    .vc-pane-container,
    .vc-time-picker {
      // Time Range
      .vc-select select {
        background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
        border: var(--kui-border-width-20, $kui-border-width-20) solid $tmp-color-gray-weaker;
        color: $text-color-darker;

        &:hover {
          color: $text-color-darker;
        }
        &:focus {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
          border: var(--kui-border-width-20, $kui-border-width-20) solid $tmp-color-gray-weaker;
          color: $text-color-darker;

          + .vc-select-arrow {
            color: var(--kui-color-text-neutral, $kui-color-text-neutral);
          }
        }
      }
      .vc-time-month, .vc-time-day, .vc-time-year {
        color: $text-color-darker;
      }
      .vc-month, .vc-day {
        color: $text-color-darker;
      }

      // AM / PM highlights
      .vc-am-pm {
        background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
        color: $text-color-darker;

        button {
          &:active,
          &:hover {
            color: $text-color-darker;
          }
          &:focus {
            border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
          }
          &.active {
            background-color: $selected-color;

            &:hover,
            &:focus {
              background-color: $selected-color;
              border-color: $selected-color;
              color: var(--kui-color-text-inverse, $kui-color-text-inverse);
            }
            &:active {
              background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
              border-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
              color: var(--kui-color-text-inverse, $kui-color-text-inverse);
            }
          }
        }
      }

      // Date Range - Post selection
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: $selected-color;
      }
      .vc-highlight.vcal-day-base,
      .vc-highlight.vc-highlight-base-middle {
        background-color: $highlight-color;
      }

      // Date Range - during selection
      .vcal-day-drag-start,
      .vcal-day-drag-end {
        background-color: $selected-color;
        border: var(--kui-border-width-20, $kui-border-width-20) solid $selected-color;
      }
      .vc-day-content {
        &:hover {
          background-color: var(--kui-color-background, $kui-color-background);
          border: var(--kui-border-width-20, $kui-border-width-20) solid $selected-color;
          color: $selected-color;
        }
      }

      // Start / end "outer edge" background color
      .vc-highlight.vc-highlight-base-start,
      .vc-highlight.vc-highlight-base-end {
        background-color: $highlight-color;
      }
    }
  }
}
</style>
