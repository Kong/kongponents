# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

## Examples

### Single date

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a date"
      calendarMode="date"
      :isRange="false"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue1) }}</pre></div>
  </template>
</KCard>

### Single time

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a time"
      calendarMode="time"
      :isRange="false"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue1) }}</pre></div>
  </template>
</KCard>

### Single date and time

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a time"
      calendarMode="dateTime"
      :isRange="false"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue1) }}</pre></div>
  </template>
</KCard>

### Custom + Relative date/time ranges

Display both a calendar and relative time frames, passing in a preset week-long range.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a time range"
      calendarMode="dateTime"
      :isRange="true"
      :timePeriods="exampleTimeFrames"
      :defaultCustom="defaultRangeWeek"
      v-model="currentValue1"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue1) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker 
  @change="newVal => currentValue = newVal"
  calendarMode="dateTime"
  :defaultCustom="defaultRangeWeek"
  :timePeriods=[...]
/>
```

### Relative - show only time frame buttons

Passing in a selected relative time frame value will default the component to default to the "Relative" tab.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue2 = newVal"
      defaultMessage="Please select a time range"
      :timePeriods="exampleTimeFrames"
      :defaultRelative="defaultRelativeTimeframe"
      v-model="currentValue2"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue2) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  defaultMessage="Please select one of the time ranges below"
  :timePeriods="exampleTimeFrames"
  :defaultRelative="defaultRelativeTimeframe"
/>
```

### Custom ranges - show only the calendar

Calendar Display only - when the `timePeriods` prop is omitted, only the **Custom** tab is shown.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue3 = newVal"
      defaultMessage="Please select some dates"
      calendarMode="date"
      :defaultCustom="defaultRangeTwoDay"
      v-model="currentValue3"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue3) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  defaultMessage="Please select some dates"
  :defaultCustom="{
    start: new Date().getTime(),
    end: new Date().getTime() - (2*24*60*60*1000)
  }"
/>
```

## Props

### calendarMode

- Allowed values are: `date`, `time`, `dateTime`

### isRange

Along with the `calendarMode` prop, this determines the whether the calendar allows selection of a single date or time, as opposed to a range of start and end values.

### timePeriods

An array of time frame values to be displayed as buttons in the "Relative" section of the popover, eg:

```json
[
  {
    section: 'Last',
    values: [
      { timeframeText: '15 minutes', start: function(), end: function() },
      { timeframeText: '12 hours', start: function(), end: function() },
      { timeframeText: '24 hours', start: function(), end: function() }
    ]
  },
  {
    section: 'Previous',
    values: [
      { timeframeText: 'Week', start: function(), end: function() }
    ]
  }
]
```

### value

The timestamp that the component should default to

### defaultMessage

User-facing messaging that encourages the user to click things

</div>

<script>
import { TimePeriods, TimeframeKeys } from '../../docs/.vuepress/utils/KDatePickerMockData'

const exampleTimeFrames = [
  {
    section: 'Last',
    values: [
      TimePeriods.get(TimeframeKeys.FIFTEEN_MIN),
      TimePeriods.get(TimeframeKeys.ONE_HOUR),
      TimePeriods.get(TimeframeKeys.THREE_HOUR),
      TimePeriods.get(TimeframeKeys.SIX_HOUR),
      TimePeriods.get(TimeframeKeys.TWELVE_HOUR),
      TimePeriods.get(TimeframeKeys.ONE_DAY),
      TimePeriods.get(TimeframeKeys.SEVEN_DAY),
      TimePeriods.get(TimeframeKeys.THIRTY_DAY)
    ]
  },
  {
    section: 'Current',
    values: [
      TimePeriods.get(TimeframeKeys.CURRENT_WEEK),
      TimePeriods.get(TimeframeKeys.CURRENT_MONTH)
    ]
  },
  {
    section: 'Previous',
    values: [
      TimePeriods.get(TimeframeKeys.PREVIOUS_WEEK),
      TimePeriods.get(TimeframeKeys.PREVIOUS_MONTH)
    ]
  }
]

export default {
  data() {
    return {
      hasMounted: false,
      currentValue1: '',
      currentValue2: '',
      currentValue3: '',
      defaultRangeTwoDay: {
        start: new Date().getTime() - (2*24*60*60*1000),
        end: new Date().getTime()
      },
      defaultRangeWeek: {
        start: new Date().getTime() - (7*24*60*60*1000),
        end: new Date().getTime()
      },
      minDate: 'Tue Aug 31 2023 17:09:43 GMT-0400 (Eastern Daylight Time)',
      maxDate: 'Mon Apr 4 2021 10:09:43 GMT-0400 (Eastern Daylight Time)',
      exampleTimeFrames
    }
  },
  computed: {
    defaultRelativeTimeframe () {
      console.log(TimePeriods.get(TimeframeKeys.ONE_DAY))
      return TimePeriods.get(TimeframeKeys.ONE_DAY)
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>

<style lang="scss">
pre {
  white-space: pre-wrap;
}
</style>
