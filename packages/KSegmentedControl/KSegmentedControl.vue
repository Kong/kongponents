<template>
  <div class="segmented-control d-flex" >
    <div
      v-for="item in options"
      :key="label(item)"
      class="d-flex flex-grow-1"
    >
      <template>
        <KButton
          :disabled="isDisabled"
          :appearance="appearance(item)"
          class="justify-content-center"
          @click="clicked(value(item))"
        >
          {{ label(item) }}
        </KButton>
      </template>
    </div>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
export default {
  name: 'KSegmentedControl',
  components: { KButton },
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
    label (item) {
      return item.label || item
    },
    value (item) {
      return item.value || item
    },
    appearance (item) {
      return this.selected === this.value(item) ? 'primary' : 'outline-primary'
    },
    clicked (item) {
      if (this.isDisabled) return
      let newValue = this.value(item)
      const isUnselecting = this.selectedValue === newValue
      if (isUnselecting) {
        this.selectedValue = ''

        return this.$emit('clicked', '')
      }

      this.selectedValue = newValue
      this.$emit('clicked', newValue)
    }
  }
}
</script>
<style scoped>
.segmented-control .k-button {
  border-radius: 0;
  margin-left: -1px;
  flex: 1;
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
