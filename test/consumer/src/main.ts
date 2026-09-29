import { createApp, h } from 'vue'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { KDateTimePicker } from '@kong/kongponents'
import '@kong/kongponents/dist/style.css'

// Mid-year noon UTC is in 2025 in every time zone, so the year assertions below do not
// depend on the machine's zone.
const rangeStart = new Date(Date.UTC(2025, 6, 4, 12))
const rangeEnd = new Date(Date.UTC(2025, 6, 5, 12))

createApp({
  render() {
    return h('div', [
      h(KDateTimePicker, {
        mode: 'dateTime',
        range: true,
        modelValue: {
          start: rangeStart,
          end: rangeEnd,
        },
      }),
      h('p', { 'data-testid': 'date-fns-year' }, format(rangeStart, 'yyyy')),
      h('p', { 'data-testid': 'date-fns-tz-year' }, formatInTimeZone(rangeStart, 'UTC', 'yyyy')),
    ])
  },
}).mount('#app')

document.body.dataset.ready = 'true'
