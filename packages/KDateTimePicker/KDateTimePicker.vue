<template>
  <KPop
    :hide-popover="hidePopover"
    v-bind="position"
    class="k-datetime-picker"
    placement="bottomStart"
    width="auto"
    hide-caret
    @closed="handleClose"
  >
    <KButton
      :is-rounded="false"
      size="large"
      class="timepicker-input"
      data-testid="k-datetimepicker-display"
    >
      <KIcon
        :color="'var(--grey-500)'"
        icon="calendar2"
        class="mr-1"
        size="18"
      />
      <span>
        {{ abbreviatedDisplay }}
      </span>
    </KButton>
    <template
      v-if="!hidePopover"
      #content>
      <!-- Custom | Relative toggle -->
      <KSegmentedControl
        v-if="hasTimePeriods && hasCalendar"
        v-model="tabName"
        :options="[
          { label: 'Relative', value: 'relative' },
          { label: 'Custom', value: 'custom' }
        ]"
        class="w-100 mb-5"
        data-testid="analytics-time-toggle"
      />
      <!-- Single date / time or range readout -->
      <p
        v-if="!showCalendar"
        class="range-display"
      >{{ fullRangeDisplay }}</p>
      <DatePicker
        v-if="hasCalendar && showCalendar"
        v-model="selectedCalendarRange"
        :is-range="range"
        :max-date="maxDate"
        :min-date="minDate"
        :mode="mode"
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
          :key="`section-${item.section || index}`"
          class="timeframe-section d-flex flex-column"
        >
          <h4 class="timeframe-section-title">{{ item.section }}</h4>
          <div class="timeframe-buttons d-flex flex-row justify-content-start">
            <KButton
              v-for="(timeFrame, itemIdx) in item.values"
              :key="`time-${itemIdx}`"
              :is-rounded="false"
              :class="{'selected-option': timeFrame.key === selectedTimeframe.key}"
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
      #footer>
      <div class="d-flex justify-content-end">
        <KButton
          :is-rounded="false"
          data-testid="k-datetimepicker-clear"
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
          data-testid="k-datetimepicker-submit"
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
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { format } from 'date-fns'
import KButton from '@kongponents/kbutton/KButton.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KSegmentedControl from '@kongponents/ksegmentedcontrol/KSegmentedControl.vue'

export default defineComponent({
  name: 'KDateTimePicker',
  components: {
    KButton,
    KPop,
    KSegmentedControl,
    DatePicker: () => import('v-calendar/lib/components/date-picker.umd')
  },
  props: {
    value: {
      type: [Date, Object, String],
      validator: value => value === '' || value instanceof Date ||
        (
          value.hasOwnProperty('start') &&
          value.hasOwnProperty('end') &&
          value.start !== undefined &&
          value.end !== undefined
        )
    },
    /**
     * Upper bound for `v-calendar` dates, everything after this date will be disabled
     */
    maxDate: {
      type: Date,
      required: false,
      default: null
    },
    /**
     * Lower bound for `v-calendar` dates, everything preceding this date will be disabled
     */
    minDate: {
      type: Date,
      required: false,
      default: null
    },
    /**
     * Sets a custom interval for the Minute select dropdown
     */
    minuteIncrement: {
      type: Number,
      required: false,
      default: 5
    },
    /**
     * Determines which `v-calendar` type to initialize.
     * Three of the values (`date`, `time`, `dateTime`) are passed verbatim to `v-calendar`,
     * whereas `relative` denotes a component instance made up solely of time frames.
     */
    mode: {
      type: String,
      required: true,
      validator: (value) => {
        return [ 'relative', 'date', 'time', 'dateTime' ].includes(value)
      }
    },
    /**
     * Help text displayed as the default mesage inside the input field.
     * When "Clear" is clicked, the input will revert to displaying this.
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Select a time range'
    },
    position: {
      type: Object,
      default: () => ({})
    },
    /**
     * Determines whether the `v-calendar` will allow a single date/time,
     * or a range of dates/times.
     */
    range: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * A custom set of time frames to be displayed as selectable buttons.
     * The `timeframeLength`, `start`, and `end` values are passed in as functions,
     * allowing for on-the-fly date boundary creation.
     */
    timePeriods: {
      type: Array,
      required: false,
      default: () => [],
      validator: (valuesArray) => {
        return valuesArray.every((item) => {
          return Array.isArray(item.values) && item.values.every((timeframe) => {
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
      }
    }
  },
  emits: ['input', 'change'],
  setup (props, { emit }) {
    const modelConfig = { type: 'number' } // https://vcalendar.io/datepicker.html#model-config
    const calendarSelectAttributes = {
      highlight: {
        start: { class: 'vcal-day-start' },
        base: { class: 'vcal-day-base' },
        end: { class: 'vcal-day-end' }
      }
    }
    const calendarDragAttributes = {
      highlight: {
        start: { class: 'vcal-day-drag-start' },
        base: { class: 'vcal-day-drag-base' },
        end: { class: 'vcal-day-drag-end' }
      }
    }

    const hasCalendar = computed(() => props.mode !== 'relative')
    const hasTimePeriods = computed(() => props.timePeriods && props.timePeriods.length)
    const showCalendar = computed(() => state.tabName === 'custom' || !hasTimePeriods.value)
    const submitDisabled = computed(() => {
      // If either the calendar is in range selection mode, or relative time frames
      // are present, check whether both `start` and `end` are set;
      // Otherwise, it's a single date or time, so only check `start`
      return props.range || hasTimePeriods.value
        ? !state.selectedRange.start || !state.selectedRange.end
        : !state.selectedRange.start
    })

    const selectedCalendarRange = ref(props.value)

    const state = reactive({
      abbreviatedDisplay: props.placeholder,
      fullRangeDisplay: '',
      hidePopover: false,
      selectedRange: { start: new Date(), end: new Date(), timePeriodsKey: '' },
      selectedTimeframe: props.timePeriods[0] || '',
      tabName: 'relative'
    })

    /**
     * Updates our internal (read: separate) state of currently selected `v-calendar` value(s)
     * @param {object | string | null} vCalValue Object containing a pair of `start` and `end` timestamps,
     * or a single timestamp. Can be `null` if current selection is cleared.
     */
    const changeCalendarRange = (vCalValue) => {
      let start = ''
      let end = ''

      if (vCalValue) {
        // If value is an object, this is a time range. Else, a single date or time value.
        if (vCalValue.hasOwnProperty('start') && vCalValue.hasOwnProperty('end')) {
          start = new Date(vCalValue.start)
          end = new Date(vCalValue.end)
        } else {
          start = new Date(vCalValue)
          end = ''
        }
      }

      // Set emitted value when v-calendar selection is made. In the case of a single date / time
      // picker, only the `start` value will be provided.
      // The `timePeriodsKey` param only applies to relative timeframes,
      // not `v-calendar` selections; however, this keeps the object "shape" consistent.
      state.selectedRange = {
        start,
        end,
        timePeriodsKey: ''
      }
    }

    /**
     * Updates both the input field value, and the full time frame readout
     * when a relative time frame button is clicked
     * @param {*} timeframe
     */
    const changeRelativeTimeframe = (timeframe) => {
      state.selectedTimeframe = timeframe

      // Format the start/end values as human readable date
      const start = state.selectedTimeframe.start()
      const end = state.selectedTimeframe.end()

      // Set value to be emitted when relative time frame clicked
      state.selectedRange = {
        start: new Date(start),
        end: new Date(end),
        timePeriodsKey: state.selectedTimeframe.key
      }

      state.fullRangeDisplay = formatDisplayDate({ start, end })
    }

    /**
     * Clears any previously made choices, and emits the result of this action
     * back to the parent.
     */
    const clearSelection = () => {
      selectedCalendarRange.value = null
      state.abbreviatedDisplay = props.placeholder
      state.fullRangeDisplay = ''
      state.selectedRange = { start: '', end: '', timePeriodsKey: '' }

      if (hasTimePeriods) {
        state.selectedTimeframe = props.timePeriods[0]
      }

      // If a range, emit an object with empty `start`, `end`, `timePeriods`;
      // Else, emit empty string for single date/time picker
      if (props.range || props.mode === 'relative') {
        emit('input', state.selectedRange)
        emit('change', state.selectedRange)
      } else {
        emit('input', '')
        emit('change', '')
      }
    }

    /**
     * Displays selected date/time/range as a human readable string.
     * The date formatting string is dynamically determined based on
     * the current mode of the instance (Custom vs Relative)
     * @param {*} range A set of `start` and `end` Unix timestamps
     */
    const formatDisplayDate = (range) => {
      const { start, end } = range
      let fmtStr = 'PP'

      // Determines the human timestamp readout format string; subject to change
      if (!hasCalendar.value && hasTimePeriods.value) {
        fmtStr = 'PP hh:mm a'
      } else if (props.mode === 'date') {
        fmtStr = 'PP'
      } else if (props.mode === 'time') {
        fmtStr = 'PP hh:mm a'
      } else if (props.mode === 'dateTime') {
        fmtStr = 'PP hh:mm a'
      }

      // Determine whether to display a formatting time range, or a single value in input field
      if (props.range) {
        return `${format(start, fmtStr)} - ${format(end, fmtStr)}`
      } else if (start) {
        return `${format(start, fmtStr)}`
      }
    }

    /**
     * Once a selection is made, emit value back to parent
     */
    const submitTimeFrame = async () => {
      if (props.range || hasTimePeriods.value) {
        emit('input', state.selectedRange)
        emit('change', state.selectedRange)
      } else {
        emit('input', new Date(state.selectedRange.start))
        emit('change', new Date(state.selectedRange.start))
      }

      handleClose()
      updateDisplay()
    }

    /**
     * Updates the input field value as a visual confirmation after a choice is made
     *
     * If a time range (custom or relative) determine which tab has focus,
     * then update input field text.
     * Else, update input field text for single date / time instance
     */
    const updateDisplay = () => {
      if (props.range || hasTimePeriods.value) {
        if (showCalendar.value && state.selectedRange) {
          state.abbreviatedDisplay = formatDisplayDate(state.selectedRange)
        } else {
          state.abbreviatedDisplay = state.selectedTimeframe.display
        }
      } else {
        state.abbreviatedDisplay = formatDisplayDate(state.selectedRange)
      }
    }

    const ucWord = (val) => {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }

    const handleClose = async () => {
      state.hidePopover = true
      await nextTick(() => {
        state.hidePopover = false
      })
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

    onMounted(() => {
      // Select the tab based on incoming defaults; save the default value to our internal
      // state and update the input field to display the human-readable date/time.
      if (props.value) {
        if (props.value instanceof Date || !props.value.timePeriodsKey) {
          state.tabName = 'custom'
          changeCalendarRange(props.value)
          updateDisplay()
        } else {
          state.tabName = 'relative'
          const selectedTimeframe = props.timePeriods.reduce((prev, sections) => {
            return prev || sections.values.find(e => e.key === props.value.timePeriodsKey)
          }, undefined)

          changeRelativeTimeframe(selectedTimeframe)
          updateDisplay()
        }
      }
    })

    return {
      changeRelativeTimeframe,
      clearSelection,
      handleClose,
      hasCalendar,
      hasTimePeriods,
      modelConfig,
      selectedCalendarRange,
      calendarSelectAttributes,
      calendarDragAttributes,
      showCalendar,
      ...toRefs(state),
      submitDisabled,
      submitTimeFrame,
      ucWord
    }
  }
})
</script>

<style lang="scss">
$margin: .2rem;
$timepicker-min-width: 24rem;

.k-datetime-picker {
  .timepicker-input {
    min-width: $timepicker-min-width;
    padding: var(--spacing-sm) var(--spacing-sm) !important;
    color: var(--grey-600) !important;
    font-weight: 500;
    .kong-icon > svg {
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
    }
    &:focus {
      box-shadow: none !important;
    }
  }
  .k-popover {
    max-height: 90vh;
    min-width: $timepicker-min-width;
    overflow: hidden;
    padding: var(--spacing-lg) var(--spacing-md);

    &[x-placement^=bottom] {
      margin-top: var(--spacing-xs);
    }
    &[x-placement^=top] {
      margin-bottom: var(--spacing-xs);
    }

    .k-popover-content {
      .range-display {
        margin: var(--spacing-xs) auto var(--spacing-xs) $margin;
      }
      .timeframe-section {
        .timeframe-section-title {
          margin-left: $margin;
          margin-bottom: var(--spacing-xs);
        }
        .timeframe-buttons {
          flex-wrap: wrap;
          .timeframe-btn {
            font-size: var(--type-sm);
            flex-basis: calc(32% - $margin);
            font-weight: 400;
            margin: $margin;
            padding: .75rem .5rem;
            justify-content: center;
            width: 3rem;

            &.selected-option {
              color: white;
              background: var(--blue-500);
              font-weight: 500;
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
        padding: .25rem 1rem;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

$margin: .2rem;

// v-calendar overrides
.k-datetime-picker {
  .vc-container {
    border: 0;

    // Override v-calendar color variables with the corresponding Kongponent color variables
    --blue-200: var(--blue-200, color(blue-200));
    --blue-300: var(--blue-300, color(blue-300));
    --blue-400: var(--blue-400, color(blue-400));
    --blue-500: var(--blue-500, color(blue-500));
    --blue-600: var(--blue-600, color(blue-600));
    --blue-700: var(--blue-700, color(blue-700));
    --grey-200: var(--grey-200, color(grey-200));
    --grey-300: var(--grey-300, color(grey-300));
    --grey-400: var(--grey-400, color(grey-400));
    --grey-500: var(--grey-500, color(grey-500));
    --grey-600: var(--grey-600, color(grey-600));
    --accent-100: var(--grey-500, color(grey-500));   // vc-nav-title
    --accent-900: var(--blue-500, color(blue-500));

    $highlight-color: color(blue-200);
    $selected-color: color(blue-500);
    $text-color: color(grey-500);
    $text-color-darker: color(grey-600);

    // TODO: Hide clock icon based on boolean prop
    .vc-time-icon {
      display: none;
    }
    .vc-bordered {
      border: 0;
    }

    // Day text within hover selection or post-selection
    .vc-highlights + .vc-day-content {
      color: color(white);
      font-weight: 600;
    }

    .vc-nav-popover-container {
      background-color: white;
      border: 1px solid color(grey-300);
      color: $text-color;

      .vc-nav-container {
        .vc-nav-arrow {
          background-color: white;

          &:active,
          &:focus {
            border: 2px solid white;
          }
        }

        // Calendar year
        .vc-nav-header .vc-nav-title {
          color: $text-color;
          &:hover {
            background-color: white;
            color: color(grey-600);
          }
          &:active,
          &:focus {
            border: 2px solid white;
          }
        }
        // Calendar months
        .vc-nav-items {
          .vc-nav-item {
            color: $text-color;

            &:hover {
              color: color(grey-600);
              background-color: color(blue-100);
              box-shadow: none;
            }
          }
          .vc-nav-item.is-current,
          .vc-nav-item.is-active {
            background-color: $selected-color;
            border-color: transparent;
            color: white;
          }
        }
      }
    }

    .vc-time-picker {
      border-top: 1px solid white !important;
      .vc-date .vc-weekday,
      .vc-date .vc-month,
      .vc-date .vc-year {
        color: $text-color !important;
      }
    }
    .vc-pane-container {
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
        margin-top: var(--spacing-sm);
        .vc-weekday {
          color: $text-color;
        }
      }
    }

    .vc-pane-container,
    .vc-time-picker {
      //
      // Time Range
      //
      .vc-select select {
        color: $text-color-darker;
        &:hover {
          color: $text-color-darker;
        }
        &:focus {
          border: 2px solid white;
          color: $text-color-darker;
          background-color: var(--gray-200);
        }
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
              color: white;
              border-color: $selected-color;
              background-color: $selected-color;
            }
            &:active {
              color: white;
              border-color: color(blue-300);
              background-color: color(blue-300);
            }
          }
        }
      }

      //
      // Date Range - Post selection
      //
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: $selected-color;
        color: white !important;
      }
      .vc-highlight.vcal-day-base,
      .vc-highlight.vc-highlight-base-middle {
        background-color: $highlight-color;
      }

      //
      // Date Range - during selection
      //

      // Start / end
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
