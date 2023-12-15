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
        appearance="tertiary"
        aria-role="input"
        class="timepicker-input"
        :class="{ 'set-min-width': hasTimePeriods }"
        data-testid="k-datetime-picker-input"
        :style="widthStyle"
      >
        <CalIcon
          v-if="icon"
          class="calendar-icon"
          :color="KUI_COLOR_TEXT_NEUTRAL"
          :size="KUI_ICON_SIZE_20"
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
        <!-- Time range readout -->
        <p
          v-if="!showCalendar"
          class="range-display"
        >
          {{ state.fullRangeDisplay }}
        </p>
        <DatePicker
          v-if="hasCalendar && showCalendar"
          v-model="calendarVModel"
          :drag-attribute="calendarDragAttributes"
          is-expanded
          :is-range="!isSingleDatepicker"
          :max-date="maxDate"
          :min-date="minDate"
          :mode="impliedMode"
          :model-config="modelConfig"
          :rules="vCalendarRules"
          :select-attribute="calendarSelectAttributes"
        />
        <div
          v-else-if="hasTimePeriods && !isSingleDatepicker"
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
                appearance="secondary"
                class="timeframe-btn"
                :class="{ 'selected-option': timeFrame.key === state.selectedTimeframe.key }"
                :data-testid="'select-timeframe-' + timeFrame.timeframeLength()"
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
            appearance="tertiary"
            class="action-btn"
            data-testid="k-datetime-picker-clear"
            @click="clearSelection()"
          >
            Clear
          </KButton>
          <KButton
            appearance="tertiary"
            class="action-btn"
            data-testid="k-datetime-picker-submit"
            :disabled="submitDisabled"
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
import KPop from '@/components/KPop/KPop.vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'
import 'v-calendar/dist/style.css'
import { ModeArray, ModeArrayCustom, ModeArrayRelative, ModeDateOnly, TimepickerMode } from '@/types'
import type { DateTimePickerState, TimeFrameSection, TimePeriod, TimeRange, Mode, CSSProperties, DatePickerModel } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_20 } from '@kong/design-tokens'
import { CalIcon } from '@kong/icons'

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
    type: Object as PropType<TimeRange>,
    required: false,
    default: () => ({ start: null, end: null }),
    validator: (value: TimeRange): boolean => {
      return value instanceof Date || (value.start !== undefined && value.end !== undefined)
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
  (e: 'change', value: TimeRange | null): void
  (e: 'update:modelValue', value: TimeRange | null): void
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

// Booleans
const hasCalendar = computed((): boolean => props.mode !== TimepickerMode.Relative)
const isSingleDatepicker = computed((): boolean => ModeArrayCustom.includes(props.mode) && !props.range)
const hasTimePeriods = computed((): boolean => props?.timePeriods?.length > 0)
const showCalendar = computed((): boolean => state.tabName === 'custom' || !hasTimePeriods.value)
const submitDisabled = ref<boolean>(true)

const defaultTimeRange: TimeRange = {
  start: null,
  end: null,
  timePeriodsKey: '',
}

/**
 * Dynamically choose the v-model
 * Single date is a Date, whereas a Date range is an object containing `start` and `end` dates
 */
const calendarSingleDate = ref<Date|null>(props.modelValue?.start)
const calendarRange = ref<TimeRange>(props.modelValue || defaultTimeRange)
const calendarVModel = isSingleDatepicker.value
  ? calendarSingleDate as DatePickerModel
  : calendarRange as DatePickerModel

// `minute-increment` has been deprecated in favor of the time `rules` object
// https://vcalendar.io/datepicker/time-rules.html
const vCalendarRules = ref({
  minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
})

const widthStyle = computed((): CSSProperties => {
  return {
    width: props.width === 'auto' || props.width.endsWith('%') || props.width.endsWith('px') ? props.width : props.width + 'ppppx',
  }
})

const impliedMode = computed((): string => {
  if (props.mode === TimepickerMode.RelativeDateTime) {
    return 'dateTime'
  } else if (props.mode === TimepickerMode.RelativeDate) {
    return 'date'
  } else {
    // Modes that are safe to be passed verbatim to v-calendar
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
  tabName: 'relative',
})

/**
 * Tracks internal `v-calendar` state
 * @param {TimeRange | Date | string} vCalValue Object containing a pair of `start` and `end` timestamps.
 * Defaults to today's date if current selection is cleared.
 */
const changeCalendarRange = (vCalValue: TimeRange | null): void => {
  if (!vCalValue) return

  const isCleared = !isSingleDatepicker.value
    ? !(vCalValue as TimeRange).start || !(vCalValue as TimeRange).end
    : !(vCalValue as TimeRange).start

  const start: Date | number | null = vCalValue?.start || new Date()
  const end: Date | number | null = vCalValue?.end || null

  submitDisabled.value = !!isCleared

  /**
   * Set our v-calendar v-model
   */
  if (!isSingleDatepicker.value && vCalValue && (vCalValue as TimeRange).start && (vCalValue as TimeRange).end) {
    calendarRange.value.start = start
    calendarRange.value.end = end
  } else if (vCalValue && (vCalValue as TimeRange).start) {
    calendarSingleDate.value = start
  }

  /**
   * Set our internal state, used for display purposes, and for the emitted value when "Apply" is clicked.
   * The `timePeriodsKey` param only applies to relative timeframes, not `v-calendar` selections;
   * We return an empty string to keep the object shape consistent.
   */
  state.selectedRange = state.previouslySelectedRange = {
    start,
    end,
    timePeriodsKey: '',
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
  submitDisabled.value = false
}

/**
 * Clears any previously made choices, and emits the result of this action
 * back to the parent.
 */
const clearSelection = (): void => {
  calendarRange.value = defaultTimeRange
  calendarSingleDate.value = null

  state.abbreviatedDisplay = props.placeholder
  state.fullRangeDisplay = ''

  // Set the relative timeframe to the smallest increment, eg: `15m`
  if (hasTimePeriods.value) {
    state.selectedTimeframe = props.timePeriods[0]?.values[0]
  }

  state.selectedRange = state.previouslySelectedRange = defaultTimeRange

  // Emit an object with empty `start`, `end`, `timePeriods`;
  emit('change', state.selectedRange)
  emit('update:modelValue', state.selectedRange)
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

  const tzAbbrev = formatInTimeZone((start as Date), localTz, '(z)')

  // Determines the human timestamp readout format string; subject to change
  if (!hasCalendar.value && hasTimePeriods.value) {
    fmtStr = 'PP hh:mm a'
  } else if (ModeDateOnly.includes(props.mode)) {
    fmtStr = 'PP'
  }

  // Display a formatted time range
  if (!isSingleDatepicker.value) {
    return htmlFormat
      ? `<div>${format(start as Date, fmtStr)} -&nbsp;</div><div>${formatInTimeZone(end as Date, localTz, fmtStr)} ${tzAbbrev}</div>`
      : `${format(start as Date, fmtStr)} - ${formatInTimeZone(end as Date, localTz, fmtStr)} ${tzAbbrev}` || ''
  } else {
    return `${format(start as Date, fmtStr)} ${tzAbbrev}`
  }
}

/**
 * Once a selection is made, emit value back to parent.
 * Emits `start`, `end` and the optional `timePeriodsKey`.
 */
const submitTimeFrame = async (): Promise<void> => {
  if (!isSingleDatepicker.value) {
    emit('change', state.selectedRange)
    emit('update:modelValue', state.selectedRange)
  } else {
    emit('change', { start: state.selectedRange.start, end: null })
    emit('update:modelValue', { start: state.selectedRange.start, end: null })
  }

  state.hidePopover = true
  updateDisplay()
}

/**
 * Updates the input field value as a visual confirmation after a choice is made
 *
 * If the calendar tab has focus, display the time range and timezone
 * Otherwise, display the chosen relative timeframe
 */
const updateDisplay = (): void => {
  if (showCalendar.value && !!state.selectedRange?.start) {
    state.abbreviatedDisplay = formatDisplayDate(state.selectedRange, true)
  } else if (hasTimePeriods.value && !showCalendar.value) {
    state.abbreviatedDisplay = state.selectedTimeframe.display
  }
}

const ucWord = (val: string): string => {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

/**
 * Triggers when `v-calendar` instance is in single date/time mode
 */
watch(calendarSingleDate, (newValue, oldValue) => {
  if (newValue !== undefined && newValue !== oldValue) {
    changeCalendarRange({ start: newValue, end: null, timePeriodsKey: '' } as TimeRange)
  }
}, { immediate: true })

/**
 * Triggers when `v-calendar` instance is in date range mode
 */
watch(calendarRange, (newValue, oldValue) => {
  if (newValue !== undefined && newValue !== oldValue) {
    changeCalendarRange(newValue as TimeRange)
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

/**
 * Selects either "Relative" or "Custom" tab, saves the incoming default value to internal state,
 * then updates the input field to display the human-readable time frame.
 */
onMounted(() => {
  if (ModeArrayRelative.includes(props.mode) && props.modelValue?.timePeriodsKey) {
    state.tabName = 'relative'
    submitDisabled.value = false

    for (const section of props.timePeriods) {
      const selectedTimeframe = section.values.find(e => e.key === props.modelValue.timePeriodsKey)

      if (selectedTimeframe) {
        changeRelativeTimeframe(selectedTimeframe)
        updateDisplay()
        break
      }
    }
  } else {
    state.tabName = 'custom'
    changeCalendarRange(props.modelValue)

    if ((props.modelValue?.start && props.modelValue?.end) || (isSingleDatepicker.value && props.modelValue?.start)) {
      updateDisplay()
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/mixins';

$timepicker-min-width: 360px;
$grid-spacing: var(--kui-space-30, $kui-space-30);

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
    justify-content: flex-start;
    // Prevent overflowing the container
    max-width: 100%;

    // Match KInput
    padding: var(--kui-space-40, $kui-space-40) var(--kui-space-50, $kui-space-50) !important;

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
    }

    .timepicker-display {
      color: var(--kui-color-text, $kui-color-text);
      display: flex !important;
      flex-wrap: wrap;
      font-size: var(--kui-font-size-30, $kui-font-size-30);

      > div {
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        line-height: var(--kui-line-height-20, $kui-line-height-20);
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
        margin-bottom: var(--kui-space-40, $kui-space-40) !important;
        width: 100% !important;

        .k-button {
          font-size: var(--kui-font-size-20, $kui-font-size-20);
        }
      }

      .range-display {
        font-size: var(--kui-font-size-20, $kui-font-size-20);
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
          font-size: var(--kui-font-size-20, $kui-font-size-20) !important;
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
            font-size: var(--kui-font-size-20, $kui-font-size-20);
            font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
            justify-content: center;
            padding: var(--kui-space-40, $kui-space-40) var(--kui-space-0, $kui-space-0);

            &.selected-option {
              background-color: var(--kui-color-background-primary, $kui-color-background-primary);
              color: var(--kui-color-text-inverse, $kui-color-text-inverse);
              font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
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
      margin: var(--kui-space-40, $kui-space-40) auto var(--kui-space-0, $kui-space-0);

      .datetime-picker-footer-container {
        display: flex !important;
        justify-content: flex-end !important;

        // Apply / Clear buttons
        // TODO these overrides should be applied to Kongponents button
        .action-btn {
          font-size: var(--kui-font-size-20, $kui-font-size-20);
          padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);
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
  // Use `Inter` font throughout
  // stylelint-disable-next-line
  --vc-font-family: var(--kui-font-family-text, #{$kui-font-family-text});

  // All calendar dates use v-calendar's small text variable
  // stylelint-disable-next-line
  --vc-text-sm: var(--kui-font-size-20, #{$kui-font-size-20});

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
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-white !important; // token needed
      padding-bottom: 0;

      // Start / End times should be displayed inline
      &.vc-attached {
        display: inline-block;

        // End time should be preceded by a dash
        &:nth-of-type(0) {
          content: '–';
          margin-left: $kui-space-20;
        }
      }

      .vc-time-header {
        .vc-time-weekday, .vc-time-month, .vc-time-day, .vc-time-year {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral) !important;
        }
      }

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
          font-size: var(--kui-font-size-30, $kui-font-size-30);

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
        padding: 0;
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
