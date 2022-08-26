# DateTimePicker

<div v-if="hasMounted">

**KDateTimePicker** - A date and time selection tool, displayed inside a popover.

<KDateTimePicker :value="{ timeframeText: '15 minutes', timeframeLength: 60 * 15 }" />

```html
<KDateTimePicker />
```

## Props

</div>

<script>
export default {
  data() {
    return {
      hasMounted: false,
    }
  },
  mounted() {
    this.hasMounted = true
  }
}
</script>
