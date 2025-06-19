<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="k-datetime-picker"
    :class="{ 'set-min-width': hasTimePeriods }"
    :style="widthStyle"
  >
    <KPop
      ref="kPop"
      :disabled="disabled || readonly"
      hide-caret
      hide-close-icon
      :placement="popoverPlacement"
      width="auto"
      @close="state.popoverOpen = false"
      @open="state.popoverOpen = true"
    >
      <div
        class="datetime-picker-trigger-wrapper"
        :class="{ 'disabled': disabled }"
      >
        <div
          class="datetime-picker-trigger"
          :class="{ 'disabled': disabled, 'readonly': readonly }"
          data-testid="datetime-picker-trigger"
          role="button"
          :style="widthStyle"
          :tabindex="disabled ? -1 : 0"
        >
          <span
            class="datetime-picker-display"
            :class="{ 'has-icon': icon, 'disabled': disabled }"
            data-testid="datetime-picker-display"
            v-html="state.abbreviatedDisplay"
          />
        </div>
        <CalIcon
          v-if="icon"
          class="calendar-icon"
          :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
          decorative
          :size="KUI_ICON_SIZE_40"
        />
      </div>

      <template #content>
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
                @click="changeRelativeTimeframe(timeFrame, true)"
              >
                {{ ucWord(timeFrame.timeframeText) }}
              </KButton>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
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
            v-if="showCalendar"
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
import { computed, onMounted, reactive, ref, watch, type CSSProperties } from 'vue'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { DatePicker } from 'v-calendar'
import KButton from '@/components/KButton/KButton.vue'
import KPop from '@/components/KPop/KPop.vue'
import KSegmentedControl from '@/components/KSegmentedControl/KSegmentedControl.vue'
import 'v-calendar/dist/style.css'
import { ModeArrayCustom, ModeArrayRelative, ModeDateOnly, DateTimePickerModes } from '@/types'
import type { DateTimePickerState, TimePeriod, TimeRange, DatePickerModel, ButtonAppearance, DateTimePickerProps, DateTimePickerEmits } from '@/types'
import { CalIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import { normalizeSize } from '@/utilities/css'

const {
  clearButton,
  icon = true,
  modelValue = { start: null, end: null },
  maxDate = null,
  minDate = null,
  mode,
  placeholder = 'Select a time range',
  range,
  timePeriods = [],
  width = '100%',
  disabled,
  readonly,
  popoverPlacement = 'bottom-start',
} = defineProps<DateTimePickerProps>()

const emit = defineEmits<DateTimePickerEmits>()

const kPop = ref<InstanceType<typeof KPop> | null>(null)

// https://vcalendar.io/datepicker.html#model-config
const modelConfig = { type: 'number' }

const calendarSelectAttributes = {
  key: 'select-calendar',
  highlight: {
    start: { contentClass: 'vcal-day-start' },
    base: { contentClass: 'vcal-day-base' },
    end: { contentClass: 'vcal-day-end' },
  },
}

const calendarDragAttributes = {
  key: 'select-drag',
  highlight: {
    start: { contentClass: 'vcal-day-drag-start' },
    base: { contentClass: 'vcal-day-drag-base' },
    end: { contentClass: 'vcal-day-drag-end' },
  },
}

// Booleans
const hasCalendar = computed((): boolean => mode !== DateTimePickerModes.Relative)
const isSingleDatepicker = computed((): boolean => ModeArrayCustom.includes(mode) && !range)
const hasTimePeriods = computed((): boolean => timePeriods.length > 0)
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
const calendarSingleDate = ref<Date | null>(modelValue.start)
const calendarRange = ref<TimeRange>(modelValue || defaultTimeRange)
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
    width: normalizeSize(width),
  }
})

const impliedMode = computed((): string => {
  if (mode === DateTimePickerModes.RelativeDateTime) {
    return 'dateTime'
  } else if (mode === DateTimePickerModes.RelativeDate) {
    return 'date'
  } else {
    // Modes that are safe to be passed verbatim to v-calendar
    return mode
  }
})

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

const state = reactive<DateTimePickerState>({
  abbreviatedDisplay: placeholder,
  fullRangeDisplay: '',
  popoverOpen: false,
  selectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
  previouslySelectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
  selectedTimeframe: timePeriods[0]?.values[0],
  previouslySelectedTimeframe: timePeriods[0]?.values[0],
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
const changeRelativeTimeframe = (timeframe: TimePeriod, autoSubmit: boolean = false): void => {
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

  if (autoSubmit) {
    submitTimeFrame()
  }
}

/**
 * Clears any previously made choices, and emits the result of this action
 * back to the parent.
 */
const clearSelection = (): void => {
  calendarRange.value = defaultTimeRange
  calendarSingleDate.value = null

  state.abbreviatedDisplay = placeholder
  state.fullRangeDisplay = ''

  // Set the relative timeframe to the smallest increment, eg: `15m`
  if (hasTimePeriods.value) {
    state.selectedTimeframe = timePeriods[0]?.values[0]
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
  } else if (ModeDateOnly.includes(mode)) {
    fmtStr = 'PP'
  }

  // Display a formatted time range
  if (!isSingleDatepicker.value) {
    return htmlFormat
      ? `<div>${format(start as Date, fmtStr)} -&nbsp;</div><div>${formatInTimeZone(end as Date, localTz, fmtStr)} ${tzAbbrev}</div>`
      : `${format(start as Date, fmtStr)} - ${formatInTimeZone(end as Date, localTz, fmtStr)} ${tzAbbrev}`
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

  kPop.value?.hidePopover()
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

const getTimeframeButtonAppearance = (timeframe: TimePeriod): ButtonAppearance => {
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
  if (ModeArrayRelative.includes(mode) && modelValue.timePeriodsKey) {
    state.tabName = 'relative'
    submitDisabled.value = false

    for (const section of timePeriods) {
      const selectedTimeframe = section.values.find(e => e.key === modelValue.timePeriodsKey)

      if (selectedTimeframe) {
        changeRelativeTimeframe(selectedTimeframe)
        updateDisplay()
        break
      }
    }
  } else {
    state.tabName = 'custom'
    changeCalendarRange(modelValue)

    if ((modelValue.start && modelValue.end) || (isSingleDatepicker.value && modelValue.start)) {
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
    .popover {
      min-width: 360px;
    }
  }

  .datetime-picker-trigger-wrapper {
    position: relative;
    width: 100%;

    .datetime-picker-trigger {
      @include inputDefaults;

      // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
      // stylelint-disable-next-line no-duplicate-selectors
      & {
        cursor: pointer;
        display: inline-flex;
      }

      &:hover {
        @include inputHover;
      }

      &:focus {
        @include inputFocus;
      }

      &.disabled {
        @include inputDisabled;

        // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
        // stylelint-disable-next-line no-duplicate-selectors
        & {
          pointer-events: none;
        }

        .datetime-picker-display {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
        }
      }

      &.readonly {
        @include inputReadOnly;

        cursor: default;
      }

      .datetime-picker-display {
        @include inputText;

        // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
        // stylelint-disable-next-line no-duplicate-selectors
        & {
          display: flex;
          flex-wrap: wrap;
          pointer-events: none;
          white-space: nowrap;
        }

        &.has-icon {
          // icon size + icon spacing
          /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
          margin-left: calc(var(--kui-icon-size-40, $kui-icon-size-40) + var(--kui-space-40, $kui-space-40));
        }
      }
    }

    .calendar-icon {
      left: $kDateTimePickerInputPaddingX;
      margin-top: 2px; // align icon vertically with input text
      pointer-events: none;
      position: absolute;
      top: $kDateTimePickerInputPaddingY;
    }

    &.disabled {
      cursor: not-allowed;
    }
  }

  :deep(.popover .popover-container) {
    border: var(--kui-border-width-10, kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
    max-height: 90vh;
    max-width: 350px;
    min-width: 290px;
    overflow: hidden;
    padding: var(--kui-space-40, $kui-space-40);

    .popover-content {
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

    .popover-footer {
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

    // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
    // stylelint-disable-next-line no-duplicate-selectors
    & {
      border: none;
      width: 100%;
    }

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

    // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
    // stylelint-disable-next-line no-duplicate-selectors
    & {
      background-color: var(--kui-color-background, $kui-color-background);
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      box-shadow: var(--kui-shadow, $kui-shadow);
      width: 100%;
    }

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
