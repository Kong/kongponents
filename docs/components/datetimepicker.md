# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

## Examples

### Calendar - Single date

Create a single date selection calendar, defaulting the [selected value](#defaultcustom) to tomorrow.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a date"
      calendarMode="date"
      :defaultCustom="defaultSingleTomorrow"
      :isRange="false"
      v-model="currentValue1"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue1) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  defaultMessage="Please select a date"
  calendarMode="date"
  :defaultCustom="`${new Date().getTime() + (24*60*60*1000)}`"
  :isRange="false"
  v-model="currentValue"
/>
```

### Calendar - Single time

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue2 = newVal"
      defaultMessage="Please select a time"
      calendarMode="time"
      :defaultCustom="defaultSingleToday"
      :isRange="false"
      v-model="currentValue2"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue2) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  defaultMessage="Please select a time"
  calendarMode="time"
  :defaultCustom="`${new Date()}`"
  :isRange="false"
  v-model="currentValue"
/>
```

### Calendar - Single date and time

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue3 = newVal"
      defaultMessage="Please select a date and time"
      calendarMode="dateTime"
      :isRange="false"
      v-model="currentValue3"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue3) }}</pre></div>
  </template>
</KCard>

```html
 <KDateTimePicker
    @changed="newVal => currentValue = newVal"
    defaultMessage="Please select a time"
    calendarMode="dateTime"
    :isRange="false"
    v-model="currentValue"
  />
```

### Calendar and Relative time frames

Display both a calendar and relative time frames, passing in a preset week-long range.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue4 = newVal"
      defaultMessage="Please select a time range"
      calendarMode="dateTime"
      :isRange="true"
      :timePeriods="exampleTimeFrames"
      :defaultCustom="defaultRangeWeek"
      v-model="currentValue4"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue4) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker 
  @change="newVal => currentValue = newVal"
  calendarMode="dateTime"
  :defaultCustom="defaultRangeWeek"
  :timePeriods=[...]
  v-model="currentValue"
/>
```

### Relative time frames only

Passing in a selected relative time frame value will default the component to default to the "Relative" tab.

<KCard>
  <template v-slot:body>
    <KDateTimePicker
      @changed="newVal => currentValue5 = newVal"
      defaultMessage="Please select a time range"
      :timePeriods="exampleTimeFrames"
      :defaultRelative="defaultRelativeTimeframe"
      v-model="currentValue5"
    />
    <div class="mt-6">Emitted value: <pre>{{ JSON.stringify(currentValue5) }}</pre></div>
  </template>
</KCard>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  defaultMessage="Please select one of the time ranges below"
  :timePeriods="exampleTimeFrames"
  :defaultRelative="defaultRelativeTimeframe"
  v-model="currentValue"
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

### defaultCustom

Either an integer, or an object with `start` and `end` values, all of which would represent number of milliseconds since Unix epoch.  

**Examples**:

```js
// Single date or time
1662588371998

// A range of dates / datetimes
{
  start: 1662588371998
  end: 1662589027215
}
```

## Theming

The DateTimePicker will expand to fit the width of its parent container. To customize its width, add a class or width attribute to the wrapping component.

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
      currentValue4: '',
      currentValue5: '',
      defaultSingleToday: new Date().getTime(),
      defaultSingleTomorrow: new Date().getTime() + (1*24*60*60*1000),
      defaultRangeTwoDay: {
        start: new Date().getTime() - (2*24*60*60*1000),
        end: new Date().getTime()
      },
      defaultRangeWeek: {
        start: new Date().getTime() - (7*24*60*60*1000),
        end: new Date().getTime()
      },
      maxDate: 'Tue Aug 31 2023 17:09:43 GMT-0400 (Eastern Daylight Time)',
      minDate: 'Mon Apr 4 2021 10:09:43 GMT-0400 (Eastern Daylight Time)',
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

<style lang="scss" scoped>
pre {
  white-space: pre-wrap;
}

// Allows page to scroll further, thereby linking to correct section
h2, h3 {
  margin-top: 2rem;
}
.theme-default-content {
  margin-bottom: 20rem;
}
</style>
