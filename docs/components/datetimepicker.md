# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

## Examples

Calendar Display both a calendar and relative time frames

<KCard>
  <template v-slot:body>
    <div class="mt-3">Selected: <pre>{{ currentValue1 }}</pre></div>
    <KDateTimePicker
      @changed="newVal => currentValue1 = newVal"
      defaultMessage="Please select a date or time range"
      :timePeriods="exampleTimeFrames"
      :defaultValue="defaultRange"
      v-model="currentValue1"
    />
  </template>
</KCard>

```html
<KDateTimePicker 
  @change="newVal => currentValue = newVal" 
  :timePeriods=[
    {
      section: 'Last',
      values: [
        { timeframeText: '15 minutes', timeframeLength: 60*15 },
        ...
      ]
    },{
      section: 'P',
      values: [
        { timeframeText: '15 minutes', timeframeLength: 60*15 },
        ...
      ]
    },
  ]
/>
```

Calendar Display only - the `timePeriods` prop is omitted

<KCard>
  <template v-slot:body>
    <div class="mt-3">Selected: <pre>{{ currentValue2 }}</pre></div>
    <KDateTimePicker
      @changed="newVal => currentValue2 = newVal"
      defaultMessage="Please select some dates"
      :defaultValue="defaultRange"
      v-model="currentValue2"
    />
  </template>
</KCard>

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
export default {
  data() {
    return {
      hasMounted: false,
      currentValue1: '',
      currentValue2: '',
      defaultRange: {
        start: new Date().getTime(),
        end: new Date().getTime() - (7*24*60*60*1000)
      },
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
            { timeframeText: 'Quarter', timeframeLength: 60*60*24*90 }
          ]
        }
      ]
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>
