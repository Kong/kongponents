<template>
  <div>
    <div
      v-if="hasValidChartData"
      style="position: relative"
    >
      <ReactiveLineChart
        :chart-data="chartData"
        :options="options"
      />
      <ToolTip
        :title="chartTitle"
        :show-tooltip="showTooltip"
        :context="tooltipContext"
        :series="tooltipSeries"
        :left="left"
      />
    </div>
    <EmptyState
      v-else
      :chart-data="chartData"
    />
  </div>
</template>

<script>
import ToolTip from './chartjs/Tooltip'
import EmptyState from './EmptyState'
import ReactiveLineChart from './chartjs/ReactiveLineChart'
import {
  defaultOptions,
  tooltipOptions,
  tooltipBehavior
} from './chartjs/defaultOptions'
import { hasMillisecondTimestamps } from './chartjs/chartDataUtils'

export default {
  name: 'LineChartWithTooltip',
  components: { ReactiveLineChart, ToolTip, EmptyState },
  props: {
    chartData: {
      type: Object,
      required: false,
      default: null
    },
    chartTitle: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      showTooltip: false,
      tooltipContext: '',
      tooltipSeries: [],
      left: null,
      options: {
        ...defaultOptions,
        tooltips: {
          ...tooltipOptions,
          custom: (tooltipModel) => {
            tooltipBehavior(this, tooltipModel)
          }
        }
      }
    }
  },
  computed: {
    hasValidChartData () {
      return hasMillisecondTimestamps(this.chartData)
    }
  }
}
</script>
