/**
 * checks timestamp validity
 * @param {Number} timestamp
 * @return {Boolean}
 */
export const isTimestamp = (timestamp) => (new Date(+timestamp)).getTime() > 0

export const hasDatasets = (chartData) =>
  chartData && chartData.datasets && chartData.datasets.length

export const hasDataInDatasets = (chartData) =>
  hasDatasets(chartData) && chartData.datasets.some((ds) => ds.data.length)

export const hasTwoOrMoreDataPoints = (chartData) =>
  hasDataInDatasets(chartData) &&
  chartData.datasets.some((ds) => ds.data.length > 1)

export const hasTimeseriesData = (chartData) =>
  hasTwoOrMoreDataPoints(chartData) &&
  chartData.datasets.some((ds) => ds.data[0] && isTimestamp(ds.data[0].x))

export const hasTimeseriesLabels = (chartData) =>
  chartData &&
  chartData.labels &&
  chartData.labels.length &&
  isTimestamp(chartData.labels[0])

export const hasMillisecondTimestamps = (chartData) =>
  hasTimeseriesLabels(chartData) &&
  hasTimeseriesData(chartData) &&
  chartData.datasets.some(
    (ds) => ds.data[0] && ds.data[0].x.toString().length >= 13
  ) &&
  chartData.labels[0].toString().length >= 13
