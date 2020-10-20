import { Line, mixins } from 'vue-chartjs'
import './plugins'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    },
    height: {
      type: Number,
      required: false,
      default: 250
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
