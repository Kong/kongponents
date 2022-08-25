# Timepicker

<div v-if="hasMounted">

**KTimePicker** - A date and time selection tool, displayed inside a popover.
<KTimePicker :value ="{ timeframeText: '15 minutes', timeframeLength: 60 * 15 }"/>

```html
<KTimePicker />
```

## Props

</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      hasMounted: false,
    }
  },
  mounted() {
    this.hasMounted = true
  }
})
</script>
