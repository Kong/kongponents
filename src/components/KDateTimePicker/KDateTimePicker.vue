<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    :class="{ 'set-min-width': hasTimePeriods }"
    :style="widthStyle"
    class="k-datetime-picker"
  >
    <KPop
      :hide-popover="hidePopover"
      placement="bottomStart"
      width="auto"
      hide-caret
      position-fixed
      @opened="hidePopover = false"
    >
      <KButton
        :class="{ 'set-min-width': hasTimePeriods }"
        :is-rounded="false"
        :style="widthStyle"
        size="large"
        class="timepicker-input"
        aria-role="input"
        data-testid="k-datetime-picker-input"
      >
        <KIcon
          v-if="icon"
          color="var(--grey-500)"
          icon="calendar"
          class="mr-1"
          size="18"
        />
        <div
          class="timepicker-display type-md d-flex"
          data-testid="k-datetime-picker-display"
          v-html="abbreviatedDisplay"
        />
      </KButton>
      <template
        v-if="!hidePopover"
        #content
      >
        <!-- Custom | Relative toggle -->
        <KSegmentedControl
          v-if="hasTimePeriods && hasCalendar"
          v-model="tabName"
          :options="[
            { label: 'Relative', value: 'relative' },
            { label: 'Custom', value: 'custom' }
          ]"
          class="w-100 mb-4"
          data-testid="k-datetime-picker-toggle"
          @click="selected => tabName = selected"
        />
        <!-- Single date / time or range readout -->
        <p
          v-if="!showCalendar"
          class="range-display"
        >
          {{ fullRangeDisplay }}
        </p>
        <DatePicker
          v-if="hasCalendar && showCalendar"
          v-model="selectedCalendarRange"
          :is-range="range"
          :max-date="maxDate"
          :min-date="minDate"
          :mode="impliedMode"
          :model-config="modelConfig"
          :minute-increment="minuteIncrement"
          :select-attribute="calendarSelectAttributes"
          :drag-attribute="calendarDragAttributes"
          is-expanded
        />
        <div
          v-else-if="hasTimePeriods"
          class="d-flex flex-column"
        >
          <div
            v-for="(item, index) in timePeriods"
            :key="`section-${String(item.section || index)}`"
            class="timeframe-section d-flex flex-column"
          >
            <div class="timeframe-section-title type-sm mt-2 mb-1">
              {{ item.section }}
            </div>
            <div class="timeframe-buttons d-flex">
              <KButton
                v-for="(timeFrame, itemIdx) in item.values"
                :key="`time-${itemIdx}`"
                :is-rounded="false"
                :class="{ 'selected-option': timeFrame.key === selectedTimeframe.key }"
                :data-testid="'select-timeframe-' + timeFrame.timeframeLength()"
                class="timeframe-btn"
                appearance="outline"
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
        v-if="!hidePopover"
        #footer
      >
        <div class="d-flex justify-content-end">
          <KButton
            :is-rounded="false"
            data-testid="k-datetime-picker-clear"
            class="action-btn"
            size="medium"
            appearance="btn-link"
            @click="clearSelection()"
          >
            Clear
          </KButton>
          <KButton
            :disabled="submitDisabled"
            :is-rounded="false"
            data-testid="k-datetime-picker-submit"
            class="action-btn"
            size="medium"
            appearance="btn-link"
            @click="submitTimeFrame()"
          >
            Apply
          </KButton>
        </div>
      </template>
    </KPop>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref, toRefs, watch } from 'vue'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { DatePicker } from 'v-calendar'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KPop from '@/components/KPop/KPop.vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'
import 'v-calendar/dist/style.css'

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
  selectedTimeframe: TimePeriod
  tabName: string
}

export interface CSSProperties {
  [key: `${string}`]: string
}

export default defineComponent({
  name: 'KDateTimePicker',
  components: {
    KButton,
    KIcon,
    KPop,
    KSegmentedControl,
    DatePicker,
  },
  props: {
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
     * Sets a custom interval for the Minute select dropdown
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
      type: String,
      required: true,
      validator: (value: string): boolean => {
        return ['date', 'time', 'dateTime', 'relative', 'relativeDate', 'relativeDateTime'].includes(value)
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
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    // https://vcalendar.io/datepicker.html#model-config
    const modelConfig = { type: 'number' }
    const calendarSelectAttributes = {
      highlight: {
        start: { class: 'vcal-day-start' },
        base: { class: 'vcal-day-base' },
        end: { class: 'vcal-day-end' },
      },
    }
    const calendarDragAttributes = {
      highlight: {
        start: { class: 'vcal-day-drag-start' },
        base: { class: 'vcal-day-drag-base' },
        end: { class: 'vcal-day-drag-end' },
      },
    }

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

    const selectedCalendarRange = ref<TimeRange | Date | string>(props.modelValue)

    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

    const state = reactive<DateTimePickerState>({
      abbreviatedDisplay: props.placeholder,
      fullRangeDisplay: '',
      hidePopover: false,
      selectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
      selectedTimeframe: props.timePeriods[0]?.values[0],
      tabName: 'relative',
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
        state.selectedRange = {
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
      state.selectedTimeframe = timeframe

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
      let fmtStr = 'PP'
      const tzAbbrev = formatInTimeZone(start, localTz, '(z)')

      // Determines the human timestamp readout format string; subject to change
      if (!hasCalendar.value && hasTimePeriods.value) {
        fmtStr = 'PP hh:mm a'
      } else if (props.mode === 'date') {
        fmtStr = 'PP'
      } else if (['time', 'dateTime'].includes(props.mode)) {
        fmtStr = 'PP hh:mm a'
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

    /**
     * Saves the internal state (range or single value) whenever
     * the `v-calendar` instance is interacted with.
     */
    watch(selectedCalendarRange, (newValue, oldValue) => {
      if (newValue !== undefined && newValue !== oldValue) {
        changeCalendarRange(newValue)
      }
    }, { immediate: true })

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

    return {
      changeRelativeTimeframe,
      clearSelection,
      hasCalendar,
      hasTimePeriods,
      impliedMode,
      modelConfig,
      selectedCalendarRange,
      calendarSelectAttributes,
      calendarDragAttributes,
      showCalendar,
      ...toRefs(state),
      submitDisabled,
      widthStyle,
      submitTimeFrame,
      ucWord,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';
@import '@/styles/mixins';

$timepicker-min-width: 360px;
$margin: 6px;

.k-datetime-picker {
  max-width: 100%; // Prevent overflowing the container

  // For aesthetic purposes when relative time frames are present
  &.set-min-width {
    .k-popover {
      min-width: $timepicker-min-width;
    }
  }

  .timepicker-input {
    --KButtonOutlineColor: var(--grey-500);
    --KButtonOutlineBorder: var(--grey-300);
    --KButtonOutlineActive: var(--white);
    --KButtonOutlineHoverBorder: var(--blue-200);
    padding: var(--spacing-sm) var(--spacing-sm) !important;
    font-weight: 500;
    // Prevent overflowing the container
    max-width: 100%;
    // Styling button as input via mixin
    @include input-default;

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
      > .kong-icon path {
        fill: var(--grey-600);
      }
    }
    .timepicker-display {
      flex-wrap: wrap;
      div {
        width: auto;
        text-align: left;
        padding: 0;
        margin: 0;
        line-height: 1.3;
        white-space: nowrap;
      }
    }
  }

  .k-popover {
    max-height: 90vh;
    width: 100% !important;
    overflow: hidden;
    padding: var(--spacing-sm);
    &[x-placement^=bottom] {
      margin-top: 2px;
    }
    &[x-placement^=top] {
      margin-bottom: 2px;
    }
    .k-popover-content {
      .range-display {
        margin: 0 auto 0;
      }
      .timeframe-section {
        .timeframe-section-title {
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }
        .timeframe-buttons {
          flex-wrap: wrap;
          .timeframe-btn {
            font-size: var(--type-sm);
            font-weight: 400;
            // Only 2 of 3 columns will have a right margin; subtract margin / 2
            flex: 0 calc(33% - 3px);
            margin-right: $margin;
            padding: var(--spacing-sm) var(--spacing-md);
            justify-content: center;
            margin-bottom: $margin;
            &.selected-option {
              color: white;
              background-color: var(--blue-500);
              font-weight: 500;
            }
            &:nth-child(3n) {
              margin-right: 0px;
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
      margin: var(--spacing-md) auto 0;
      // Apply / Clear buttons
      // TODO these overrides should be applied to Kongponents button
      .action-btn {
        padding: 0 var(--spacing-md) var(--spacing-xs);
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

// v-calendar overrides
.k-datetime-picker {
  $highlight-color: color(blue-200);
  $selected-color: color(blue-500);
  $text-color: color(grey-500);
  $text-color-darker: color(grey-600);

  .vc-container {
    border: 0;
    .vc-time-icon {
      display: none;
    }
    .vc-bordered {
      border: 0;
    }

    // Day text within hover selection or post-selection
    .vc-highlights + .vc-day-content {
      color: var(--white);
      font-weight: 600;

      &:focus {
        background-color: $selected-color;
      }
    }

    .vc-nav-popover-container {
      background-color: var(--white);
      border: 1px solid color(grey-300);
      color: $text-color;

      .vc-nav-container {
        .vc-nav-arrow {
          background-color: var(--white);
          &:active,
          &:focus {
            border: 2px solid var(--white);
          }
        }
        // Calendar year
        .vc-nav-header .vc-nav-title {
          color: $text-color;
          &:hover {
            background-color: var(--white);
            color: color(grey-600);
          }
          &:active,
          &:focus {
            border: 2px solid var(--white);
          }
        }

        // Calendar months in mini-popover
        .vc-nav-items {
          .vc-nav-item {
            color: $text-color;
            &:hover {
              color: color(grey-600);
              background-color: color(blue-100);
              box-shadow: none;
            }
            // Currently selected month
            &.is-current {
              border-color: transparent;
            }
            // Month that has focus (tab navigation supported)
            &.is-active {
              background-color: $selected-color;
              color: var(--white);
              font-weight: 600;
              box-shadow: none;
            }
            // Disabled month
            &.is-disabled {
              color: var(--grey-400);
              cursor: not-allowed;
              opacity: 1;
            }
          }
        }
      }
    }

    .vc-time-picker {
      border-top: 1px solid var(--white) !important;
      &:last-of-type {
        padding-bottom: 0;
      }
      .vc-date .vc-weekday,
      .vc-date .vc-month,
      .vc-date .vc-year {
        color: $text-color !important;
      }
    }

    .vc-pane-container {
      // Minimize top padding
      .vc-arrows-container,
      .vc-header {
        padding: 2px 16px 0;
      }
      .vc-header {
        // Month + Year
        .vc-title {
          color: $text-color;
          &:hover,
          &:active {
            color: $text-color-darker;
          }
        }
      }
      //
      // Calendar content (weekday headings and full month)
      //
      .vc-weeks {
        margin-top: color(spacing-sm);
        .vc-weekday {
          color: $text-color;
        }
      }
    }
    .vc-pane-container,
    .vc-time-picker {
      // Time Range
      .vc-select select {
        color: $text-color-darker;
        &:hover {
          color: $text-color-darker;
        }
        &:focus {
          border: 2px solid var(--white);
          color: $text-color-darker;
          background-color: color(gray-200);
        }
      }
      .vc-time-month, .vc-time-day, .vc-time-year {
        color: $text-color;
      }
      .vc-month, .vc-day {
        color: $text-color;
      }

      // AM / PM highlights
      .vc-am-pm {
        color: $text-color-darker;
        button {
          &:active,
          &:hover {
            color: $text-color-darker;
          }
          &:focus {
            border: 2px solid transparent;
          }
          &.active {
            background-color: $selected-color;
            &:hover,
            &:focus {
              color: var(--white);
              border-color: $selected-color;
              background-color: $selected-color;
            }
            &:active {
              color: var(--white);
              border-color: color(blue-300);
              background-color: color(blue-300);
            }
          }
        }
      }

      // Date Range - Post selection
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: $selected-color;
        color: white !important;
      }
      .vc-highlight.vcal-day-base,
      .vc-highlight.vc-highlight-base-middle {
        background-color: $highlight-color;
      }

      // Date Range - during selection
      .vcal-day-drag-start,
      .vcal-day-drag-end {
        border: 2px solid color(blue-400);
        background-color: $selected-color;
        color: white;
      }
      .vc-day-content {
        &:hover {
          color: $selected-color;
          background-color: white;
          border: 2px solid color(blue-400);
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
