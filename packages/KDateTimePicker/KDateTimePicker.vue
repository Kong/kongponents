<template>
  <KPop
    :hide-popover="hidePopover"
    class="k-datetime-picker"
    placement="bottomStart"
    width="auto"
    hide-caret
    position-fixed
    @closed="handleClose"
  >
    <KButton
      :is-rounded="false"
      size="large"
      class="timepicker-input"
    >
      {{ abbreviatedDisplay }}
    </KButton>
    <template
      v-if="!hidePopover"
      #content>
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
      <!-- Human timestamp readout -->
      <p v-if="!showCalendar">{{ fullRangeDisplay }}</p>
      <DatePicker
        v-if="hasCalendar && showCalendar"
        v-model="selectedCalendarRange"
        :is-range="range"
        :max-date="maxDate"
        :min-date="minDate"
        :mode="mode"
        :model-config="modelConfig"
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
          <h4>{{ item.section }}</h4>
          <div class="timeframe-buttons d-flex flex-row justify-content-start">
            <KButton
              v-for="(timeFrame, itemIdx) in item.values"
              :key="`time-${itemIdx}`"
              :is-rounded="false"
              :class="{'selected-option': timeFrame.key === selectedTimeframe.key}"
              :data-testid="'select-timeframe-' + timeFrame.timeframeLength()"
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
          size="medium"
          appearance="btn-link"
          @click="clearSelection()"
        >
          Clear
        </KButton>
        <KButton
          :disabled="submitDisabled"
          :is-rounded="false"
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
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
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
    defaultCustom: {
      type: Object | Number,
      required: false,
      default: ''
    },
    defaultRelative: {
      type: Object,
      required: false,
      default: () => {}
    },
    maxDate: {
      type: Number,
      required: false,
      default: null
    },
    minDate: {
      type: Number,
      required: false,
      default: null
    },
    mode: {
      type: String,
      required: true,
      validator: (value) => {
        return [ 'relative', 'date', 'time', 'dateTime' ].includes(value)
      }
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select a time range'
    },
    range: {
      type: Boolean,
      required: false,
      default: false
    },
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
              timeframe.key !== 'undefined' &&
              typeof timeframe.prefix === 'string' &&
              timeframe.prefix !== 'undefined' &&
              timeframe.start !== undefined &&
              timeframe.end !== undefined
          })
        })
      }
    }
  },
  setup (props, { emit }) {
    const hidePopover = ref(false)
    const selectedRange = ref({ start: '', end: '', timePeriodsKey: '' })
    const hasDefaultCustomValue = (props.defaultCustom.start && props.defaultCustom.end) || props.defaultCustom !== ''
    const tabName = ref(hasDefaultCustomValue ? 'custom' : 'relative')
    const abbreviatedDisplay = ref(props.placeholder)
    const fullRangeDisplay = ref('')
    const selectedCalendarRange = ref(props.defaultCustom)
    const selectedTimeframe = ref(props.timePeriods[0] || '')
    const modelConfig = { type: 'number' }
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
    const hasTimePeriods = computed(() => props?.timePeriods?.length)
    const showCalendar = computed(() => tabName.value === 'custom' || !hasTimePeriods.value)
    const submitDisabled = computed(() => {
      // If either the calendar is in range selection mode, or relative time frames
      // are present, check whether both `start` and `end` are set;
      // Otherwise, it's a single date or time, so only check `start`
      return props.range || hasTimePeriods.value
        ? !selectedRange.value.start || !selectedRange.value.end
        : !selectedRange.value.start
    })
    const defaultTimeframe = computed(() => {
      return props.defaultRelative !== undefined
        ? props.defaultRelative
        : null
    })

    const changeCalendarRange = (vCalValue) => {
      let start = ''
      let end = ''

      // If value is an object, this is a time range. Else, a single date or time value.
      if (vCalValue.hasOwnProperty('start')) {
        start = vCalValue.start
        end = vCalValue.end
      } else {
        start = vCalValue
      }

      // Set emitted value when v-calendar selection is made
      selectedRange.value = {
        start: new Date(start),
        end: new Date(end),
        timePeriodsKey: ''
      }
    }

    /**
     * Updates both the input field value, and the full time frame readout
     * when a relative time frame button is clicked
     * @param {*} timeframe
     */
    const changeRelativeTimeframe = (timeframe) => {
      selectedTimeframe.value = timeframe

      // Format the start/end values as human readable date
      const start = selectedTimeframe.value.start()
      const end = selectedTimeframe.value.end()

      // Set value to be emitted when relative time frame clicked
      selectedRange.value = {
        start: new Date(start),
        end: new Date(end),
        timePeriodsKey: selectedTimeframe.value.key
      }

      fullRangeDisplay.value = formatDisplayDate({ start, end })
    }

    const clearSelection = () => {
      selectedCalendarRange.value = null
      abbreviatedDisplay.value = props.placeholder
      fullRangeDisplay.value = ''
      selectedRange.value = { start: '', end: '', timePeriodsKey: '' }

      if (hasTimePeriods) {
        selectedTimeframe.value = props.timePeriods[0]
      }

      // If the calendar has focus, and `range` is set to false, we are displaying
      // a single date / time picker; therefore, need to emit an empty string.
      //
      // Else, we are displaying a date / time range (relative timeframes or calendar range)
      if (!props.range && showCalendar) {
        emit('changed', '')
      } else {
        emit('changed', selectedRange.value)
      }
    }

    // Displays selected date/time/range as a human readable string
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

      // Determine whether an end date/time should be displayed in readout
      return range.end && (props.range || hasTimePeriods.value)
        ? `${format(start, fmtStr)} - ${format(end, fmtStr)}`
        : `${format(start, fmtStr)}`
    }

    const getTimeframeText = (tf) => {
      return `${tf.prefix} ${tf.timeframeText}`
    }

    const submitTimeFrame = async () => {
      if (props.range || hasTimePeriods.value) {
        emit('changed', selectedRange.value)

        // Determine which tab has focus, then update input field text
        if (showCalendar && selectedRange.value) {
          abbreviatedDisplay.value = formatDisplayDate(selectedRange.value)
        } else {
          abbreviatedDisplay.value = getTimeframeText(selectedTimeframe.value)
        }
      } else {
        // Update input field text for single date / time instance
        abbreviatedDisplay.value = formatDisplayDate(selectedRange.value)
        emit('changed', new Date(selectedRange.value.start))
      }

      await nextTick(() => {
        hidePopover.value = true
      })
    }

    const ucWord = (val) => {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }

    const handleClose = async () => {
      await nextTick(() => {
        hidePopover.value = false
      })
    }

    watch(selectedCalendarRange, (newValue, oldValue) => {
      // Updates input field's "human" date whenever v-calendar value is touched
      if (newValue && newValue !== oldValue) {
        changeCalendarRange(newValue)
      }
    }, { immediate: true })

    onMounted(() => {
      // Select the tab based on incoming defaults
      if (hasDefaultCustomValue && hasCalendar.value) {
        tabName.value = 'custom'
      } else if (hasTimePeriods.value) {
        tabName.value = 'relative'
      }

      // Set default value to be displayed in the input field
      if (hasDefaultCustomValue) {
        changeCalendarRange(props.defaultCustom)
      } else if (hasTimePeriods.value && defaultTimeframe.value) {
        changeRelativeTimeframe(defaultTimeframe.value)
      }
    })

    return {
      abbreviatedDisplay,
      changeRelativeTimeframe,
      clearSelection,
      fullRangeDisplay,
      handleClose,
      hasCalendar,
      hasTimePeriods,
      hidePopover,
      modelConfig,
      selectedCalendarRange,
      selectedTimeframe,
      selectedRange,
      calendarSelectAttributes,
      calendarDragAttributes,
      showCalendar,
      submitDisabled,
      submitTimeFrame,
      tabName,
      ucWord
    }
  }
})

</script>

<style lang="scss">
$margin: .2rem;

.k-datetime-picker {
  .timepicker-input {
    min-width: 22rem;
    padding: var(--spacing-sm) var(--spacing-xl) var(--spacing-sm) 40px !important;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 14H2V2H4V4H6V2H10V4H12V2H14V14ZM14 0H2C0.895 0 0 0.896 0 2V14C0 15.104 0.895 16 2 16H14C15.104 16 16 15.104 16 14V2C16 0.896 15.104 0 14 0ZM7 12H9V10H7V12ZM10 9H12V7H10V9ZM7 9H9V7H7V9ZM4 9H6V7H4V9ZM4 12H6V10H4V12Z' fill='%236F7787'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 12px 50%;
    color: var(--grey-600) !important;
    font-weight: 500;

    &:focus {
      box-shadow: none !important;
    }
  }
  .k-popover {
    max-height: 90vh;
    min-width: 22rem;
    overflow: auto;
    padding: 1rem;

    &[x-placement^=bottom] {
      margin-top: var(--spacing-xs);
    }
    &[x-placement^=top] {
      margin-bottom: var(--spacing-xs);
    }

    .k-popover-content {
      .timeframe-section {
        .timeframe-buttons {
          flex-wrap: wrap;
          .k-button {
            flex-basis: calc(32% - $margin);
            font-weight: 400;
            margin: $margin;
            padding: .75rem .5rem;
            justify-content: center;
            width: 3rem;

            &.selected-option {
              color: white;
              background: var(--blue-500)
            }
          }
        }
      }
    }
    .k-popover-footer {
      margin: .75rem auto 0;
      button {
        padding: .25rem 1rem;
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
    --grey-300: var(--grey-300, color(grey-300));
    --grey-400: var(--grey-400, color(grey-400));
    --grey-500: var(--grey-500, color(grey-500));
    --accent-100: var(--grey-500, color(grey-500));   // vc-nav-title
    --accent-900: var(--blue-500, color(blue-500));

    $highlight-color: color(blue-200);

    // Hide clock icon
    .vc-time-icon {
      display: none;
    }
    .vc-bordered {
      border: 0;
    }

    .vc-nav-popover-container {
      background-color: white;
      color: color(grey-500);

      .vc-nav-container {
        .vc-nav-header .vc-nav-title {
          color: color(grey-500);
        }
        .vc-nav-items {
          .vc-nav-item {
            &:hover {
              color: color(grey-500);
              background-color: color(grey-100);
            }
          }
          .vc-nav-item.is-current,
          .vc-nav-item.is-active {
            background-color: color(blue-500);
            border-color: transparent;
            color: white;
          }
        }
      }
    }

    .vc-pane-container,
    .vc-time-picker {
      //
      // Time Range
      //
      .vc-month, .vc-day {
        color: color(grey-500);
      }
      // AM / PM highlights
      .vc-am-pm button.active {
        background-color: color(blue-500);
        &:active,
        &:hover,
        &:focus {
          border-color: color(blue-300);
          background-color: color(blue-300);
        }
      }

      // Day text within hover selection or post-selection
      .vc-highlights + .vc-day-content {
        color: color(white);
        font-weight: 600;
      }

      //
      // Date Range - Post selection
      //
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: color(blue-500);
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
        background-color: color(blue-500);
        color: white;
      }

      .vc-day-content {
        &:hover {
          color: color(blue-500);
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
