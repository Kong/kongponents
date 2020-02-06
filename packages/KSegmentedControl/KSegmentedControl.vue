<template>
  <div class="radio-button-group d-flex justify-content-between">
    <KToggle
      v-for="item in options"
      :key="item"
      @toggled="toggled(item)"
    >
      <template slot-scope="{isToggled, toggle}">
        <KButton
          :appearance="selected===item ? 'primary' : 'outline-primary'"
          class="justify-content-center"
          @click="toggle"
        >
          {{ item }}
        </KButton>
      </template>
    </KToggle>
  </div>
</template>

<script>
import KToggle from '@kongponents/ktoggle/KToggle'
import KButton from '@kongponents/kbutton/KButton.vue'
export default {
  name: 'KSegmentedControl',
  components: { KToggle, KButton },
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      selectedValue: this.selected
    }
  },
  methods: {
    toggled (selectedValue) {
      if (this.selectedValue === selectedValue) this.selectedValue = ''
      else this.selectedValue = selectedValue
      this.$emit('toggled', selectedValue)
    }
  }
}
</script>
<style scoped>
.radio-button-group .k-button {
  border-radius: 0;
  margin-left: -1px;
  flex: 1;
  text-transform: capitalize;
}
.radio-button-group .k-button:first-child {
  border-radius: 3px 0 0 3px;
  margin-left: 0;
}
.radio-button-group .k-button:last-child {
  border-radius: 0 3px 3px 0;
}
.radio-button-group .k-button:only-child {
  border-radius: 3px;
  margin-left: 0;
}
</style>
