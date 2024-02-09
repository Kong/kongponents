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
      <div class="datetime-picker-input-wrapper">
        <span
          class="datetime-picker-display"
          :class="{ 'has-icon': icon, 'disabled': disabled }"
          data-testid="datetime-picker-display"
          v-html="state.abbreviatedDisplay"
        />

        <KInput
          class="datetime-picker-input"
          data-testid="datetime-picker-input"
          :disabled="disabled"
          readonly
          :style="widthStyle"
        >
          <template
            v-if="icon"
            #before
          >
            <CalIcon
              class="calendar-icon"
              decorative
            />
          </template>
        </KInput>
      </div>

      <template
        v-if="!state.hidePopover"
        #content
      >
        <!-- Custom | Relative toggle -->
        <KSegmentedControl
          v-if="hasTimePeriods && hasCalendar"
          v-model="state.tabName"
          class="datetime-picker-toggle"
          data-testid="datetime-picker-toggle"
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
          borderless
          color="blue"
          :drag-attribute="calendarDragAttributes"
          expanded
          :is-range="!isSingleDatepicker"
          :max-date="maxDate"
          :min-date="minDate"
          :mode="impliedMode"
          :model-config="modelConfig"
          :rules="vCalendarRules"
          :select-attribute="calendarSelectAttributes"
          transparent
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
                :appearance="getTimeframeButtonAppearance(timeFrame)"
                class="timeframe-button"
                :data-testid="`select-timeframe-${timeFrame.timeframeLength()}`"
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
            class="action-button"
            data-testid="datetime-picker-clear"
            @click="clearSelection()"
          >
            Clear
          </KButton>
          <KButton
            appearance="tertiary"
            class="action-button"
            data-testid="datetime-picker-submit"
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
import KInput from '@/components/KInput/KInput.vue'
import KButton from '@/components/KButton/KButton.vue'
import KPop from '@/components/KPop/KPop.vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'
import 'v-calendar/dist/style.css'
import { ModeArray, ModeArrayCustom, ModeArrayRelative, ModeDateOnly, TimepickerMode } from '@/types'
import type { DateTimePickerState, TimeFrameSection, TimePeriod, TimeRange, Mode, CSSProperties, DatePickerModel } from '@/types'
import { CalIcon } from '@kong/icons'
import useUtilities from '@/composables/useUtilities'

const { getSizeFromString } = useUtilities()

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
    default: '100%',
  },
  disabled: {
    type: Boolean,
    default: false,
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
    width: getSizeFromString(props.width),
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

const getTimeframeButtonAppearance = (timeframe: TimePeriod): string => {
  return state.selectedTimeframe.key === timeframe.key ? 'primary' : 'secondary'
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

<style lang="scss" scoped>
/* Component variables */

$kDateTimePickerInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kDateTimePickerInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin

/* Component styles */

.k-datetime-picker {
  // For aesthetic purposes when relative time frames are present
  &.set-min-width {
    .k-popover {
      min-width: 360px;
    }
  }

  .datetime-picker-input-wrapper {
    position: relative;

    .datetime-picker-input {
      :deep(.k-input:read-only) {
        @include inputDefaults;
        cursor: pointer;

        &:hover {
          @include inputHover;
        }

        &:focus {
          @include inputFocus;
        }

        &:disabled {
          @include inputDisabled;
        }
      }
    }

    .datetime-picker-display {
      @include inputText;

      display: inline-flex;
      left: 0;
      margin-left: $kDateTimePickerInputPaddingX;
      margin-top: $kDateTimePickerInputPaddingY;
      max-width: 90%;
      pointer-events: none;
      position: absolute;
      top: 0;
      z-index: 1;

      &.has-icon {
        // default spacing + icon size + icon spacing
        /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
        margin-left: calc($kDateTimePickerInputPaddingX + var(--kui-icon-size-40, $kui-icon-size-40) + var(--kui-space-40, $kui-space-40));
        max-width: 80%;
      }

      &.disabled {
        color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      }
    }
  }

  :deep(.k-popover) {
    border: var(--kui-border-width-10, kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
    max-height: 90vh;
    max-width: 350px;
    min-width: 290px;
    overflow: hidden;
    padding: var(--kui-space-40, $kui-space-40);

    .k-popover-content {
      .datetime-picker-toggle {
        margin-bottom: var(--kui-space-40, $kui-space-40);
      }

      .range-display {
        font-size: var(--kui-font-size-20, $kui-font-size-20);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
        line-height: var(--kui-line-height-20, $kui-line-height-20);
        margin: var(--kui-space-0, $kui-space-0);
        margin-bottom: var(--kui-space-40, $kui-space-40);
      }

      .relative-periods-container {
        display: flex;
        flex-direction: column;
      }

      .timeframe-section {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          margin-bottom: var(--kui-space-40, $kui-space-40);
        }

        .timeframe-section-title {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral);
          font-size: var(--kui-font-size-20, $kui-font-size-20);
          font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
          line-height: var(--kui-line-height-20, $kui-line-height-20);
          margin-bottom: var(--kui-space-20, $kui-space-20);
        }

        .timeframe-buttons {
          display: grid;
          gap: var(--kui-space-40, $kui-space-40);
          grid-template-columns: repeat(3, 1fr);

          .timeframe-button {
            @include truncate;

            border-width: var(--kui-border-width-10, $kui-border-width-10);
            display: block;
            font-size: var(--kui-font-size-20, $kui-font-size-20);
            line-height: var(--kui-line-height-20, $kui-line-height-20);
          }
        }
      }
    }

    .k-popover-footer {
      margin: var(--kui-space-0, $kui-space-0);
      margin-top: var(--kui-space-40, $kui-space-40);

      .datetime-picker-footer-container {
        display: flex;
        gap: var(--kui-space-40, $kui-space-40);
        justify-content: flex-end;
      }
    }
  }
}
</style>

<style lang="scss">
// v-calendar style overrides
// needs to be unscoped

/* Unscoped component mixins */

@mixin vCalendarCssVarsOverrides {
  // stylelint-disable custom-property-pattern

  --vc-white: var(--kui-color-text-inverse, #{$kui-color-text-inverse});
  --vc-focus-ring: var(--kui-shadow-focus, #{$kui-shadow-focus});

  --vc-header-arrow-color: var(--kui-color-text-neutral, #{$kui-color-text-neutral});
  --vc-header-title-color: var(--kui-color-text, #{$kui-color-text});
  --vc-nav-title-color: var(--kui-color-text, #{$kui-color-text});
  // unset hover color here to control hover manually
  --vc-day-content-hover-bg: var(--kui-color-background-transparent, #{$kui-color-background-transparent});
  --vc-weekday-color: var(--kui-color-text-neutral, #{$kui-color-text-neutral});
  --vc-select-color: var(--kui-color-text, #{$kui-color-text});

  --vc-font-family: var(--kui-font-family-text, #{$kui-font-family-text});
  --vc-text-sm: var(--kui-font-size-20, #{$kui-font-size-20});
  --vc-font-bold: var(--kui-font-weight-semibold, #{$kui-font-weight-semibold});

  .vc-blue {
    --vc-accent-200: var(--kui-color-background-primary-weakest, #{$kui-color-background-primary-weakest});
    --vc-accent-600: var(--kui-color-background-primary, #{$kui-color-background-primary});
    --vc-accent-900: var(--kui-color-text, #{$kui-color-text});
  }
}

@mixin vCalendarNavItem {
  background-color: var(--kui-color-background, $kui-color-background);

  &:hover:not([disabled]) {
    background-color: var(--kui-color-background, $kui-color-background);
    color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
  }
}

@mixin vCalendarNavTitle {
  background-color: var(--kui-color-background, $kui-color-background);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);

  &:hover:not([disabled]) {
    color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
    opacity: 1;
  }
}

/* Unscoped component styles */

.k-datetime-picker {
  @include vCalendarCssVarsOverrides;

  .vc-container {
    @include vCalendarCssVarsOverrides;

    border: none;
    width: 100%;

    // generic button styles (mostly apples to arrow buttons and month and year (between the arrows))
    button {
      @include vCalendarNavItem;
    }

    // month and year (between the arrow buttons)
    .vc-title {
      @include vCalendarNavTitle;
    }

    // day
    .vc-day {
      color: var(--kui-color-text, $kui-color-text);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);

      // today
      &.is-today {
        .vc-day-content {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);

          &.vcal-day-base,
          &.vcal-day-drag-base {
            background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
          }

          &.vcal-day-start,
          &.vcal-drag-day-start
          &.vcal-day-end,
          &.vcal-drag-day-end,
          &.vc-highlight-content-solid {
            background-color: var(--kui-color-background-primary, $kui-color-background-primary);
          }
        }
      }

      .vc-day-content {
        &:hover:not(.vc-disabled) {
          background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        }

        &.vcal-day-base {
          &:hover {
            background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
          }
        }

        // range start and end
        &.vcal-day-start,
        &.vcal-drag-day-start
        &.vcal-day-end,
        &.vcal-drag-day-end,
        &.vc-highlight-content-solid {
          &:hover {
            background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong) !important;
          }
        }

        &.vc-disabled {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled);
          opacity: 1;
          pointer-events: none;
        }
      }
    }

    // time picker
    .vc-time-picker {
      align-items: flex-start;
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      border: none;
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      opacity: 1;
      width: 100%;

      .vc-time-select-group {
        border: none;

        .vc-base-icon {
          display: none;
        }

        .vc-base-select {
          &:last-child {
            margin-left: var(--kui-space-20, $kui-space-20);
          }

          select {
            background-color: var(--kui-color-background, $kui-color-background);
            border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
          }
        }

      }

      .vc-time-header {
        text-transform: none;
      }

      .vc-time-weekday,
      .vc-time-month,
      .vc-time-day,
      .vc-time-year {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);

        &:not(:first-child) {
          margin-left: var(--kui-space-10, $kui-space-10);
        }
      }

      // disabled
      &.vc-invalid {
        select {
          background-color: var(--kui-color-background-disabled, $kui-color-background-disabled) !important;
          color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
        }
      }
    }
  }

  // month/year picker flyout container
  .vc-popover-content {
    @include vCalendarCssVarsOverrides;

    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    box-shadow: var(--kui-shadow, $kui-shadow);
    width: 100%;

    .vc-popover-caret {
      display: none;
    }

    .vc-nav-header {
      margin-bottom: var(--kui-space-40, $kui-space-40);

      // months/years arrow buttons
      .vc-nav-arrow {
        @include vCalendarNavItem;
      }

      // month/year title (between the arrows)
      .vc-nav-title {
        @include vCalendarNavTitle;
      }
    }

    .vc-nav-item {
      background-color: var(--kui-color-background, $kui-color-background);
      box-shadow: none !important;
      color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);

      &:hover:not([disabled]) {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      }

      &.is-active {
        background-color: var(--kui-color-background-primary, $kui-color-background-primary) !important;
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      }

      &.is-current {
        background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      }

      &[disabled] {
        color: var(--kui-color-text-disabled, $kui-color-text-disabled);
        opacity: 1;
        pointer-events: none;
      }
    }
  }
}
</style>
