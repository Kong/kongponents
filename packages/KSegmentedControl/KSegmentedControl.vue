<template>
  <div class="segmented-control d-flex justify-content-between">
    <KToggle
      v-for="item in options"
      :key="item.label || item"
      @toggled="clicked(item.value || item)"
    >
      <template slot-scope="{isToggled, toggle}">
        <KButton
          :disabled="isDisabled"
          :appearance="selected===(item.value || item) ? 'primary' : 'outline-primary'"
          class="justify-content-center"
          @click="toggle"
        >
          {{ item.label || item }}
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
      type: [String, Number, Boolean],
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedValue: this.selected
    }
  },
  methods: {
    clicked (selectedValue) {
      if (this.isDisabled) return
      let value = selectedValue.value || selectedValue
      if (this.selectedValue === value) value = ''
      else this.selectedValue = value
      this.$emit('clicked', value)
    }
  }
}
</script>
<style scoped>
.segmented-control .k-button {
  border-radius: 0;
  margin-left: -1px;
  flex: 1;
  text-transform: capitalize;
}
.segmented-control .k-button:first-child {
  border-radius: 3px 0 0 3px;
  margin-left: 0;
}
.segmented-control .k-button:last-child {
  border-radius: 0 3px 3px 0;
}
.segmented-control .k-button:only-child {
  border-radius: 3px;
  margin-left: 0;
}
</style>
