<template>
  <KPop
    class="analytics-timepicker"
    placement="bottomStart"
    width="auto"
    hide-caret
  >
    <KButton
      :is-rounded="false"
      size="large"
      class="timepicker-input"
    >
      {{ displayedRange }}
    </KButton>
    <template #content>
      <KSegmentedControl
        v-model="mode"
        :options="[
          { label: 'Custom', value: 'custom' },
          { label: 'Relative', value: 'relative' }
        ]"
        class="w-100 mb-5"
        data-testid="analytics-time-toggle"
      />
      <DatePicker
        v-if="showCalendar"
        :attributes="attrs"
        :model-config="modelConfig"
        v-model="selectedCalendarRange"
        mode="dateTime"
        is-range
        is-expanded
      />
      <div
        v-else
        class="relative-frames d-flex justify-content-start"
      >
        <KButton
          v-for="(item, index) in allowedTimePeriods"
          :key="`time-${item.timeframeLength}-${index}`"
          :is-rounded="false"
          :class="{'selected-option': item.timeframeText === selectedTimeframe.timeframeText}"
          :data-testid="'select-timeframe-' + item.timeframeLength"
          appearance="outline"
          size="medium"
          @click="changeTimeframe(item)"
        >
          {{ item.timeframeText }}
        </KButton>
      </div>
    </template>
    <template #footer>
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
// import { DatePicker } from 'v-calendar'
import KButton from '@kongponents/kbutton/KButton.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KSegmentedControl from '@kongponents/ksegmentedcontrol/KSegmentedControl.vue'
import { format, fromUnixTime, getUnixTime, roundToNearestMinutes } from 'date-fns'

const allowedTimePeriods = [
  {
    section: 'Last',
    timeframeText: '15 minutes',
    timeframeLength: 60 * 15
  },
  {
    section: 'Last',
    timeframeText: '12 hours',
    timeframeLength: 60 * 60 * 12
  },
  {
    section: 'Last',
    timeframeText: '24 hours',
    timeframeLength: 60 * 60 * 24
  },
  {
    section: 'Last',
    timeframeText: '7 days',
    timeframeLength: 60 * 60 * 24 * 7
  },
  {
    section: 'Last',
    timeframeText: '30 days',
    timeframeLength: 60 * 60 * 24 * 30
  },
  {
    section: 'Last',
    timeframeText: '90 days',
    timeframeLength: 60 * 60 * 24 * 90
  },
  {
    section: 'Previous',
    timeframeText: 'Week',
    timeframeLength: 60 * 60 * 24 * 90
  },
  {
    section: 'Previous',
    timeframeText: 'Month',
    timeframeLength: 60 * 60 * 24 * 90
  },
  {
    section: 'Previous',
    timeframeText: 'Quarter',
    timeframeLength: 60 * 60 * 24 * 90
  }
]

export default {
  name: 'KTimePicker',
  components: {
    KButton,
    KPop,
    KSegmentedControl,
    DatePicker: () => import('v-calendar/lib/components/date-picker.umd')
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      allowedTimePeriods,
      mode: this.mode || 'custom',
      displayedRange: 'Please select a time range',
      selectedCalendarRange: this.selectedCalendarRange,
      selectedTimeframe: this.value || this.allowedTimePeriods[0],
      modelConfig: {
        type: 'number'
      },
      attrs: [
        {
          day: {
            highlight: {
              style: {
                background: '#e500e3'
              },
              start: { class: 'k-day-start', fillMode: 'solid' },
              base: { class: 'k-day-base', fillMode: 'solid' },
              end: { class: 'k-day-end', fillMode: 'solid' }
            }
          }
        }
      ]
    }
  },

  computed: {
    showCalendar () {
      return (this.mode === 'custom')
    }
  },

  watch: {
    selectedCalendarRange (newVal) {
      console.warn('>>>> selectedCalendarRange watcher <<<')
      console.log(newVal.start)
      console.log(newVal.end)

      this.formatDisplayDate(Math.floor(newVal.start / 1000), Math.floor(newVal.end / 1000))
    }
    //   handler (relativeTimeFrame) {
    //     console.warn('>>>> selectedTimeFrame watcher <<<')
    //     const end = getUnixTime(roundToNearestMinutes(Date.now()))
    //     const start = end - this.selectedTimeframe.timeframeLength

    //     console.log(start)
    //     console.log(end)
    //     console.log(relativeTimeFrame)
    //     this.formatDisplayDate(start, end)
    //   },
    //   immediate: true
    // }
  },

  methods: {
    /**
     * TODO: Given a relative time frame, determine `start` and `end` timestamps in UTC
     * https://bloop.ai/search/how-to-use-date-fns-library-round-to-nearest-minutes-in-javascript
     * @param {*} timeframe
     */
    changeTimeframe (timeframe) {
      this.selectedTimeframe = timeframe

      // Format the start/end values as human readable date
      console.warn('>>>> changeTimeframe <<<')
      const end = getUnixTime(roundToNearestMinutes(Date.now()))
      const start = end - this.selectedTimeframe.timeframeLength

      this.formatDisplayDate(start, end)
    },
    clearSelection () {
      this.selectedCalendarRange = ''
      this.selectedTimeframe = this.allowedTimePeriods[0]
    },
    formatDisplayDate (start, end) {
      this.displayedRange = `${format(fromUnixTime(start), 'PP hh:mm a')} - ${format(fromUnixTime(end), 'PP hh:mm a')}`
    },
    submitTimeFrame () {
      console.warn('>>> submitTimeFrame')
      let start = 0
      let end = 0

      // If calendar currently shown, send start/end values
      if (this.showCalendar) {
        start = Math.floor(this.selectedCalendarRange.start / 1000)
        end = Math.floor(this.selectedCalendarRange.end / 1000)
      } else {
        end = getUnixTime(roundToNearestMinutes(Date.now()))
        start = end - this.selectedTimeframe.timeframeLength
      }

      console.log({ start, end })

      // this.$emit('changed', { start, end })
    }
  }
}

</script>

<style lang="scss" scoped>
$margin: .2rem;

.analytics-timepicker {
  .timepicker-input {
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
    .k-popover-content {
      .relative-frames {
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
    .k-popover-footer {
      // margin: .75rem auto 0;
      button {
        padding: 0 1rem;
      }
    }
  }
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

$margin: .2rem;

.analytics-timepicker {
  .k-popover {
    min-width: 22rem;

    .k-popover-content {
      // v-calendar overrides
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

          .custom-highlight {
            border: 2px solid black !important;
          }
          // Time range highlight
          .vc-day .vc-highlights {
            .vc-highlight {
              // border: 1px solid red !important;

              &.k-day-base {
                // background-color: red !important;
              }

              &.vc-highlight-base-middle {
                // background-color: rgba(color(blue-200), 1) !important;
              }

              // start / end bubbles
              &.vc-highlight-base-start,
              &.vc-highlight-base-end {
                // border: 2px solid red !important;
                // background-color: rgba(color(blue-500), 1) !important;
              }
            }
          }
        }
      }
    }

  }
}
</style>
