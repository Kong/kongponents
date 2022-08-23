<template>
  <KPop
    class="analytics-timepicker"
    placement="bottomEnd"
    width="auto"
  >
    <KButton
      :is-rounded="false"
      size="large"
    >
      <template #icon>
        <KIcon icon="book" />
      </template>
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
          v-for="item in allowedTimePeriods"
          :key="item.timeframeLength"
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
      <div class="d-flex justify-content-between">
        <KButton
          :is-rounded="false"
          size="medium"
          @click="submitTimeFrame()"
        >
          Apply filter
        </KButton>
        <KButton
          :is-rounded="false"
          size="medium"
          @click="selectimedTimeRange = ''"
        >
          Clear filter
        </KButton>
      </div>
    </template>
  </KPop>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KSegmentedControl from '@kongponents/ksegmentedcontrol/KSegmentedControl.vue'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { DatePicker } from 'v-calendar'

export default defineComponent({
  name: 'KTimePicker',
  components: {
    KButton,
    KPop,
    KSegmentedControl,
    DatePicker
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const mode = ref('custom')
    const selectimedTimeRange = ref('')
    const allowedTimePeriods = computed(() => {
      return [
        {
          timeframeText: '15 minutes',
          timeframeLength: 60 * 15
        },
        {
          timeframeText: 'Hour',
          timeframeLength: 60 * 60 * 1
        },
        {
          timeframeText: '3 hours',
          timeframeLength: 60 * 60 * 3
        },
        {
          timeframeText: '6 hours',
          timeframeLength: 60 * 60 * 6
        },
        {
          timeframeText: '12 hours',
          timeframeLength: 60 * 60 * 12
        },
        {
          timeframeText: '24 hours',
          timeframeLength: 60 * 60 * 24
        },
        {
          timeframeText: '7 days',
          timeframeLength: 60 * 60 * 24 * 7
        },
        {
          timeframeText: '30 days',
          timeframeLength: 60 * 60 * 24 * 30
        }
      ]
    })

    const selectedTimeframe = ref(props.value || allowedTimePeriods[0])
    const showCalendar = computed(() => mode.value === 'custom')

    const changeTimeframe = (timeframe) => {
      selectedTimeframe.value = timeframe
      console.warn(selectedTimeframe.value.timeframeText)
      console.warn(selectedTimeframe.value.timeframeLength)
    }

    const submitTimeFrame = () => {
      console.log(showCalendar)

      // If calendar currently show
      // if (showCalendar.value) {
      //   emit('changed', timeframe)
      // } else {
      // }
      // debugger
    }

    watch(selectimedTimeRange, () => {
      console.warn(selectimedTimeRange.value.start)
      console.warn(selectimedTimeRange.value.end)
      // emit('update:range', selectimedTimeRange.value)
    })

    return {
      allowedTimePeriods,
      changeTimeframe,
      selectimedTimeRange,
      mode,
      selectedTimeframe,
      showCalendar,
      submitTimeFrame
    }
  }
})
</script>

<style lang="scss">
@import '~@kongponents/styles/variables';

$margin: .2rem;

.analytics-timepicker .k-popover {
  min-width: 22rem;

  .relative-frames {
    flex-wrap: wrap;

    .k-button {
      width: 3rem;
      flex-basis: calc(32% - $margin);
      margin: $margin;
    }
  }
}
</style>
