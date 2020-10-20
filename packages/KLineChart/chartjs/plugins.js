import Chart from 'chart.js'
import { defaultOptions } from './defaultOptions'
Chart.pluginService.register({
  id: 'linePlugin',
  afterDatasetsDraw: function (chartInstance) {
    if (chartInstance.tooltip._active && chartInstance.tooltip._active.length) {
      const activePoint = chartInstance.tooltip._active.find(
        (element) => !element._model.skip
      )
      if (!activePoint) {
        return
      }

      const position = activePoint.tooltipPosition()
      if (!position) {
        return
      }

      const ctx = chartInstance.ctx
      const yAxisId = defaultOptions.scales.yAxes[0].id

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(position.x, chartInstance.scales[yAxisId].top)
      ctx.lineTo(position.x, chartInstance.scales[yAxisId].bottom)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#0275d8'
      ctx.stroke()
      ctx.restore()
    }
  }
})
