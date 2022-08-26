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
      {{ selectedTimeframe.timeframeText }}
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
        v-model="selectimedTimeRange"
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
          @click="selectimedTimeRange = ''"
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
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import KButton from '@kongponents/kbutton/KButton.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KSegmentedControl from '@kongponents/ksegmentedcontrol/KSegmentedControl.vue'

const allowedTimePeriods = [
  {
    section: 'Last',
    timeframeText: '15 minutes',
    timeframeLength: 60 * 15
  },
  {
    section: 'Last',
    timeframeText: 'Hour',
    timeframeLength: 60 * 60 * 1
  },
  {
    section: 'Last',
    timeframeText: '3 hours',
    timeframeLength: 60 * 60 * 3
  },
  {
    section: 'Last',
    timeframeText: '6 hours',
    timeframeLength: 60 * 60 * 6
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
    // Dynamically import v-calendar so that it's only imported when used (as in, not during VuePress SSR)
    // https://github.com/nathanreyes/v-calendar/issues/559#issuecomment-643159564
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
      selectimedTimeRange: this.selectimedTimeRange
    }
  },

  computed: {
    selectedTimeframe () {
      return (this.value || this.allowedTimePeriods[0])
    },
    // selectimedTimeRange () {
    //   return ''
    // },
    showCalendar () {
      return (this.mode === 'custom')
    }
  },

  watch: {
    selectimedTimeRange: {
      handler (newValue, oldValue) {
        console.warn('>>>> selectimedTimeRange watcher <<<')
        console.warn(newValue)
        // emit('update:range', selectimedTimeRange.value)
      },
      immediate: true
    }
  },

  methods: {
    changeTimeframe (timeframe) {
      this.selectedTimeframe = timeframe
      console.warn(this.selectedTimeframe.value.timeframeText)
      console.warn(this.selectedTimeframe.value.timeframeLength)
    },

    submitTimeFrame () {
      console.log(this.showCalendar)
      // If calendar currently show
      // if (this.showCalendar) {
      //   emit('changed', timeframe)
      // } else {
      // }
      // debugger
    }
  }
}

</script>

<style lang="scss">
@import '~@kongponents/styles/variables';

$margin: .2rem;

.analytics-timepicker {
  // TODO: consider moving to a new button theme
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
    min-width: 22rem;

    // v-calendar overrides
    .vc-pane-container {
      .vc-month, .vc-day {
        color: var(--grey-500);
      }

      // AM / PM highlights
      .vc-am-pm button.active {
        background: var(--blue-500);
      }

      // TODO: current day highligh should be `blue-500` as well
      // .vc-day-content.vc-focusable

      // Time range highlight
      .vc-day .vc-highlights.vc-day-layer .vc-highlight {
        background-color: var(--blue-100);
      }
    }
    .relative-frames {
      flex-wrap: wrap;

      .k-button {
        width: 3rem;
        flex-basis: calc(32% - $margin);
        margin: $margin;
        justify-content: center;
      }
    }
  }
}
</style>
