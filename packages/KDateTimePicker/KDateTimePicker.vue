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
        v-if="hasRelativeTimeframes"
        v-model="tabName"
        :options="[
          { label: 'Relative', value: 'relative' },
          { label: 'Custom', value: 'custom' }
        ]"
        class="w-100 mb-5"
        data-testid="analytics-time-toggle"
      />
      <p v-if="!showCalendar">{{ fullRangeDisplay }}</p>
      <DatePicker
        v-if="showCalendar"
        :is-range="true"
        :select-attribute="calendarSelectAttributes"
        :model-config="modelConfig"
        v-model="selectedCalendarRange"
        mode="dateTime"
        is-expanded
      />
      <div
        v-else-if="!showCalendar && hasRelativeTimeframes"
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
              :key="`time-${timeFrame.timeframeLength}-${index}`"
              :is-rounded="false"
              :class="{'selected-option': timeFrame.timeframeText === selectedTimeframe.timeframeText}"
              :data-testid="'select-timeframe-' + timeFrame.timeframeLength"
              appearance="outline"
              size="medium"
              @click="changeRelativeTimeframe(timeFrame)"
            >
              {{ timeFrame.timeframeText }}
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
import { format, fromUnixTime, getUnixTime, roundToNearestMinutes } from 'date-fns'

export default {
  name: 'KTimePicker',
  components: {
    KButton,
    KPop,
    KSegmentedControl,
    DatePicker: () => import('v-calendar/lib/components/date-picker.umd')
  },
  props: {
    defaultMessage: {
      type: String,
      required: false,
      default: 'Select a time range'
    },
    defaultRelative: {
      type: String,
      required: false,
      default: ''
    },
    defaultCustom: {
      type: Object,
      required: false,
      default: () => {}
    },
    timePeriods: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    return {
      hidePopover: false,
      tabName: this.getDefaultTabName(),
      abbreviatedDisplay: this.defaultMessage,
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
    showCalendar () {
      return (this.tabName === 'custom')
    },
    hasRelativeTimeframes () {
      return (this.timePeriods.length > 0)
    },
    submitDisabled () {
      return (!this.selectedRange.start || !this.selectedRange.end)
    },
    hasDefaultCustomValue () {
      return (this.defaultCustom?.start && this.defaultCustom?.end)
    }
  },

  watch: {
    // Updates input field's "human" date whenever v-calendar value is touched
    selectedCalendarRange (newVal) {
      if (newVal) {
        const range = { start: this.msToSec(newVal.start), end: this.msToSec(newVal.end) }

        this.abbreviatedDisplay = this.formatDisplayDate(range)
      }
    }
  },

  mounted () {
    if (this.hasDefaultCustomValue) {
      const range = {
        start: this.msToSec(this.defaultCustom.start),
        end: this.msToSec(this.defaultCustom.end)
      }

      this.abbreviatedDisplay = this.formatDisplayDate(range)
    }

    if (this.hasDefaultCustomValue) {
      this.tabName = 'custom'
    } else if (this.hasRelativeTimeframes) {
      this.tabName = 'relative'
    }
  },

  methods: {
    /**
     * Updates both the input field value, and the full time frame readout
     * when a relative time frame button is clicked
     * @param {*} timeframe
     */
    changeRelativeTimeframe (timeframe) {
      this.selectedTimeframe = timeframe

      // Update input field text
      this.abbreviatedDisplay = this.selectedTimeframe.timeframeText

      // Format the start/end values as human readable date
      const end = getUnixTime(roundToNearestMinutes(Date.now()))
      const start = end - this.selectedTimeframe.timeframeLength

      this.fullRangeDisplay = this.formatDisplayDate({start, end})
    },
    clearSelection () {
      this.selectedCalendarRange = null
      this.abbreviatedDisplay = this.defaultMessage
      this.fullRangeDisplay = ''
      this.selectedRange = { start: '', end: '' }
      this.selectedTimeframe = this.timePeriods[0]
    },
    formatDisplayDate (range) {
      this.selectedRange = range
      const { start, end } = range

      return `${format(fromUnixTime(start), 'PP hh:mm a')} - ${format(fromUnixTime(end), 'PP hh:mm a')}`
    },
    getDefaultTabName () {
      return (this.hasDefaultCustomValue ? 'custom' : 'relative')
    },
    submitTimeFrame () {
      this.$emit('changed', this.selectedRange)
      this.$nextTick(() => {
        this.hidePopover = true
      })
    },
    msToSec (ts) {
      return Math.floor(ts / 1000)
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
    // AM / PM highlights
    .vc-am-pm button.active {
      background-color: rgba(color(blue-500), 1);
    }
    // Hide clock icon
    .vc-time-icon {
      display: none;
    }
    .vc-bordered {
      border: 0;
    }
    .vc-pane-container {
      .vc-month, .vc-day {
        color: rgba(color(grey-500), 1);
      }

      .vc-highlights + .vc-day-content {
        color: white;
      }

      // Time range highlights
      .vc-highlight.vcal-day-start,
      .vc-highlight.vcal-day-end {
        background-color: rgba(color(blue-500), 1);
        color: white;
      }
      .vc-highlight.vcal-day-base {
        background-color: rgba(color(blue-200), 1) !important;
      }

      .vc-highlight {
        background-color: rgba(color(blue-200), 1);
      }
    }
  }
}
</style>
