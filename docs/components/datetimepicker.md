# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

## Examples

### Custom + Relative date/time ranges

Display both a calendar and relative time frames, passing in a preset week-long range.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a time range"
      :timePeriods="exampleTimeFrames"
      :defaultCustom="defaultRangeWeek"
      v-model="currentValue1"
    />
    <div class="mt-6">Emitted value: <pre>{{ currentValue1 }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker 
  @change="newVal => currentValue = newVal" 
  :defaultCustom="defaultRangeWeek"
  :timePeriods=[
    {
      section: 'Last',
      values: [
        { timeframeText: '15 minutes', timeframeLength: 60*15 },
        ...
      ]
    },{
      section: 'Previous',
      values: [
        { timeframeText: '15 minutes', timeframeLength: 60*15 },
        ...
      ]
    },
  ]
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
    <div class="mt-6">Emitted value: <pre>{{ currentValue2 }}</pre></div>
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
      :defaultCustom="defaultRangeTwoDay"
      v-model="currentValue3"
    />
    <div class="mt-6">Emitted value: <pre>{{ currentValue3 }}</pre></div>
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

### timePeriods

An array of time frame values to be displayed as buttons in the "Relative" section of the popover, eg:

```json
[
  {
    section: 'Last',
    values: [
      { timeframeText: '15 minutes', timeframeLength: 60*15 },
      { timeframeText: '12 hours', timeframeLength: 60*60*12 },
      { timeframeText: '24 hours', timeframeLength: 60*60*24 }
    ]
  },
  {
    section: 'Previous',
    values: [
      { timeframeText: 'Week', timeframeLength: 60*60*24*14  }
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

console.log(TimePeriods)
console.log(TimeframeKeys)

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
      exampleTimeFrames: [
        {
          section: 'Last',
          values: [
            { timeframeText: '15 minutes', timeframeLength: 60*15 },
            { timeframeText: '12 hours', timeframeLength: 60*60*12 },
            { timeframeText: '24 hours', timeframeLength: 60*60*24 },
            { timeframeText: '7 days', timeframeLength: 60*60*24*7 },
            { timeframeText: '30 days', timeframeLength: 60*60*24*30 },
            { timeframeText: '90 days', timeframeLength: 60*60*24*90 }
          ]
        },
        {
          section: 'Previous',
          values: [
            { timeframeText: 'Week', timeframeLength: 60*60*24*14 },
            // { timeframeText: 'Quarter', timeframeLength: 60*60*24*90 }
          ]
        }
      ]
    }
  },
  computed: {
    defaultRelativeTimeframe () {
      return this.exampleTimeFrames[0].values.find(k => k.timeframeText === '12 hours')
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>
