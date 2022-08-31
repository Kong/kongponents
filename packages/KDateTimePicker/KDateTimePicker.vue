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
        v-if="hasRelativeTimeframes"
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
              @click="changeTimeframe(timeFrame)"
            >
              {{ timeFrame.timeframeText }}
            </KButton>
          </div>
        </div>
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
// import { DatePicker } from 'v-calendar'
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
      required: true
    },
    defaultValue: {
      type: Object,
      required: true
    },
    timePeriods: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    console.warn(' >>> defaultValue: ')
    console.log(this.defaultValue)
    console.warn(' >>> timePeriods: ')
    console.log(this.timePeriods)

    return {
      mode: this.mode || 'custom',
      displayedRange: this.defaultMessage,
      selectedCalendarRange: this.defaultValue,
      selectedTimeframe: this.timePeriods[0],
      range: { start: '', end: '' },
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
    },
    hasRelativeTimeframes () {
      return (this.timePeriods.length > 0)
    },
    submitDisabled () {
      return (!this.range.start || !this.range.end)
    }
  },

  watch: {
    selectedCalendarRange (newVal) {
      console.log('>>>> selectedCalendarRange')
      console.log(newVal)
      if (newVal) {
        this.formatDisplayDate(Math.floor(newVal.start / 1000), Math.floor(newVal.end / 1000))
      }
    }
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
      this.selectedCalendarRange = null
      this.displayedRange = this.defaultMessage
      this.range.start = ''
      this.range.end = ''
      this.selectedTimeframe = this.timePeriods[0]
    },
    formatDisplayDate (start, end) {
      this.range = { start, end }
      this.displayedRange = `${format(fromUnixTime(start), 'PP hh:mm a')} - ${format(fromUnixTime(end), 'PP hh:mm a')}`
    },
    submitTimeFrame () {
      console.log(this.range)

      this.$emit('changed', this.range)
    }
  }
}

</script>

<style lang="scss" scoped>
$margin: .2rem;

.analytics-timepicker {
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
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

$margin: .2rem;

.analytics-timepicker {
  .k-popover {
    min-width: 22rem;
    padding: 1rem ;
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
    .k-popover-footer {
      margin: .75rem auto 0;
      button {
        padding: .25rem 1rem;
      }
    }
  }
}
</style>
