# DateTime Picker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

## Examples

### Calendar - Single date

Create a single date selection calendar, defaulting the [selected value](#defaultcustom) to tomorrow.

<div>
  <KDateTimePicker
    @changed="newVal => currentValue1 = newVal"
    placeholder="Please select a date"
    mode="date"
    :defaultCustom="defaultSingleTomorrow"
    :isRange="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(currentValue1) }}</pre></div>
</div>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  placeholder="Please select a date"
  mode="date"
  :defaultCustom="`${new Date().getTime() + (24*60*60*1000)}`"
  :isRange="false"
/>
```

### Calendar - Single time

<div>
  <KDateTimePicker
    @changed="newVal => currentValue2 = newVal"
    placeholder="Please select a time"
    mode="time"
    :defaultCustom="defaultSingleToday"
    :isRange="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(currentValue2) }}</pre></div>
</div>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  placeholder="Please select a time"
  mode="time"
  :defaultCustom="`${new Date()}`"
  :isRange="false"
/>
```

### Calendar - Single date and time

<div>
  <KDateTimePicker
    @changed="newVal => currentValue3 = newVal"
    placeholder="Please select a date and time"
    mode="dateTime"
    :isRange="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(currentValue3) }}</pre></div>
</div>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  placeholder="Please select a date and time"
  mode="dateTime"
  :isRange="false"
/>
```

### Calendar and Relative time frames

Display both a calendar and relative time frames, passing in a preset week-long range.
This instance also makes use of the `minDate` and `maxDate` parameters, which are both optional.

Please see props section for an [expanded example of the `timePeriods` array](#timeperiods).

<div>
  <KDateTimePicker
    @changed="newVal => currentValue4 = newVal"
    placeholder="Please select a time range"
    mode="dateTime"
    :defaultCustom="defaultRangeWeek"
    :minDate="minDate"
    :maxDate="maxDate"
    :isRange="true"
    :timePeriods="exampleTimeFrames"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(currentValue4) }}</pre></div>
</div>

```html
<KDateTimePicker 
  @change="newVal => currentValue = newVal"
  placeholder="Please select a time range"
  mode="dateTime"
  :defaultCustom="defaultRangeWeek"
  :minDate="minDate"
  :maxDate="maxDate"
  :isRange="true"
  :timePeriods="exampleTimeFrames"
  :timePeriods=[...]
/>
```

### Relative time frames only

Passing in a selected relative time frame value will default the component to default to the "Relative" tab.

<div>
  <KDateTimePicker
    @changed="newVal => currentValue5 = newVal"
    placeholder="Please select a time range"
    :timePeriods="exampleTimeFrames"
    :defaultRelative="defaultRelativeTimeframe"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(currentValue5) }}</pre></div>
</div>

```html
<KDateTimePicker
  @changed="newVal => currentValue = newVal"
  placeholder="Please select one of the time ranges below"
  :timePeriods="exampleTimeFrames"
  :defaultRelative="defaultRelativeTimeframe"
/>
```

## Props

### mode

Allowed values are: `date`, `time`, `dateTime`

### isRange

Along with the `mode` prop, this determines the whether the calendar allows selection of a single date or time, as opposed to a range of start and end values.

### minDate

Blocks out days/times that occur **before** the given timestamp. Does not apply to relative time frames.

### maxDate

Blocks out days/times that occur **after** the given timestamp. Does not apply to relative time frames.

### timePeriods

An array of time frame values to be displayed as buttons in the "Relative" section of the popover.  Please note that each timeframe's `key` attribute needs to be unique.

**Example:**

```json
[
  {
    section: "Last",
    values: [
      { key: "15m", timeframeText: "15 minutes", start: () => {}, end: () => {} },
      { key: "12h", timeframeText: "12 hours", start: () => {}, end: () => {} },
      { key: "24h", timeframeText: "24 hours", start: () => {}, end: () => {} },
      ...
    ]
  },
  {
    section: "Previous",
    values: [
      { key: "prev_week", timeframeText: "Week", start: () => {}, end: () => {} },
      { key: "prev_month", timeframeText: "Month", start: () => {}, end: () => {} },
      ...
    ]
  }
]
```

### placeholder

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

The DateTime Picker will expand to fit the width of its parent container. To customize its width, add a class or width attribute to the wrapping component.

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
      maxDate: new Date().getTime(),
      minDate: new Date().getTime() - (365*24*60*60*1000),
      exampleTimeFrames
    }
  },
  computed: {
    defaultRelativeTimeframe () {
      return TimePeriods.get(TimeframeKeys.ONE_DAY)
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>

<style lang="scss" scoped>
pre.json {
  font-size: var(--type-xs);
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
