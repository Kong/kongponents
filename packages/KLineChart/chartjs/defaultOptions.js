export const defaultLineOptions = {
  lineTension: 0,
  borderWidth: 1.2,
  pointBorderWidth: 1.2,
  borderJoinStyle: 'round'
}
export const xAxesOptions = {
  type: 'time',
  distribution: 'series',
  gridLines: {
    display: false,
    drawTicks: false,
    drawBorder: false
  },
  ticks: {
    padding: 10,
    source: 'labels',
    maxRotation: 0
  },
  time: {
    tooltipFormat: 'h:mm:ss a',
    minUnit: 'second',
    displayFormats: {
      hour: 'h:mm a'
    }
  }
}
export const yAxesOptions = {
  ticks: {
    maxTicksLimit: 5
  },
  id: 'main-y-axis',
  stacked: true,
  gridLines: {
    lineWidth: 1,
    zeroLineColor: 'rgba(0, 0, 0, 0.1)',
    zeroLineWidth: 2,
    drawBorder: false,
    display: true,
    drawTicks: false
  }
}
export const tooltipOptions = {
  enabled: false,
  mode: 'index',
  intersect: false,
  callbacks: {
    label: (tooltipItem, chart) => ({
      label: chart.datasets[tooltipItem.datasetIndex].label,
      value: tooltipItem.yLabel
    })
  }
}
export const tooltipBehavior = (vueInstance, tooltipModel) => {
  if (tooltipModel.opacity === 0) {
    vueInstance.showTooltip = false

    return
  }

  if (tooltipModel.body) {
    let colors = tooltipModel.labelColors

    vueInstance.tooltipContext = tooltipModel.title[0]
    vueInstance.tooltipSeries = tooltipModel.body.map((series, i) => ({
      backgroundColor: colors[i].backgroundColor,
      borderColor: colors[i].borderColor,
      label: series.lines[0].label,
      value: series.lines[0].value
    }))
    const lineXPos = tooltipModel.dataPoints[0].x
    const leftOfCursor = lineXPos - 300
    const rightOfCursor = lineXPos + 50

    vueInstance.left = (leftOfCursor > 0 ? leftOfCursor : rightOfCursor) + 'px'
  }

  vueInstance.showTooltip = true
}

export const defaultOptions = {
  plugins: {
    streaming: false
  },
  layout: {},
  legend: {
    display: false,
    position: 'bottom'
  },
  hover: {
    mode: 'index',
    intersect: false,
    animationDuration: 0
  },
  animation: {
    duration: 0
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 4,
      hoverRadius: 4
    }
  },
  scales: {
    xAxes: [xAxesOptions],
    yAxes: [yAxesOptions]
  },
  responsive: true,
  maintainAspectRatio: false
}
