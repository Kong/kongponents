# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

<KCard>
  <template v-slot:body>
    <!-- <div class="mt-3">Selected: {{ currentValue }}</div> -->
    <KDateTimePicker @change="newVal => currentValue = newVal" v-model="currentValue" :value="{ timeframeText: '15 minutes', timeframeLength: 60 * 15 }" />
  </template>
</KCard>

```html
<KDateTimePicker @change="newVal => currentValue = newVal"/>
```

## Props

</div>

<script>
export default {
  data() {
    return {
      hasMounted: false,
      currentValue: { timeframeText: '15 minutes', timeframeLength: 60 * 15 },
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>
