# DateTime Picker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

:::danger Experimental Component
`KDateTimePicker` is an experimental component. The component functionality, props, and events may change until it is in stable status.
:::

## Examples

### Single date

Create a single date selection calendar
Set the `v-model` to [Single date time picker](#single-date-time-picker-v-model)

<div>
  <KDateTimePicker
    v-model="currentValue1"
    @change="newVal => emitVal1 = newVal"
    placeholder="Please select a date"
    mode="date"
    :range="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(emitVal1) }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a date"
  mode="date"
  :range="false"
/>
```

<!-- ### Single time

<div>
  <KDateTimePicker
    @change="newVal => emitVal2 = newVal"
    placeholder="Please select a time"
    mode="time"
    :range="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ currentValue2 }}</pre></div>
</div>

```html
<KDateTimePicker
  @change="newVal => emitVal = newVal"
  placeholder="Please select a time"
  mode="time"
  :range="false"
/>
``` -->

### Single date and time

Set the `v-model` to [Single date time picker](#single-date-time-picker-v-model)

<div>
  <KDateTimePicker
    v-model="currentValue3"
    @change="newVal => emitVal3 = newVal"
    placeholder="Please select a date and time"
    mode="dateTime"
    :minute-increment="5"
    :range="false"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ JSON.stringify(emitVal3) }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a date and time"
  mode="dateTime"
  :minute-increment="5"
  :range="false"
/>
```

### Date and time range

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

<div>
  <KDateTimePicker
    v-model="currentValue4"
    @change="newVal => emitVal4 = newVal"
    placeholder="Please select a date and time"
    mode="dateTime"
    :minute-increment="5"
    :range="true"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ emitVal4 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a date and time"
  mode="dateTime"
  :minute-increment="5"
  :range="true"
/>
```

### Custom and Relative time frames

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

Display both a calendar and relative time frames, passing in a preset week-long range.
This instance also makes use of the `minDate` and `maxDate` parameters, which are both optional.

<div>
  <KDateTimePicker
    v-model="currentValue5"
    @change="newVal => emitVal5 = newVal"
    placeholder="Please select a range"
    mode="dateTime"
    :minDate="minDate"
    :maxDate="maxDate"
    :minute-increment="5"
    :range="true"
    :timePeriods="exampleTimeFrames"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ emitVal5 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a range"
  mode="dateTime"
  :minDate="minDate"
  :maxDate="maxDate"
  :minute-increment="5"
  :range="true"
  :timePeriods=[
    {
      section: "Last",
      values: [
        { key: "15m", prefix: "Last", timeframeText: "15 minutes", start: function() {}, end: function() {} },
        { key: "12h", prefix: "Last", timeframeText: "12 hours", start: function() {}, end: function() {} },
        { key: "24h", prefix: "Last", timeframeText: "24 hours", start: function() {}, end: function() {}},
        ...
      ]
    },
    {
      section: "Current",
      values: [
        { key: "current_week", prefix: "Current", timeframeText: "week", start: function() {}, end: function() {} },
        { key: "current_month", prefix: "Current", timeframeText: "month", start: function() {}, end: function() {} }
      ]
    }
    {
      section: "Previous",
      values: [
        { key: "previous_week", prefix: "Previous", timeframeText: "week", start: function() {}, end: function() {} },
        { key: "previous_month", prefix: "Previous", timeframeText: "month", start: function() {}, end: function() {} }
      ]
    }
  ]
/>
```

### Relative time frames only

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)
This utilizes the same time frames as the previous example; however, in this example we are passing in a pre-selected time frame.

<div>
  <KDateTimePicker
    v-model="currentValue6"
    @change="newVal => emitVal6 = newVal"
    placeholder="Please select a time frame"
    mode="relative"
    :minDate="minDate"
    :maxDate="maxDate"
    :range="true"
    :timePeriods="exampleTimeFrames"
  />
  <div class="mt-6">Emitted value: <pre class="json">{{ emitVal6 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a time frame"
  mode="relative"
  :range="true"
  :timePeriods=[
    {
      section: "Last",
      values: [
        { key: "15m", prefix: "Last", timeframeText: "15 minutes", start: function() {}, end: function() {} },
        { key: "12h", prefix: "Last", timeframeText: "12 hours", start: function() {}, end: function() {} },
        { key: "24h", prefix: "Last", timeframeText: "24 hours", start: function() {}, end: function() {} },
        ...
      ]
    },
    {
      section: "Current",
      values: [
        { key: "current_week", prefix: "Current", timeframeText: "week", start: function() {}, end: function() {} },
        { key: "current_month", prefix: "Current", timeframeText: "month", start: function() {}, end: function() {} }
      ]
    }
    {
      section: "Previous",
      values: [
        { key: "previous_week", prefix: "Previous", timeframeText: "week", start: function() {}, end: function() {} },
        { key: "previous_month", prefix: "Previous", timeframeText: "month", start: function() {}, end: function() {} }
      ]
    }
  ]
/>
```

## Props

### v-model

#### Single date time picker `v-model`

A single date or time picker instance which can be seeded with a value like so:

```js
<KDateTimePicker
  v-model="currentValue"
  ...
/>
Where `currentValue` is a valid Date object, eg: `new Date()`
```

#### Range date time picker `v-model`

An instance that displays a date range or a series of relative time frames.

Can be seeded with a **relative time frame** by setting `v-model` to:

```js
currentValue = {
  start: '',
  end: '',
  timePeriodsKey: TimeframeKeys.ONE_DAY
},
```

Or it can be seeded with a **custom calendar range** by setting `v-model` to:

```js
const today = new Date()
const twoDaysAgo  = new Date(today.getTime() - (2*24*60*60*1000))

currentValue = {
  start: twoDaysAgo,
  end: today
}
```

### icon

A `Boolean` which controls the display of the calendar icon.

**default**: `true`

### minDate

A valid `Date` object (eg: `Mon Aug 15 2022 08:00:00 GMT-0700 (Pacific Daylight Time)`) which blocks out days/times that occur **before** the given timestamp. `minDate` gets passed down to the calendar component, and does not apply to relative time frames.

**default**: `null`

### maxDate

A valid `Date` object (eg: `Fri Aug 19 2022 12:00:00 GMT-0700 (Pacific Daylight Time)`) which blocks out days/times that occur **after** the given timestamp. `maxDate` gets passed down to the calendar component, and does not apply to relative time frames.

**default**: `null`

### minuteIncrement

A `Number` which sets the custom interval for the Minutes select dropdown.

**default**: `5`

### mode

Required `String` prop which accepts the following values: `date`, `time`, `dateTime` and `relative`. The `relative` value is meant to denote an datetime picker instance which only contains relative time frames.

### placeholder

`String` containing the default message displayed in the date time picker input. Clearing any selected values will revert the input to display this placeholder message.

**default**: `Select a time range`

### range

`Boolean` which determines whether the calendar allows selection of a **single** date or time, as opposed to a **range** of start and end values.

**default**: `false`

### timePeriods

An array of time frame values to be displayed as buttons in the "Relative" section of the popover.  Please note that each timeframe's `key` attribute needs to be unique.

**default**: `[]`

**Example:**

```js
[
  {
    section: "Last",
    values: [
      { key: "15m", prefix: "Last", timeframeText: "15 minutes", start: () => {}, end: () => {} },
      { key: "12h", prefix: "Last", timeframeText: "12 hours", start: () => {}, end: () => {} },
      { key: "24h", prefix: "Last", timeframeText: "24 hours", start: () => {}, end: () => {} },
    ]
  },
   {
    section: "Current",
    values: [
      { key: "current_week", prefix: "Current", timeframeText: "week", start: () => {}, end: () => {} },
      { key: "current_month", prefix: "Current", timeframeText: "month", start: () => {}, end: () => {} },
    ]
  }
  {
    section: "Previous",
    values: [
      { key: "previous_week", prefix: "Previous", timeframeText: "week", start: () => {}, end: () => {} },
      { key: "previous_month", prefix: "Previous", timeframeText: "month", start: () => {}, end: () => {} },
    ]
  }
]
```

## Events

The events below will fire whenever **Apply** is clicked (assuming the user has made a custom calendar or relative timeframe selection). If **Clear** is clicked, the object shape remains the same, but the values are empty strings.

### Single date time picker

**Event**: `input` and `change`

Will emit a JavaScript Date object, or an empty string  "Clear".

```js
"2022-09-06T19:45:54.406Z"  // ISO 8601 Date string
```

### Range date time picker

**Event**: `input` and `change`

Will emit an `object` containing the following values:

```js
{
  "start": "2022-09-06T19:45:54.406Z",  // ISO 8601 Date string
  "end": "2022-09-07T19:45:54.406Z", // ISO 8601 Date string
  "timePeriodsKey": "24h" // or "" if not applicable
}
```

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
    const today       = new Date()
    const tomorrow    = new Date().getTime() + (1*24*60*60*1000)
    const twoDaysAgo  = new Date(today.getTime() - (2*24*60*60*1000))
    const aWeekAgo    = new Date(today.getTime() - (7*24*60*60*1000))
    const aYearAgo    = new Date(today.getTime() - (365*24*60*60*1000))
    return {
      hasMounted: false,
      emitVal1: '',
      emitVal2: '',
      emitVal3: '',
      emitVal4: '',
      emitVal5: '',
      emitVal6: '',
      currentValue1: new Date(),
      currentValue2: new Date(),
      currentValue3: new Date(),
      currentValue4: {
        start: twoDaysAgo,
        end: today
      },
      currentValue5: {
        start: aWeekAgo,
        end: today
      },
      currentValue6: {
        start: aWeekAgo,
        end: today,
        timePeriodsKey: TimeframeKeys.SEVEN_DAY
      },
      rangeTwoday: {
        start: twoDaysAgo,
        end: today
      },
      rangeWeek: {
        start: aWeekAgo,
        end: today
      },
      maxDate: today,
      minDate: aYearAgo,
      exampleTimeFrames
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>

<style lang="scss" scoped>
pre.json {
  font-size: var(--type-sm);
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
