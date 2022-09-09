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
    placeholder="Please select a date"
    mode="date"
    :range="false"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ JSON.stringify(currentValue1) }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  placeholder="Please select a date"
  mode="date"
  :range="false"
/>
```

<!-- ### Single time

<div>
  <KDateTimePicker
    @change="newVal => currentValue2 = newVal"
    placeholder="Please select a time"
    mode="time"
    :range="false"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ currentValue2 }}</pre></div>
</div>

```html
<KDateTimePicker
  @change="newVal => currentValue = newVal"
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
    placeholder="Please select a date and time"
    mode="dateTime"
    :range="false"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ JSON.stringify(currentValue3) }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  placeholder="Please select a date and time"
  mode="dateTime"
  :range="false"
/>
```

### Date and time range

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

<div>
  <KDateTimePicker
    v-model="currentValue4"
    placeholder="Please select a date and time"
    mode="dateTime"
    :range="true"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ currentValue4 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  placeholder="Please select a date and time"
  mode="dateTime"
  :range="true"
/>
```

### Calendar and Relative time frames

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

Display both a calendar and relative time frames, passing in a preset week-long range.
This instance also makes use of the `minDate` and `maxDate` parameters, which are both optional.

<div>
  <KDateTimePicker
    v-model="currentValue5"
    placeholder="Please select a range"
    mode="dateTime"
    :minDate="minDate"
    :maxDate="maxDate"
    :range="true"
    :timePeriods="exampleTimeFrames"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ currentValue5 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  placeholder="Please select a range"
  mode="dateTime"
  :minDate="minDate"
  :maxDate="maxDate"
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
Same time frames as the previous example, except now we're passing in a pre-selected time frame.

<div>
  <KDateTimePicker
    v-model="currentValue6"
    placeholder="Please select a time frame"
    mode="relative"
    :timePeriods="exampleTimeFrames"
  />
  <div class="mt-6">Preset / Emitted value: <pre class="json">{{ currentValue6 }}</pre></div>
</div>

```html
<KDateTimePicker
  v-model="currentValue"
  placeholder="Please select a time frame"
  mode="relative"
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

A single date or time picker instance will emit a Javascript Date object as a `string`.

```js
"2022-09-06T19:45:54.406Z"  // ISO 8601 Date string
```

#### Range date time picker `v-model`

An instance that displays a date range or a series of relative time frames will emit an `object` containing the following values:

```js
{
  "start": "2022-09-06T19:45:54.406Z",  // ISO 8601 Date string
  "end": "2022-09-07T19:45:54.406Z", // ISO 8601 Date string
  "timePeriodsKey": "24h" // or "" if not applicable
}
```

### maxDate

`Number` which blocks out days/times that occur **after** the given timestamp. `maxDate` gets passed down to the calendar component, and does not apply to relative time frames.

**default**: `null`

### minDate

`Number` which blocks out days/times that occur **before** the given timestamp. `minDate` gets passed down to the calendar component, and does not apply to relative time frames.

**default**: `null`

### mode

`String` parameter which accepts the following values: `date`, `time`, `dateTime` and `relative`. The latter is meant to denote an datetime picker instance which only contains relative time frames.

### placeholder

`String` containing the default message displayed in the date time picker input. Clearing any selected values will revert the input to display this placeholder message.

**default**: `Select a time range`

### range

`Boolean` which determines whether the calendar allows selection of a **single** date or time, as opposed to a **range** of start and end values. This parameter, along with the `mode` setting, gets passed down to the calendar component.

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

| Event     | Description             |
| :-------- | :------------------ |
| `input` and `change` | Fires whenever **Apply** is clicked (assuming the user has made a custom calendar or relative timeframe selection), or **Clear** is clicked; returns either a single Date string, or an object containing `start`, `end` and a `timePeriodsKey` as outlined in [Examples](#examples).

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
      currentValue1: new Date(),
      currentValue2: undefined,
      currentValue3: undefined,
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
