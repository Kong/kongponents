# DateTime Picker

KDateTimePicker is a date and time selection widget, displayed inside a popover.

## Props

### v-model

#### Single date and/or time picker `v-model`

A single date or time picker instance which can be seeded with a value as shown here, where `currentValue`'s `start` key contains a valid Date object, `new Date()` or a `null` value.  If null, the picker will display the placeholder message and allow the user to make a selection. 

```ts
currentValue = {
  start: new Date(),
  end: null,
},
```

#### Range date and/or time picker `v-model`

An instance that displays a date range or a series of relative time frames.

Can be seeded with a **relative time frame** by setting the `v-model` to `currentValue` as shown below:

```ts
currentValue = {
  start: null,
  end: null,
  timePeriodsKey: TimeframeKeys.ONE_DAY
},
```

Or, it can be seeded with a **custom calendar range** by setting `v-model` to:

```ts
const today = new Date()
const twoDaysAgo  = new Date(today.getTime() - (2*24*60*60*1000))

currentValue = {
  start: twoDaysAgo,
  end: today
}
```

### clearButton

A `Boolean` to show/hide the Clear button. Defaults to `false`.

### icon

A `Boolean` to show/hide the calendar icon displayed within the display field. Defaults to `true`.

### minDate

A valid `Date` object (eg: `Mon Aug 15 2022 08:00:00 GMT-0700 (Pacific Daylight Time)`) which blocks out days/times that occur **before** the given timestamp. `minDate` gets passed down to the calendar component, and does not apply to relative time frames. Default value is `null`.

### maxDate

A valid `Date` object (eg: `Fri Aug 19 2022 12:00:00 GMT-0700 (Pacific Daylight Time)`) which blocks out days/times that occur **after** the given timestamp. `maxDate` gets passed down to the calendar component, and does not apply to relative time frames. Default value is `null`.

### mode

Required `String` prop which accepts the following values:
- `date`: denotes a datetime picker instance that allows a calendar date to be selected
- `time`: denotes an instance that allows a time to be selected
- `dateTime`: denotes an instance that allows a calendar date and time to be selected
- `relative`: instance which only contains relative time frames
- `relativeDate`: instance with relative time frames, and a calendar that supports date selection
- `relativeDateTime`: instance with relative time frames, and a calendar that supports date and time selection

### placeholder

`String` containing the default message displayed in the date time picker input. Clearing any selected values will revert the input to display this placeholder message. Default value is "_Select a time range_".

### range

`Boolean` which determines whether the calendar allows selection of a **single** date or time, as opposed to a **range** of start and end values. Choosing any relative `mode` option will default the `range` to `true`. Defaults to `false`.

### timePeriods

An array of time frame values to be displayed as buttons in the "Relative" section of the popover.

**Please note that each timeframe's `key` attribute must be unique.**

**Example:**

```ts
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

### width

Width of the trigger element. Defaults to `100%`.

### disabled

Boolean to disable the input component. Defaults to `false`.

### popoverPlacement

Prop to define the positioning of the popover in relation to the trigger element (see [KPopover placement prop](/components/popover#placement) for details). Default value is `bottomStart`.

## Examples

### Single date

Create a single date selection calendar, with an example of passing in a fixed pixel width for the input field, and null values for the `start` and `end` keys, which causes the input to display the placeholder message.

Set the `v-model` to [Single date time picker](#single-date-time-picker-v-model). Mode is set to `date`, which results in a calendar, but no timepicker.

<ClientOnly>
  <KDateTimePicker
    v-model="singleDateEmpty"
    clear-button
    placeholder="Please select a date"
    mode="date"
    :range="false"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ singleDateEmpty }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  clear-button
  placeholder="Please select a date"
  mode="date"
  :range="false"
/>
```

### Single date and time

Setting the `v-model` to [Single date time picker](#single-date-time-picker-v-model) with a `start` value of `new Date()` will initialize the datepicker with today's date. Mode is set to `dateTime`, which results in a calendar, and a timepicker.

<ClientOnly>
  <KDateTimePicker
    v-model="singleDateToday"
    clear-button
    placeholder="Please select a date and time"
    mode="dateTime"
    :range="false"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ singleDateToday }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  clear-button
  placeholder="Please select a date and time"
  mode="dateTime"
  :range="false"
/>
```

### Date range

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model).

<ClientOnly>
  <KDateTimePicker
    v-model="dateRangeWeek"
    clear-button
    placeholder="Please select a date range"
    mode="date"
    :range="true"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ dateRangeWeek }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  clear-button
  placeholder="Please select a date range"
  mode="date"
  :range="true"
/>
```

### Date and time range

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

<ClientOnly>
  <KDateTimePicker
    v-model="dateRangeWeek"
    clear-button
    placeholder="Please select a date and time"
    mode="dateTime"
    :range="true"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ dateRangeWeek }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  clear-button
  placeholder="Please select a date and time"
  mode="dateTime"
  :range="true"
/>
```

### Custom date and Relative time frames

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

Display both a calendar and relative time frames, passing in a preset week-long range. The `mode` is set to `relativeDate`, which only shows monthly calendar.

This instance makes use of the optional `minDate` and `maxDate` parameters.

<ClientOnly>
  <KDateTimePicker
    v-model="dateRangeWeek"
    placeholder="Please select a range"
    mode="relativeDate"
    :min-date="minDate"
    :max-date="maxDate"
    :range="true"
    :time-periods="exampleTimeFrames"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ dateRangeWeek }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a range"
  mode="relativeDate"
  :min-date="minDate"
  :max-date="maxDate"
  :range="true"
  :time-periods="[
    {
      section: 'Last',
      values: [
        { key: '15m', prefix: 'Last', timeframeText: '15 minutes', start: function() {}, end: function() {} },
        { key: '12h', prefix: 'Last', timeframeText: '12 hours', start: function() {}, end: function() {} },
        { key: '24h', prefix: 'Last', timeframeText: '24 hours', start: function() {}, end: function() {}},
        ...
      ]
    },
    {
      section: 'Current',
      values: [
        { key: 'current_week', prefix: 'Current', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'current_month', prefix: 'Current', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
    {
      section: 'Previous',
      values: [
        { key: 'previous_week', prefix: 'Previous', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'previous_month', prefix: 'Previous', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
  ]"
/>
```

### Custom date/time and Relative time frames

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model)

Display both a calendar and relative time frames, passing in a preset week-long range. This instance makes use of the optional `minDate` and `maxDate` parameters. 

Passing in a `timePeriodsKey` causes the instance to default to the "Relative" tab.

<ClientOnly>
  <KDateTimePicker
    v-model="dateRangeWeekRelative"
    placeholder="Please select a range"
    mode="relativeDateTime"
    :min-date="minDate"
    :max-date="maxDate"
    :range="true"
    :time-periods="exampleTimeFrames"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ dateRangeWeekRelative }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="currentValue"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a range"
  mode="relativeDateTime"
  :min-date="minDate"
  :max-date="maxDate"
  :range="true"
  :time-periods="[
    {
      section: 'Last',
      values: [
        { key: '15m', prefix: 'Last', timeframeText: '15 minutes', start: function() {}, end: function() {} },
        { key: '12h', prefix: 'Last', timeframeText: '12 hours', start: function() {}, end: function() {} },
        { key: '24h', prefix: 'Last', timeframeText: '24 hours', start: function() {}, end: function() {}},
        ...
      ]
    },
    {
      section: 'Current',
      values: [
        { key: 'current_week', prefix: 'Current', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'current_month', prefix: 'Current', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
    {
      section: 'Previous',
      values: [
        { key: 'previous_week', prefix: 'Previous', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'previous_month', prefix: 'Previous', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
  ]"
/>
```

### Relative date only 

Set the `v-model` to [Range date time picker](#range-date-time-picker-v-model).
This utilizes the same time frames as the previous example; however, in this case we are passing in a pre-selected time frame of one hour.

<ClientOnly>
  <KDateTimePicker
    v-model="oneHourRelativeOnly"
    placeholder="Please select a time frame"
    mode="relativeDate"
    :min-date="minDate"
    :max-date="maxDate"
    :range="true"
    :time-periods="exampleTimeFrames"
  />
  <br/>
  <div>Emitted value: <pre class="json hide-from-percy">{{ oneHourRelativeOnly }}</pre></div>
</ClientOnly>

```html
<KDateTimePicker
  v-model="''"
  @change="newVal => emitVal = newVal"
  placeholder="Please select a time frame"
  mode="relative"
  :min-date="minDate"
  :max-date="maxDate"
  :range="true"
  :time-periods="[
    {
      section: 'Last',
      values: [
        { key: '15m', prefix: 'Last', timeframeText: '15 minutes', start: function() {}, end: function() {} },
        { key: '12h', prefix: 'Last', timeframeText: '12 hours', start: function() {}, end: function() {} },
        { key: '24h', prefix: 'Last', timeframeText: '24 hours', start: function() {}, end: function() {} },
        ...
      ]
    },
    {
      section: 'Current',
      values: [
        { key: 'current_week', prefix: 'Current', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'current_month', prefix: 'Current', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
    {
      section: 'Previous',
      values: [
        { key: 'previous_week', prefix: 'Previous', timeframeText: 'week', start: function() {}, end: function() {} },
        { key: 'previous_month', prefix: 'Previous', timeframeText: 'month', start: function() {}, end: function() {} }
      ]
    }
  ]"
/>
```

## Events

### change and update:modelValue

The events below will fire whenever **Apply** is clicked (assuming the user has made a custom calendar or relative timeframe selection). If **Clear** is clicked, the object shape remains the same, but the `start` and `end` values will be `null`.

#### Single date time picker

Component will emit a JavaScript Date object for the `start` value, and a null value for `end`. 
When "Clear" is clicked, it will emit null values for both `start` and `end`.

```ts
{
  start: "2022-09-06T19:45:54.406Z",
  end: null,
},
```

#### Range date time picker

Will emit an `object` containing the following values:

```ts
{
  "start": "2022-09-06T19:45:54.406Z",  // ISO 8601 Date string
  "end": "2022-09-07T19:45:54.406Z", // ISO 8601 Date string
  "timePeriodsKey": "24h" // or "" if not applicable
} 
```

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TimePeriods, TimeframeKeys } from '@mocks/KDateTimePickerMockData'
import type { TimeFrameSection } from '@/types'

const exampleTimeFrames: TimeFrameSection[] = [
  {
    section: 'Last',
    values: [
      TimePeriods.get(TimeframeKeys.FIFTEEN_MIN),
      TimePeriods.get(TimeframeKeys.ONE_HOUR),
      TimePeriods.get(TimeframeKeys.SIX_HOUR),
      TimePeriods.get(TimeframeKeys.TWELVE_HOUR),
      TimePeriods.get(TimeframeKeys.ONE_DAY),
      TimePeriods.get(TimeframeKeys.SEVEN_DAY),
      TimePeriods.get(TimeframeKeys.THIRTY_DAY),
    ],
  },
  {
    section: 'Current',
    values: [
      TimePeriods.get(TimeframeKeys.CURRENT_WEEK),
      TimePeriods.get(TimeframeKeys.CURRENT_MONTH),
    ],
  },
  {
    section: 'Previous',
    values: [
      TimePeriods.get(TimeframeKeys.PREVIOUS_WEEK),
      TimePeriods.get(TimeframeKeys.PREVIOUS_MONTH),
    ],
  },
]

const today = new Date()
const tomorrow = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
const aWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
const aYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)

const singleDateEmpty = ref<TimeRange>({
  start: null,
  end: null,
})

const singleDateToday = ref<TimeRange>({
  start: today,
  end: null,
})

const dateRangeWeek = ref<TimeRange>({
  start: aWeekAgo,
  end: today,
})

const dateRangeWeekRelative = ref<TimeRange>({
  start: aWeekAgo,
  end: today,
  timePeriodsKey: TimeframeKeys.SEVEN_DAY,
})

const oneHourRelativeOnly = ref<TimeRange>({
  start: null,
  end: null,
  timePeriodsKey: TimeframeKeys.ONE_HOUR,
})

const maxDate = ref(today)
const minDate = ref(aYearAgo)
</script>
