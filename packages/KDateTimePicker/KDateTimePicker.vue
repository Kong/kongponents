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
        v-if="hasRelativeTimeframes && hasCalendar"
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
        :is-range="isRange"
        :max-date="maxDate"
        :min-date="minDate"
        :mode="mode"
        :model-config="modelConfig"
        :select-attribute="calendarSelectAttributes"
        is-expanded
      />
      <div
        v-else-if="hasRelativeTimeframes && hasTimePeriods"
        class="d-flex flex-column"
      >
        <div
          v-for="(item, index) in timePeriods"
          :key="`section-${index}`"
          class="timeframe-section d-flex flex-column"
        >
          <h4>{{ item.section }}</h4>
          <div class="timeframe-buttons d-flex flex-row justify-content-start">
            <KButton
              v-for="(timeFrame, index) in item.values"
              :key="`time-${index}`"
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
import KButton from '@kongponents/kbutton/KButton.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KSegmentedControl from '@kongponents/ksegmentedcontrol/KSegmentedControl.vue'
import { format } from 'date-fns'

export default {
  name: 'KTimePicker',
  components: {
    KButton,
    KPop,
    KSegmentedControl,
    DatePicker: () => import('v-calendar/lib/components/date-picker.umd')
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Select a time range'
    },
    mode: {
      type: String,
      required: false,
      default: '',
      validator: (value) => {
        return [ '', 'date', 'time', 'dateTime' ].indexOf(value) !== -1
      }
    },
    defaultRelative: {
      type: Object,
      required: false,
      default: () => {}
    },
    defaultCustom: {
      type: Object | String,
      required: false,
      default: ''
    },
    isRange: {
      type: Boolean,
      required: false,
      default: false
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

  data () {
    return {
      hidePopover: false,
      tabName: this.getDefaultTabName(),
      abbreviatedDisplay: this.placeholder,
      fullRangeDisplay: '',
      selectedCalendarRange: this.defaultCustom,
      selectedTimeframe: this.timePeriods[0],
      selectedRange: { start: '', end: '' },
      modelConfig: {
        type: 'number'
      },
      calendarSelectAttributes: {
        highlight: {
          start: { class: 'vcal-day-start' },
          base: { class: 'vcal-day-base' },
          end: { class: 'vcal-day-end' },
          day: { class: 'vcal-day-preselect' }
        }
      }
    }
  },

  computed: {
    hasCalendar () {
      return this.mode !== ''
    },
    hasTimePeriods () {
      return this.timePeriods && this.timePeriods.length
    },
    showCalendar () {
      return this.tabName === 'custom' || !this.hasTimePeriods
    },
    hasRelativeTimeframes () {
      return this.timePeriods.length > 0
    },
    submitDisabled () {
      return this.isRange || this.hasRelativeTimeframes
        ? !this.selectedRange.start || !this.selectedRange.end
        : !this.selectedRange.start
    },
    hasDefaultCustomValue () {
      return (this.defaultCustom.start && this.defaultCustom.end) || this.defaultCustom !== ''
    },
    defaultTimeframe () {
      return (this.defaultRelative !== undefined)
        ? this.defaultRelative
        : null
    }
  },

  watch: {
    // Updates input field's "human" date whenever v-calendar value is touched
    selectedCalendarRange (newVal) {
      if (newVal) {
        this.changeCalendarRange(newVal)
      }
    }
  },

  mounted () {
    // Select the tab based on incoming defaults
    if (this.hasDefaultCustomValue && this.hasCalendar) {
      this.tabName = 'custom'
    } else if (this.hasRelativeTimeframes) {
      this.tabName = 'relative'
    }

    // Set default value to be displayed in the input field
    if (this.hasDefaultCustomValue) {
      this.changeCalendarRange(this.defaultCustom)
    } else if (this.defaultTimeframe) {
      this.changeRelativeTimeframe(this.defaultTimeframe)
    }
  },

  methods: {
    getTimeframeText (tf) {
      return `${tf.prefix} ${tf.timeframeText}`
    },

    changeCalendarRange (vCalValue) {
      let start = ''
      let end = ''

      // If value is an object, this is a time range. Else, a single date or time value.
      if (vCalValue.hasOwnProperty('start')) {
        start = vCalValue.start
        end = vCalValue.end
      } else {
        start = vCalValue
      }

      const range = { start, end }

      // Set emitted value when v-calendar selection is made
      this.selectedRange = {
        start,
        end,
        startISO: new Date(start).toISOString(),
        endISO: (end !== '') ? new Date(end).toISOString() : end,
        timeframeText: ''
      }

      this.abbreviatedDisplay = this.formatDisplayDate(range)
    },

    /**
     * Updates both the input field value, and the full time frame readout
     * when a relative time frame button is clicked
     * @param {*} timeframe
     */
    changeRelativeTimeframe (timeframe) {
      this.selectedTimeframe = timeframe

      // Update input field text
      this.abbreviatedDisplay = this.getTimeframeText(this.selectedTimeframe)

      // Format the start/end values as human readable date
      const start = this.selectedTimeframe.start()
      const end = this.selectedTimeframe.end()

      // Set value to be emitted when relative time frame clicked
      this.selectedRange = {
        start,
        end,
        startISO: new Date(start).toISOString(),
        endISO: new Date(end).toISOString(),
        timeframeText: this.getTimeframeText(this.selectedTimeframe)
      }

      this.fullRangeDisplay = this.formatDisplayDate({ start, end })
    },

    clearSelection () {
      this.selectedCalendarRange = null
      this.abbreviatedDisplay = this.placeholder
      this.fullRangeDisplay = ''
      this.selectedRange = { start: '', end: '' }
      this.selectedTimeframe = this.timePeriods[0]
    },

    // Displays selected date/time/range as a human readable string
    formatDisplayDate (range) {
      const { start, end } = range
      let fmtStr = 'PP'

      // Determines the human timestamp readout format string; subject to change
      if (!this.hasCalendar && this.hasRelativeTimeframes) {
        fmtStr = 'PP hh:mm a'
      } else if (this.mode === 'date') {
        fmtStr = 'PP'
      } else if (this.mode === 'time') {
        fmtStr = 'PP hh:mm a'
      } else if (this.mode === 'dateTime') {
        fmtStr = 'PP hh:mm a'
      }

      // Determine whether an end date/time should be displayed in readout
      return range.end && (this.isRange || this.hasRelativeTimeframes)
        ? `${format(start, fmtStr)} - ${format(end, fmtStr)}`
        : `${format(start, fmtStr)}`
    },

    getDefaultTabName () {
      return this.hasDefaultCustomValue ? 'custom' : 'relative'
    },

    submitTimeFrame () {
      this.$emit('changed', this.selectedRange)
      this.$nextTick(() => {
        this.hidePopover = true
      })
    },

    ucWord (val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    },

    async handleClose () {
      this.$nextTick(() => {
        this.hidePopover = false
      })
    }
  }
}

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
        // TODO: pending design input
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

      //
      // Date Range - Post selection
      //
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: color(blue-500);
        color: white;
      }
      .vc-highlight.vcal-day-base,
      .vc-highlight.vc-highlight-base-middle {
        background-color: $highlight-color !important;
      }
      .vc-highlights + .vc-day-content {
        color: white;
      }

      //
      // Date Range - during selection
      //

      // Start / end
      .vc-highlight.vc-highlight-base-start,
      .vc-highlight.vc-highlight-base-end {
        background-color: $highlight-color !important;
      }
    }
  }
}
</style>
