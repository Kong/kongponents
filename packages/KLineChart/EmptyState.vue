<template>
  <div>
    <KEmptyState
      :cta-is-hidden="true"
      class="empty-chart"
    >
      <template slot="title">
        {{ title }}
      </template>
    </KEmptyState>
  </div>
</template>

<script>
import KEmptyState from '@kongponents/kemptystate'
import { hasDatasets, hasDataInDatasets, hasTwoOrMoreDataPoints, hasTimeseriesLabels, hasTimeseriesData, hasMillisecondTimestamps } from './chartjs/chartDataUtils'
export default {
  name: 'EmptyState',
  components: { KEmptyState },
  props: {
    chartData: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    title () {
      if (!hasDatasets(this.chartData)) return 'No datasets in selected range'
      if (!hasDataInDatasets(this.chartData)) return 'No data in selected range'
      if (!hasTwoOrMoreDataPoints(this.chartData)) return 'Not enough data to plot'
      if (!hasTimeseriesLabels(this.chartData)) {
        console.error('chartData.labels must be an array of timestamps', this.chartData)

        return 'Something went wrong'
      }

      if (!hasTimeseriesData(this.chartData)) {
        console.error('chartData.datasets must be an array of timestamps', this.chartData)

        return 'Something went wrong'
      }

      if (!hasMillisecondTimestamps(this.chartData)) return 'Unsupported timestamp precision'

      return 'Something went wrong'
    }
  }
}
</script>
<style scoped>
.empty-chart {
  background-image: url("./placeholder.svg?external");
  background-repeat: repeat-x;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
